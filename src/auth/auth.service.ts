import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Recipe, RecipeDocument } from '../recipes/schemas/recipe.schema';
import { MealPlan, MealPlanDocument } from '../meal-plans/schemas/meal-plan.schema';
import { RegisterDto, LoginDto, UpdateProfileDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(MealPlan.name) private mealPlanModel: Model<MealPlanDocument>,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async register(registerDto: RegisterDto, imageFile?: Express.Multer.File) {
    const { name, email, password } = registerDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (imageFile) {
      const uploaded = await this.cloudinaryService.uploadImage(imageFile, 'users');
      imageUrl = uploaded.url;
      imagePublicId = uploaded.publicId;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      imagePublicId,
    });

    await createdUser.save();
    return { message: 'User created successfully' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user._id });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    };
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto, imageFile?: Express.Multer.File) {
    const { name, email, password } = updateProfileDto;
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (name) user.name = name;
    if (email) {
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new BadRequestException('Email already in use');
      }
      user.email = email;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (imageFile) {
      const uploaded = await this.cloudinaryService.uploadImage(imageFile, 'users');
      if (user.imagePublicId) {
        await this.cloudinaryService.deleteImage(user.imagePublicId);
      }
      user.image = uploaded.url;
      user.imagePublicId = uploaded.publicId;
    }

    await user.save();

    return {
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    };
  }

  async resetPassword(resetPasswordDto: { email: string; newPassword: string }) {
    const { email, newPassword } = resetPasswordDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('No existe ningún usuario con este correo electrónico');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: 'Contraseña restablecida exitosamente' };
  }

  async deleteAccount(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete user avatar from Cloudinary if exists
    if (user.imagePublicId) {
      try {
        await this.cloudinaryService.deleteImage(user.imagePublicId);
      } catch (err) {
        console.error('Error deleting user image from Cloudinary:', err);
      }
    }

    // Delete associated recipes and meal plans created by the user
    await this.recipeModel.deleteMany({ user: user._id });
    await this.mealPlanModel.deleteMany({ user: user._id });

    // Delete the user record itself (including embedded pantry, shoppingList, favorites)
    await this.userModel.findByIdAndDelete(userId);

    return { message: 'Account and associated data deleted successfully' };
  }
}

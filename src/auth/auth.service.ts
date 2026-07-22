import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { RegisterDto, LoginDto, UpdateProfileDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
}

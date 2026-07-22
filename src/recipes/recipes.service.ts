import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recipe, RecipeDocument } from './schemas/recipe.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(query?: string) {
    const searchFilter = query
      ? { title: { $regex: query, $options: 'i' } }
      : {};

    return this.recipeModel
      .find({
        ...searchFilter,
        $or: [{ isSystem: true }, { isPublic: true }],
      })
      .exec();
  }

  async findMyRecipes(userId: string) {
    return this.recipeModel.find({ user: new Types.ObjectId(userId) }).exec();
  }

  async findById(id: string) {
    const recipe = await this.recipeModel
      .findById(id)
      .populate('ingredients.ingredient')
      .exec();

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  async findByIngredients(userId: string, ingredientIds: string[]) {
    const recipes = await this.recipeModel
      .find({
        $or: [
          { isSystem: true },
          { isPublic: true },
          { user: new Types.ObjectId(userId) },
        ],
      })
      .exec();

    const results = recipes.map((recipe) => {
      const recipeIngredientIds = recipe.ingredients.map((ing) =>
        ing.ingredient.toString(),
      );
      const matches = recipeIngredientIds.filter((id) =>
        ingredientIds.includes(id),
      );

      const matchPercentage =
        recipeIngredientIds.length > 0
          ? Math.round((matches.length / recipeIngredientIds.length) * 100)
          : 0;

      return {
        ...recipe.toObject(),
        matchPercentage,
      };
    });

    results.sort((a, b) => b.matchPercentage - a.matchPercentage);
    return results;
  }

  async create(userId: string, createRecipeDto: CreateRecipeDto, imageFile?: Express.Multer.File) {
    const recipeData: Record<string, any> = {
      ...createRecipeDto,
      user: new Types.ObjectId(userId),
    };

    if (imageFile) {
      const uploaded = await this.cloudinaryService.uploadImage(imageFile, 'recipes');
      recipeData.image = uploaded.url;
      recipeData.imagePublicId = uploaded.publicId;
    }

    const created = new this.recipeModel(recipeData);
    return created.save();
  }

  async update(userId: string, id: string, updateRecipeDto: UpdateRecipeDto, imageFile?: Express.Multer.File) {
    const updateData: Record<string, any> = { ...updateRecipeDto };

    if (imageFile) {
      const uploaded = await this.cloudinaryService.uploadImage(imageFile, 'recipes');
      updateData.image = uploaded.url;
      updateData.imagePublicId = uploaded.publicId;

      const oldRecipe = await this.recipeModel.findById(id).exec();
      if (oldRecipe && oldRecipe.imagePublicId) {
        await this.cloudinaryService.deleteImage(oldRecipe.imagePublicId);
      }
    }

    const updated = await this.recipeModel
      .findOneAndUpdate(
        { _id: new Types.ObjectId(id), user: new Types.ObjectId(userId) },
        updateData,
        { new: true },
      )
      .exec();

    if (!updated) {
      throw new NotFoundException('Recipe not found or unauthorized');
    }
    return updated;
  }

  async remove(userId: string, id: string) {
    const deleted = await this.recipeModel
      .findOneAndDelete({
        _id: new Types.ObjectId(id),
        user: new Types.ObjectId(userId),
      })
      .exec();

    if (!deleted) {
      throw new NotFoundException('Recipe not found or unauthorized');
    }

    if (deleted.imagePublicId) {
      await this.cloudinaryService.deleteImage(deleted.imagePublicId);
    }

    return { message: 'Recipe deleted successfully' };
  }

  async getFavorites(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.recipeModel.find({ _id: { $in: user.favorites } }).exec();
  }

  async toggleFavorite(userId: string, recipeId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const recipe = await this.recipeModel.findById(recipeId).exec();
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    const recipeObjId = new Types.ObjectId(recipeId);
    const existingIndex = user.favorites.findIndex((favId) =>
      favId.equals(recipeObjId),
    );

    if (existingIndex > -1) {
      user.favorites.splice(existingIndex, 1);
    } else {
      user.favorites.push(recipeObjId);
    }

    await user.save();

    const isFavorite = user.favorites.some((favId) => favId.equals(recipeObjId));
    return {
      message: 'Favorite toggled successfully',
      isFavorite,
    };
  }
}

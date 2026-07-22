import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recipe, RecipeDocument } from './schemas/recipe.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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

  async create(userId: string, createRecipeDto: CreateRecipeDto, imagePath?: string) {
    const recipeData: Record<string, any> = {
      ...createRecipeDto,
      user: new Types.ObjectId(userId),
    };

    if (imagePath) {
      recipeData.image = imagePath;
    }

    const created = new this.recipeModel(recipeData);
    return created.save();
  }

  async update(userId: string, id: string, updateRecipeDto: UpdateRecipeDto, imagePath?: string) {
    const updateData: Record<string, any> = { ...updateRecipeDto };

    if (imagePath) {
      updateData.image = imagePath;
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

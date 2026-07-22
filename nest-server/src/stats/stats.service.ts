import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recipe, RecipeDocument } from '../recipes/schemas/recipe.schema';
import { MealPlan, MealPlanDocument } from '../meal-plans/schemas/meal-plan.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(MealPlan.name) private mealPlanModel: Model<MealPlanDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getDashboardStats(userId: string) {
    const recipesCount = await this.recipeModel.countDocuments({
      isPublic: true,
      isSystem: true,
    });

    const plansCount = await this.mealPlanModel.countDocuments({
      isPublic: true,
      isSystem: true,
    });

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const favoritesCount = user.favorites ? user.favorites.length : 0;

    return {
      success: true,
      data: {
        recipesCount,
        plansCount,
        favoritesCount,
      },
    };
  }
}

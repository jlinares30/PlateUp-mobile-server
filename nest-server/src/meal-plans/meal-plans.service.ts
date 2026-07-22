import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MealPlan, MealPlanDocument } from './schemas/meal-plan.schema';
import { CreateMealPlanDto, UpdateMealPlanDto, CloneMealPlanDto } from './dto/meal-plan.dto';

@Injectable()
export class MealPlansService {
  constructor(
    @InjectModel(MealPlan.name) private mealPlanModel: Model<MealPlanDocument>,
  ) {}

  private formatPlan(plan: any) {
    const p = plan.toObject ? plan.toObject() : plan;
    const userId = p.user?._id || p.user;

    return {
      ...p,
      owner: p.user,
      ownerId: String(userId),
      daysCount: p.days?.length || 0,
    };
  }

  async findAllPublic(userId: string) {
    const mealPlans = await this.mealPlanModel
      .find({
        user: { $ne: new Types.ObjectId(userId) },
        $or: [{ isSystem: true }, { isPublic: true }],
      })
      .populate('days.meals.recipe', 'title')
      .populate('user', 'name email _id')
      .sort({ createdAt: -1 })
      .exec();

    return { data: mealPlans.map((plan) => this.formatPlan(plan)) };
  }

  async findMy(userId: string) {
    const mealPlans = await this.mealPlanModel
      .find({ user: new Types.ObjectId(userId) })
      .populate('days.meals.recipe', 'title')
      .populate('user', 'name email _id')
      .sort({ createdAt: -1 })
      .exec();

    return { data: mealPlans.map((plan) => this.formatPlan(plan)) };
  }

  async findById(userId: string, id: string) {
    const mealPlan = await this.mealPlanModel
      .findOne({
        _id: new Types.ObjectId(id),
        $or: [
          { user: new Types.ObjectId(userId) },
          { isSystem: true },
          { isPublic: true },
        ],
      })
      .populate('days.meals.recipe', '_id title imageUrl')
      .populate('user', 'name email _id')
      .exec();

    if (!mealPlan) {
      throw new NotFoundException('Meal plan not found');
    }
    return this.formatPlan(mealPlan);
  }

  async create(userId: string, dto: CreateMealPlanDto, imagePath?: string) {
    const planData: Record<string, any> = {
      ...dto,
      user: new Types.ObjectId(userId),
    };

    if (imagePath) {
      planData.image = imagePath;
    }

    const newPlan = new this.mealPlanModel(planData);
    const savedPlan = await newPlan.save();

    await savedPlan.populate('days.meals.recipe', 'title');
    await savedPlan.populate('user', 'name email _id');

    return this.formatPlan(savedPlan);
  }

  async clone(userId: string, dto: CloneMealPlanDto) {
    const originalPlan = await this.mealPlanModel.findById(dto.id).exec();
    if (!originalPlan) {
      throw new NotFoundException('Plan not found');
    }

    const newPlan = new this.mealPlanModel({
      user: new Types.ObjectId(userId),
      title: originalPlan.title,
      description: originalPlan.description,
      days: originalPlan.days,
      isActive: true,
    });

    const savedPlan = await newPlan.save();
    const finalPlan = await this.mealPlanModel
      .findById(savedPlan._id)
      .populate('user', 'name email _id')
      .populate('days.meals.recipe', 'title')
      .exec();

    return { data: this.formatPlan(finalPlan) };
  }

  async update(userId: string, id: string, dto: UpdateMealPlanDto, imagePath?: string) {
    const updateData: Record<string, any> = { ...dto };

    if (imagePath) {
      updateData.image = imagePath;
    }

    const mealPlan = await this.mealPlanModel
      .findOneAndUpdate(
        { _id: new Types.ObjectId(id), user: new Types.ObjectId(userId) },
        updateData,
        { new: true },
      )
      .populate('user', 'name email _id')
      .populate('days.meals.recipe', 'title')
      .exec();

    if (!mealPlan) {
      throw new NotFoundException('Meal plan not found');
    }
    return this.formatPlan(mealPlan);
  }

  async remove(userId: string, id: string) {
    const mealPlan = await this.mealPlanModel
      .findOneAndDelete({
        _id: new Types.ObjectId(id),
        user: new Types.ObjectId(userId),
      })
      .exec();

    if (!mealPlan) {
      throw new NotFoundException('Meal plan not found');
    }
    return { message: 'Meal plan deleted successfully' };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ingredient, IngredientDocument } from './schemas/ingredient.schema';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>,
  ) {}

  async findAll(userId: string, query?: string) {
    const baseFilter = {
      $or: [
        { isSystem: true },
        { isPublic: true },
        { user: new Types.ObjectId(userId) },
      ],
    };

    const searchFilter = query
      ? { name: { $regex: query, $options: 'i' } }
      : {};

    const finalFilter = { ...baseFilter, ...searchFilter };
    return this.ingredientModel.find(finalFilter).exec();
  }

  async findById(id: string) {
    const ingredient = await this.ingredientModel.findById(id).exec();
    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }
    return ingredient;
  }

  async create(userId: string, createIngredientDto: CreateIngredientDto, imagePath?: string) {
    const ingredientData: Record<string, any> = {
      ...createIngredientDto,
      user: new Types.ObjectId(userId),
    };

    if (imagePath) {
      ingredientData.image = imagePath;
    }

    const created = new this.ingredientModel(ingredientData);
    return created.save();
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto, imagePath?: string) {
    const updateData: Record<string, any> = { ...updateIngredientDto };

    if (imagePath) {
      updateData.image = imagePath;
    }

    const updated = await this.ingredientModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Ingredient not found');
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.ingredientModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Ingredient not found');
    }
    return { message: 'Ingredient deleted successfully' };
  }
}

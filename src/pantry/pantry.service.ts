import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, StockLevel } from '../users/schemas/user.schema';
import { AddToPantryDto, UpdatePantryItemDto } from './dto/pantry.dto';

@Injectable()
export class PantryService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getPantry(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('pantry.ingredient')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.pantry;
  }

  async addToPantry(userId: string, dto: AddToPantryDto) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ingredientObjId = new Types.ObjectId(dto.ingredientId);
    const existingIndex = user.pantry.findIndex((item) =>
      item.ingredient && item.ingredient.equals(ingredientObjId),
    );

    if (existingIndex > -1) {
      if (dto.stockLevel) {
        user.pantry[existingIndex].stockLevel = dto.stockLevel;
      }
      if (dto.unit) {
        user.pantry[existingIndex].unit = dto.unit;
      }
    } else {
      user.pantry.push({
        ingredient: ingredientObjId,
        unit: dto.unit,
        stockLevel: dto.stockLevel || StockLevel.FULL,
      });
    }

    await user.save();

    const updatedUser = await this.userModel
      .findById(userId)
      .populate('pantry.ingredient')
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser.pantry;
  }

  async updatePantryItem(userId: string, itemId: string, dto: UpdatePantryItemDto) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const itemObjId = new Types.ObjectId(itemId);
    const item = (user.pantry as any).id(itemObjId);
    if (!item) {
      throw new NotFoundException('Item not found in pantry');
    }

    if (dto.stockLevel !== undefined) {
      item.stockLevel = dto.stockLevel;
    }
    if (dto.unit !== undefined) {
      item.unit = dto.unit;
    }

    await user.save();

    const updatedUser = await this.userModel
      .findById(userId)
      .populate('pantry.ingredient')
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser.pantry;
  }

  async removeFromPantry(userId: string, itemId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const itemObjId = new Types.ObjectId(itemId);
    (user.pantry as any).pull(itemObjId);
    await user.save();

    return { message: 'Item removed from pantry', pantry: user.pantry };
  }
}

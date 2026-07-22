import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { AddToShoppingListItemDto, UpdateShoppingListItemDto } from './dto/shopping-list.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getShoppingList(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('shoppingList.ingredient')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.shoppingList;
  }

  async addToShoppingList(
    userId: string,
    body: AddToShoppingListItemDto | AddToShoppingListItemDto[],
  ) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const itemsToAdd = Array.isArray(body) ? body : [body];

    for (const item of itemsToAdd) {
      const { ingredientId, quantity, unit, checked, recipeTitle } = item;
      const ingredientObjId = new Types.ObjectId(ingredientId);

      const existingIndex = user.shoppingList.findIndex(
        (existing) =>
          existing.ingredient &&
          existing.ingredient.equals(ingredientObjId) &&
          existing.unit === unit,
      );

      if (existingIndex > -1) {
        user.shoppingList[existingIndex].quantity =
          (user.shoppingList[existingIndex].quantity || 0) + Number(quantity);

        if (recipeTitle) {
          user.shoppingList[existingIndex].contributors.push({
            recipeTitle,
            quantity: Number(quantity),
            unit,
          });
        }
      } else {
        const newItem: any = {
          ingredient: ingredientObjId,
          quantity: Number(quantity),
          unit,
          checked: !!checked,
          contributors: [],
        };

        if (recipeTitle) {
          newItem.contributors.push({
            recipeTitle,
            quantity: Number(quantity),
            unit,
          });
        }

        user.shoppingList.push(newItem);
      }
    }

    await user.save();

    const updatedUser = await this.userModel
      .findById(userId)
      .populate('shoppingList.ingredient')
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser.shoppingList;
  }

  async updateShoppingListItem(
    userId: string,
    itemId: string,
    dto: UpdateShoppingListItemDto,
  ) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const itemObjId = new Types.ObjectId(itemId);
    const item = (user.shoppingList as any).id(itemObjId);
    if (!item) {
      throw new NotFoundException('Item not found in shopping list');
    }

    if (dto.quantity !== undefined) item.quantity = dto.quantity;
    if (dto.unit !== undefined) item.unit = dto.unit;
    if (dto.checked !== undefined) item.checked = dto.checked;

    await user.save();

    const updatedUser = await this.userModel
      .findById(userId)
      .populate('shoppingList.ingredient')
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser.shoppingList;
  }

  async removeFromShoppingList(userId: string, itemId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const itemObjId = new Types.ObjectId(itemId);
    (user.shoppingList as any).pull(itemObjId);
    await user.save();

    return {
      message: 'Item removed from shopping list',
      shoppingList: user.shoppingList,
    };
  }

  async clearShoppingList(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.shoppingList = [];
    await user.save();

    return { message: 'Shopping list cleared', shoppingList: [] };
  }
}

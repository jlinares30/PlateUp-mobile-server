import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ingredient, IngredientDocument } from './schemas/ingredient.schema';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(userId: string, query?: string, category?: string, tag?: string) {
    const baseFilter = {
      $or: [
        { isSystem: true },
        { isPublic: true },
        { user: new Types.ObjectId(userId) },
      ],
    };

    const filters: any[] = [baseFilter];

    if (query && query.trim()) {
      filters.push({ name: { $regex: query.trim(), $options: 'i' } });
    }

    if (category && category.trim() && category.trim().toLowerCase() !== 'all') {
      filters.push({ category: { $regex: `^${category.trim()}$`, $options: 'i' } });
    }

    if (tag && tag.trim()) {
      filters.push({ tags: { $regex: tag.trim(), $options: 'i' } });
    }

    const finalFilter = filters.length > 1 ? { $and: filters } : baseFilter;
    return this.ingredientModel.find(finalFilter).exec();
  }

  async findById(id: string) {
    const ingredient = await this.ingredientModel.findById(id).exec();
    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }
    return ingredient;
  }

  async create(userId: string, createIngredientDto: CreateIngredientDto, imageFile?: Express.Multer.File) {
    const ingredientData: Record<string, any> = {
      ...createIngredientDto,
      user: new Types.ObjectId(userId),
    };

    if (imageFile) {
      const uploaded = await this.cloudinaryService.uploadImage(imageFile, 'ingredients');
      ingredientData.image = uploaded.url;
      ingredientData.imagePublicId = uploaded.publicId;
    }

    const created = new this.ingredientModel(ingredientData);
    return created.save();
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto, imageFile?: Express.Multer.File) {
    const updateData: Record<string, any> = { ...updateIngredientDto };

    if (imageFile) {
      const uploaded = await this.cloudinaryService.uploadImage(imageFile, 'ingredients');
      updateData.image = uploaded.url;
      updateData.imagePublicId = uploaded.publicId;

      const oldIngredient = await this.ingredientModel.findById(id).exec();
      if (oldIngredient && oldIngredient.imagePublicId) {
        await this.cloudinaryService.deleteImage(oldIngredient.imagePublicId);
      }
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

    if (deleted.imagePublicId) {
      await this.cloudinaryService.deleteImage(deleted.imagePublicId);
    }

    return { message: 'Ingredient deleted successfully' };
  }
}

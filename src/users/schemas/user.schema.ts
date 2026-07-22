import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum StockLevel {
  FULL = 'FULL',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  OUT = 'OUT',
}

@Schema()
export class PantryItem {
  @Prop({ type: Types.ObjectId, ref: 'Ingredient' })
  ingredient: Types.ObjectId;

  @Prop()
  unit?: string;

  @Prop({ type: String, enum: StockLevel, default: StockLevel.FULL })
  stockLevel: StockLevel;
}

const PantryItemSchema = SchemaFactory.createForClass(PantryItem);

@Schema()
export class Contributor {
  @Prop()
  recipeTitle?: string;

  @Prop()
  quantity?: number;

  @Prop()
  unit?: string;
}

const ContributorSchema = SchemaFactory.createForClass(Contributor);

@Schema()
export class ShoppingListItem {
  @Prop({ type: Types.ObjectId, ref: 'Ingredient' })
  ingredient: Types.ObjectId;

  @Prop()
  quantity?: number;

  @Prop()
  unit?: string;

  @Prop({ default: false })
  checked: boolean;

  @Prop({ type: [ContributorSchema], default: [] })
  contributors: Contributor[];
}

const ShoppingListItemSchema = SchemaFactory.createForClass(ShoppingListItem);

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  image?: string;

  @Prop()
  imagePublicId?: string;

  @Prop({ type: [PantryItemSchema], default: [] })
  pantry: PantryItem[];

  @Prop({ type: [ShoppingListItemSchema], default: [] })
  shoppingList: ShoppingListItem[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Recipe' }], default: [] })
  favorites: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

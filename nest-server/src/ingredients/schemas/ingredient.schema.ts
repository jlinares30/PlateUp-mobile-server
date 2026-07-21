import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type IngredientDocument = Ingredient & Document;

@Schema()
export class Macros {
  @Prop()
  protein?: number;

  @Prop()
  carbs?: number;

  @Prop()
  fat?: number;

  @Prop()
  fiber?: number;
}

const MacrosSchema = SchemaFactory.createForClass(Macros);

@Schema({ timestamps: true })
export class Ingredient {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  category?: string;

  @Prop()
  unit?: string;

  @Prop()
  image?: string;

  @Prop()
  imagePublicId?: string;

  @Prop()
  calories?: number;

  @Prop({ type: MacrosSchema })
  macros?: Macros;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ default: false })
  isSystem: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);

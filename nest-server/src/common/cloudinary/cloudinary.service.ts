import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as fs from 'fs';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ url: string; publicId: string }> {
    if (!file || !file.path) {
      throw new Error('Archivo inválido para subida');
    }

    try {
      this.logger.log(`🚀 Subiendo a Cloudinary (${folder}): ${file.path}`);
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        file.path,
        {
          upload_preset: 'meal_plans_app',
          folder: `meal-plan-app/${folder}`,
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 35 },
            { fetch_format: 'auto' },
          ],
        },
      );

      this.logger.log(`✅ Subida exitosa: ${result.secure_url}`);

      // Eliminar archivo temporal local
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      this.logger.error(`❌ Error subiendo a Cloudinary: ${error.message}`);
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw error;
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    if (!publicId) return;
    try {
      await cloudinary.uploader.destroy(publicId);
      this.logger.log(`🗑️ Imagen eliminada de Cloudinary: ${publicId}`);
    } catch (error) {
      this.logger.error(`Error al borrar imagen de Cloudinary: ${error.message}`);
    }
  }
}

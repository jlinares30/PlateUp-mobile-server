import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'usuario@ejemplo.com', description: 'Correo electrónico único del usuario' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6, description: 'Contraseña de la cuenta' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;
}

export class LoginDto {
  @ApiProperty({ example: 'usuario@ejemplo.com', description: 'Correo electrónico registrado' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Juan Carlos Pérez', description: 'Nuevo nombre' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'nuevo_correo@ejemplo.com', description: 'Nuevo email' })
  @IsOptional()
  @IsEmail({}, { message: 'Formato de email inválido' })
  email?: string;

  @ApiPropertyOptional({ example: 'nuevaPassword123', minLength: 6, description: 'Nueva contraseña' })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'usuario@ejemplo.com', description: 'Email de la cuenta a restablecer' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty({ example: 'miNuevaPassword123', minLength: 6, description: 'Nueva contraseña' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La nueva contraseña es requerida' })
  newPassword: string;
}

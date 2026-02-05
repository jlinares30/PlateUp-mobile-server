import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajusta la ruta para subir un nivel (de /scripts a /backend)
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import mongoose from 'mongoose';
import Ingredient from '../models/Ingredient.js';

const ingredientsWithMacros = [
    {
        "name": "Cacao en polvo",
        "calories": 228,
        "macros": { "protein": 19.6, "carbs": 57.9, "fat": 13.7, "fiber": 33.2 },
        "tags": ["vegano", "sin gluten", "repostería", "superfood"]
    },
    {
        "name": "Frejoles",
        "calories": 333,
        "macros": { "protein": 23.6, "carbs": 60.8, "fat": 0.8, "fiber": 15.5 },
        "tags": ["legumbre", "vegano", "proteína vegetal", "fibra"]
    },
    {
        "name": "Pan integral",
        "calories": 247,
        "macros": { "protein": 13, "carbs": 41, "fat": 3.4, "fiber": 7 },
        "tags": ["cereal", "desayuno", "fibra"]
    },
    {
        "name": "Pasta",
        "calories": 158,
        "macros": { "protein": 5.8, "carbs": 30.9, "fat": 0.9, "fiber": 1.8 },
        "tags": ["carbohidrato", "almuerzo", "italiana"]
    },
    {
        "name": "Quinua",
        "calories": 120,
        "macros": { "protein": 4.4, "carbs": 21.3, "fat": 1.9, "fiber": 2.8 },
        "tags": ["pseudocereal", "vegano", "sin gluten", "peruano"]
    },
    {
        "name": "Mantequilla de maní",
        "calories": 588,
        "macros": { "protein": 25, "carbs": 20, "fat": 50, "fiber": 6 },
        "tags": ["grasa saludable", "proteína vegetal", "desayuno", "vegano"]
    },
    {
        "name": "Cúrcuma",
        "calories": 312,
        "macros": { "protein": 9.7, "carbs": 67.1, "fat": 3.3, "fiber": 22.7 },
        "tags": ["especia", "antiinflamatorio", "vegano"]
    },
    {
        "name": "Choclo",
        "calories": 86,
        "macros": { "protein": 3.2, "carbs": 19, "fat": 1.2, "fiber": 2.7 },
        "tags": ["cereal", "peruano", "guarnición", "vegano"]
    },
    {
        "name": "Culantro",
        "calories": 23,
        "macros": { "protein": 2.1, "carbs": 3.7, "fat": 0.5, "fiber": 2.8 },
        "tags": ["hierba", "fresco", "aromatizante", "vegano"]
    },
    {
        "name": "Canela",
        "calories": 247,
        "macros": { "protein": 4, "carbs": 80.6, "fat": 1.2, "fiber": 53.1 },
        "tags": ["especia", "repostería", "desayuno"]
    },
    {
        "name": "Beterraga",
        "calories": 43,
        "macros": { "protein": 1.6, "carbs": 10, "fat": 0.2, "fiber": 2.8 },
        "tags": ["verdura", "ensalada", "vegano", "hierro"]
    },
    {
        "name": "Kion",
        "calories": 80,
        "macros": { "protein": 1.8, "carbs": 17.8, "fat": 0.8, "fiber": 2 },
        "tags": ["raíz", "especia", "asiático", "medicinal"]
    },
    {
        "name": "Zapallo",
        "calories": 26,
        "macros": { "protein": 1, "carbs": 6.5, "fat": 0.1, "fiber": 0.5 },
        "tags": ["verdura", "sopa", "bajo en calorías", "vegano"]
    },
    {
        "name": "Aceituna morada",
        "calories": 115,
        "macros": { "protein": 0.8, "carbs": 6.3, "fat": 10.7, "fiber": 3.2 },
        "tags": ["grasa saludable", "snack", "aperitivo"]
    },
    {
        "name": "Rabanito",
        "calories": 16,
        "macros": { "protein": 0.7, "carbs": 3.4, "fat": 0.1, "fiber": 1.6 },
        "tags": ["verdura", "ensalada", "bajo en calorías", "crunchy"]
    },
    {
        "name": "Camote",
        "calories": 86,
        "macros": { "protein": 1.6, "carbs": 20.1, "fat": 0.1, "fiber": 3 },
        "tags": ["tubérculo", "carbohidrato complejo", "peruano", "vegano"]
    },
    {
        "name": "Habas",
        "calories": 88,
        "macros": { "protein": 7.9, "carbs": 17.6, "fat": 0.7, "fiber": 7.5 },
        "tags": ["legumbre", "proteína vegetal", "serrano", "vegano"]
    },
    {
        "name": "Ají Amarillo",
        "calories": 40,
        "macros": { "protein": 2, "carbs": 9, "fat": 0.5, "fiber": 3 },
        "tags": ["picante", "peruano", "base", "vegano"]
    },
    {
        "name": "Cebolla China",
        "calories": 32,
        "macros": { "protein": 1.8, "carbs": 7.3, "fat": 0.2, "fiber": 2.6 },
        "tags": ["verdura", "chifa", "aromatizante"]
    },
    {
        "name": "Vainita",
        "calories": 31,
        "macros": { "protein": 1.8, "carbs": 7, "fat": 0.1, "fiber": 2.7 },
        "tags": ["verdura", "guarnición", "bajo en calorías"]
    },
    {
        "name": "Leche Entera",
        "calories": 61,
        "macros": { "protein": 3.2, "carbs": 4.8, "fat": 3.3, "fiber": 0 },
        "tags": ["lácteo", "calcio", "bebida"]
    },
    {
        "name": "Aceituna verde",
        "calories": 145,
        "macros": { "protein": 1, "carbs": 3.8, "fat": 15, "fiber": 3.3 },
        "tags": ["grasa saludable", "aperitivo", "mediterráneo"]
    },
    {
        "name": "Arverja",
        "calories": 81,
        "macros": { "protein": 5.4, "carbs": 14.5, "fat": 0.4, "fiber": 5.1 },
        "tags": ["verdura", "legumbre", "guarnición"]
    },
    {
        "name": "Olluco",
        "calories": 62,
        "macros": { "protein": 1.1, "carbs": 14.3, "fat": 0.1, "fiber": 0.8 },
        "tags": ["tubérculo", "peruano", "andino"]
    },
    {
        "name": "Queso Parmezano",
        "calories": 431,
        "macros": { "protein": 38, "carbs": 4.1, "fat": 29, "fiber": 0 },
        "tags": ["lácteo", "proteína", "alto en sodio", "italiano"]
    },
    {
        "name": "Mandarina",
        "calories": 53,
        "macros": { "protein": 0.8, "carbs": 13.3, "fat": 0.3, "fiber": 1.8 },
        "tags": ["fruta", "cítrico", "vitamina c", "snack"]
    },
    {
        "name": "Pallares",
        "calories": 338,
        "macros": { "protein": 21, "carbs": 63, "fat": 0.7, "fiber": 19 },
        "tags": ["legumbre", "vegano", "proteína vegetal", "peruano"]
    },
    {
        "name": "Queso Pasteurizado",
        "calories": 264,
        "macros": { "protein": 18, "carbs": 2.2, "fat": 20, "fiber": 0 },
        "tags": ["lácteo", "proteína", "desayuno"]
    },
    {
        "name": "Carne de Cerdo",
        "calories": 242,
        "macros": { "protein": 27, "carbs": 0, "fat": 14, "fiber": 0 },
        "tags": ["proteína animal", "almuerzo"]
    },
    {
        "name": "Mango",
        "calories": 60,
        "macros": { "protein": 0.8, "carbs": 15, "fat": 0.4, "fiber": 1.6 },
        "tags": ["fruta", "dulce", "tropical", "vitamina a"]
    },
    {
        "name": "Arándano",
        "calories": 57,
        "macros": { "protein": 0.7, "carbs": 14.5, "fat": 0.3, "fiber": 2.4 },
        "tags": ["fruta", "antioxidante", "bajo en calorías", "superfood"]
    },
    {
        "name": "Arverjita verde",
        "calories": 341,
        "macros": { "protein": 24, "carbs": 60, "fat": 1.2, "fiber": 25 },
        "tags": ["menestra", "vegano", "proteína vegetal"]
    },
    {
        "name": "Ciruela",
        "calories": 46,
        "macros": { "protein": 0.7, "carbs": 11.4, "fat": 0.3, "fiber": 1.4 },
        "tags": ["fruta", "digestivo", "snack"]
    },
    {
        "name": "Melón",
        "calories": 34,
        "macros": { "protein": 0.8, "carbs": 8.2, "fat": 0.2, "fiber": 0.9 },
        "tags": ["fruta", "hidratante", "bajo en calorías"]
    },
    {
        "name": "7 Semillas",
        "calories": 380,
        "macros": { "protein": 12, "carbs": 65, "fat": 6, "fiber": 8 },
        "tags": ["mezcla", "desayuno", "peruano", "energético"]
    },
    {
        "name": "Sandia",
        "calories": 30,
        "macros": { "protein": 0.6, "carbs": 7.6, "fat": 0.2, "fiber": 0.4 },
        "tags": ["fruta", "hidratante", "verano"]
    },
    {
        "name": "Mantequilla de Almendras",
        "calories": 614,
        "macros": { "protein": 21, "carbs": 19, "fat": 55, "fiber": 10 },
        "tags": ["grasa saludable", "proteína vegetal", "vegano"]
    },
    {
        "name": "Pasas Negras",
        "calories": 299,
        "macros": { "protein": 3.1, "carbs": 79, "fat": 0.5, "fiber": 3.7 },
        "tags": ["fruto seco", "energía", "repostería"]
    },
    {
        "name": "Pasas Rubias",
        "calories": 302,
        "macros": { "protein": 3.4, "carbs": 80, "fat": 0.4, "fiber": 4 },
        "tags": ["fruto seco", "energía", "dulce"]
    },
    {
        "name": "Chía",
        "calories": 486,
        "macros": { "protein": 16.5, "carbs": 42.1, "fat": 30.7, "fiber": 34.4 },
        "tags": ["superfood", "omega 3", "fibra", "vegano"]
    },
    {
        "name": "Manzanilla",
        "calories": 1,
        "macros": { "protein": 0, "carbs": 0.2, "fat": 0, "fiber": 0 },
        "tags": ["infusión", "relajante", "sin calorías"]
    },
    {
        "name": "Durazno",
        "calories": 39,
        "macros": { "protein": 0.9, "carbs": 9.5, "fat": 0.3, "fiber": 1.5 },
        "tags": ["fruta", "dulce", "vitamina a"]
    },
    {
        "name": "Lucuma en Polvo",
        "calories": 329,
        "macros": { "protein": 4, "carbs": 77, "fat": 0.5, "fiber": 2.3 },
        "tags": ["fruta", "peruano", "repostería", "superfood"]
    },
    {
        "name": "Té Verde",
        "calories": 1,
        "macros": { "protein": 0.2, "carbs": 0, "fat": 0, "fiber": 0 },
        "tags": ["infusión", "antioxidante", "estimulante"]
    },
    {
        "name": "Uva",
        "calories": 69,
        "macros": { "protein": 0.7, "carbs": 18, "fat": 0.2, "fiber": 0.9 },
        "tags": ["fruta", "antioxidante", "dulce"]
    },
    {
        "name": "Papaya",
        "calories": 43,
        "macros": { "protein": 0.5, "carbs": 10.8, "fat": 0.3, "fiber": 1.7 },
        "tags": ["fruta", "digestivo", "desayuno"]
    },
    {
        "name": "Yogurt Bebible",
        "calories": 75,
        "macros": { "protein": 3, "carbs": 12, "fat": 1.5, "fiber": 0 },
        "tags": ["lácteo", "probiótico", "snack"]
    },
    {
        "name": "Maíz Morado",
        "calories": 350,
        "macros": { "protein": 7.5, "carbs": 74, "fat": 3.5, "fiber": 6 },
        "tags": ["antocianinas", "peruano", "bebida", "superfood"]
    },
    {
        "name": "Galletas de soda",
        "calories": 421,
        "macros": { "protein": 8.5, "carbs": 71, "fat": 11, "fiber": 2.5 },
        "tags": ["carbohidrato", "snack", "acompañamiento"]
    },
    {
        "name": "Tostadas Integrales",
        "calories": 385,
        "macros": { "protein": 12, "carbs": 70, "fat": 5, "fiber": 9 },
        "tags": ["carbohidrato", "desayuno", "fibra"]
    },
    {
        "name": "Escencia de Vainilla",
        "calories": 288,
        "macros": { "protein": 0.1, "carbs": 12.7, "fat": 0.1, "fiber": 0 },
        "tags": ["aromatizante", "repostería"]
    },
    {
        "name": "Sillao",
        "calories": 53,
        "macros": { "protein": 8, "carbs": 4.9, "fat": 0.6, "fiber": 0.8 },
        "tags": ["salsa", "asiático", "alto en sodio"]
    },
    {
        "name": "Cereal Granola",
        "calories": 471,
        "macros": { "protein": 10, "carbs": 64, "fat": 20, "fiber": 5 },
        "tags": ["cereal", "desayuno", "crunchy"]
    },
    {
        "name": "Cereal Cornflakes",
        "calories": 357,
        "macros": { "protein": 8, "carbs": 84, "fat": 0.4, "fiber": 3 },
        "tags": ["cereal", "desayuno", "carbohidrato"]
    },
    {
        "name": "Ajonjolí",
        "calories": 573,
        "macros": { "protein": 17.7, "carbs": 23.4, "fat": 49.7, "fiber": 11.8 },
        "tags": ["semilla", "calcio", "grasa saludable"]
    },
    {
        "name": "Yogurt Griego",
        "calories": 59,
        "macros": { "protein": 10, "carbs": 3.6, "fat": 0.4, "fiber": 0 },
        "tags": ["lácteo", "proteína", "desayuno", "fitness"]
    },
    {
        "name": "Piña",
        "calories": 50,
        "macros": { "protein": 0.5, "carbs": 13.1, "fat": 0.1, "fiber": 1.4 },
        "tags": ["fruta", "diurético", "vitamina c"]
    },
    {
        "name": "Mantequilla",
        "calories": 717,
        "macros": { "protein": 0.9, "carbs": 0.1, "fat": 81, "fiber": 0 },
        "tags": ["grasa animal", "cocina", "sabor"]
    },
    {
        "name": "Rocoto",
        "calories": 40,
        "macros": { "protein": 1.9, "carbs": 8.8, "fat": 0.4, "fiber": 1.5 },
        "tags": ["picante", "peruano", "verdura"]
    },
    {
        "name": "Pisco",
        "calories": 210,
        "macros": { "protein": 0, "carbs": 0, "fat": 0, "fiber": 0 },
        "tags": ["alcohol", "peruano", "cóctel"]
    },
    {
        "name": "Albahaca",
        "calories": 23,
        "macros": { "protein": 3.1, "carbs": 2.7, "fat": 0.6, "fiber": 1.6 },
        "tags": ["hierba", "italiana", "aromatizante"]
    },
    {
        "name": "Amargo de Angostura",
        "calories": 1,
        "macros": { "protein": 0, "carbs": 0.1, "fat": 0, "fiber": 0 },
        "tags": ["cóctel", "bar", "aromatizante"]
    },
    {
        "name": "Jarabe de Goma",
        "calories": 280,
        "macros": { "protein": 0, "carbs": 70, "fat": 0, "fiber": 0 },
        "tags": ["endulzante", "cóctel", "bar"]
    },
    {
        "name": "Hielo",
        "calories": 0,
        "macros": { "protein": 0, "carbs": 0, "fat": 0, "fiber": 0 },
        "tags": ["base", "bebidas"]
    },
    {
        "name": "Coco Rallado",
        "calories": 660,
        "macros": { "protein": 6.9, "carbs": 23.7, "fat": 64.5, "fiber": 16.3 },
        "tags": ["grasa saludable", "vegano", "repostería"]
    },
    {
        "name": "Tomate",
        "calories": 18,
        "macros": { "protein": 0.9, "carbs": 3.9, "fat": 0.2, "fiber": 1.2 },
        "tags": ["verdura", "fresco", "ensalada", "vitamina c", "vegano"]
    },
    {
        "name": "Cebolla",
        "calories": 40,
        "macros": { "protein": 1.1, "carbs": 9.3, "fat": 0.1, "fiber": 1.7 },
        "tags": ["verdura", "base", "aromatizante", "vegano"]
    },
    {
        "name": "Pollo",
        "calories": 165,
        "macros": { "protein": 31, "carbs": 0, "fat": 3.6, "fiber": 0 },
        "tags": ["proteína animal", "ave", "fitness", "bajo en grasa"]
    },
    {
        "name": "Arroz",
        "calories": 130,
        "macros": { "protein": 2.7, "carbs": 28, "fat": 0.3, "fiber": 0.4 },
        "tags": ["cereal", "carbohidrato", "guarnición", "sin gluten"]
    },
    {
        "name": "Aceite de oliva",
        "calories": 884,
        "macros": { "protein": 0, "carbs": 0, "fat": 100, "fiber": 0 },
        "tags": ["grasa saludable", "mediterráneo", "omega 9", "vegano"]
    },
    {
        "name": "Papa Amarilla",
        "calories": 103,
        "macros": { "protein": 2.1, "carbs": 24, "fat": 0.1, "fiber": 2.1 },
        "tags": ["tubérculo", "peruano", "cremoso", "carbohidrato complejo"]
    },
    {
        "name": "Ajo",
        "calories": 149,
        "macros": { "protein": 6.4, "carbs": 33, "fat": 0.5, "fiber": 2.1 },
        "tags": ["verdura", "saborizante", "antiinflamatorio", "vegano"]
    },
    {
        "name": "Papa Blanca",
        "calories": 77,
        "macros": { "protein": 2, "carbs": 17, "fat": 0.1, "fiber": 2.2 },
        "tags": ["tubérculo", "guarnición", "carbohidrato complejo", "vegano"]
    },
    {
        "name": "Zanahoria",
        "calories": 41,
        "macros": { "protein": 0.9, "carbs": 9.6, "fat": 0.2, "fiber": 2.8 },
        "tags": ["verdura", "vitamina a", "fresco", "vegano"]
    },
    {
        "name": "Pimentón",
        "calories": 20,
        "macros": { "protein": 0.9, "carbs": 4.6, "fat": 0.2, "fiber": 1.7 },
        "tags": ["verdura", "vitamina c", "fresco", "vegano"]
    },
    {
        "name": "Lechuga",
        "calories": 15,
        "macros": { "protein": 1.4, "carbs": 2.9, "fat": 0.2, "fiber": 1.3 },
        "tags": ["verdura", "hoja verde", "bajo en calorías", "ensalada", "vegano"]
    },
    {
        "name": "Espinaca",
        "calories": 23,
        "macros": { "protein": 2.9, "carbs": 3.6, "fat": 0.4, "fiber": 2.2 },
        "tags": ["verdura", "hoja verde", "hierro", "superfood", "vegano"]
    },
    {
        "name": "Pepino",
        "calories": 15,
        "macros": { "protein": 0.7, "carbs": 3.6, "fat": 0.1, "fiber": 0.5 },
        "tags": ["verdura", "hidratante", "ensalada", "bajo en calorías", "vegano"]
    },
    {
        "name": "Palta",
        "calories": 160,
        "macros": { "protein": 2, "carbs": 8.5, "fat": 14.7, "fiber": 6.7 },
        "tags": ["fruta", "grasa saludable", "keto", "cremoso", "vegano"]
    },
    {
        "name": "Limón",
        "calories": 29,
        "macros": { "protein": 1.1, "carbs": 9, "fat": 0.3, "fiber": 2.8 },
        "tags": ["fruta", "cítrico", "vitamina c", "aderezo", "vegano"]
    },
    {
        "name": "Plátano",
        "calories": 89,
        "macros": { "protein": 1.1, "carbs": 22.8, "fat": 0.3, "fiber": 2.6 },
        "tags": ["fruta", "potasio", "energía", "dulce", "vegano"]
    },
    {
        "name": "Naranja",
        "calories": 47,
        "macros": { "protein": 0.9, "carbs": 11.8, "fat": 0.1, "fiber": 2.4 },
        "tags": ["fruta", "cítrico", "vitamina c", "jugo", "vegano"]
    },
    {
        "name": "Fresa",
        "calories": 32,
        "macros": { "protein": 0.7, "carbs": 7.7, "fat": 0.3, "fiber": 2 },
        "tags": ["fruta", "antioxidante", "bajo en calorías", "rojo", "vegano"]
    },
    {
        "name": "Huevo",
        "calories": 155,
        "macros": { "protein": 13, "carbs": 1.1, "fat": 11, "fiber": 0 },
        "tags": ["proteína animal", "desayuno", "keto", "omnívoro"]
    },
    {
        "name": "Manzana",
        "calories": 52,
        "macros": { "protein": 0.3, "carbs": 13.8, "fat": 0.2, "fiber": 2.4 },
        "tags": ["fruta", "fibra", "snack", "vegano"]
    },
    {
        "name": "Atún",
        "calories": 132,
        "macros": { "protein": 28, "carbs": 0, "fat": 1.3, "fiber": 0 },
        "tags": ["proteína animal", "pescado", "omega 3", "fitness"]
    },
    {
        "name": "Lentejas",
        "calories": 116,
        "macros": { "protein": 9, "carbs": 20, "fat": 0.4, "fiber": 7.9 },
        "tags": ["legumbre", "proteína vegetal", "hierro", "vegano"]
    },
    {
        "name": "Avena",
        "calories": 389,
        "macros": { "protein": 16.9, "carbs": 66.3, "fat": 6.9, "fiber": 10.6 },
        "tags": ["cereal", "fibra", "desayuno", "energía lenta", "vegano"]
    },
    {
        "name": "Yogurt natural",
        "calories": 59,
        "macros": { "protein": 3.5, "carbs": 4.7, "fat": 3.3, "fiber": 0 },
        "tags": ["lácteo", "probiótico", "calcio", "desayuno"]
    },
    {
        "name": "Salsa de tomate",
        "calories": 29,
        "macros": { "protein": 1.3, "carbs": 6.5, "fat": 0.2, "fiber": 1.9 },
        "tags": ["condimento", "base", "cocina italiana"]
    },
    {
        "name": "Perejil",
        "calories": 36,
        "macros": { "protein": 3, "carbs": 6.3, "fat": 0.8, "fiber": 3.3 },
        "tags": ["verdura", "hierba", "fresco", "decorativo", "vegano"]
    },
    {
        "name": "Apio",
        "calories": 16,
        "macros": { "protein": 0.7, "carbs": 3, "fat": 0.2, "fiber": 1.6 },
        "tags": ["verdura", "diurético", "bajo en calorías", "crunchy", "vegano"]
    },
    {
        "name": "Brócoli",
        "calories": 34,
        "macros": { "protein": 2.8, "carbs": 6.6, "fat": 0.4, "fiber": 2.6 },
        "tags": ["verdura", "vitamina c", "fibra", "saludable", "vegano"]
    },
    {
        "name": "Avena instantánea",
        "calories": 379,
        "macros": { "protein": 13.2, "carbs": 67.7, "fat": 6.5, "fiber": 10.1 },
        "tags": ["cereal", "rápido", "desayuno", "carbohidrato", "vegano"]
    },
    {
        "name": "Tofu",
        "calories": 76,
        "macros": { "protein": 8, "carbs": 1.9, "fat": 4.8, "fiber": 0.3 },
        "tags": ["proteína vegetal", "soya", "vegano", "keto"]
    },
    {
        "name": "Aceite vegetal",
        "calories": 884,
        "macros": { "protein": 0, "carbs": 0, "fat": 100, "fiber": 0 },
        "tags": ["grasa", "cocina", "base", "vegano"]
    },
    {
        "name": "Pescado",
        "calories": 91,
        "macros": { "protein": 19, "carbs": 0, "fat": 1.2, "fiber": 0 },
        "tags": ["proteína animal", "marino", "fresco", "bajo en grasa"]
    },
    {
        "name": "Queso fresco",
        "calories": 299,
        "macros": { "protein": 18, "carbs": 3.5, "fat": 24, "fiber": 0 },
        "tags": ["lácteo", "peruano", "proteína", "cremoso"]
    },
    {
        "name": "Sal",
        "calories": 0,
        "macros": { "protein": 0, "carbs": 0, "fat": 0, "fiber": 0 },
        "tags": ["condimento", "mineral", "esencial", "vegano"]
    },
    {
        "name": "Pimienta",
        "calories": 251,
        "macros": { "protein": 10, "carbs": 64, "fat": 3, "fiber": 25 },
        "tags": ["condimento", "especia", "sabor", "vegano"]
    },
    {
        "name": "Orégano",
        "calories": 265,
        "macros": { "protein": 9, "carbs": 69, "fat": 4, "fiber": 43 },
        "tags": ["condimento", "hierba seca", "aromático", "vegano"]
    },
    {
        "name": "Comino",
        "calories": 375,
        "macros": { "protein": 18, "carbs": 44, "fat": 22, "fiber": 10 },
        "tags": ["condimento", "especia", "peruano", "aromático", "vegano"]
    },
    {
        "name": "Salsa de soya",
        "calories": 53,
        "macros": { "protein": 8, "carbs": 4.9, "fat": 0.6, "fiber": 0.8 },
        "tags": ["condimento", "asiático", "salado", "umami"]
    },
    {
        "name": "Vinagre",
        "calories": 18,
        "macros": { "protein": 0, "carbs": 0, "fat": 0, "fiber": 0 },
        "tags": ["condimento", "ácido", "conservante", "vegano"]
    },
    {
        "name": "Harina de trigo",
        "calories": 364,
        "macros": { "protein": 10, "carbs": 76, "fat": 1, "fiber": 2.7 },
        "tags": ["cereal", "repostería", "base", "carbohidrato"]
    },
    {
        "name": "Miel",
        "calories": 304,
        "macros": { "protein": 0.3, "carbs": 82, "fat": 0, "fiber": 0 },
        "tags": ["endulzante", "natural", "energía", "antiséptico"]
    },
    {
        "name": "Agua",
        "calories": 0,
        "macros": { "protein": 0, "carbs": 0, "fat": 0, "fiber": 0 },
        "tags": ["líquido", "vital", "hidratación", "vegano"]
    },
    {
        "name": "Maíz",
        "calories": 365,
        "macros": { "protein": 9, "carbs": 74, "fat": 4.7, "fiber": 7 },
        "tags": ["cereal", "energía", "guarnición", "vegano"]
    },
    {
        "name": "Champiñones",
        "calories": 22,
        "macros": { "protein": 3.1, "carbs": 3.3, "fat": 0.3, "fiber": 1 },
        "tags": ["verdura", "hongo", "bajo en calorías", "umami", "vegano"]
    },
    {
        "name": "Carne de res",
        "calories": 250,
        "macros": { "protein": 26, "carbs": 0, "fat": 15, "fiber": 0 },
        "tags": ["proteína animal", "hierro", "almuerzo", "roja"]
    },
    {
        "name": "Garbanzo",
        "calories": 364,
        "macros": { "protein": 19, "carbs": 61, "fat": 6, "fiber": 17 },
        "tags": ["legumbre", "proteína vegetal", "vegano", "fibra"]
    },
    {
        "name": "Leche Evaporada",
        "calories": 131,
        "macros": { "protein": 6.8, "carbs": 9.1, "fat": 7.6, "fiber": 0 },
        "tags": ["lácteo", "peruano", "calcio", "concentrado"]
    },
    {
        "name": "Azúcar",
        "calories": 387,
        "macros": { "protein": 0, "carbs": 100, "fat": 0, "fiber": 0 },
        "tags": ["endulzante", "energía rápida", "repostería"]
    },
    {
        "name": "Calabacín",
        "calories": 17,
        "macros": { "protein": 1.2, "carbs": 3.1, "fat": 0.3, "fiber": 1 },
        "tags": ["verdura", "bajo en calorías", "fresco", "vegano"]
    }
]

async function updateNutrition() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            dbName: "miapp",
        });
        console.log("🚀 Conectado. Iniciando actualización de macros...");

        let updatedCount = 0;

        for (const data of ingredientsWithMacros) {
            const result = await Ingredient.updateOne(
                { name: data.name },
                {
                    $set: {
                        calories: data.calories,
                        macros: data.macros,
                        tags: data.tags,
                        isPublic: true,
                        isSystem: true
                    }
                }
            );

            if (result.matchedCount > 0) {
                updatedCount++;
            }
        }

        console.log(`✅ Se actualizaron los macros de ${updatedCount} ingredientes.`);
        console.log("⚠️ Los links de Cloudinary permanecieron intactos.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

updateNutrition();
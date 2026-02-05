import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajusta la ruta para subir un nivel (de /scripts a /backend)
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import mongoose from 'mongoose';
import Recipe from '../models/Recipe.js'; 

// const recipesToInsert = [
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Lomo Saltado al Wok",
//     "description": "El emblema de la gastronomía peruana. Un salteado jugoso de lomo de res con cebollas, tomates y ají amarillo, fusionando técnicas chinas con sabor criollo.",
//     "category": "Lunch",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 400, "unit": "g" },
//       { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "68d4024a12d1f69e8cf26f83", "quantity": 2, "unit": "unidad" },
//       { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d4d", "quantity": 30, "unit": "ml" },
//       { "ingredient": "6900350f40f67b5e56d90d4e", "quantity": 15, "unit": "ml" }
//     ],
//     "steps": [
//       "Corta la carne en cubos o tiras gruesas y sazona con sal y pimienta.",
//       "En un wok o sartén muy caliente con aceite, sella la carne por tandas hasta que esté dorada y reserva.",
//       "En el mismo aceite, saltea la cebolla y el ají amarillo por 1 minuto hasta que la cebolla esté traslúcida pero crujiente.",
//       "Agrega el tomate y la carne sellada; vierte el vinagre y el sillao (salsa de soya) por los bordes para generar vapor.",
//       "Saltea todo por 30 segundos más y espolvorea perejil picado.",
//       "Sirve inmediatamente acompañado de papas fritas crocantes y arroz blanco graneado."
//     ],
//     "time": "25 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Criollo", "Salteado", "Gourmet"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Ají de Gallina Tradicional",
//     "description": "Una crema sedosa y reconfortante a base de ají amarillo peruano, nueces y pan, servida con pechuga de pollo deshilachada.",
//     "category": "Lunch",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 500, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 4, "unit": "unidad" },
//       { "ingredient": "6900350f40f67b5e56d90d46", "quantity": 100, "unit": "ml" },
//       { "ingredient": "6900458d40f67b5e56d90dad", "quantity": 6, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" }
//     ],
//     "steps": [
//       "Sancocha la pechuga de pollo en agua con sal. Una vez cocida, deja enfriar y deshilacha en hebras finas.",
//       "Limpia los ajíes amarillos quitando venas y pepas; blanquéalos en agua hirviendo y licúalos con un chorrito de caldo hasta obtener una pasta.",
//       "Remoja las galletas o pan en la leche evaporada y licúa hasta formar una mezcla homogénea.",
//       "En una olla, prepara un aderezo con cebolla picada fina y ajo. Añade la pasta de ají y sofríe hasta que el aceite se separe.",
//       "Incorpora la mezcla de galletas y leche. Remueve constantemente a fuego bajo hasta que espese y tome punto.",
//       "Agrega el pollo deshilachado, ajusta la sal y sirve sobre rodajas de papa blanca cocida, decorando con huevo duro y aceitunas."
//     ],
//     "time": "45 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Crema", "Pollo", "Clásico"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Seco de Pollo con Lentejas",
//     "description": "Guiso aromático de pollo en una salsa espesa de culantro y cerveza, servido con el clásico acompañamiento de lentejas caseras.",
//     "category": "Lunch",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 500, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d5b", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d3d", "quantity": 200, "unit": "g" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 150, "unit": "g" },
//       { "ingredient": "690044b240f67b5e56d90d77", "quantity": 50, "unit": "g" }
//     ],
//     "steps": [
//       "Licúa el culantro con un poco de agua o cerveza negra hasta que sea una pasta fina.",
//       "Sazona las presas de pollo y dóralas en una olla con aceite caliente; retira y reserva.",
//       "En la misma olla, haz un aderezo con cebolla, ajo y ají amarillo. Añade el culantro licuado y sofríe por 5 minutos.",
//       "Regresa el pollo a la olla, añade arvejas y zanahoria picada. Tapa y cocina a fuego medio por 20 minutos.",
//       "Mientras tanto, cocina las lentejas previamente remojadas con un trozo de tocino o aderezo de ajo.",
//       "Sirve el seco bien jugoso junto a las lentejas y arroz blanco."
//     ],
//     "time": "50 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Guiso", "Nutritivo", "Almuerzo"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Overnight Oats de Papaya y Chía",
//     "description": "Un desayuno inteligente que se prepara la noche anterior. Alto en fibra y probióticos para empezar el día con energía.",
//     "category": "Breakfast",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d40", "quantity": 60, "unit": "g" },
//       { "ingredient": "6900458d40f67b5e56d90daa", "quantity": 100, "unit": "g" },
//       { "ingredient": "690044ce40f67b5e56d90d87", "quantity": 80, "unit": "g" },
//       { "ingredient": "690044ce40f67b5e56d90d8b", "quantity": 10, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 15, "unit": "ml" }
//     ],
//     "steps": [
//       "En un frasco de vidrio, mezcla la avena con el yogurt griego y las semillas de chía.",
//       "Si la mezcla queda muy espesa, añade un chorrito de agua o leche para hidratar.",
//       "Añade la miel e integra bien todos los elementos.",
//       "Coloca la papaya picada en cubitos en la parte superior y cierra el frasco.",
//       "Refrigera por al menos 6 horas o toda la noche.",
//       "Al día siguiente, mezcla antes de comer para que la avena esté cremosa."
//     ],
//     "time": "10 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Healthy", "Breakfast", "MealPrep", "Fibra"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Causa de Pollo Limeña",
//     "description": "Capas de puré de papa amarilla cítrico rellenas de pollo deshilachado con mayonesa y palta cremosa.",
//     "category": "Snack",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68fadd8f435e724a89ed83f0", "quantity": 600, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 3, "unit": "unidad" },
//       { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 200, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd7", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 3, "unit": "unidad" }
//     ],
//     "steps": [
//       "Sancocha las papas amarillas y prénsalas mientras están calientes hasta que no tengan grumos. Deja enfriar.",
//       "Mezcla la papa con pasta de ají amarillo, jugo de limón, aceite y sal. Amasa hasta que sea moldeable.",
//       "Mezcla el pollo sancochado y deshilachado con mayonesa y un toque de sal.",
//       "En un molde, coloca una base de papa, luego láminas de palta y encima la mezcla de pollo.",
//       "Cubre con otra capa de papa y presiona ligeramente.",
//       "Decora con huevo duro, aceituna y sirve frío como entrada."
//     ],
//     "time": "40 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Entrada", "Frío", "Estético"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Bowl de Quinua Proteico",
//     "description": "Una cena equilibrada que combina el superalimento andino con atún y vegetales frescos.",
//     "category": "Dinner",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d43", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d3c", "quantity": 120, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd7", "quantity": 0.5, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cd6", "quantity": 50, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Lava bien la quinua y sancóchala en agua con sal por 12-15 minutos hasta que el grano reviente. Escurre y enfría.",
//       "En un bowl grande, coloca la quinua como base.",
//       "Añade el atún escurrido, pepino picado en cuadritos y láminas de palta.",
//       "Prepara un aliño simple con limón, aceite de oliva y una pizca de pimienta.",
//       "Mezcla suavemente para no deshacer la palta y sirve de inmediato."
//     ],
//     "time": "20 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Superfood", "Fitness", "Ligero", "Cena"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Tallarines Verdes con Bistec",
//     "description": "Pasta al dente envuelta en una cremosa salsa de albahaca, espinaca y queso fresco, acompañada de un jugoso bistec de res.",
//     "category": "Lunch",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d42", "quantity": 200, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd5", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900461140f67b5e56d90db5", "quantity": 50, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d47", "quantity": 100, "unit": "g" }
//     ],
//     "steps": [
//       "Sancochar la pasta en abundante agua con sal hasta que esté al dente.",
//       "Pasa las hojas de espinaca y albahaca por agua hirviendo un segundo (blanqueado) y luego por agua fría.",
//       "Licúa las hojas con el queso fresco, leche evaporada y un toque de sal hasta obtener una crema espesa y verde brillante.",
//       "Sazona el bistec con ajo, sal y pimienta; fríelo en una sartén caliente al término deseado.",
//       "Mezcla la pasta caliente con la salsa verde. Si está muy espesa, añade un poco del agua de la pasta.",
//       "Sirve los tallarines con el bistec encima y queso parmesano si deseas."
//     ],
//     "time": "30 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Pasta", "Fusión", "Clásico"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Aguadito de Pollo Reconfortante",
//     "description": "Sopa espesa y vibrante de pollo, arroz y culantro, conocida como el remedio perfecto para el frío o después de una fiesta.",
//     "category": "Dinner",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 300, "unit": "g" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 80, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d5b", "quantity": 80, "unit": "g" },
//       { "ingredient": "690044b240f67b5e56d90d77", "quantity": 50, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Limpia el pollo y córtalo en presas pequeñas.",
//       "Licúa el culantro con un poco de caldo o agua.",
//       "En una olla grande, sofríe cebolla, ajo y ají amarillo. Añade el culantro licuado y cocina por unos minutos.",
//       "Agrega el pollo, el arroz, zanahoria picada y arvejas. Cubre con abundante caldo o agua.",
//       "Cocina a fuego medio hasta que el arroz esté bien cocido y el caldo haya espesado ligeramente.",
//       "Sirve muy caliente con un chorrito de limón al gusto."
//     ],
//     "time": "40 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Sopa", "Peruano", "Invierno", "Tradicional"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Ensalada de Atún y Garbanzos",
//     "description": "Almuerzo mediterráneo ultra rápido. Una explosión de textura y frescura ideal para días con poco tiempo.",
//     "category": "Lunch",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3c", "quantity": 170, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d3f", "quantity": 200, "unit": "g" },
//       { "ingredient": "68d4024a12d1f69e8cf26f83", "quantity": 2, "unit": "unidad" },
//       { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.5, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Enjuaga y escurre bien los garbanzos cocidos.",
//       "Pica el tomate y la cebolla en cuadritos pequeños (brunoise).",
//       "En un tazón grande, mezcla los garbanzos con los vegetales y el atún escurrido.",
//       "Aliña con el jugo del limón, sal, pimienta y un generoso chorro de aceite de oliva.",
//       "Mezcla bien y deja reposar 5 minutos para que los sabores se integren antes de servir."
//     ],
//     "time": "10 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Proteína", "Legumbres", "Sin Cocción", "Rápido"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Pancakes de Avena y Plátano",
//     "description": "Desayuno saludable, sin harinas procesadas ni azúcares añadidos. Dulce, esponjoso y nutritivo.",
//     "category": "Breakfast",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d40", "quantity": 80, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd9", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" },
//       { "ingredient": "6900458d40f67b5e56d90db1", "quantity": 5, "unit": "ml" },
//       { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 10, "unit": "ml" }
//     ],
//     "steps": [
//       "En un bowl, aplasta el plátano maduro con un tenedor hasta obtener un puré suave.",
//       "Agrega los dos huevos y bate vigorosamente.",
//       "Incorpora la avena y la esencia de vainilla; mezcla hasta tener una masa uniforme.",
//       "Calienta una sartén antiadherente con una gota de aceite. Vierte porciones pequeñas de masa.",
//       "Cuando veas burbujas en la superficie, dales la vuelta y cocina 1 minuto más.",
//       "Sirve caliente con un hilo de miel y frutas frescas encima."
//     ],
//     "time": "15 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Fit", "Desayuno", "Sin Harinas", "Energía"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Olluquito con Carne de Res",
//     "description": "Un clásico de la sierra peruana. El olluco, un tubérculo andino de textura única, se guisa lentamente con carne y ají panca para crear un plato nutritivo y lleno de historia.",
//     "category": "Lunch",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "690044b240f67b5e56d90d7b", "quantity": 500, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 250, "unit": "g" },
//       { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 150, "unit": "g" }
//     ],
//     "steps": [
//       "Lava bien el olluco y pícalo en tiras muy finas (estilo juliana). Déjalo escurrir.",
//       "Pica la carne de res en trozos pequeños y sazona con sal y pimienta.",
//       "En una olla con aceite caliente, prepara un aderezo con cebolla picada fina, ajo y pasta de ají panca (o amarillo).",
//       "Agrega la carne y dórala ligeramente. Luego, incorpora el olluco picado.",
//       "Tapa la olla y deja cocinar a fuego lento. El olluco soltará su propio jugo, no suele ser necesario añadir agua.",
//       "Cuando el olluco esté tierno, añade perejil picado y sirve acompañado de una porción de arroz blanco bien graneado."
//     ],
//     "time": "40 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Andino", "Saludable", "Tradicional"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Arroz con Pollo a la Limeña",
//     "description": "Arroz verde aromático gracias al culantro fresco, cocido con presas de pollo, arvejas y zanahorias. El alma de las reuniones familiares en Perú.",
//     "category": "Lunch",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 500, "unit": "g" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 300, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d5b", "quantity": 100, "unit": "g" },
//       { "ingredient": "690044b240f67b5e56d90d77", "quantity": 50, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Sazona las presas de pollo y séllalas en una olla grande con aceite caliente hasta que doren. Retira y reserva.",
//       "En la misma olla, sofríe cebolla y ajo picado. Añade el culantro licuado y cocina por 5 minutos hasta que el aroma sea intenso.",
//       "Vierte el caldo de pollo (o agua) y regresa las presas a la olla para que terminen de cocerse. Retíralas cuando estén listas.",
//       "Agrega el arroz lavado, las arvejas y la zanahoria picada en cubitos. Ajusta la sal.",
//       "Cocina a fuego medio-bajo hasta que el arroz absorba el líquido y esté graneado.",
//       "Sirve el arroz verde con la presa encima y acompaña con una ensalada criolla de cebolla."
//     ],
//     "time": "50 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Criollo", "Pollo", "Clásico"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Estofado de Pollo de la Abuela",
//     "description": "Guiso casero de pollo con base de tomate y zanahoria. Un plato reconfortante, jugoso y perfecto para acompañar con papas blancas.",
//     "category": "Lunch",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 500, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d54", "quantity": 100, "unit": "ml" },
//       { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 150, "unit": "g" }
//     ],
//     "steps": [
//       "Salpimenta las presas de pollo y dóralas en una olla. Retira y reserva.",
//       "Prepara un aderezo con cebolla, ajo y un toque de pasta de tomate. Sofríe hasta que esté concentrado.",
//       "Agrega la zanahoria cortada en rodajas y las papas cortadas en mitades o cuartos.",
//       "Regresa el pollo a la olla y añade un chorrito de vino tinto o caldo. Tapa y deja cocinar a fuego lento por 25 minutos.",
//       "Asegúrate de que el pollo esté tierno y la salsa haya tomado cuerpo.",
//       "Sirve acompañado de arroz blanco, bañando todo con el jugo del estofado."
//     ],
//     "time": "45 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Casero", "Peruano", "Comfort Food"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Bowl de Avena, Manzana y Canela",
//     "description": "Desayuno tibio y saciante. La combinación clásica de manzana y canela en una base cremosa de avena para mañanas productivas.",
//     "category": "Breakfast",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d40", "quantity": 50, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cda", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900350f40f67b5e56d90d5e", "quantity": 2, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 10, "unit": "ml" },
//       { "ingredient": "6900350f40f67b5e56d90d52", "quantity": 250, "unit": "ml" }
//     ],
//     "steps": [
//       "Coloca el agua o leche en una olla pequeña y lleva a ebullición.",
//       "Agrega la avena y baja el fuego. Remueve constantemente para que no se pegue.",
//       "Pica la manzana en cubos pequeños y agrégala a la olla junto con la canela en polvo.",
//       "Cocina por unos 5-8 minutos hasta que la avena esté cremosa y la manzana se haya suavizado ligeramente.",
//       "Sirve en un tazón y endulza con un hilo de miel al gusto.",
//       "Opcional: Añade unos frutos secos para darle un toque crocante."
//     ],
//     "time": "12 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Healthy", "Desayuno", "Fibra", "Tibio"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Tofu Salteado con Brócoli y Kion",
//     "description": "Una opción vegana llena de sabor oriental. El tofu dorado absorbe los aromas del jengibre fresco y la salsa de soya.",
//     "category": "Dinner",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d62", "quantity": 250, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d59", "quantity": 200, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d6d", "quantity": 10, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d4d", "quantity": 20, "unit": "ml" },
//       { "ingredient": "6900350f40f67b5e56d90d64", "quantity": 15, "unit": "ml" }
//     ],
//     "steps": [
//       "Presiona el tofu con papel absorbente para quitarle el exceso de agua y córtalo en cubos.",
//       "Calienta aceite en una sartén y dora el tofu por todos sus lados hasta que esté crocante. Retira.",
//       "En la misma sartén, agrega el kion (jengibre) picado finamente y el brócoli cortado en ramilletes pequeños.",
//       "Saltea el brócoli a fuego alto por 3-4 minutos (puedes añadir una cucharada de agua para generar vapor).",
//       "Regresa el tofu a la sartén y vierte la salsa de soya.",
//       "Mezcla todo por un minuto más para que los sabores se integren y sirve caliente."
//     ],
//     "time": "15 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Vegano", "Cena", "Proteína Vegetal", "AsianStyle"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Lentejitas Caseras con Pescado Frito",
//     "description": "El clásico plato de los lunes en Perú. Lentejas cremosas con un aderezo rico en hierro, acompañadas de pescado fresco dorado.",
//     "category": "Lunch",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3d", "quantity": 200, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 200, "unit": "g" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 150, "unit": "g" },
//       { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.5, "unit": "unidad" },
//       { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 2, "unit": "diente" }
//     ],
//     "steps": [
//       "Lava las lentejas y cocínalas en agua con una hoja de laurel hasta que estén suaves.",
//       "Aparte, prepara un aderezo con cebolla picada y ajo. Agrega una pizca de ají panca si deseas color.",
//       "Vierte el aderezo sobre las lentejas cocidas y deja que den un hervor para que espesen.",
//       "Sazona los filetes de pescado con sal, pimienta y pásalos ligeramente por harina.",
//       "Fríe el pescado en aceite caliente hasta que esté dorado y crocante por fuera.",
//       "Sirve las lentejas con arroz blanco y el pescado frito, idealmente con una salsa criolla."
//     ],
//     "time": "35 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Hierro", "Legumbres", "Económico"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Tostadas con Palta y Huevo Escalfado",
//     "description": "El 'Avocado Toast' elevado. Pan integral tostado con palta cremosa y un huevo de yema líquida que baña todo el plato.",
//     "category": "Breakfast",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d41", "quantity": 2, "unit": "rebanada" },
//       { "ingredient": "6900313c40f67b5e56d90cd7", "quantity": 0.5, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900350f40f67b5e56d90d48", "quantity": 2, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 0.5, "unit": "unidad" }
//     ],
//     "steps": [
//       "Tosta las rebanadas de pan hasta que estén firmes y doradas.",
//       "En un bowl pequeño, machaca la palta con unas gotas de limón y una pizca de sal.",
//       "Para el huevo escalfado: hierve agua con un chorrito de vinagre, crea un remolino y vierte el huevo con cuidado. Cocina por 3 minutos.",
//       "Unta generosamente la palta sobre las tostadas.",
//       "Coloca el huevo escalfado encima con cuidado.",
//       "Termina con una pizca de pimienta o chili flakes para un toque picante."
//     ],
//     "time": "10 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Desayuno", "Healthy", "Grasas Saludables", "Gourmet"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Batido Energético de Fresa y Avena",
//     "description": "Rápido, refrescante y saciante. La solución ideal para desayunos apresurados antes de ir a entrenar o trabajar.",
//     "category": "Breakfast",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900313c40f67b5e56d90cdc", "quantity": 6, "unit": "unidad" },
//       { "ingredient": "6900350f40f67b5e56d90d40", "quantity": 30, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d73", "quantity": 250, "unit": "ml" },
//       { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 10, "unit": "ml" }
//     ],
//     "steps": [
//       "Lava bien las fresas y retira las hojas verdes.",
//       "Coloca las fresas en la licuadora junto con la avena cruda.",
//       "Vierte la leche (entera o vegetal) y añade la miel o endulzante de tu preferencia.",
//       "Licúa a velocidad máxima hasta que la avena esté completamente integrada y no queden grumos.",
//       "Sirve en un vaso alto con hielo si prefieres una textura tipo frappé.",
//       "Consumir de inmediato para aprovechar todos los nutrientes."
//     ],
//     "time": "5 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Bebida", "Rápido", "Fitness", "Desayuno"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Pescado al Horno con Verduras Mediterráneas",
//     "description": "Cena ligera y sofisticada. El pescado se hornea con calabacín y tomate, resaltando los sabores naturales con aceite de oliva y limón.",
//     "category": "Dinner",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 250, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d5a", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "68d4024a12d1f69e8cf26f83", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "68d4029412d1f69e8cf26f91", "quantity": 20, "unit": "ml" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Precalienta el horno a 180°C.",
//       "Corta el calabacín y el tomate en rodajas delgadas.",
//       "En una bandeja para horno, haz una cama con las verduras y coloca el filete de pescado encima.",
//       "Baña todo con jugo de limón y aceite de oliva. Sazona con sal y hierbas aromáticas (romero o tomillo).",
//       "Hornea por unos 15-20 minutos dependiendo del grosor del pescado.",
//       "Sirve directamente de la bandeja para conservar todos los jugos de la cocción."
//     ],
//     "time": "25 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Saludable", "Cena", "Bajo en Carbohidratos", "Omega3"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Hummus de Garbanzo Clásico",
//     "description": "Dip sedoso de garbanzos, ideal como snack saludable o acompañamiento. Una receta milenaria rica en proteína vegetal.",
//     "category": "Snack",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3f", "quantity": 250, "unit": "g" },
//       { "ingredient": "68d4029412d1f69e8cf26f91", "quantity": 40, "unit": "ml" },
//       { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 1, "unit": "diente" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Escurre los garbanzos cocidos (puedes pelarlos para una textura extra fina).",
//       "Coloca los garbanzos en una procesadora o licuadora junto con el ajo y el jugo de limón.",
//       "Procesa mientras añades el aceite de oliva en forma de hilo hasta obtener una crema pastosa.",
//       "Si está muy espeso, añade una cucharada de agua fría o del caldo de cocción de los garbanzos.",
//       "Ajusta la sal y sirve en un tazón.",
//       "Decora con un chorrito de aceite de oliva y pimentón en polvo por encima."
//     ],
//     "time": "10 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Vegano", "Snack", "Proteína Vegetal", "Dip"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Arroz Chaufa de Pollo Casero",
//     "description": "La perfecta fusión peruano-china. Arroz salteado a fuego alto con trozos de pollo jugosos, tortilla de huevo y el aroma inconfundible del aceite de ajonjolí.",
//     "category": "Lunch",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 300, "unit": "g" },
//       { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 250, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d70", "quantity": 40, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d4d", "quantity": 30, "unit": "ml" },
//       { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" }
//     ],
//     "steps": [
//       "Prepara una tortilla con los dos huevos, pícala en cuadritos y reserva.",
//       "Corta el pollo en cubos pequeños, sazona con una pizca de sal y saltéalo en un wok con aceite muy caliente hasta que dore.",
//       "Agrega el arroz cocido (preferiblemente del día anterior) al wok y mezcla con el pollo a fuego alto.",
//       "Vierte el sillao (salsa de soya) y mezcla vigorosamente para que el arroz tome un color uniforme y se ahúme ligeramente.",
//       "Incorpora la tortilla picada y la cebolla china picada (solo la parte verde).",
//       "Termina con unas gotas de aceite de ajonjolí, saltea un último segundo y sirve bien caliente."
//     ],
//     "time": "15 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Chifa", "Peruano", "Rápido", "Salteado"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Ensalada de Frutas con Yogurt Griego",
//     "description": "Un desayuno o snack vibrante y refrescante. Papaya, manzana y plátano bañados en yogurt griego cremoso, aportando vitaminas y probióticos en cada bocado.",
//     "category": "Breakfast",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900313c40f67b5e56d90cd9", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cda", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "690044ce40f67b5e56d90d87", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900458d40f67b5e56d90daa", "quantity": 120, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 10, "unit": "ml" }
//     ],
//     "steps": [
//       "Pela y pica la papaya en cubos medianos.",
//       "Corta la manzana y el plátano en rodajas o trozos pequeños (puedes mojar la manzana con unas gotas de limón para que no se oxide).",
//       "En un tazón o bowl de cristal, mezcla suavemente todas las frutas.",
//       "Vierte el yogurt griego en el centro de las frutas.",
//       "Decora con un hilo de miel de abeja por encima.",
//       "Sirve frío para una experiencia más refrescante."
//     ],
//     "time": "10 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Saludable", "Frutas", "VitaminaC", "Fresco"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Pasta Penne con Atún y Tomate",
//     "description": "La receta salvavidas para días ocupados. Una salsa de tomate rápida con atún de conserva que convierte una pasta simple en un banquete nutritivo.",
//     "category": "Dinner",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d42", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d3c", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d54", "quantity": 80, "unit": "ml" },
//       { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.5, "unit": "unidad" },
//       { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 1, "unit": "diente" }
//     ],
//     "steps": [
//       "Cocina la pasta en agua hirviendo con sal siguiendo las instrucciones del paquete hasta que esté al dente.",
//       "Mientras tanto, en una sartén con un poco de aceite, sofríe la cebolla y el ajo picados finamente.",
//       "Añade la salsa de tomate y deja que hierva suavemente por 3 minutos.",
//       "Incorpora el atún (escurrido) a la salsa, desmenuzándolo un poco con una cuchara.",
//       "Drena la pasta y mézclala directamente en la sartén con la salsa de atún.",
//       "Opcional: Agrega una pizca de orégano seco y sirve caliente."
//     ],
//     "time": "15 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Pasta", "Rápido", "Económico", "Cena"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Chilcano de Pisco Clásico",
//     "description": "El cóctel más refrescante del Perú. Una mezcla equilibrada de Pisco, limón y Ginger Ale, ideal para abrir el apetito o compartir entre amigos.",
//     "category": "Snack",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900461140f67b5e56d90db8", "quantity": 60, "unit": "ml" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900461140f67b5e56d90dbb", "quantity": 4, "unit": "cubos" },
//       { "ingredient": "6900461140f67b5e56d90dba", "quantity": 2, "unit": "gotas" }
//     ],
//     "steps": [
//       "En un vaso largo (highball), coloca los cubos de hielo hasta llenarlo.",
//       "Vierte el Pisco (se recomienda la variedad Quebranta por su sabor neutro).",
//       "Añade el jugo de medio limón recién exprimido.",
//       "Completa el vaso con Ginger Ale frío (aproximadamente 150ml).",
//       "Agrega las gotas de amargo de angostura en la parte superior.",
//       "Remueve suavemente con una cuchara larga y decora con una rodaja de limón."
//     ],
//     "time": "5 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Bebida", "Cóctel", "Refresh"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Solterito de Queso Arequipeño",
//     "description": "Una ensalada fresca y colorida originaria de Arequipa. Combina habas tiernas, choclo desgranado y queso fresco en una vinagreta cítrica.",
//     "category": "Snack",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d47", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d6e", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "68d4024a12d1f69e8cf26f83", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900444040f67b5e56d90d75", "quantity": 4, "unit": "unidad" }
//     ],
//     "steps": [
//       "Sancocha las habas y el choclo desgranado en agua hirviendo con una pizca de azúcar y sal. Escurre y deja enfriar.",
//       "Corta el queso fresco y el tomate (sin semillas) en cubos pequeños de 1 cm.",
//       "Pica la aceituna en rodajas y la cebolla en cuadritos pequeños.",
//       "En un recipiente amplio, mezcla todos los ingredientes sancochados y picados.",
//       "Aliña con abundante jugo de limón, un chorro de aceite de oliva, sal y pimienta.",
//       "Añade perejil picado finamente y sirve como entrada o snack saludable."
//     ],
//     "time": "20 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Andino", "Saludable", "Vegetariano"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Arroz con Leche Cremoso",
//     "description": "El postre tradicional por excelencia. Arroz cocido lentamente en leche con aromas de canela y clavo, logrando una textura melosa e irresistible.",
//     "category": "Snack",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d73", "quantity": 500, "unit": "ml" },
//       { "ingredient": "6900350f40f67b5e56d90d5e", "quantity": 5, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 40, "unit": "ml" },
//       { "ingredient": "6900350f40f67b5e56d90d52", "quantity": 300, "unit": "ml" }
//     ],
//     "steps": [
//       "En una olla, cocina el arroz con el agua, una rama de canela y clavo de olor hasta que el agua se consuma casi por completo y el arroz esté muy tierno.",
//       "Vierte la leche entera (o evaporada) y remueve constantemente a fuego medio-bajo.",
//       "Añade la miel o azúcar y continúa removiendo para evitar que se pegue al fondo de la olla.",
//       "Cocina hasta que la mezcla tome una consistencia cremosa y el arroz haya absorbido parte de la leche.",
//       "Retira del fuego y quita la rama de canela.",
//       "Sirve en pocillos individuales y espolvorea canela molida por encima. Se puede comer tibio o frío."
//     ],
//     "time": "40 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Dulce", "Tradicional", "Postre"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Solomillo de Pollo con Brócoli al Vapor",
//     "description": "La cena definitiva para el fitness. Proteína magra sazonada a las finas hierbas con brócoli al dente, manteniendo todos sus nutrientes intactos.",
//     "category": "Lunch",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 200, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d59", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900350f40f67b5e56d90d43", "quantity": 60, "unit": "g" },
//       { "ingredient": "68d4029412d1f69e8cf26f91", "quantity": 10, "unit": "ml" }
//     ],
//     "steps": [
//       "Sazona la pechuga de pollo con sal, pimienta y un poco de orégano.",
//       "En una sartén con poco aceite (o plancha), cocina el pollo por ambos lados hasta que esté dorado y cocido por dentro.",
//       "Corta el brócoli en ramilletes y la zanahoria en bastones. Cocínalos al vapor por 5-7 minutos para que queden crocantes.",
//       "Sancocha la quinua en agua con sal hasta que reviente el grano.",
//       "Sirve el pollo acompañado de los vegetales al vapor y una porción de quinua.",
//       "Baña los vegetales con un hilo de aceite de oliva virgen extra."
//     ],
//     "time": "20 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Fitness", "Saludable", "Proteína", "BajoEnCalorías"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Garbanzos Estofados con Espinaca",
//     "description": "Un guiso vegano potente y reconfortante. Los garbanzos se fusionan con un sofrito de ajo y espinacas frescas en un plato rico en hierro.",
//     "category": "Lunch",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3f", "quantity": 250, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd5", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 2, "unit": "diente" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 80, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Remoja los garbanzos desde la noche anterior y cocínalos hasta que estén suaves.",
//       "Prepara un aderezo en una olla con aceite, ajo picado, cebolla y una cucharadita de ají amarillo.",
//       "Añade los garbanzos cocidos con un poco de su caldo y deja hervir por 5 minutos para que tomen sabor.",
//       "Lava bien las hojas de espinaca y córtalas en tiras anchas.",
//       "Apaga el fuego e incorpora la espinaca a los garbanzos; el calor residual la cocinará manteniendo su color verde.",
//       "Sirve con una porción de arroz blanco o solo como un potaje espeso."
//     ],
//     "time": "35 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Vegano", "Hierro", "Saludable", "Legumbres"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Chupe de Pescado Nutritivo",
//     "description": "Sopa espesa y nutritiva que es una comida completa en sí misma. Con trozos de pescado, zapallo, maíz y un toque de leche.",
//     "category": "Dinner",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 250, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d71", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900350f40f67b5e56d90d46", "quantity": 50, "unit": "ml" },
//       { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Hacer un aderezo básico de cebolla, ajo y ají panca en una olla.",
//       "Agregar el zapallo cortado en cubos, el choclo en rodajas y caldo de pescado o agua.",
//       "Cocinar hasta que los vegetales estén tiernos.",
//       "Añadir el pescado cortado en cubos grandes y cocinar por solo 5 minutos para que no se deshaga.",
//       "Incorporar la leche evaporada y apagar el fuego.",
//       "Servir con un huevo escalfado encima y espolvorear orégano o huacatay picado."
//     ],
//     "time": "30 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Sopa", "Peruano", "Pescado", "Reconfortante"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Pescado al Vapor estilo Oriental",
//     "description": "Una técnica de cocción milenaria que mantiene el pescado jugoso. El kion y la cebolla china aportan un aroma fresco y equilibrado.",
//     "category": "Dinner",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 200, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d6d", "quantity": 15, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d70", "quantity": 20, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d4d", "quantity": 15, "unit": "ml" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 80, "unit": "g" }
//     ],
//     "steps": [
//       "Prepara una vaporera o un colador sobre una olla con agua hirviendo.",
//       "Coloca el filete de pescado en un plato que quepa en la vaporera.",
//       "Cubre el pescado con láminas muy finas de kion (jengibre) y la parte blanca de la cebolla china.",
//       "Tapa y cocina al vapor por 10 a 12 minutos (el tiempo depende del grosor del filete).",
//       "Retira con cuidado y vierte encima la salsa de soya y unas gotas de aceite caliente para resaltar los aromas.",
//       "Decora con la parte verde de la cebolla china en tiras y sirve con arroz blanco."
//     ],
//     "time": "15 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Saludable", "TécnicaVapor", "Asiático", "Ligero"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Ensalada de Lentejas y Palta",
//     "description": "Una forma refrescante y moderna de consumir legumbres. Esta ensalada fría combina la textura firme de las lentejas con la cremosidad de la palta, ideal para un almuerzo ligero pero saciante.",
//     "category": "Lunch",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3d", "quantity": 150, "unit": "g" },
//       { "ingredient": "68d4024a12d1f69e8cf26f83", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.5, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cd7", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Cocina las lentejas en agua con una pizca de sal hasta que estén tiernas pero firmes (al dente). Escurre y deja enfriar completamente.",
//       "Corta el tomate y la cebolla en cubos pequeños (estilo concassé).",
//       "Pela la palta y córtala en cubos medianos, rociándola con un poco de limón para evitar la oxidación.",
//       "En un bowl grande, combina las lentejas frías con el tomate, la cebolla y la palta.",
//       "Aliña con jugo de limón, un chorrito de aceite de oliva, sal y pimienta al gusto.",
//       "Mezcla con cuidado para no deshacer la palta y sirve como plato principal o guarnición."
//     ],
//     "time": "15 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Saludable", "Vegano", "ProteínaVegetal", "Fresco"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Manzana con Mantequilla de Maní y Chía",
//     "description": "El snack energético por excelencia para deportistas o estudiantes. Combina carbohidratos de absorción lenta, grasas saludables y el toque crujiente de las semillas de chía.",
//     "category": "Snack",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900313c40f67b5e56d90cda", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900350f40f67b5e56d90d44", "quantity": 30, "unit": "g" },
//       { "ingredient": "690044ce40f67b5e56d90d8b", "quantity": 5, "unit": "g" }
//     ],
//     "steps": [
//       "Lava bien la manzana y córtala en gajos o rodajas circulares (puedes quitar el corazón si prefieres).",
//       "Asegúrate de que la mantequilla de maní sea natural (sin azúcar añadida) para una opción más saludable.",
//       "Unta una capa generosa de mantequilla de maní sobre cada trozo de manzana.",
//       "Espolvorea las semillas de chía por encima para añadir fibra y omega-3.",
//       "Sirve inmediatamente para disfrutar de la combinación de texturas entre lo crujiente y lo cremoso."
//     ],
//     "time": "5 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Energía", "Rápido", "Fitness", "SinCocción"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Té Verde Antioxidante con Limón",
//     "description": "Una infusión purificante y revitalizante. El té verde aporta polifenoles, mientras que el limón añade vitamina C, creando la bebida perfecta para cualquier momento del día.",
//     "category": "Snack",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "690044ce40f67b5e56d90d8e", "quantity": 2, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d52", "quantity": 250, "unit": "ml" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 0.5, "unit": "unidad" }
//     ],
//     "steps": [
//       "Calienta el agua hasta que esté a punto de hervir (aprox. 80°C). Evita que hierva por completo para no quemar las hojas de té.",
//       "Coloca el té verde en una taza e infusiónalo con el agua caliente durante 3 minutos.",
//       "Retira las hojas o la bolsa de té para que la infusión no se vuelva amarga.",
//       "Exprime el jugo de medio limón fresco en la taza.",
//       "Si prefieres un toque dulce, añade una gota de miel o estevia.",
//       "Disfruta caliente por la mañana o con hielo para una versión 'Ice Tea' refrescante."
//     ],
//     "time": "5 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Bebida", "Detox", "Saludable", "Antioxidante"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Bowl de Yogurt, Fresa y Semillas de Chía",
//     "description": "Un desayuno equilibrado y estético. La cremosidad del yogurt griego se mezcla con la acidez de las fresas frescas y el poder nutricional de la chía activada.",
//     "category": "Breakfast",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900458d40f67b5e56d90daa", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cdc", "quantity": 6, "unit": "unidad" },
//       { "ingredient": "690044ce40f67b5e56d90d8b", "quantity": 10, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 10, "unit": "ml" }
//     ],
//     "steps": [
//       "En un tazón, sirve el yogurt griego natural.",
//       "Lava las fresas, quítales el tallo y córtalas en láminas finas.",
//       "Coloca las fresas sobre el yogurt de forma decorativa.",
//       "Esparce las semillas de chía por toda la superficie. Opcionalmente, puedes mezclar la chía 15 minutos antes con el yogurt para que se hidrate.",
//       "Finaliza con un toque de miel para balancear la acidez del yogurt.",
//       "Consumir frío para mantener la frescura de la fruta."
//     ],
//     "time": "15 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Desayuno", "Proteína", "Fibra", "SinGluten"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Ensalada Rusa Peruana Tradicional",
//     "description": "El acompañamiento infaltable en las mesas peruanas. Una colorida mezcla de raíces y hortalizas sancochadas, unidas por una mayonesa suave, ideal para acompañar pollos o carnes.",
//     "category": "Lunch",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900444040f67b5e56d90d6b", "quantity": 200, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 200, "unit": "g" },
//       { "ingredient": "690044b240f67b5e56d90d77", "quantity": 50, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" }
//     ],
//     "steps": [
//       "Sancocha por separado la beterraga (remolacha), la zanahoria y las papas con su piel para mantener el sabor.",
//       "Una vez cocidas, pela las verduras y córtalas en cubos de 1 cm aproximadamente.",
//       "Sancocha las arvejas y los huevos (estos últimos deben quedar duros).",
//       "En un bowl grande, mezcla suavemente los cubos de beterraga, zanahoria, papa y las arvejas.",
//       "Añade mayonesa (preferiblemente casera), sal, pimienta y unas gotas de limón.",
//       "Decora con el huevo duro picado por encima y sirve frío."
//     ],
//     "time": "30 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Acompañamiento", "Peruano", "Vegetariano", "Clásico"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Bowl de Papaya y Mandarina Refresh",
//     "description": "Una combinación frutal diseñada para mejorar la digestión. La papaína de la papaya y el ácido cítrico de la mandarina hacen de este bowl el snack ideal de media mañana.",
//     "category": "Snack",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "690044ce40f67b5e56d90d87", "quantity": 250, "unit": "g" },
//       { "ingredient": "690044b240f67b5e56d90d81", "quantity": 2, "unit": "unidad" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 0.5, "unit": "unidad" }
//     ],
//     "steps": [
//       "Limpia la papaya, retira las semillas y córtala en cubos uniformes.",
//       "Pela las mandarinas y separa los gajos, retirando las fibras blancas si es posible.",
//       "Coloca ambas frutas en un tazón hondo.",
//       "Exprime un poco de jugo de limón por encima para realzar el dulzor natural de las frutas.",
//       "Opcional: Añade unas hojas de menta fresca picada para un aroma extra refrescante.",
//       "Sirve bien frío."
//     ],
//     "time": "5 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Frutal", "Digestivo", "VitaminaC", "BajoEnCalorías"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Pasta Penne a la Boloñesa Express",
//     "description": "Sabor italiano en tiempo récord. Una salsa de carne sustanciosa y aromática que se adhiere perfectamente a la pasta penne, garantizando un almuerzo lleno de energía.",
//     "category": "Lunch",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d42", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d54", "quantity": 100, "unit": "ml" },
//       { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 2, "unit": "diente" },
//       { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.5, "unit": "unidad" }
//     ],
//     "steps": [
//       "Sancocha la pasta penne en agua con sal hasta que esté al dente.",
//       "En una sartén con aceite, dora la carne molida de res hasta que suelte sus jugos.",
//       "Añade la cebolla y el ajo picados finamente y cocina hasta que estén dorados.",
//       "Vierte la salsa de tomate y deja reducir a fuego bajo por 5-10 minutos, añadiendo sal y orégano seco.",
//       "Escurre la pasta y mézclala con la salsa boloñesa caliente.",
//       "Sirve con una lluvia de queso parmesano opcional."
//     ],
//     "time": "20 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Pasta", "Proteína", "Favorito", "Niños"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Pechuga de Pollo con Brócoli y Quinua",
//     "description": "El estándar de oro de la alimentación saludable. Proteína magra, fibra de crucíferas y carbohidratos complejos de la quinua en un plato balanceado para el control de peso.",
//     "category": "Lunch",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 200, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d59", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d43", "quantity": 80, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Sancocha la quinua (previamente lavada) en agua con sal por 12 minutos hasta que granee. Reserva.",
//       "Sazona la pechuga de pollo con sal, pimienta y comino. Cocínala a la plancha con poco aceite hasta que esté jugosa.",
//       "Corta el brócoli en ramilletes y la zanahoria en rodajas finas; cocínalos al vapor para conservar sus vitaminas.",
//       "Sirve el pollo en un plato junto a una porción generosa de quinua.",
//       "Acompaña con las verduras al vapor aliñadas con un toque de limón o aceite de oliva.",
//       "Este plato es perfecto para preparar en lotes (meal prep) para la semana."
//     ],
//     "time": "25 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["MealPrep", "Saludable", "BajoEnGrasa", "Fitness"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Hummus de Garbanzo al Oliva",
//     "description": "Una crema de origen árabe suave y especiada. El hummus es una fuente increíble de fibra y hierro, perfecto para acompañar con bastones de zanahoria o pan pita.",
//     "category": "Snack",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3f", "quantity": 300, "unit": "g" },
//       { "ingredient": "68d4029412d1f69e8cf26f91", "quantity": 40, "unit": "ml" },
//       { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 1, "unit": "diente" },
//       { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "Coloca los garbanzos cocidos y escurridos en un procesador de alimentos.",
//       "Añade el ajo, el jugo de limón y una pizca de sal.",
//       "Mientras procesas, vierte el aceite de oliva lentamente para crear una emulsión cremosa.",
//       "Si la textura es muy densa, añade un chorrito de agua fría o el líquido de los garbanzos (aquafaba).",
//       "Sirve en un tazón pequeño.",
//       "Crea un pequeño surco con la cuchara y vierte un poco más de aceite de oliva y pimentón dulce para decorar."
//     ],
//     "time": "10 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Vegano", "ProteínaVegetal", "SinGluten", "Dip"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Garbanzos Estofados con Espinaca y Comino",
//     "description": "Inspirado en los potajes tradicionales, este estofado combina la legumbre con la hoja verde para un aporte máximo de hierro vegetal y sabor rústico.",
//     "category": "Lunch",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3f", "quantity": 250, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cd5", "quantity": 100, "unit": "g" },
//       { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.5, "unit": "unidad" },
//       { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 2, "unit": "diente" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 80, "unit": "g" }
//     ],
//     "steps": [
//       "En una olla, sofríe la cebolla y el ajo picado hasta que doren.",
//       "Añade los garbanzos cocidos y una pizca de comino para realzar el sabor.",
//       "Vierte un poco de caldo de verduras o agua y deja hervir por 5 minutos.",
//       "Incorpora las hojas de espinaca lavadas y picadas groseramente. Deja cocinar solo 2 minutos para que no pierdan su color vibrante.",
//       "Ajusta la sal y pimienta.",
//       "Sirve bien caliente acompañado de arroz blanco graneado."
//     ],
//     "time": "30 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Vegano", "Hierro", "Legumbres", "Invierno"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Chupe de Pescado Tradicional",
//     "description": "Una sopa contundente y nutritiva que es casi un guiso. Combina la frescura del pescado con la cremosidad de la leche y el dulzor del zapallo macre.",
//     "category": "Dinner",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 300, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d71", "quantity": 200, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 1, "unit": "unidad" },
//       { "ingredient": "6900350f40f67b5e56d90d46", "quantity": 60, "unit": "ml" },
//       { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 1, "unit": "unidad" }
//     ],
//     "steps": [
//       "En una olla grande, prepara un aderezo con cebolla, ajo y pasta de ají panca hasta que esté bien dorado.",
//       "Añade el zapallo cortado en cubos pequeños y el choclo en rodajas. Cubre con agua o caldo de pescado.",
//       "Cocina a fuego medio hasta que el zapallo empiece a deshacerse, lo que le dará cuerpo a la sopa.",
//       "Añade el pescado cortado en cubos de 3 cm. Cocina por solo 4-5 minutos para que se mantenga firme.",
//       "Vierte la leche evaporada y rompe un huevo con cuidado dentro de la sopa caliente para que se escalfe.",
//       "Sirve en un plato hondo espolvoreando orégano seco o huacatay picado."
//     ],
//     "time": "35 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Peruano", "Sopa", "Nutritivo", "Pescado"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Pescado al Vapor con Kion y Cebolla China",
//     "description": "Inspirado en la cocina Chifa, este método de cocción al vapor respeta la textura delicada del pescado, resaltando su sabor con jengibre fresco y sillao.",
//     "category": "Dinner",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 200, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d6d", "quantity": 20, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d70", "quantity": 30, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d4d", "quantity": 20, "unit": "ml" },
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 100, "unit": "g" }
//     ],
//     "steps": [
//       "Coloca el filete de pescado en un plato resistente al calor que quepa dentro de tu vaporera.",
//       "Cubre la superficie del pescado con láminas muy finas de kion y la parte blanca de la cebolla china.",
//       "Cocina al vapor sobre agua hirviendo durante 10 a 12 minutos (el pescado debe estar blanco y opaco).",
//       "Retira el plato con cuidado y desecha el exceso de líquido que soltó el pescado.",
//       "Vierte la salsa de soya (sillao) encima y añade la parte verde de la cebolla china picada en tiras finas.",
//       "Sirve acompañado de arroz blanco graneado para absorber la salsa."
//     ],
//     "time": "20 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Chifa", "Saludable", "BajoEnGrasa", "Vapor"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Omelette de Champiñones y Ajo",
//     "description": "Una cena rápida pero elegante. Los champiñones salteados con un toque de ajo le dan un sabor terroso y sofisticado a este clásico de huevo.",
//     "category": "Dinner",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" },
//       { "ingredient": "6900350f40f67b5e56d90d5c", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 1, "unit": "diente" },
//       { "ingredient": "6900350f40f67b5e56d90d47", "quantity": 30, "unit": "g" }
//     ],
//     "steps": [
//       "Limpia los champiñones y córtalos en láminas. Pica el ajo muy fino.",
//       "En una sartén pequeña, saltea los champiñones con el ajo hasta que estén dorados y hayan soltado su humedad.",
//       "Bate los dos huevos en un tazón con sal y pimienta.",
//       "Vierte los huevos sobre los champiñones en la sartén a fuego medio.",
//       "Cuando los bordes estén firmes pero el centro aún algo tierno, añade el queso fresco y dobla el omelette a la mitad.",
//       "Cocina 30 segundos más para que el queso se caliente y sirve de inmediato."
//     ],
//     "time": "12 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Cena", "Proteína", "Vegetariano", "Rápido"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Pudding de Chía y Fresas",
//     "description": "Postre o desayuno saludable que se prepara solo. Al hidratarse, la chía crea una textura tipo mousse que combina perfecto con el yogurt y la fruta fresca.",
//     "category": "Breakfast",
//     "difficulty": "Easy",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "690044ce40f67b5e56d90d8b", "quantity": 20, "unit": "g" },
//       { "ingredient": "6900458d40f67b5e56d90daa", "quantity": 150, "unit": "g" },
//       { "ingredient": "6900313c40f67b5e56d90cdc", "quantity": 5, "unit": "unidad" },
//       { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 10, "unit": "ml" }
//     ],
//     "steps": [
//       "En un frasco o bowl, mezcla bien las semillas de chía con el yogurt griego.",
//       "Añade la miel y revuelve para que el endulzante se distribuya uniformemente.",
//       "Deja reposar en el refrigerador por al menos 30 minutos (idealmente toda la noche) para que la chía se hidrate y espese.",
//       "Antes de servir, pica las fresas frescas y colócalas en la parte superior.",
//       "Si la mezcla está muy densa, puedes soltarla con un chorrito de leche antes de comer."
//     ],
//     "time": "10 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Healthy", "Prep", "Superfood", "SinGluten"]
//   },
//   {
//     "user": "68d31be513f9363c576f60cb",
//     "title": "Arroz con Leche al Estilo Casero",
//     "description": "El dulce final perfecto. Un arroz cocido con paciencia para lograr una cremosidad extrema, aromatizado con canela y endulzado naturalmente.",
//     "category": "Snack",
//     "difficulty": "Medium",
//     "isPublic": true,
//     "isSystem": true,
//     "ingredients": [
//       { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 100, "unit": "g" },
//       { "ingredient": "6900444040f67b5e56d90d73", "quantity": 400, "unit": "ml" },
//       { "ingredient": "6900350f40f67b5e56d90d5e", "quantity": 2, "unit": "g" },
//       { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 30, "unit": "ml" }
//     ],
//     "steps": [
//       "Lava el arroz y ponlo a cocinar en una olla con 2 tazas de agua y una rama de canela hasta que el agua se absorba.",
//       "Añade la leche poco a poco, removiendo constantemente a fuego bajo.",
//       "Cuando el arroz esté muy suave y la mezcla empiece a espesar, añade la miel.",
//       "Continúa removiendo por 5 minutos más hasta que tenga una textura melosa.",
//       "Retira del fuego y quita la rama de canela. Deja enfriar a temperatura ambiente o refrigera.",
//       "Sirve en pocillos y decora con canela molida en forma de lluvia."
//     ],
//     "time": "45 min",
//     "image": "",
//     "imagePublicId": "",
//     "tags": ["Postre", "Peruano", "Tradicional", "Dulce"]
//   }
// ]

// async function seed() {
//   try {
//     console.log("1. Intentando conectar...");
//     await mongoose.connect(process.env.DATABASE_URL, {
//           dbName: "miapp",
//         });
    
//     console.log("📍 Conectado a la base de datos:", mongoose.connection.name);
//     console.log("📍 Host:", mongoose.connection.host);

//     console.log("2. Limpiando recetas...");
//     const deleteResult = await Recipe.deleteMany({});
//     console.log(`🗑️ Se eliminaron ${deleteResult.deletedCount} recetas.`);

//     console.log("3. Insertando nuevas recetas...");

//     const recipesWithObjectIds = recipesToInsert.map(recipe => ({
//       ...recipe,
//       user: new mongoose.Types.ObjectId(recipe.user)
//     }));

//     const createdRecipes = await Recipe.create(recipesWithObjectIds);
//     console.log(`✅ ¡Éxito! Se insertaron ${createdRecipes.length} recetas.`);

//     process.exit(0);
//   } catch (error) {
//     console.error("❌ ERROR CRÍTICO:", error);
//     process.exit(1);
//   }
// }

// seed();





const newRecipes = [
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Ceviche de Pescado Clásico",
    "description": "El plato bandera del Perú. Pescado fresco marinado en jugo de limón puro, ají limo y cilantro, acompañado de camote dulce y choclo tierno.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 250, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 100, "unit": "ml" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.5, "unit": "unidad" },
      { "ingredient": "6900444040f67b5e56d90d6c", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 1, "unit": "unidad" }
    ],
    "steps": [
      "Corta el pescado en cubos de 2 cm y colócalos en un bowl de acero o vidrio previamente enfriado.",
      "Frota un ají limo en el fondo del bowl para aromatizar.",
      "Agrega sal, pimienta y el jugo de limón recién exprimido (sin presionar demasiado el limón para evitar el amargor de la cáscara).",
      "Añade la cebolla cortada en pluma fina y el cilantro picado.",
      "Mezcla suavemente y deja reposar por no más de 2 minutos para mantener la frescura del pescado.",
      "Sirve acompañado de una rodaja de camote sancochado, choclo desgranado y una hoja de lechuga."
    ],
    "time": "15 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Peruano", "Marino", "Saludable", "Clásico"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Papa a la Huancaina",
    "description": "Entrada icónica peruana consistente en rodajas de papa sancochada bañadas en una crema sedosa de ají amarillo y queso fresco.",
    "category": "Snack",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 3, "unit": "unidad" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 4, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d47", "quantity": 150, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d73", "quantity": 50, "unit": "ml" },
      { "ingredient": "6900458d40f67b5e56d90dad", "quantity": 4, "unit": "unidad" }
    ],
    "steps": [
      "Sancocha las papas en agua con sal, pélalas y córtalas en rodajas gruesas.",
      "Limpia los ajíes amarillos retirando venas y pepas. Pásalos por agua hirviendo por 5 minutos.",
      "En una licuadora, coloca los ajíes, el queso fresco, la leche y las galletas de soda.",
      "Licúa hasta obtener una crema homogénea y espesa. Si está muy líquida, agrega más galleta; si está muy espesa, un chorrito de leche.",
      "Coloca las rodajas de papa sobre una base de lechuga y báñalas generosamente con la crema.",
      "Decora con medio huevo duro y una aceituna botija."
    ],
    "time": "20 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Peruano", "Entrada", "Vegetariano", "Salsa"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Leche de Tigre Especial",
    "description": "El alma del ceviche servida en copa. Un concentrado cítrico, picante y ultra revitalizante con trozos de pescado y mariscos.",
    "category": "Snack",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 100, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 80, "unit": "ml" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 30, "unit": "g" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.25, "unit": "unidad" }
    ],
    "steps": [
      "Licúa un trozo pequeño de pescado con jugo de limón, un toque de ajo, apio y caldo de pescado frío.",
      "Cuela la mezcla para obtener un líquido denso y blanquecino.",
      "En una copa grande, coloca trozos pequeños de pescado fresco y cebolla roja picada en cuadritos.",
      "Vierte el líquido licuado sobre el pescado.",
      "Sazona con sal, pimienta, cilantro picado y ají limo picadito.",
      "Sirve con choclo desgranado y cancha serrana por encima."
    ],
    "time": "10 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Peruano", "Marino", "Snack", "Picante"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Tallarines Rojos con Huancaina",
    "description": "Un dúo dinámico de la cocina peruana. Pasta con estofado de pollo en salsa de tomate acompañada de la cremosa salsa huancaina.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d42", "quantity": 200, "unit": "g" },
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 250, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d54", "quantity": 100, "unit": "ml" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d47", "quantity": 50, "unit": "g" }
    ],
    "steps": [
      "Prepara el estofado de pollo sellando las presas y luego cocinándolas en una salsa de cebolla, ajo, hongo, laurel y salsa de tomate.",
      "Cocina los tallarines al dente y mézclalos con la salsa roja del estofado.",
      "Prepara una salsa huancaina licuando ají amarillo, queso fresco y leche.",
      "Sirve una porción generosa de tallarines rojos con la presa de pollo.",
      "Baña un costado de la pasta o sirve aparte una buena ración de salsa huancaina.",
      "Espolvorea queso parmesano si deseas potenciar el sabor."
    ],
    "time": "45 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Peruano", "Fusión", "Pasta", "Contundente"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Sopa de Pollo Sanadora",
    "description": "El remedio casero por excelencia. Un caldo claro y nutritivo con pollo, fideos finos y verduras frescas.",
    "category": "Dinner",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 300, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d42", "quantity": 50, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d6d", "quantity": 5, "unit": "g" }
    ],
    "steps": [
      "En una olla con agua hirviendo, coloca el pollo en trozos junto con un trozo de kion (jengibre) para aromatizar.",
      "Agrega la zanahoria en rodajas y el apio picado.",
      "Deja hervir por 20 minutos y añade las papas peladas y cortadas por la mitad.",
      "Cuando las papas estén casi listas, agrega los fideos (cabello de ángel o espagueti picado).",
      "Cocina por 5 minutos más, ajusta la sal y añade un poco de orégano seco.",
      "Sirve caliente con un toque de cilantro picado y unas gotas de limón."
    ],
    "time": "35 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Sopa", "Saludable", "Casero", "Liviano"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Seco de Pollo con Arroz",
    "description": "Guiso tradicional de pollo marinado en cilantro y especias, servido con arroz blanco y frijoles.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 500, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d5b", "quantity": 100, "unit": "g" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 1, "unit": "unidad" },
      { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 150, "unit": "g" },
      { "ingredient": "690044b240f67b5e56d90d77", "quantity": 50, "unit": "g" }
    ],
    "steps": [
      "Licúa el cilantro con un poco de agua o caldo.",
      "Sella el pollo en una olla y retira. En el mismo aceite, haz un aderezo con cebolla, ajo y ají amarillo.",
      "Vierte el cilantro licuado y cocina por unos minutos. Regresa el pollo a la olla.",
      "Añade las arvejas y zanahoria picada. Tapa y cocina a fuego medio por 25 minutos.",
      "Sirve con arroz blanco graneado.",
      "Opcional: Acompaña con una porción de frijoles canario para completar el plato."
    ],
    "time": "45 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Peruano", "Guiso", "Clásico", "Almuerzo"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Tostada de Pollo con Palta",
    "description": "Un snack o desayuno rápido, equilibrado y muy saciante. Proteína magra con grasas saludables sobre pan crocante.",
    "category": "Breakfast",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d41", "quantity": 2, "unit": "rebanada" },
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 100, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd7", "quantity": 0.5, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 0.5, "unit": "unidad" }
    ],
    "steps": [
      "Sancocha la pechuga de pollo y deshiláchala finamente.",
      "En un bowl, machaca la palta con sal, pimienta y unas gotas de limón hasta que esté cremosa.",
      "Mezcla el pollo deshilachado con un poco de la crema de palta o colócalo encima.",
      "Tuesta las rebanadas de pan integral hasta que estén bien doradas.",
      "Unta la mezcla sobre las tostadas generosamente.",
      "Termina con un toque de pimienta negra o semillas de sésamo."
    ],
    "time": "10 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Desayuno", "Fitness", "Saludable", "Rápido"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Tortilla de Atún Proteica",
    "description": "La cena salvavidas por excelencia. Rápida de preparar, económica y muy alta en proteínas de alta calidad.",
    "category": "Dinner",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3c", "quantity": 1, "unit": "lata" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.25, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d5b", "quantity": 5, "unit": "g" }
    ],
    "steps": [
      "Escurre bien el aceite o agua de la lata de atún.",
      "En un bowl, bate los huevos con una pizca de sal y pimienta.",
      "Agrega el atún, la cebolla picada finamente y el cilantro picado.",
      "Calienta una sartén antiadherente con una gota de aceite.",
      "Vierte la mezcla y cocina a fuego medio por 3 minutos de cada lado hasta que esté dorada.",
      "Sirve sola o acompañada de una ensalada fresca de lechuga."
    ],
    "time": "10 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Cena", "Proteína", "Rápido", "Económico"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Revuelto de Lentejas con Huevo",
    "description": "Una forma creativa de aprovechar las lentejas del día anterior, creando un desayuno o almuerzo lleno de hierro y energía.",
    "category": "Breakfast",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3d", "quantity": 150, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.25, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d64", "quantity": 5, "unit": "ml" }
    ],
    "steps": [
      "En una sartén, saltea la cebolla picada en cuadritos hasta que esté dorada.",
      "Agrega las lentejas cocidas y caliéntalas bien.",
      "Vierte los huevos batidos sobre las lentejas.",
      "Revuelve suavemente hasta que el huevo esté cocido al término de tu preferencia.",
      "Ajusta la sal y pimienta.",
      "Sirve con una rebanada de pan o una porción pequeña de arroz."
    ],
    "time": "12 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Saludable", "Hierro", "ReciclajeCulinario", "Desayuno"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Pollo Saltado Express",
    "description": "La versión rápida del lomo saltado usando pechuga de pollo. Un plato jugoso, lleno de sabor y perfecto para el día a día.",
    "category": "Lunch",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 250, "unit": "g" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 1, "unit": "unidad" },
      { "ingredient": "68d4024a12d1f69e8cf26f83", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d4d", "quantity": 15, "unit": "ml" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" }
    ],
    "steps": [
      "Corta el pollo en tiras y sazona con sal y pimienta.",
      "Corta la cebolla y el tomate en gajos gruesos.",
      "En un wok o sartén muy caliente, sella el pollo hasta que esté dorado. Retira.",
      "Saltea la cebolla por 1 minuto, añade el tomate, el pollo y vierte el sillao (salsa de soya) y un chorrito de vinagre.",
      "Mezcla rápidamente a fuego alto.",
      "Sirve acompañado de papas fritas y arroz blanco."
    ],
    "time": "20 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Peruano", "Salteado", "Rápido", "Pollo"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Pollo al Horno con Hierbas",
    "description": "Presas de pollo marinadas en una mezcla de ajo, ají panca y especias, horneadas hasta lograr una piel dorada y una carne jugosa. Un clásico dominical.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 500, "unit": "g" },
      { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 3, "unit": "diente" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 30, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 300, "unit": "g" },
      { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 150, "unit": "g" }
    ],
    "steps": [
      "Limpia las presas de pollo y realiza pequeños cortes para que el marinado penetre mejor.",
      "Prepara el adobo mezclando ajo molido, pasta de ají panca, sal, pimienta, orégano y un chorrito de vinagre.",
      "Unta el pollo con el adobo y deja marinar por lo menos 1 hora (idealmente toda la noche).",
      "En una bandeja para horno, coloca el pollo y las papas cortadas en mitades.",
      "Hornea a 200°C por 45-50 minutos, bañando el pollo con sus propios jugos a mitad de cocción.",
      "Sirve acompañado de arroz blanco graneado y una ensalada de lechuga fresca."
    ],
    "time": "60 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Casero", "Horno", "Proteína", "Tradicional"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Asado de Pollo con Puré de Papas",
    "description": "Pollo guisado en una salsa oscura y sabrosa de zanahoria y hongo, servido sobre un puré de papa amarilla extra cremoso.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 500, "unit": "g" },
      { "ingredient": "68fadd8f435e724a89ed83f0", "quantity": 400, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d46", "quantity": 50, "unit": "ml" },
      { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d54", "quantity": 50, "unit": "ml" }
    ],
    "steps": [
      "Sella las presas de pollo en una olla y retira. En el mismo aceite, sofríe cebolla y zanahoria licuada.",
      "Regresa el pollo a la olla con hongo, laurel y salsa de tomate. Cocina a fuego lento hasta que esté tierno.",
      "Para el puré: Sancocha las papas amarillas, prénsalas en caliente y mézclalas con mantequilla y leche evaporada.",
      "Remueve el puré vigorosamente hasta que esté sedoso y sin grumos.",
      "Sirve el puré como base, coloca la presa de pollo y baña con abundante salsa del asado.",
      "Acompaña con arroz blanco si deseas un plato más contundente."
    ],
    "time": "45 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Confort Food", "Peruano", "Cremoso"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Pollo a la Plancha con Ensalada Mix",
    "description": "Opción ligera y saludable. Filete de pechuga sellado perfectamente, acompañado de una ensalada fresca de lechuga, tomate y pepino.",
    "category": "Dinner",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 250, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd4", "quantity": 100, "unit": "g" },
      { "ingredient": "68d4024a12d1f69e8cf26f83", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cd6", "quantity": 0.5, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" }
    ],
    "steps": [
      "Filetea la pechuga de pollo y sazona con sal, pimienta y un toque de limón.",
      "Calienta una plancha o sartén antiadherente con un hilo de aceite de oliva.",
      "Cocina el pollo 4 minutos por lado hasta que esté dorado por fuera y cocido por dentro.",
      "Lava y corta la lechuga, el tomate en rodajas y el pepino en láminas finas.",
      "Prepara una vinagreta simple con limón, sal y aceite.",
      "Sirve el pollo caliente junto a la ensalada recién aliñada."
    ],
    "time": "15 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Fitness", "Saludable", "BajoEnCarbohidratos", "Cena"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Omelette de Espinaca y Queso",
    "description": "Desayuno proteico y rápido. Huevos batidos con espinaca fresca y un corazón de queso derretido.",
    "category": "Breakfast",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cd5", "quantity": 50, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d47", "quantity": 40, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d64", "quantity": 5, "unit": "ml" }
    ],
    "steps": [
      "Bate los huevos en un bowl con una pizca de sal y pimienta.",
      "Corta la espinaca en tiras finas y mézclala con los huevos batidos.",
      "Calienta una sartén pequeña con aceite a fuego medio.",
      "Vierte la mezcla y deja que cuaje ligeramente; coloca el queso fresco en el centro.",
      "Dobla el omelette a la mitad con una espátula.",
      "Cocina por 1 minuto adicional hasta que el queso esté suave y sirve."
    ],
    "time": "10 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Proteína", "Desayuno", "Vegetariano"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Pancake de Zanahoria y Avena",
    "description": "Una versión dulce y nutritiva de los pancakes. La zanahoria aporta humedad y vitaminas, ideal para un desayuno infantil o saludable.",
    "category": "Breakfast",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d40", "quantity": 60, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 50, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900444040f67b5e56d90d73", "quantity": 50, "unit": "ml" },
      { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 10, "unit": "ml" }
    ],
    "steps": [
      "Ralla la zanahoria muy finamente o licúala con un poco de leche.",
      "Mezcla en un bowl la avena, la zanahoria, el huevo y el resto de la leche.",
      "Añade canela o vainilla al gusto y bate hasta integrar.",
      "En una sartén antiadherente, vierte porciones pequeñas de la masa.",
      "Cuando salgan burbujas, dales la vuelta y cocina por 1-2 minutos más.",
      "Sirve con un hilo de miel o frutas picadas."
    ],
    "time": "15 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Saludable", "VitaminaA", "Desayuno"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Ensalada de Pollo con Palta",
    "description": "Un almuerzo fresco que combina la proteína del pollo con la cremosidad de la palta. Perfecta para llevar al trabajo.",
    "category": "Lunch",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 200, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd7", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cd4", "quantity": 100, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" }
    ],
    "steps": [
      "Sancocha el pollo y deshiláchalo o córtalo en cubos.",
      "Lava y corta la lechuga en trozos medianos para formar la base.",
      "Corta la palta en láminas o cubos y añádela al bowl.",
      "Puedes agregar apio picado para dar un toque crocante.",
      "Aliña con jugo de limón, sal y un toque de mostaza o aceite de oliva.",
      "Mezcla suavemente para no deshacer la palta y consume de inmediato."
    ],
    "time": "15 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Keto", "Saludable", "GrasasBuenas"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Ensalada de Espinaca y Queso Fresco",
    "description": "Ligera, nutritiva y rica en hierro. El contraste entre la espinaca tierna y el queso fresco peruano es excepcional.",
    "category": "Dinner",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900313c40f67b5e56d90cd5", "quantity": 150, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d47", "quantity": 100, "unit": "g" },
      { "ingredient": "68d4024a12d1f69e8cf26f83", "quantity": 1, "unit": "unidad" },
      { "ingredient": "68d4029412d1f69e8cf26f91", "quantity": 15, "unit": "ml" }
    ],
    "steps": [
      "Lava bien las hojas de espinaca y quita los tallos largos.",
      "Corta el queso fresco y el tomate en cubos pequeños.",
      "Coloca la espinaca en un bowl y añade el queso y el tomate.",
      "Prepara un aliño de aceite de oliva, vinagre balsámico (o limón) y sal.",
      "Mezcla bien para que todas las hojas se impregnen del sabor.",
      "Opcional: Agrega unas cuantas nueces o semillas de girasol para dar textura."
    ],
    "time": "10 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Veggie", "Ligero", "Hierro"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Caldo de Gallina Poderoso",
    "description": "Sopa tradicional revitalizante, conocida por su sabor intenso y propiedades reconfortantes. El secreto está en la cocción lenta de la gallina.",
    "category": "Dinner",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 500, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d42", "quantity": 100, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900444040f67b5e56d90d6d", "quantity": 10, "unit": "g" }
    ],
    "steps": [
      "En una olla grande con abundante agua, hierve la gallina en trozos junto con el kion machacado por 40-50 minutos.",
      "Agrega las papas peladas y deja cocinar hasta que estén tiernas.",
      "Incorpora los fideos largos (tipo espagueti) y cocina por 10 minutos más.",
      "Sancocha los huevos aparte y pélalos.",
      "Ajusta la sal y sirve en un plato hondo con una presa, fideos, una papa y un huevo duro entero.",
      "Acompaña con cebolla china picada, limón y ají en crema."
    ],
    "time": "70 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Reconfortante", "Peruano", "Sopa", "Energía"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Pachamanca a la Olla",
    "description": "Una adaptación casera del milenario ritual andino. Carnes maceradas en hierbas aromáticas (huacatay y chincho) cocidas al vapor.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 400, "unit": "g" },
      { "ingredient": "690044b240f67b5e56d90d7c", "quantity": 400, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d6c", "quantity": 200, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900444040f67b5e56d90d6e", "quantity": 100, "unit": "g" }
    ],
    "steps": [
      "Licúa huacatay, chincho, ajo, ají panca y vinagre para crear el macerado.",
      "Unta las carnes con esta mezcla y deja reposar al menos 2 horas.",
      "En una olla grande, coloca una base de pancas de choclo o ramas de las hierbas.",
      "Acomoda las carnes y encima pon las papas, camotes, habas y choclos.",
      "Cubre todo con más pancas de choclo y una bolsa limpia o tela para sellar el vapor.",
      "Cocina a fuego bajo por 1 hora. Sirve con todas las guarniciones andinas."
    ],
    "time": "90 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Andino", "Peruano", "Ancestral", "Festivo"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Juane Amazónico",
    "description": "El corazón de la selva peruana. Arroz sazonado con palillo y especias, envolviendo una presa de gallina, todo cocido en hojas de bijao.",
    "category": "Lunch",
    "difficulty": "Hard",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 500, "unit": "g" },
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 400, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900444040f67b5e56d90d75", "quantity": 4, "unit": "unidad" }
    ],
    "steps": [
      "Cocina el arroz con palillo (cúrcuma) para que tome el color amarillo característico.",
      "Prepara un guiso de gallina con ajo, comino y sacha culantro.",
      "Mezcla el arroz cocido con huevos batidos para darle consistencia.",
      "Sobre dos hojas de bijao cruzadas, coloca una porción de arroz, la presa de gallina, un huevo duro y una aceituna.",
      "Cierra la hoja formando un fardo y amarra firmemente con pabilo.",
      "Cocina los juanes en una olla con un poco de agua hirviendo por 30 minutos. Sirve con ají de cocona."
    ],
    "time": "120 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Selva", "Peruano", "Exótico", "SanJuan"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Rocoto Relleno Arequipeño",
    "description": "El orgullo de Arequipa. Rocotos picantes rellenos de un guiso de carne picada, pasas y aceitunas, cubiertos con queso fundido y horneados a la perfección.",
    "category": "Lunch",
    "difficulty": "Hard",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 300, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d47", "quantity": 150, "unit": "g" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900444040f67b5e56d90d75", "quantity": 6, "unit": "unidad" },
      { "ingredient": "6900444040f67b5e56d90d73", "quantity": 100, "unit": "ml" }
    ],
    "steps": [
      "Limpia los rocotos quitando la tapa y las pepas. Lávalos en agua con sal y azúcar varias veces para reducir el picante.",
      "Prepara el relleno salteando carne picada a cuchillo con cebolla, ajo, maní tostado y pasas.",
      "Sazona el relleno con comino y un toque de azúcar.",
      "Rellena cada rocoto con la mezcla de carne y coloca un trozo generoso de queso fresco encima.",
      "Coloca los rocotos en una fuente, añade una mezcla de leche y huevo batido al fondo para crear una base cremosa.",
      "Hornea a 180°C por 20 minutos hasta que el queso esté gratinado y sirve con pastel de papa."
    ],
    "time": "50 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Arequipa", "Picante", "Gourmet", "Peruano"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Arroz con Pato a la Chiclayana",
    "description": "Plato emblemático del norte peruano. Arroz verde aromatizado con culantro y loche, cocido con presas de pato tiernas y un toque de cerveza negra.",
    "category": "Lunch",
    "difficulty": "Hard",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 400, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d5b", "quantity": 120, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 1, "unit": "unidad" },
      { "ingredient": "690044b240f67b5e56d90d77", "quantity": 50, "unit": "g" }
    ],
    "steps": [
      "Sazona las presas de pato con sal y pimienta; dóralas en una olla con aceite y retira.",
      "En el mismo aceite, haz un aderezo con cebolla, ajo y abundante culantro licuado.",
      "Regresa el pato a la olla, añade cerveza negra y caldo de pato. Cocina a fuego lento hasta que el pato esté suave.",
      "Retira el pato y añade el arroz, las arvejas y el zapallo loche rallado al líquido.",
      "Cocina el arroz a fuego lento hasta que esté graneado.",
      "Sirve el arroz verde con la presa de pato encima y acompaña con salsa criolla."
    ],
    "time": "90 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Norteño", "Tradicional", "Pato", "Festivo"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Chupe de Camarones",
    "description": "Una sopa lujosa y potente de la costa peruana. Combina el sabor intenso de los camarones con leche, queso, habas y un huevo escalfado.",
    "category": "Lunch",
    "difficulty": "Hard",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "690044b240f67b5e56d90d81", "quantity": 500, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d73", "quantity": 200, "unit": "ml" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" }
    ],
    "steps": [
      "Limpia los camarones separando las cabezas. Licúa las cabezas con un poco de caldo y cuela para obtener el concentrado.",
      "En una olla, haz un aderezo con ajo, cebolla y ají panca. Añade el concentrado de coral de camarón.",
      "Agrega agua, las papas en trozos, el choclo y el arroz. Cocina hasta que los vegetales estén listos.",
      "Añade las habas y las colas de camarón; cocina por 3 minutos.",
      "Incorpora la leche evaporada, trozos de queso fresco y rompe los huevos encima para que se cocinen con el vapor.",
      "Sirve bien caliente con una rama de huacatay por encima."
    ],
    "time": "45 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Marino", "Sopa", "Gourmet", "Peruano"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Sopa a la Minuta",
    "description": "Una sopa rápida, nutritiva y reconfortante. Carne de res picada, fideos delgados y un toque de leche que le da un color blanquecino característico.",
    "category": "Dinner",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 200, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d42", "quantity": 80, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d73", "quantity": 100, "unit": "ml" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 2, "unit": "diente" }
    ],
    "steps": [
      "Saltea la carne picada con ajo y cebolla picada muy fina.",
      "Añade ají panca y sofríe hasta que el aceite se separe.",
      "Vierte agua o caldo y lleva a ebullición. Agrega los fideos (cabello de ángel).",
      "Cuando los fideos estén listos, apaga el fuego y añade la leche evaporada.",
      "Opcionalmente, puedes añadir un huevo al final para que se cocine con el calor residual.",
      "Sirve con orégano seco espolvoreado y pan tostado."
    ],
    "time": "15 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Rápido", "Cena", "Casero", "Sopa"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Patasca (Sopa de Mote)",
    "description": "Sopa serrana de gran poder nutritivo. Cocción larga de maíz mote con diversas carnes que resulta en un caldo espeso y revitalizante.",
    "category": "Breakfast",
    "difficulty": "Hard",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "690044b240f67b5e56d90d7c", "quantity": 300, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 200, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 300, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d6d", "quantity": 10, "unit": "g" }
    ],
    "steps": [
      "Sancocha el mote (maíz blanco pelado) desde la noche anterior para que reviente.",
      "En una olla grande, hierve la carne de res, cerdo y mondongo con kion y hierbabuena por varias horas.",
      "Añade el mote cocido al caldo de carnes.",
      "Prepara un aderezo aparte de cebolla, ajo y ají panca e incorpóralo a la sopa.",
      "Deja que todos los sabores se unan a fuego lento hasta que el caldo sea consistente.",
      "Sirve con cebolla china picada, hierbabuena y ají limo."
    ],
    "time": "180 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Andino", "Poderoso", "Tradicional", "Sierra"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Menestrón Peruano",
    "description": "Inspirado en el minestrone italiano pero con alma criolla. Una sopa verde de albahaca y espinaca llena de verduras, carne y fideos.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 300, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd5", "quantity": 100, "unit": "g" },
      { "ingredient": "6900461140f67b5e56d90db5", "quantity": 50, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d42", "quantity": 100, "unit": "g" }
    ],
    "steps": [
      "Hierve la carne de res en trozos grandes con choclo, habas, arvejas, zanahoria y papas.",
      "Licúa albahaca y espinaca con un trozo de queso fresco y aceite.",
      "Cuando los vegetales estén tiernos, añade los fideos canuto o tornillo.",
      "Casi al final, incorpora la mezcla verde licuada a la olla y remueve bien.",
      "Añade un poco de leche evaporada para dar cremosidad.",
      "Sirve caliente y espolvorea queso parmesano por encima."
    ],
    "time": "45 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Fusión", "Verde", "Nutritivo", "Completo"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Picarones con Miel de Chancaca",
    "description": "Dulce tradicional peruano. Anillos fritos hechos de una masa de zapallo y camote, bañados en una miel especiada de chancaca.",
    "category": "Snack",
    "difficulty": "Hard",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900444040f67b5e56d90d71", "quantity": 250, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d6c", "quantity": 250, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 100, "unit": "ml" },
      { "ingredient": "6900350f40f67b5e56d90d64", "quantity": 500, "unit": "ml" }
    ],
    "steps": [
      "Sancocha el zapallo y el camote. Prénsalos y mézclalos con harina, levadura y anís.",
      "Deja levar la masa en un lugar cálido por 2 horas hasta que duplique su tamaño.",
      "Para la miel: Hierve chancaca con canela, clavo de olor y cáscara de naranja hasta que espese.",
      "Con las manos húmedas, toma un poco de masa, forma un anillo con el dedo y échalo en aceite bien caliente.",
      "Fríe hasta que doren y retira con un palito de madera.",
      "Sirve 3 o 4 anillos y baña con la miel caliente."
    ],
    "time": "150 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Dulce", "Callejero", "Tradicional", "Postre"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Mazamorra Morada",
    "description": "El postre limeño por excelencia. Preparado a base de maíz morado, frutas secas y espesado con harina de camote.",
    "category": "Snack",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d52", "quantity": 1, "unit": "litro" },
      { "ingredient": "6900313c40f67b5e56d90cda", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cd9", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d5e", "quantity": 5, "unit": "g" }
    ],
    "steps": [
      "Hierve maíz morado con cáscara de piña, canela y clavo hasta obtener un líquido oscuro.",
      "Cuela el líquido y llévalo a ebullición con trozos de manzana y membrillo.",
      "Añade frutas secas (guindones y huesillos) y azúcar al gusto.",
      "Disuelve harina de camote (chuño) en un poco de agua fría y añádela en forma de hilo removiendo constantemente.",
      "Cocina hasta que espese y se vuelva brillante.",
      "Sirve en dulceras y espolvorea canela molida. Ideal si se acompaña con arroz con leche (clásico Combinado)."
    ],
    "time": "40 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Dulce", "Tradicional", "Lima", "Postre"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Chicharrón de Chancho",
    "description": "Desayuno dominical clásico. Carne de cerdo tierna por dentro y crocante por fuera, servida con camote frito y salsa criolla.",
    "category": "Breakfast",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "690044b240f67b5e56d90d7c", "quantity": 500, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d6c", "quantity": 200, "unit": "g" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 2, "unit": "unidad" }
    ],
    "steps": [
      "Corta el cerdo en trozos grandes y cocínalos en una olla con agua, sal y un trozo de cebolla hasta que el agua se evapore.",
      "Cuando el agua desaparezca, el cerdo empezará a freírse en su propia grasa (manteca).",
      "Fríe hasta que la piel esté dorada y bien crocante.",
      "Fríe rodajas de camote en la misma grasa del cerdo.",
      "Prepara una salsa criolla con cebolla roja, ají limo, limón y hierbabuena.",
      "Sirve caliente con pan francés o solo en plato."
    ],
    "time": "60 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Tradicional", "Cerdo", "Crocante", "Desayuno"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Chicharrón de Pescado",
    "description": "Trocitos de pescado fresco marinados y empanizados, fritos hasta quedar dorados y crujientes. Un snack marino irresistible.",
    "category": "Snack",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 300, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 1, "unit": "diente" },
      { "ingredient": "6900350f40f67b5e56d90d64", "quantity": 300, "unit": "ml" }
    ],
    "steps": [
      "Corta el pescado en cubos o tiras pequeñas y marínalos con ajo molido, sal, pimienta y limón.",
      "Pasa los trozos de pescado por una mezcla de harina y maicena (para que queden más crocantes).",
      "Fríe en abundante aceite caliente hasta que estén bien dorados.",
      "Escurre en papel absorbente.",
      "Sirve con yuca frita o camote, y acompaña con salsa tártara o salsa criolla.",
      "Es el acompañamiento perfecto para un ceviche."
    ],
    "time": "20 min",
    "image": "",
    "imagePublicId": "",
    "tags": ["Marino", "Frito", "Snack", "Rápido"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Chicharrón de Pollo Crocante",
    "description": "Trocitos de pollo marinados en sillao y especias, con un rebozado especial que garantiza una textura extra crujiente por fuera y jugosa por dentro.",
    "category": "Snack",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 400, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d4d", "quantity": 20, "unit": "ml" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 2, "unit": "diente" }
    ],
    "steps": [
      "Corta el pollo en trozos medianos y marínalos con sal, pimienta, ajo, sillao y limón por 20 minutos.",
      "Pasa cada trozo de pollo por una mezcla de harina y maicena, sacudiendo el exceso.",
      "Fríe en abundante aceite caliente hasta que el pollo suba a la superficie y esté bien dorado.",
      "Escurre sobre papel absorbente para eliminar el exceso de grasa.",
      "Sirve con papas fritas y una rodaja de limón."
    ],
    "time": "25 min",
    "image": "", "imagePublicId": "",
    "tags": ["Pollo", "Frito", "Snack", "Favorito"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Pan con Pejerrey (Chimbombo)",
    "description": "El sándwich marino preferido de los puertos peruanos. Pejerreyes frescos arrebozados en pan crujiente con salsa criolla.",
    "category": "Breakfast",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 6, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d41", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 1, "unit": "unidad" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 0.5, "unit": "unidad" }
    ],
    "steps": [
      "Limpia los pejerreyes retirando la espina central pero dejando la cola unida (abiertos en mariposa).",
      "Sazona con sal, pimienta y limón. Pásalos por harina y luego por huevo batido.",
      "Fríelos en aceite caliente hasta que estén dorados de ambos lados.",
      "Abre los panes y coloca una cama de lechuga, los pejerreyes fritos y abundante salsa criolla.",
      "Sirve inmediatamente mientras el pescado sigue crujiente."
    ],
    "time": "15 min",
    "image": "", "imagePublicId": "",
    "tags": ["Marino", "Sándwich", "Tradicional", "Puerto"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Quinua con Pollo y Vegetales",
    "description": "Una alternativa ultra saludable al arroz con pollo. Usamos el grano de oro de los incas para crear un plato nutritivo y lleno de sabor.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d43", "quantity": 200, "unit": "g" },
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 300, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d5b", "quantity": 50, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 1, "unit": "unidad" }
    ],
    "steps": [
      "Lava la quinua varias veces bajo el chorro de agua para quitar la saponina.",
      "Sella el pollo en una olla y retira. Haz un aderezo de cebolla, ajo y culantro licuado.",
      "Añade la quinua a la olla con el aderezo y el doble de cantidad de agua o caldo que de quinua.",
      "Incorpora zanahoria picada y arvejas. Cocina a fuego lento hasta que la quinua reviente.",
      "Regresa el pollo a la olla al final para que tome temperatura y sirve."
    ],
    "time": "30 min",
    "image": "", "imagePublicId": "",
    "tags": ["Healthy", "Superfood", "Peruano", "Proteína"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Anticuchos de Corazón",
    "description": "Brochetas peruanas de corazón de res maceradas en ají panca y especias, asadas a la parrilla con aroma a carbón.",
    "category": "Dinner",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 500, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 50, "unit": "g" },
      { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 3, "unit": "diente" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" }
    ],
    "steps": [
      "Limpia el corazón retirando venas y grasa; córtalo en trozos medianos.",
      "Macerar el corazón con ajo, ají panca, sal, pimienta, comino y un poco de vinagre por al menos 4 horas.",
      "Ensarta 3 o 4 trozos en palitos de bambú.",
      "Cocina en una parrilla o sartén de hierro muy caliente, bañando con el jugo de la maceración usando una brocha de panca.",
      "Sirve con rodajas de papa sancochada y choclo."
    ],
    "time": "40 min",
    "image": "", "imagePublicId": "",
    "tags": ["Callejero", "Parrilla", "Peruano", "Icónic"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Osobuco a la Limeña",
    "description": "Corte de res con hueso cocido a fuego lento en una base de vino y verduras, resultando en una carne que se deshace y una salsa muy concentrada.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 600, "unit": "g" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cd2", "quantity": 1, "unit": "unidad" },
      { "ingredient": "68fadd8f435e724a89ed83f0", "quantity": 400, "unit": "g" }
    ],
    "steps": [
      "Sella las piezas de osobuco por ambos lados en una olla con aceite. Retira.",
      "En el mismo aceite, sofríe cebolla, zanahoria y apio picados finamente.",
      "Regresa la carne, añade un vaso de vino tinto o caldo de res y laurel.",
      "Tapa y cocina a fuego muy bajo por 2 horas hasta que la carne esté tierna.",
      "Sirve el osobuco con su salsa sobre puré de papas amarillas."
    ],
    "time": "130 min",
    "image": "", "imagePublicId": "",
    "tags": ["Gourmet", "Res", "Lento", "Contundente"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Ocopa Arequipeña",
    "description": "Una salsa cremosa similar a la huancaina pero con el aroma distintivo del huacatay y maní tostado.",
    "category": "Snack",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 3, "unit": "unidad" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 3, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d47", "quantity": 100, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d44", "quantity": 30, "unit": "g" }
    ],
    "steps": [
      "Saltea ají amarillo, cebolla y ajo. Al final añade hojas de huacatay fresco.",
      "Licúa este salteado con queso fresco, maní tostado y galletas de soda.",
      "Añade leche poco a poco hasta obtener la consistencia deseada.",
      "Sirve sobre rodajas de papa sancochada.",
      "Decora con huevo duro y una aceituna."
    ],
    "time": "20 min",
    "image": "", "imagePublicId": "",
    "tags": ["Arequipa", "Salsa", "Peruano", "Entrada"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Parihuela Marina",
    "description": "Sopa concentrada de pescados y mariscos, conocida por su gran aporte de energía y sabor intenso a mar.",
    "category": "Lunch",
    "difficulty": "Hard",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 400, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 20, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d6d", "quantity": 5, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 2, "unit": "unidad" }
    ],
    "steps": [
      "Prepara un aderezo con ajo, cebolla, ají panca y ají amarillo.",
      "Añade caldo de pescado concentrado y una copa de vino blanco.",
      "Incorpora los mariscos y filetes de pescado. Cocina por pocos minutos.",
      "Finaliza con un chorrito de chicha de jora o cerveza.",
      "Sirve con una rodaja de limón y cilantro picado."
    ],
    "time": "40 min",
    "image": "", "imagePublicId": "",
    "tags": ["Marino", "Poderoso", "Sopa", "Gourmet"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Crema Volteada Peruana",
    "description": "Postre clásico de leche y huevos con un suave baño de caramelo, de textura sedosa y delicada.",
    "category": "Snack",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900444040f67b5e56d90d73", "quantity": 500, "unit": "ml" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 6, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 150, "unit": "g" }
    ],
    "steps": [
      "Prepara un caramelo con azúcar y un poco de agua; baña el molde completamente.",
      "Bate los huevos suavemente con leche evaporada y condensada (o azúcar) y vainilla.",
      "Cuela la mezcla y viértela en el molde caramelizado.",
      "Cocina a baño María en el horno a 160°C por 1 hora.",
      "Deja enfriar totalmente antes de desmoldar para que no se rompa."
    ],
    "time": "80 min",
    "image": "", "imagePublicId": "",
    "tags": ["Postre", "Dulce", "Tradicional", "Clásico"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Chaufa Amazónico",
    "description": "Arroz chaufa con el toque de la selva: cecina ahumada, chorizo regional y un toque de plátano frito.",
    "category": "Lunch",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 300, "unit": "g" },
      { "ingredient": "690044b240f67b5e56d90d7c", "quantity": 150, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd9", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d4d", "quantity": 20, "unit": "ml" }
    ],
    "steps": [
      "Corta la cecina y el chorizo en cubos pequeños y saltéalos en el wok.",
      "Añade el arroz cocido y mezcla a fuego alto con sillao.",
      "Agrega plátano bellaco frito en cubitos para el toque dulce.",
      "Finaliza con cebolla china y sirve con ají de cocona."
    ],
    "time": "20 min",
    "image": "", "imagePublicId": "",
    "tags": ["Selva", "Fusión", "Ahumado", "Chifa"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Pollo a la Brasa Casero",
    "description": "El plato más consumido del Perú adaptado al horno de casa, manteniendo el sabor del marinado tradicional de pollería.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028112d1f69e8cf26f8b", "quantity": 1200, "unit": "g" },
      { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 4, "unit": "diente" },
      { "ingredient": "6900350f40f67b5e56d90d4d", "quantity": 30, "unit": "ml" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 500, "unit": "g" }
    ],
    "steps": [
      "Macerar el pollo entero con ajo, sillao, cerveza negra, romero, sal y pimienta por 12 horas.",
      "Coloca el pollo en una fuente y hornea a 190°C por 60-70 minutos.",
      "Fríe las papas blancas en bastones gruesos.",
      "Sirve con una ensalada de lechuga y tomate, y las infaltables cremas peruanas."
    ],
    "time": "90 min",
    "image": "", "imagePublicId": "",
    "tags": ["Icónic", "Pollo", "Peruano", "Favorito"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Locro de Zapallo Cremoso",
    "description": "Un guiso tierno y nutritivo a base de zapallo macre, choclo y queso fresco. Es el plato reconfortante por excelencia de los hogares peruanos.",
    "category": "Lunch",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900444040f67b5e56d90d71", "quantity": 500, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d47", "quantity": 100, "unit": "g" },
      { "ingredient": "690044b240f67b5e56d90d77", "quantity": 50, "unit": "g" }
    ],
    "steps": [
      "En una olla, prepara un aderezo con cebolla picada, ajo y pasta de ají amarillo.",
      "Añade el zapallo cortado en cubos y las papas picadas. Agrega un chorrito de agua o caldo.",
      "Incorpora el choclo desgranado y las arvejas. Tapa y cocina a fuego lento hasta que el zapallo se deshaga y forme una crema.",
      "Añade leche evaporada y remueve para dar cremosidad.",
      "Finaliza agregando el queso fresco en cubos y una rama de huacatay picado.",
      "Sirve acompañado de arroz blanco graneado y, si deseas, un huevo frito."
    ],
    "time": "30 min",
    "image": "", "imagePublicId": "",
    "tags": ["Vegetariano", "Peruano", "Nutritivo", "Casero"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Chicha Morada Tradicional",
    "description": "La bebida bandera del Perú. Un refresco natural y antioxidante obtenido de la cocción del maíz morado con frutas y especias.",
    "category": "Snack",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d52", "quantity": 2, "unit": "litro" },
      { "ingredient": "6900313c40f67b5e56d90cda", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 3, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d5e", "quantity": 5, "unit": "g" }
    ],
    "steps": [
      "Hierve el maíz morado en agua con cáscara de piña, canela y clavo de olor durante 45 minutos hasta que el agua esté bien oscura.",
      "Cuela el líquido y deja que se enfríe completamente.",
      "Añade azúcar al gusto y el jugo de los limones recién exprimidos (el color cambiará a un púrpura vibrante).",
      "Pica la manzana en cubitos pequeños y añádela a la jarra.",
      "Sirve bien fría con hielo."
    ],
    "time": "50 min",
    "image": "", "imagePublicId": "",
    "tags": ["Bebida", "Antioxidante", "Peruano", "Fresco"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Papa Rellena Criolla",
    "description": "Masa de papa suave rellena de un guiso de carne picada, pasas y huevo, frita hasta quedar dorada y crujiente por fuera.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 500, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 200, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 2, "unit": "unidad" },
      { "ingredient": "68d4027212d1f69e8cf26f88", "quantity": 1, "unit": "unidad" }
    ],
    "steps": [
      "Sancocha y prensa la papa blanca. Amasa con un poco de harina y sal hasta que sea maleable.",
      "Para el relleno: Saltea carne picada con cebolla, ajo, ají panca, pasas y aceitunas.",
      "Toma una porción de masa de papa, haz un hueco en el centro y coloca el relleno con un trozo de huevo duro.",
      "Cierra la papa dándole una forma ovalada. Pásala por un poco de harina.",
      "Fríe en abundante aceite caliente hasta que esté dorada.",
      "Sirve acompañada de una salsa criolla con bastante limón."
    ],
    "time": "45 min",
    "image": "", "imagePublicId": "",
    "tags": ["Frito", "Peruano", "Clásico", "Entrada"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Trucha Frita Andina",
    "description": "Pescado de río fresco, sazonado y frito, servido con guarniciones clásicas de la sierra. Simple, nutritiva y deliciosa.",
    "category": "Lunch",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 300, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" },
      { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 100, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 1, "unit": "unidad" }
    ],
    "steps": [
      "Limpia la trucha y sazónala con sal, pimienta y ajo molido.",
      "Pásala por un poco de harina de trigo para que no se pegue y quede crocante.",
      "Fríe en una sartén con aceite caliente hasta que esté dorada por ambos lados.",
      "Sancocha papas o prepara papas fritas como acompañamiento.",
      "Sirve la trucha con arroz blanco y una ensalada fresca.",
      "Exprime limón sobre el pescado justo antes de comer."
    ],
    "time": "20 min",
    "image": "", "imagePublicId": "",
    "tags": ["Sierra", "Pescado", "Saludable", "Rápido"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Pisco Sour Catedral",
    "description": "El embajador líquido del Perú. Un cóctel equilibrado que combina la fuerza del Pisco con la acidez del limón y la suavidad de la clara de huevo.",
    "category": "Snack",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900461140f67b5e56d90db8", "quantity": 90, "unit": "ml" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 30, "unit": "ml" },
      { "ingredient": "6900313c40f67b5e56d90cdd", "quantity": 1, "unit": "clara" },
      { "ingredient": "6900461140f67b5e56d90dbb", "quantity": 4, "unit": "hielo" }
    ],
    "steps": [
      "En una coctelera o licuadora, vierte el Pisco, el jarabe de goma (o azúcar) y el jugo de limón.",
      "Añade la clara de huevo y los cubos de hielo.",
      "Agita vigorosamente (o licúa por pocos segundos) hasta que se forme una espuma consistente.",
      "Sirve en una copa helada en tres tiempos para que la espuma quede en la superficie.",
      "Añade dos gotas de amargo de angostura sobre la espuma para aromatizar."
    ],
    "time": "5 min",
    "image": "", "imagePublicId": "",
    "tags": ["Cóctel", "Peruano", "Icónic", "Fiesta"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Chanfainita con Mote",
    "description": "Guiso popular y sabroso hecho a base de bofe de res picado, papas y un aderezo intenso de ají panca.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3a", "quantity": 300, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 3, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 100, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 2, "unit": "unidad" }
    ],
    "steps": [
      "Sancocha el bofe (pulmón de res) con hierbabuena hasta que esté tierno. Pícalo en cubos pequeños.",
      "Pica las papas en cuadritos pequeños.",
      "Prepara un aderezo con cebolla, ajo y abundante ají panca.",
      "Añade el bofe y las papas a la olla con un poco del caldo de la cocción.",
      "Cocina a fuego lento hasta que las papas estén tiernas y el guiso haya espesado.",
      "Sirve con mote sancochado y opcionalmente con un toque de hierbabuena fresca."
    ],
    "time": "50 min",
    "image": "", "imagePublicId": "",
    "tags": ["Callejero", "Peruano", "Económico", "Sabor"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Patita con Maní",
    "description": "Guiso cremoso y gelatinoso elaborado con patitas de cerdo y una base de maní tostado molido.",
    "category": "Lunch",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "690044b240f67b5e56d90d7c", "quantity": 500, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d44", "quantity": 50, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 2, "unit": "unidad" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 2, "unit": "unidad" }
    ],
    "steps": [
      "Sancocha las patitas de cerdo con sal y ajo hasta que la carne se desprenda del hueso. Pícalas en trozos pequeños.",
      "Prepara un aderezo con cebolla, ajo y ají amarillo.",
      "Añade las patitas picadas y las papas cortadas en cubitos.",
      "Incorpora el maní tostado y licuado (o molido) con un poco de caldo.",
      "Cocina a fuego bajo hasta que tome consistencia cremosa.",
      "Sirve con arroz blanco y decora con perejil picado."
    ],
    "time": "60 min",
    "image": "", "imagePublicId": "",
    "tags": ["Tradicional", "Cremoso", "Peruano"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Arroz Zambito",
    "description": "El primo hermano del arroz con leche, pero endulzado con chancaca y enriquecido con nueces y pasas.",
    "category": "Snack",
    "difficulty": "Medium",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "68d4028c12d1f69e8cf26f8e", "quantity": 100, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d51", "quantity": 150, "unit": "g" },
      { "ingredient": "6900444040f67b5e56d90d73", "quantity": 200, "unit": "ml" },
      { "ingredient": "6900350f40f67b5e56d90d5e", "quantity": 5, "unit": "g" }
    ],
    "steps": [
      "Cocina el arroz con agua, canela y clavo hasta que esté muy tierno y el agua casi se haya evaporado.",
      "Añade la chancaca disuelta (miel de chancaca) y remueve bien para que el arroz tome el color oscuro.",
      "Vierte la leche y añade las pasas y el coco rallado.",
      "Cocina a fuego lento removiendo constantemente hasta que esté muy cremoso.",
      "Sirve en dulceras y decora con nueces picadas o canela molida."
    ],
    "time": "45 min",
    "image": "", "imagePublicId": "",
    "tags": ["Dulce", "Tradicional", "Postre", "Peruano"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Picante de Cuy",
    "description": "Plato ancestral de la sierra. Cuy tierno frito y servido en una salsa roja picante de ají panca y maní.",
    "category": "Lunch",
    "difficulty": "Hard",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900310340f67b5e56d90ccf", "quantity": 3, "unit": "diente" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 30, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd1", "quantity": 300, "unit": "g" },
      { "ingredient": "6900350f40f67b5e56d90d44", "quantity": 30, "unit": "g" }
    ],
    "steps": [
      "Sazona el cuy con sal, ajo y pimienta. Déjalo secar un poco al aire.",
      "Fríe el cuy en abundante aceite hasta que la piel esté bien crocante.",
      "Para la salsa: Haz un aderezo con cebolla, ajo, ají panca y maní tostado molido.",
      "Incorpora papas sancochadas cortadas en trozos a la salsa.",
      "Sirve el cuy frito bañado con la salsa picante o la salsa a un lado.",
      "Acompaña con arroz blanco."
    ],
    "time": "60 min",
    "image": "", "imagePublicId": "",
    "tags": ["Sierra", "Ancestral", "Exótico", "Poderoso"]
  },
  {
    "user": "68d31be513f9363c576f60cb",
    "title": "Leche de Tigre Power",
    "description": "Versión concentrada y picante del jugo del ceviche, servida con trozos de pescado y chicharrón de pota para un contraste de texturas único.",
    "category": "Snack",
    "difficulty": "Easy",
    "isPublic": true,
    "isSystem": true,
    "ingredients": [
      { "ingredient": "6900350f40f67b5e56d90d3b", "quantity": 150, "unit": "g" },
      { "ingredient": "6900313c40f67b5e56d90cd8", "quantity": 100, "unit": "ml" },
      { "ingredient": "6900444040f67b5e56d90d6f", "quantity": 1, "unit": "unidad" },
      { "ingredient": "6900350f40f67b5e56d90d56", "quantity": 30, "unit": "g" }
    ],
    "steps": [
      "Licúa restos de pescado blanco con jugo de limón, apio, kion, sal y un poco de caldo de pescado.",
      "Cuela la preparación para que quede líquida pero con cuerpo.",
      "En un vaso hondo, coloca cubos de pescado fresco y cebolla roja picada.",
      "Vierte el líquido licuado.",
      "Agrega cilantro picado y ají limo al gusto.",
      "Corona con cancha serrana y opcionalmente con un par de chicharrones de marisco."
    ],
    "time": "15 min",
    "image": "", "imagePublicId": "",
    "tags": ["Marino", "Picante", "Energía", "Refresh"]
  }
]

async function seed() {
  try {
    console.log("🚀 Iniciando inserción de nuevas recetas...");
    await mongoose.connect(process.env.DATABASE_URL, {
          dbName: "miapp",
        });
    
    console.log(`📍 Conectado a: ${mongoose.connection.name}`);

    // TRANSFORMACIÓN: Convertir Strings a ObjectIds
    const recipesToInsert = newRecipes.map(recipe => ({
      ...recipe,
      user: new mongoose.Types.ObjectId(recipe.user),
      ingredients: recipe.ingredients.map(ing => ({
        ...ing,
        ingredient: new mongoose.Types.ObjectId(ing.ingredient)
      }))
    }));

    // IMPORTANTE: Aquí NO usamos deleteMany porque queremos SUMAR a lo anterior
    const result = await Recipe.insertMany(recipesToInsert);
    
    console.log(`✅ ¡Éxito! Se añadieron ${result.length} nuevas recetas a la base de datos.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error durante la inserción:", error);
    process.exit(1);
  }
}

seed();
import { db } from "./index";
import { categories, products, reviews } from "./schema";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  try {
    const existingCategories = await db.select().from(categories);
    if (existingCategories.length > 0) {
      console.log("Database already seeded");
      return;
    }

    console.log("Seeding categories...");
    const insertedCategories = await db.insert(categories).values([
      {
        slug: "regalos",
        name: "Regalos",
        description: "Cajas sorpresa, combos románticos y detalles inolvidables",
        iconName: "Gift",
        image: "/images/hero-banner.jpg",
        displayOrder: 1,
      },
      {
        slug: "flores-eternas",
        name: "Flores Eternas",
        description: "Ramos y arreglos de rosas preservadas que duran años",
        iconName: "Rose",
        image: "/images/ramo-rosas-eternas.jpg",
        displayOrder: 2,
      },
      {
        slug: "bolsos-y-accesorios",
        name: "Bolsos y Accesorios",
        description: "Bolsos tipo tote, bandoleras y accesorios con el sello Auly",
        iconName: "ShoppingBag",
        image: "/images/bolso-tote-auly.jpg",
        displayOrder: 3,
      },
      {
        slug: "personalizados",
        name: "Personalizados",
        description: "Cajas y detalles hechos a la medida de tu ser querido",
        iconName: "Heart",
        image: "/images/caja-personalizada.jpg",
        displayOrder: 4,
      },
    ]).returning();

    const catRegalos = insertedCategories.find(c => c.slug === "regalos")?.id;
    const catFlores = insertedCategories.find(c => c.slug === "flores-eternas")?.id;
    const catBolsos = insertedCategories.find(c => c.slug === "bolsos-y-accesorios")?.id;
    const catPersonalizados = insertedCategories.find(c => c.slug === "personalizados")?.id;

    console.log("Seeding products...");
    const insertedProducts = await db.insert(products).values([
      {
        slug: "ramo-rosas-eternas",
        name: "Ramo de rosas eternas",
        categoryId: catFlores,
        price: "65000.00",
        originalPrice: "75000.00",
        description: "Exclusivo arreglo de rosas eternas preservadas de alta calidad en caja cilíndrica de lujo. Mantienen su color y textura suave durante años sin requerir agua ni cuidados especiales.",
        shortDescription: "Caja cilíndrica con 12 rosas eternas preservadas y lazo de satén",
        images: ["/images/ramo-rosas-eternas.jpg", "/images/hero-banner.jpg"],
        isFeatured: true,
        isBestseller: true,
        stock: 35,
        rating: "5.00",
        reviewCount: 48,
        tags: ["Flores Eternas", "Rosas", "Regalos Románticos", "Best Seller"],
        customizable: true,
        customOptions: {
          ribbonColors: ["Rosa Fucsia", "Rojo Pasión", "Dorado Satinado", "Negro Elegante"],
          roseColors: ["Rosa Fucsia", "Rojo Pasión", "Blanco Nieve", "Rosa Pastel"],
          allowCardNote: true,
        },
      },
      {
        slug: "bolso-tipo-tote",
        name: "Bolso tipo tote",
        categoryId: catBolsos,
        price: "48000.00",
        originalPrice: "58000.00",
        description: "Bolso tote bag icónico de Auly elaborado en lona premium de alta densidad con asas reforzadas en tono rosa pastel. Ideal para el día a día con amplio espacio interior.",
        shortDescription: "Bolso tote espacioso de lona con asas rosa y bordado Auly",
        images: ["/images/bolso-tote-auly.jpg", "https://images.pexels.com/photos/13924892/pexels-photo-13924892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
        isFeatured: true,
        isBestseller: true,
        stock: 42,
        rating: "4.90",
        reviewCount: 35,
        tags: ["Bolsos", "Tote Bag", "Moda", "Tendencia"],
        customizable: true,
        customOptions: {
          bagColors: ["Beige & Rosa", "Negro Chic", "Crema Classic"],
          allowCardNote: true,
        },
      },
      {
        slug: "bolso-bandolera-fucsia-luxury",
        name: "Bolso Bandolera Fucsia Luxury",
        categoryId: catBolsos,
        price: "58000.00",
        originalPrice: "68000.00",
        description: "Bolso de hombro bandolera acolchado en tono fucsia con correa de cadena dorada ajustables. Un accesorio moderno que complementa cualquier outfit festivo o casual.",
        shortDescription: "Bandolera acolchada rosa fucsia con broche y cadena dorada",
        images: ["/images/bolso-bandolera.jpg", "https://images.pexels.com/photos/13924894/pexels-photo-13924894.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
        isFeatured: true,
        isBestseller: true,
        stock: 20,
        rating: "5.00",
        reviewCount: 29,
        tags: ["Bolsos", "Bandolera", "Fiesta", "Rosa"],
        customizable: false,
      },
      {
        slug: "caja-personalizada-auly",
        name: "Caja Sorpresa Personalizada",
        categoryId: catPersonalizados,
        price: "75000.00",
        originalPrice: "85000.00",
        description: "Experiencia de regalo única que incluye tarjeta acrílica con mensaje personalizado grabado a láser, mini rosa eterna, chocolates finos y caja rígida con lazo.",
        shortDescription: "Caja rígida personalizada con grabado en acrílico y rosa eterna",
        images: ["/images/caja-personalizada.jpg", "/images/hero-banner.jpg"],
        isFeatured: true,
        isBestseller: false,
        stock: 15,
        rating: "4.90",
        reviewCount: 42,
        tags: ["Personalizado", "Caja Sorpresa", "Aniversario", "Cumpleaños"],
        customizable: true,
        customOptions: {
          ribbonColors: ["Rosa Fucsia", "Dorado", "Rojo", "Blanco"],
          allowCardNote: true,
        },
      },
      {
        slug: "caja-corazon-rosas-eternas",
        name: "Caja Corazón Rosas Eternas",
        categoryId: catFlores,
        price: "82000.00",
        originalPrice: "95000.00",
        description: "Caja rígida en forma de corazón rellena de hermosas rosas eternas rosa pastel. Diseñada especialmente para aniversarios, propuestas y fechas romanticas inolvidables.",
        shortDescription: "Corazón floral de rosas preservadas de larga duración",
        images: ["https://images.pexels.com/photos/7431423/pexels-photo-7431423.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "/images/ramo-rosas-eternas.jpg"],
        isFeatured: true,
        isBestseller: true,
        stock: 25,
        rating: "5.00",
        reviewCount: 54,
        tags: ["Flores Eternas", "Corazón", "Amor"],
        customizable: true,
        customOptions: {
          roseColors: ["Rosa Pastel", "Rojo Pasión", "Fucsia Vibrante"],
          allowCardNote: true,
        },
      },
      {
        slug: "set-elegante-novia-aniversario",
        name: "Set Elegante Regalo & Accesorios",
        categoryId: catRegalos,
        price: "95000.00",
        originalPrice: "110000.00",
        description: "Set exclusivo de regalo con detalles en tono blush pink, libreta con grabado dorado, pluma metálica, espejo de bolsillo y mini bouquet de rosas eternas.",
        shortDescription: "Set de accesorios de lujo presentados en caja satinada",
        images: ["https://images.pexels.com/photos/38703041/pexels-photo-38703041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
        isFeatured: false,
        isBestseller: false,
        stock: 18,
        rating: "4.80",
        reviewCount: 19,
        tags: ["Regalos", "Set Completo", "Accesorios"],
        customizable: true,
      },
      {
        slug: "bolso-red-passion-chic",
        name: "Bolso Red Passion Chic",
        categoryId: catBolsos,
        price: "52000.00",
        originalPrice: "62000.00",
        description: "Bolso de mano en suave piel sintética roja con acabados metálicos en dorado mate. Cuenta con múltiples compartimentos organizadores internos.",
        shortDescription: "Bolso compacto color rojo intenso con acabados premium",
        images: ["https://images.pexels.com/photos/14867422/pexels-photo-14867422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
        isFeatured: false,
        isBestseller: false,
        stock: 30,
        rating: "4.70",
        reviewCount: 14,
        tags: ["Bolsos", "Rojo", "Moda"],
        customizable: false,
      },
      {
        slug: "cupula-cristal-rosa-eterna",
        name: "Cúpula Cristal Rosa Eterna Bella",
        categoryId: catFlores,
        price: "55000.00",
        originalPrice: "65000.00",
        description: "Rosa eterna roja sobre peana de madera rodeada de sutiles luces cálidas micro-LED bajo cúpula de cristal de gran transparencia.",
        shortDescription: "Rosa eterna encantada con luces LED sobre peana de madera",
        images: ["https://images.pexels.com/photos/34790956/pexels-photo-34790956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
        isFeatured: false,
        isBestseller: true,
        stock: 40,
        rating: "4.90",
        reviewCount: 31,
        tags: ["Flores Eternas", "Cúpula LED", "Decoración"],
        customizable: true,
      },
      {
        slug: "combo-regalo-romantico-auly",
        name: "Combo Regalo Romántico VIP Auly",
        categoryId: catRegalos,
        price: "110000.00",
        originalPrice: "135000.00",
        description: "La experiencia de regalo más vendida: incluye Ramo de 12 rosas eternas + Bolso Tote Auly + Caja de chocolates bombones + Tarjeta personalizada con lazo satinado.",
        shortDescription: "El regalo perfecto completo: Flores Eternas + Bolso + Chocolates",
        images: ["/images/hero-banner.jpg", "/images/ramo-rosas-eternas.jpg", "/images/bolso-tote-auly.jpg"],
        isFeatured: true,
        isBestseller: true,
        stock: 12,
        rating: "5.00",
        reviewCount: 68,
        tags: ["Regalos", "Combo VIP", "Flores + Bolso"],
        customizable: true,
        customOptions: {
          ribbonColors: ["Rosa Fucsia", "Rojo Pasión", "Dorado"],
          roseColors: ["Rosa Fucsia", "Rojo Pasión"],
          allowCardNote: true,
        },
      },
    ]).returning();

    // Seed sample reviews for the first product
    const ramoProduct = insertedProducts.find(p => p.slug === "ramo-rosas-eternas");
    if (ramoProduct) {
      await db.insert(reviews).values([
        {
          productId: ramoProduct.id,
          userName: "Mariana Gómez",
          rating: 5,
          comment: "¡Simplemente hermoso! Llegó exactamente como se veía en las fotos, las rosas se ven impecables y el empaque es de súper lujo.",
        },
        {
          productId: ramoProduct.id,
          userName: "Carlos Mendoza",
          rating: 5,
          comment: "Le encantó a mi novia en nuestro aniversario. El lazo satinado y la tarjeta personalizada hicieron la diferencia.",
        },
      ]);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// ============================================================
//  JY PERFUMERÍA — Base de datos de productos
//  Cada producto tiene: notas olfativas + descripción completa.
//  Sin precios visibles; el cliente consulta por WhatsApp.
// ============================================================

const products = [

  // ── HOMBRE ─────────────────────────────────────────────────
  {
    id: 1,
    name: "Lacoste Blanc",
    category: "hombre",
    notes: "Cítricos, notas verdes, especias suaves, maderas y almizcle.",
    description: "Una fragancia fresca, limpia y versátil, con un aroma agradable que transmite elegancia, sencillez y estilo. Ideal para quienes prefieren perfumes que se puedan usar en cualquier momento sin resultar demasiado intensos.",
    image: "Perfumes Hombres/Lacoste Blanc.png",
    badge: null,
    sizes: []
  },
  {
    id: 2,
    name: "Nautica Voyage",
    category: "hombre",
    notes: "Manzana verde, hojas verdes, flor de loto, notas acuáticas, cedro y almizcle.",
    description: "Una fragancia fresca y acuática que evoca la brisa marina y la sensación de libertad. Su aroma es ligero, limpio y refrescante, perfecto para quienes disfrutan de fragancias naturales y relajadas.",
    image: "Perfumes Hombres/Nautica Voyage.png",
    badge: null,
    sizes: []
  },
  {
    id: 3,
    name: "9 PM",
    category: "hombre",
    notes: "Manzana, bergamota, lavanda, canela, flor de azahar, vainilla, haba tonka, ámbar y pachulí.",
    description: "Una fragancia dulce, cálida y envolvente, con una combinación de frutas, especias y notas ambaradas que le aportan un carácter moderno, atractivo y sofisticado.",
    image: "Perfumes Hombres/9 PM.png",
    badge: null,
    sizes: []
  },
  {
    id: 4,
    name: "Nitro Red",
    category: "hombre",
    notes: "Frutas jugosas, cítricos, notas aromáticas, especias, ámbar y acordes amaderados.",
    description: "Un perfume vibrante, dulce y moderno, con un aroma frutal que se combina con notas cálidas y amaderadas. Ideal para quienes buscan una fragancia con carácter, energía y presencia.",
    image: "Perfumes Hombres/Nitro Red.png",
    badge: null,
    sizes: []
  },
  {
    id: 5,
    name: "Mandarin Sky Elixir",
    category: "hombre",
    notes: "Mandarina, cítricos, notas especiadas, acordes dulces, ámbar y maderas.",
    description: "Una fragancia cítrica, cálida y envolvente que combina la frescura de la mandarina con matices dulces y amaderados. Su aroma resulta moderno, sofisticado y atractivo.",
    image: "Perfumes Hombres/Mandarin Sky Elixir.png",
    badge: null,
    sizes: []
  },
  {
    id: 6,
    name: "Versace Eros",
    category: "hombre",
    notes: "Menta, limón, manzana verde, haba tonka, geranio, ambroxan, vainilla, cedro y vetiver.",
    description: "Una fragancia fresca, dulce y aromática, con una combinación de notas mentoladas y frutales sobre un fondo cálido y amaderado. Transmite fuerza, confianza y sofisticación, con un aroma moderno y distintivo.",
    image: "Perfumes Hombres/Versace Eros.png",
    badge: null,
    sizes: []
  },

  // ── MUJER ──────────────────────────────────────────────────
  {
    id: 7,
    name: "La Vie Est Belle",
    category: "mujer",
    notes: "Pera, grosella negra, iris, jazmín, flor de azahar, vainilla, praliné, pachulí y haba tonka.",
    description: "Un perfume elegante, femenino y dulce, que combina delicadas notas florales con acordes gourmand. Su aroma transmite sofisticación, calidez y alegría, ideal para quienes disfrutan de fragancias memorables.",
    image: "Perfumes Mujeres/Lacome.png",
    badge: null,
    sizes: []
  },
  {
    id: 8,
    name: "Paris Hilton",
    category: "mujer",
    notes: "Melocotón, manzana, fresia, mimosa, jazmín, nardos, sándalo, almizcle y vainilla.",
    description: "Una fragancia juvenil, femenina y alegre, con una mezcla de notas frutales y florales que crea un aroma dulce, delicado y encantador.",
    image: "Perfumes Mujeres/Paris Hilton.png",
    badge: null,
    sizes: []
  },
  {
    id: 9,
    name: "Tommy Girl",
    category: "mujer",
    notes: "Mandarina, grosella negra, camelia, manzano en flor, limón, rosa, violeta, madreselva, menta, magnolia, jazmín, cedro, sándalo y cuero.",
    description: "Un perfume fresco, floral y cítrico que transmite energía, naturalidad y juventud. Su combinación de flores y frutas crea un aroma ligero, vibrante y perfecto para acompañar el día a día.",
    image: "Perfumes Mujeres/Tommy Girl.png",
    badge: null,
    sizes: []
  },
  {
    id: 10,
    name: "Scandal JPG",
    category: "mujer",
    notes: "Naranja sanguina, mandarina, miel, gardenia, jazmín, flor de azahar, durazno, caramelo, pachulí y regaliz.",
    description: "Una fragancia dulce, intensa y seductora, con una combinación de notas florales y gourmand que aporta un aroma llamativo, sofisticado y lleno de personalidad.",
    image: "Perfumes Mujeres/Scandal JPG.png",
    badge: null,
    sizes: []
  },
  {
    id: 11,
    name: "La Bomba Carolina Herrera",
    category: "mujer",
    notes: "Pitaya (fruta del dragón), peonía roja, frangipani y vainilla.",
    description: "Una fragancia exótica, floral y frutal, con un carácter vibrante y femenino. Su aroma combina la dulzura de las frutas con delicadas flores y un fondo cálido, creando una esencia alegre y sofisticada.",
    image: "Perfumes Mujeres/La Bomba Carolina Herrera.png",
    badge: null,
    sizes: []
  },
  {
    id: 12,
    name: "Valentino Donna Born in Roma",
    category: "mujer",
    notes: "Grosella negra, bergamota, jazmín, vainilla Bourbon y notas amaderadas.",
    description: "Una fragancia elegante, moderna y femenina, que mezcla notas florales luminosas con una base dulce y cálida. Su aroma transmite sofisticación, sensualidad y una personalidad única.",
    image: "Perfumes Mujeres/Valentino Donna Born In Roma.png",
    badge: null,
    sizes: []
  }

];

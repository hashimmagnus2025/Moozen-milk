/**
 * Populates categories, products, blogs and recipes for local development
 * and demoing the connected frontend. Safe to re-run — it upserts by
 * slug instead of blindly inserting duplicates.
 *
 * Usage: npm run seed:data
 */
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Blog = require("../models/Blog");
const Recipe = require("../models/Recipe");
const Testimonial = require("../models/Testimonial");

const CATEGORIES = [
  { name: "Milk", slug: "milk", description: "A2 and toned milk, chilled within hours of the morning pour and never diluted." },
  { name: "Paneer", slug: "paneer", description: "Soft, hand-pressed paneer cubes made fresh every single morning." },
  { name: "Curd", slug: "curd", description: "Thick, creamy-set curd cultured the traditional way — no shortcuts." },
  { name: "Ghee", slug: "ghee", description: "Bilona-churned ghee, simmered slow for that unmistakable aroma." },
  { name: "Butter", slug: "butter", description: "Churned from fresh cream, lightly salted for an everyday indulgence." },
  { name: "Cheese", slug: "cheese", description: "Slow-matured, small-batch cheese made for the modern Indian kitchen." },
  { name: "Yogurt", slug: "yogurt", description: "Probiotic-rich yogurt, thick-set and lightly sweetened where it counts." },
  { name: "Beverages", slug: "beverages", description: "Lassi, buttermilk and more — ready to pour, always naturally refreshing." },
  { name: "Sweets", slug: "sweets", description: "Traditional Indian mithai made with our own milk, ghee and khoya." },
];

const PRODUCTS = [
  {
    productName: "Vrinda A2 Gold Milk", slug: "a2-gold-milk", category: "milk", subCategory: "A2 Milk",
    shortDescription: "Slow-pasteurised A2 milk from indigenous cows, rich and naturally sweet.",
    description: "Sourced from indigenous Gir and Sahiwal cows across our partner farms, Vrinda A2 Gold Milk is collected at dawn and chilled within two hours. Slow-pasteurised to protect its natural sweetness, it's the closest thing to milk straight from the farm you'll find in a bottle.",
    ingredients: ["100% A2 cow milk"],
    benefits: ["Easier to digest for many people than regular A1 milk", "Naturally rich in A2 beta-casein protein", "No hormones, antibiotics or additives"],
    nutrition: [{ label: "Energy", value: "62 kcal" }, { label: "Protein", value: "3.2 g" }, { label: "Fat", value: "3.6 g" }, { label: "Carbohydrate", value: "4.8 g" }, { label: "Calcium", value: "120 mg" }],
    packSizes: [{ size: "500ml", price: 45 }, { size: "1L", price: 85 }],
    price: 45, featured: true, newArrival: false,
  },
  {
    productName: "Toned Milk", slug: "toned-milk", category: "milk", subCategory: "Everyday Milk",
    shortDescription: "Light, everyday milk with a balanced fat content for the whole family.",
    description: "Our toned milk keeps the goodness of full-cream milk while trimming the fat for lighter, everyday drinking. Pasteurised same-day, it's the household staple that never lets you down at breakfast.",
    ingredients: ["Toned cow milk (3% fat)"],
    benefits: ["Lower fat, same freshness", "Good source of daily calcium", "Homogenised for a smooth texture"],
    nutrition: [{ label: "Energy", value: "58 kcal" }, { label: "Protein", value: "3.1 g" }, { label: "Fat", value: "3.0 g" }, { label: "Carbohydrate", value: "4.7 g" }, { label: "Calcium", value: "115 mg" }],
    packSizes: [{ size: "500ml", price: 32 }, { size: "1L", price: 60 }],
    price: 32, featured: false, newArrival: true,
  },
  {
    productName: "Full Cream Milk", slug: "full-cream-milk", category: "milk", subCategory: "Everyday Milk",
    shortDescription: "Rich, creamy milk for chai, desserts and everything in between.",
    description: "When a recipe calls for body and richness, this is the bottle to reach for. Full-fat and full-flavoured, it's how our founder's family always took their milk — no compromises.",
    ingredients: ["Full cream cow milk (6% fat)"],
    benefits: ["Rich, authentic taste", "Ideal for chai, desserts and kheer", "High in natural milk fat"],
    nutrition: [{ label: "Energy", value: "80 kcal" }, { label: "Protein", value: "3.3 g" }, { label: "Fat", value: "6.0 g" }, { label: "Carbohydrate", value: "4.8 g" }, { label: "Calcium", value: "125 mg" }],
    packSizes: [{ size: "500ml", price: 38 }, { size: "1L", price: 72 }],
    price: 38, featured: false, newArrival: false,
  },
  {
    productName: "Malai Paneer", slug: "malai-paneer", category: "paneer", subCategory: "Fresh Paneer",
    shortDescription: "Soft, hand-pressed paneer cubes made fresh every single morning.",
    description: "Made in small batches from our own A2 milk, this paneer is pressed just enough to hold its shape and no more — soft, moist, and never rubbery. Perfect for tikka, curry or straight off the block.",
    ingredients: ["Cow milk", "Food-grade acidulant"],
    benefits: ["High-protein vegetarian staple", "Holds shape without turning chewy", "No preservatives"],
    nutrition: [{ label: "Energy", value: "265 kcal" }, { label: "Protein", value: "18.3 g" }, { label: "Fat", value: "20.8 g" }, { label: "Carbohydrate", value: "1.2 g" }, { label: "Calcium", value: "480 mg" }],
    packSizes: [{ size: "200g", price: 90 }, { size: "400g", price: 170 }],
    price: 90, featured: true, newArrival: false,
  },
  {
    productName: "Low-Fat Paneer", slug: "low-fat-paneer", category: "paneer", subCategory: "Fresh Paneer",
    shortDescription: "The same fresh press, made from toned milk for a lighter block.",
    description: "For everyday cooking without the extra richness, our low-fat paneer delivers the same soft press and clean taste from toned milk instead of full cream.",
    ingredients: ["Toned cow milk", "Food-grade acidulant"],
    benefits: ["Lighter, everyday option", "High in protein", "No preservatives"],
    nutrition: [{ label: "Energy", value: "180 kcal" }, { label: "Protein", value: "17.5 g" }, { label: "Fat", value: "11.0 g" }, { label: "Carbohydrate", value: "1.4 g" }, { label: "Calcium", value: "460 mg" }],
    packSizes: [{ size: "200g", price: 75 }],
    price: 75, featured: false, newArrival: false,
  },
  {
    productName: "Set Curd", slug: "set-curd", category: "curd", subCategory: "Classic Curd",
    shortDescription: "Thick, creamy-set curd cultured the traditional way — no shortcuts.",
    description: "Set overnight in earthen-style tubs using a live culture passed down through generations, this curd holds its shape on the spoon and carries just the right amount of tang.",
    ingredients: ["Toned milk", "Live curd culture"],
    benefits: ["Naturally probiotic", "Aids digestion", "No added stabilisers"],
    nutrition: [{ label: "Energy", value: "61 kcal" }, { label: "Protein", value: "3.4 g" }, { label: "Fat", value: "3.3 g" }, { label: "Carbohydrate", value: "4.6 g" }, { label: "Calcium", value: "150 mg" }],
    packSizes: [{ size: "400g", price: 40 }, { size: "1kg", price: 90 }],
    price: 40, featured: true, newArrival: false,
  },
  {
    productName: "Greek-Style Yogurt", slug: "greek-style-yogurt", category: "yogurt", subCategory: "Strained Yogurt",
    shortDescription: "Thick-strained, high-protein yogurt with a clean, tangy finish.",
    description: "Strained three times to remove excess whey, our Greek-style yogurt is thick enough to stand a spoon in and rich in protein — a breakfast staple that actually keeps you full.",
    ingredients: ["Toned milk", "Live yogurt culture"],
    benefits: ["High in protein", "Live active cultures", "Naturally low in sugar"],
    nutrition: [{ label: "Energy", value: "97 kcal" }, { label: "Protein", value: "9.0 g" }, { label: "Fat", value: "4.5 g" }, { label: "Carbohydrate", value: "3.9 g" }, { label: "Calcium", value: "140 mg" }],
    packSizes: [{ size: "150g", price: 55 }, { size: "400g", price: 130 }],
    price: 55, featured: false, newArrival: true,
  },
  {
    productName: "Desi Cow Ghee", slug: "desi-cow-ghee", category: "ghee", subCategory: "Bilona Ghee",
    shortDescription: "Bilona-churned ghee, simmered slow for that unmistakable aroma.",
    description: "Cultured curd, hand-churned in small batches, then simmered slow over a low flame until it turns deep gold. It's the product our founder's mother used to make — we just stopped letting it go out of stock.",
    ingredients: ["Cultured cow cream"],
    benefits: ["Rich in fat-soluble vitamins A, D, E, K", "Traditional bilona method", "High smoke point for cooking"],
    nutrition: [{ label: "Energy", value: "897 kcal" }, { label: "Protein", value: "0 g" }, { label: "Fat", value: "99.7 g" }, { label: "Carbohydrate", value: "0 g" }, { label: "Calcium", value: "4 mg" }],
    packSizes: [{ size: "500ml", price: 480 }, { size: "1L", price: 920 }],
    price: 480, featured: true, newArrival: false,
  },
  {
    productName: "Cow Ghee Jar", slug: "cow-ghee-jar", category: "ghee", subCategory: "Everyday Ghee",
    shortDescription: "Our everyday ghee — same purity, in a pantry-friendly jar.",
    description: "The same slow-simmered ghee as our signature bottle, packed in a wide-mouth jar that's easier to scoop straight into the pan.",
    ingredients: ["Cultured cow cream"],
    benefits: ["100% pure, no vanaspati", "Great for daily tempering", "Long shelf life without refrigeration"],
    nutrition: [{ label: "Energy", value: "897 kcal" }, { label: "Protein", value: "0 g" }, { label: "Fat", value: "99.7 g" }, { label: "Carbohydrate", value: "0 g" }, { label: "Calcium", value: "4 mg" }],
    packSizes: [{ size: "1kg", price: 940 }],
    price: 940, featured: false, newArrival: false,
  },
  {
    productName: "Table Butter", slug: "table-butter", category: "butter", subCategory: "Salted Butter",
    shortDescription: "Churned from fresh cream, lightly salted for an everyday indulgence.",
    description: "Churned in small batches from fresh, unpasteurised cream, this butter has a clean dairy flavour and just enough salt to make toast worth waking up for.",
    ingredients: ["Fresh cream", "Salt"],
    benefits: ["Churned from fresh cream", "No hydrogenated oils", "Smooth, spreadable texture"],
    nutrition: [{ label: "Energy", value: "717 kcal" }, { label: "Protein", value: "0.9 g" }, { label: "Fat", value: "81.0 g" }, { label: "Carbohydrate", value: "0.1 g" }, { label: "Calcium", value: "24 mg" }],
    packSizes: [{ size: "100g", price: 65 }, { size: "500g", price: 290 }],
    price: 65, featured: false, newArrival: false,
  },
  {
    productName: "Unsalted Butter", slug: "unsalted-butter", category: "butter", subCategory: "Baking Butter",
    shortDescription: "Pure, unsalted butter built for baking and precise recipes.",
    description: "No salt, no shortcuts — just fresh cream churned to a clean, neutral butter that lets your baking recipes speak for themselves.",
    ingredients: ["Fresh cream"],
    benefits: ["Ideal for baking", "Consistent fat content", "No added salt"],
    nutrition: [{ label: "Energy", value: "717 kcal" }, { label: "Protein", value: "0.9 g" }, { label: "Fat", value: "81.5 g" }, { label: "Carbohydrate", value: "0.1 g" }, { label: "Calcium", value: "24 mg" }],
    packSizes: [{ size: "200g", price: 120 }],
    price: 120, featured: false, newArrival: true,
  },
  {
    productName: "Herbed Cream Cheese", slug: "herbed-cream-cheese", category: "cheese", subCategory: "Spreads",
    shortDescription: "Creamy, spreadable cheese folded through with garden herbs.",
    description: "A soft, spreadable cheese finished with basil, chives and a touch of garlic — made for morning toast and evening crackers alike.",
    ingredients: ["Cream cheese", "Basil", "Chives", "Garlic", "Salt"],
    benefits: ["No artificial preservatives", "Ready to spread, no prep needed", "Good source of calcium"],
    nutrition: [{ label: "Energy", value: "290 kcal" }, { label: "Protein", value: "6.5 g" }, { label: "Fat", value: "27.0 g" }, { label: "Carbohydrate", value: "3.8 g" }, { label: "Calcium", value: "140 mg" }],
    packSizes: [{ size: "180g", price: 175 }],
    price: 175, featured: false, newArrival: true,
  },
  {
    productName: "Aged Gouda-Style Cheese", slug: "aged-gouda-style-cheese", category: "cheese", subCategory: "Block Cheese",
    shortDescription: "Slow-matured block cheese with a firm bite and nutty finish.",
    description: "Matured for eight weeks in our ageing room, this block cheese develops a firm texture and a subtly nutty, caramel-edged flavour that holds up on any cheese board.",
    ingredients: ["Cow milk", "Salt", "Cheese culture", "Rennet"],
    benefits: ["Slow-matured for depth of flavour", "High in protein and calcium", "No processed cheese additives"],
    nutrition: [{ label: "Energy", value: "356 kcal" }, { label: "Protein", value: "24.9 g" }, { label: "Fat", value: "27.4 g" }, { label: "Carbohydrate", value: "2.2 g" }, { label: "Calcium", value: "700 mg" }],
    packSizes: [{ size: "200g", price: 260 }],
    price: 260, featured: false, newArrival: false,
  },
  {
    productName: "Rose Lassi", slug: "rose-lassi", category: "beverages", subCategory: "Lassi",
    shortDescription: "Thick, chilled lassi finished with a whisper of rose.",
    description: "Our curd, blended thick and finished with a light rose syrup — a bottle that tastes like a wedding breakfast in Punjab, chilled and ready to go.",
    ingredients: ["Curd", "Sugar", "Rose syrup", "Cardamom"],
    benefits: ["Made from fresh set curd", "No artificial flavouring", "Naturally probiotic"],
    nutrition: [{ label: "Energy", value: "110 kcal" }, { label: "Protein", value: "2.8 g" }, { label: "Fat", value: "2.9 g" }, { label: "Carbohydrate", value: "18.0 g" }, { label: "Calcium", value: "100 mg" }],
    packSizes: [{ size: "200ml", price: 40 }],
    price: 40, featured: false, newArrival: true,
  },
  {
    productName: "Spiced Buttermilk", slug: "spiced-buttermilk", category: "beverages", subCategory: "Chaas",
    shortDescription: "Cooling, spiced chaas made the way summers demand.",
    description: "Churned curd thinned to a light, savoury drink and tempered with cumin, curry leaf and a hint of ginger — the most requested bottle in our summer range.",
    ingredients: ["Curd", "Water", "Cumin", "Curry leaf", "Ginger", "Salt"],
    benefits: ["Light and hydrating", "Aids digestion after meals", "No added sugar"],
    nutrition: [{ label: "Energy", value: "38 kcal" }, { label: "Protein", value: "1.8 g" }, { label: "Fat", value: "1.2 g" }, { label: "Carbohydrate", value: "4.6 g" }, { label: "Calcium", value: "70 mg" }],
    packSizes: [{ size: "500ml", price: 35 }],
    price: 35, featured: false, newArrival: false,
  },
  {
    productName: "Kesar Peda", slug: "kesar-peda", category: "sweets", subCategory: "Milk Sweets",
    shortDescription: "Saffron-laced peda made from slow-reduced khoya.",
    description: "Milk reduced for hours into khoya, hand-rolled with a pinch of real saffron and cardamom — the mithai box everyone reaches for first.",
    ingredients: ["Khoya (milk solids)", "Sugar", "Saffron", "Cardamom"],
    benefits: ["Made from fresh khoya, not milk powder", "Real saffron, not colouring", "No preservatives"],
    nutrition: [{ label: "Energy", value: "380 kcal" }, { label: "Protein", value: "7.2 g" }, { label: "Fat", value: "16.0 g" }, { label: "Carbohydrate", value: "50.0 g" }, { label: "Calcium", value: "220 mg" }],
    packSizes: [{ size: "250g", price: 210 }],
    price: 210, featured: false, newArrival: true,
  },
  {
    productName: "Rasgulla", slug: "rasgulla", category: "sweets", subCategory: "Chenna Sweets",
    shortDescription: "Spongy chenna dumplings soaked in a light sugar syrup.",
    description: "Fresh chenna kneaded to a soft dough, shaped and simmered until it doubles in size, then rested in a light syrup — soft, springy, and never overly sweet.",
    ingredients: ["Chenna (fresh cheese)", "Sugar", "Water", "Cardamom"],
    benefits: ["Low in fat compared to khoya sweets", "Made fresh, not shelf-stable", "No artificial preservatives"],
    nutrition: [{ label: "Energy", value: "186 kcal" }, { label: "Protein", value: "5.0 g" }, { label: "Fat", value: "3.5 g" }, { label: "Carbohydrate", value: "33.0 g" }, { label: "Calcium", value: "110 mg" }],
    packSizes: [{ size: "500g (12 pcs)", price: 195 }],
    price: 195, featured: false, newArrival: false,
  },
  {
    productName: "A2 Cow Milk Khoya", slug: "a2-cow-milk-khoya", category: "sweets", subCategory: "Sweet Making",
    shortDescription: "Slow-reduced khoya for home cooks who make their own mithai.",
    description: "For the home cooks who'd rather make their own gulab jamun and peda, we reduce our A2 milk down to a smooth, ready-to-use khoya — no shortcuts, no milk powder.",
    ingredients: ["A2 cow milk"],
    benefits: ["Made from slow-reduced whole milk", "No milk powder or additives", "Freezer-friendly"],
    nutrition: [{ label: "Energy", value: "421 kcal" }, { label: "Protein", value: "14.6 g" }, { label: "Fat", value: "25.3 g" }, { label: "Carbohydrate", value: "30.6 g" }, { label: "Calcium", value: "650 mg" }],
    packSizes: [{ size: "250g", price: 160 }],
    price: 160, featured: false, newArrival: false,
  },
];

const BLOGS = [
  {
    title: "What A2 Milk Actually Means — And Why It Matters",
    slug: "what-a2-milk-means",
    excerpt: "Unpacking the science and the sourcing behind the A2 protein conversation.",
    content:
      "A2 milk comes from cows that naturally produce only the A2 beta-casein protein, rather than a mix of A1 and A2 found in most commercial milk. For some people, A1 protein breaks down during digestion into a peptide that can cause discomfort — A2 milk sidesteps that entirely for many drinkers. At Vrinda, our A2 herd is made up of indigenous Gir and Sahiwal cows, breeds that have produced A2 milk for generations long before it became a market category. We test every batch to confirm purity, and we never blend it with A1 milk at any stage of collection or processing. The result is a product that's not just a trend, but a return to how milk was always meant to taste.",
    category: "Nutrition",
    author: "Vrinda Team",
    published: true,
  },
  {
    title: "Inside Our Cold Chain: From Farm Gate to Fridge",
    slug: "inside-our-cold-chain",
    excerpt: "A look at the logistics that keep every litre fresh for under six hours.",
    content:
      "Freshness is a logistics problem before it's a taste one. Every litre of milk that reaches your doorstep has travelled through a cold chain we've spent a decade refining: chilled within two hours of milking at village-level collection centres, transported in insulated tankers holding a strict 4°C, and processed the same morning it arrives. Our chilling centres are solar-assisted where possible, and every vehicle in our fleet carries a temperature logger that we audit weekly. It's not glamorous work, but it's the difference between milk that tastes like the farm and milk that just tastes like a carton.",
    category: "Behind the Scenes",
    author: "Vrinda Team",
    published: true,
  },
  {
    title: "The Farmers Behind Every Litre",
    slug: "farmers-behind-every-litre",
    excerpt: "Meet three of the 3,000+ families who partner with Vrinda across India.",
    content:
      "Behind every bottle of Vrinda milk is a farmer we know by name. We work with over three thousand smallholder families across Maharashtra and Karnataka, paying above-market rates and offering veterinary support, feed subsidies and interest-free equipment loans. For the Deshmukh family in Satara, that partnership meant being able to send their daughter to college for the first time. For the Patils in Kolhapur, it meant expanding from four cows to eleven over six years. These aren't just suppliers to us — they're the reason Vrinda exists at all, and their success is the metric we care about most.",
    category: "Community",
    author: "Vrinda Team",
    published: true,
  },
];

const RECIPES = [
  {
    title: "Saffron Kesar Kulfi",
    slug: "saffron-kesar-kulfi",
    description: "A creamy, cardamom-laced classic made with our full-cream milk and a whisper of saffron.",
    ingredients: ["1L Vrinda full-cream milk", "1/2 cup sugar", "A pinch of saffron strands", "1/2 tsp cardamom powder", "2 tbsp chopped pistachios"],
    instructions: [
      "Simmer the milk in a heavy-bottomed pan, stirring often, until reduced by half.",
      "Stir in the sugar, saffron and cardamom powder, and simmer for 5 more minutes.",
      "Let the mixture cool, then pour into kulfi moulds and freeze for at least 6 hours.",
      "Unmould, garnish with chopped pistachios, and serve immediately.",
    ],
    preparationTime: "15 min",
    cookingTime: "20 min",
  },
  {
    title: "Paneer Tikka Skewers",
    slug: "paneer-tikka-skewers",
    description: "Char-grilled paneer marinated in yogurt and spice, straight off the tawa.",
    ingredients: ["250g Vrinda malai paneer, cubed", "1/2 cup Vrinda yogurt", "1 tbsp ginger-garlic paste", "1 tsp red chilli powder", "1 tsp garam masala", "1 tbsp mustard oil", "Bell peppers and onion, cubed"],
    instructions: [
      "Whisk the yogurt with ginger-garlic paste, spices and mustard oil to make the marinade.",
      "Toss the paneer, peppers and onion in the marinade and rest for 30 minutes.",
      "Thread onto skewers, alternating paneer and vegetables.",
      "Grill or pan-sear on high heat, turning occasionally, until lightly charred on all sides.",
    ],
    preparationTime: "35 min",
    cookingTime: "10 min",
  },
  {
    title: "Ghee Roast Dosa",
    slug: "ghee-roast-dosa",
    description: "Crisp, golden and unapologetically generous with our bilona-churned ghee.",
    ingredients: ["2 cups dosa batter", "3 tbsp Vrinda desi cow ghee", "Salt to taste"],
    instructions: [
      "Heat a flat griddle and lightly grease with ghee.",
      "Pour a ladle of batter and spread thin in a circular motion.",
      "Drizzle ghee generously around the edges and let it cook until golden and crisp.",
      "Fold and serve hot with chutney and sambar.",
    ],
    preparationTime: "10 min",
    cookingTime: "15 min",
  },
];

const TESTIMONIALS = [
  {
    name: "Anjali Rao",
    review:
      "The ghee alone converted me. It smells like my grandmother's kitchen — and the paneer never breaks apart when I cook it.",
    rating: 5,
    status: "published",
  },
  {
    name: "Rohan Mehta",
    review:
      "We switched our entire café supply to Vrinda last year. Consistent quality, and our customers actually notice the difference.",
    rating: 5,
    status: "published",
  },
  {
    name: "Fatima Sheikh",
    review:
      "I recommend Vrinda to every client asking about clean dairy. Transparent sourcing, and it genuinely tastes fresher.",
    rating: 5,
    status: "published",
  },
  {
    name: "Karthik Iyer",
    review: "My kids can tell when milk isn't fresh. Vrinda is the only brand that's never once been sent back in our house.",
    rating: 4,
    status: "published",
  },
];

async function run() {
  await connectDB();

  const categoryDocs = {};
  for (const cat of CATEGORIES) {
    const doc = await Category.findOneAndUpdate({ slug: cat.slug }, cat, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    categoryDocs[cat.slug] = doc;
  }
  console.log(`Upserted ${CATEGORIES.length} categories.`);

  for (const product of PRODUCTS) {
    const { category: categorySlug, ...rest } = product;
    const category = categoryDocs[categorySlug];
    await Product.findOneAndUpdate(
      { slug: product.slug },
      { ...rest, category: category._id },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`Upserted ${PRODUCTS.length} products.`);

  for (const blog of BLOGS) {
    await Blog.findOneAndUpdate({ slug: blog.slug }, blog, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
  console.log(`Upserted ${BLOGS.length} blogs.`);

  for (const recipe of RECIPES) {
    await Recipe.findOneAndUpdate({ slug: recipe.slug }, recipe, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
  console.log(`Upserted ${RECIPES.length} recipes.`);

  for (const testimonial of TESTIMONIALS) {
    await Testimonial.findOneAndUpdate({ name: testimonial.name }, testimonial, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
  console.log(`Upserted ${TESTIMONIALS.length} testimonials.`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

/** @format */
const express = require("express");
const expressGraphQL = require("express-graphql");
const serverless = require("serverless-http");
var cors = require("cors");
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLNonNull,
} = require("graphql");
const app = express();
app.use(cors({ origin: true }));

const RecipeType = new GraphQLObjectType({
	name: "recipes",
	description: "Memanggil Semua recepis",
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
		koki: { type: GraphQLNonNull(GraphQLString) },
		ket: { type: GraphQLNonNull(GraphQLString) },
		foto: { type: GraphQLNonNull(GraphQLString) },
		linkvid: { type: GraphQLNonNull(GraphQLString) },
		prep: { type: GraphQLString },
		cook: { type: GraphQLString },
		rat: { type: GraphQLInt },
		step: {
			type: CaraType,
			resolve: recipe => {
				return step.find(step => step.id === recipe.id);
			},
		},
		gizi: {
			type: GiziType,
			resolve: recipe => {
				return gizi.find(gizi => gizi.id === recipe.id);
			},
		},
	}),
});
const GiziType = new GraphQLObjectType({
	name: "Gizi",
	description: "Mau Lihat Gizi ?",
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		kalor: { type: GraphQLString },
		fat: { type: GraphQLString },
		protein: { type: GraphQLString },
		karbo: { type: GraphQLString },
		koles: { type: GraphQLString },
	}),
});

const CaraType = new GraphQLObjectType({
	name: "Cara",
	description: "Mau Lihat cara",
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		step: { type: GraphQLList(GraphQLString) },
		ingridient: { type: GraphQLList(GraphQLString) },
	}),
});

const ReviewType = new GraphQLObjectType({
	name: "Review",
	description: "Review ",
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		nama: { type: GraphQLString },
		rat: { type: GraphQLInt },
		comment: { type: GraphQLString },
		recipe: {
			type: RecipeType,
			resolve: review => {
				return recipe.find(data => data.id === review.id);
			},
		},
	}),
});

const RootQueryType = new GraphQLObjectType({
	name: "Query",
	description: "Root Query",
	fields: () => ({
		recipe: {
			type: RecipeType,
			description: "Mengambil 1 data",
			args: {
				id: { type: GraphQLInt },
			},
			resolve: (parent, args) => recipe.find(book => book.id === args.id),
		},
		recipes: {
			type: new GraphQLList(RecipeType),
			description: "List of All recipe",
			resolve: () => recipe,
		},
		review: {
			type: new GraphQLList(ReviewType),
			description: "List of All Review",
			resolve: () => review,
		},
	}),
});
const RootMutationType = new GraphQLObjectType({
	name: "Mutation",
	description: "Root Mutation",
	fields: () => ({
		addRecipe: {
			type: RecipeType,
			description: "Add a recipe",
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				koki: { type: GraphQLNonNull(GraphQLString) },
				ket: { type: GraphQLNonNull(GraphQLString) },
				foto: { type: GraphQLNonNull(GraphQLString) },
				linkvid: { type: GraphQLNonNull(GraphQLString) },
				prep: { type: GraphQLString },
				cook: { type: GraphQLString },
				gizi: { type: GraphQLInt },
				step: { type: GraphQLInt },
			},
			resolve: (parent, args) => {
				const book = {
					id: recipe.length + 1,
					name: args.name,
					koki: args.koki,
					ket: args.ket,
					foto: args.foto,
					linkvid: args.linkvid,
					prep: args.prep,
					cook: args.cook,
					gizi: args.gizi,
					step: args.step,
				};
				recipe.push(book);
				return book;
			},
		},
	}),
});

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutationType,
});

app.use(
	"/graphql",
	expressGraphQL({
		schema: schema,
		graphiql: true,
	})
);
app.listen(process.env.PORT || 3000, () => console.log("Server Running"));
// module.exports = app;
// module.exports.handler = serverless(app);

/** @format */
const recipe = [
	{
		id: 1,
		name: "Crustless Spinach Quiche",
		koki: "Foodin",
		ket: "This delicious Crustless Spinach Quiche uses thinly sliced sweet potatoes instead of puff pastry as a base. The filling with eggs, spinach, and ricotta makes it extra creamy and flavorful. A must-have for your vegetarian recipes collection.",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2021/06/Crustless-Spinach-Quiche-2.jpg",
		linkvid: "https://youtube.com/embed/jdUJItIuo3A",
		prep: "10 minute",
		cook: "30 Minute",
		rat: 5,
		step: 1,
		gizi: 1,
	},
	{
		id: 2,
		name: "Vegan Overnight Oats",
		koki: "Foodin",
		ket: "The Most Amazing Vegan Overnight Oats with Vanilla flavor and topped with an out-of-this-world Vegan Chocolate Peanut Butter Banana Smoothie! All the hearts in my eyes!",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2018/01/Vegan-Overnight-Oats-Image.jpg",
		linkvid: "https://youtube.com/embed/9-N7J22bN3k",
		prep: "8 minute",
		cook: "10 Minute",
		rat: 5,
		step: 2,
		gizi: 2,
	},
	{
		id: 3,
		name: "Baked Haddock Recipe With Couscous",
		koki: "Foodin",
		ket: "A super easy, quick and delicious baked haddock recipe with herb couscous for those busy weeknights. A filling and highly nutritious meal that you can put together in just 20 minutes!",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2022/03/Baked-Haddock-with-Herb-Couscous.jpg",
		linkvid: "https://www.youtube.com/embed/J2tag_pk078",
		prep: "10 minute",
		cook: "20 Minute",
		rat: 5,
		step: 3,
		gizi: 3,
	},
	{
		id: 4,
		name: "Beef Vegetable Soup",
		koki: "Foodin",
		ket: "This hearty Beef Vegetable Soup will warm you up from the inside out. Chock full of veggies and lean ground beef, you will absolutely love it!",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2022/01/Beef-Vegetable-Soup-1000x1500.jpg",
		linkvid: "https://youtube.com/embed/6L5lxKB_ubU",
		prep: "20 minute",
		cook: "45 Minute",
		rat: 5,
		step: 4,
		gizi: 4,
	},
	{
		id: 5,
		name: "Peruvian Green Rice",
		koki: "Foodin",
		ket: "This Peruvian Green Rice is hands down the best rice side dish ever! The fresh cilantro not only makes the rice green, but it's also extraordinarily nutritious and delicious.",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2016/09/Peruvian-Green-Rice-1000x1500.jpg",
		linkvid: "https://youtube.com/embed/MaX6T2nsL1g",
		prep: "5 minute",
		cook: "20 Minute",
		rat: 4,
		step: 5,
		gizi: 5,
	},
	{
		id: 6,
		name: "Mediterranean Chicken Dinner",
		koki: "Foodin",
		ket: "This Mediterranean Chicken Dinner is bursting with flavor! Juicy chicken thighs with lemon garlic and thyme sauce and a bunch of vegetables. Chicken thighs have never tasted so good!",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2021/06/Mediterranean-Chicken-Dinner_-1000x1500.jpg",
		linkvid: "https://youtube.com/embed/QyXxsPitCbw",
		prep: "15 minute",
		cook: "50 Minute",
		rat: 5,
		step: 6,
		gizi: 6,
	},
	{
		id: 7,
		name: "Strawberry Smoothie Without Yogurt",
		koki: "Foodin",
		ket: "I struggle to eat enough fruit! This Strawberry Smoothie Without Yogurt makes it easy peasy to dump 2 servings of fruit in one go.",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2017/04/Strawberry-Smoothie-Without-Yogurt-Photo.jpg",
		linkvid: "https://youtube.com/embed/Rf0PP7j9LtU",
		prep: "5 minute",
		cook: "10 Minute",
		rat: 4,
		step: 7,
		gizi: 7,
	},
	{
		id: 8,
		name: "Mexican Hot Chocolate",
		koki: "Foodin",
		ket: "Ever wondered how to make Mexican Hot Chocolate? I've got the best Mexican Hot Chocolate Recipe ever for you! Lot's of spices and mixable with ANY kind of milk.",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2015/11/Mexican-Hot-Chocolate-Image.jpg",
		linkvid: "https://youtube.com/embed/fpgEWNPHF6M",
		prep: "5 minute",
		cook: "20 Minute",
		rat: 4,
		step: 8,
		gizi: 8,
	},
	{
		id: 9,
		name: "Failproof Instant Pot Pot Roast",
		koki: "Foodin",
		ket: "A fail-proof guide for Instant Pot Pot Roast and comparison to slow-cooker version. The easiest pot roast recipe with the best gravy ever! ",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2018/10/Instant-Pot-Pot-Roast-1.jpg",
		linkvid: "https://youtube.com/embed/5fFDXHKjssw",
		prep: "10 minute",
		cook: "60 Minute",
		rat: 4,
		step: 9,
		gizi: 9,
	},
	{
		id: 10,
		name: "Beautiful Apple Rose Tart",
		koki: "Foodin",
		ket: "n apple rose tart that will make your loved one drop their chin! It's not only a piece of art but also absolutely delicious. A gluten-free almond crust with sweet apples and coconut maple custard, what else can you want in life?",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2017/02/Apple-Rose-Tart-1000x1500.jpg",
		linkvid: "https://youtube.com/embed/cvhbvdNzXns",
		prep: "60 minute",
		cook: "45 Minute",
		rat: 5,
		step: 10,
		gizi: 10,
	},
];
const review = [
	{
		id: 1,
		nama: "anonymous",
		rat: 5,
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		recipe: 1,
	},
	{
		id: 2,
		nama: "anonymous",
		rat: 5,
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		recipe: 3,
	},
	{
		id: 3,
		nama: "anonymous",
		rat: 5,
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		recipe: 1,
	},
	{
		id: 4,
		nama: "anonymous",
		rat: 5,
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		recipe: 1,
	},
	{
		id: 5,
		nama: "anonymous",
		rat: 5,
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		recipe: 1,
	},
];
const gizi = [
	{
		id: 1,
		kalor: "211 kal",
		fat: "11 g",
		protein: "12 g",
		karbo: "16 g",
		koles: "180 mg",
	},
	{
		id: 2,
		kalor: "437 Kal",
		fat: "23 g",
		protein: "14 g",
		karbo: "46 g",
		koles: "0 mg",
	},
	{
		id: 3,
		kalor: "659 Kal",
		fat: "19 g",
		protein: "49 g",
		karbo: "70 g",
		koles: "130 mg",
	},
	{
		id: 4,
		kalor: "236 Kal",
		fat: "6 g",
		protein: "31 g",
		karbo: "15 g",
		koles: "70 mg",
	},
	{
		id: 5,
		kalor: "233 Kal",
		fat: "3 g",
		protein: "5 g",
		karbo: "46 g",
		koles: "0 mg",
	},
	{
		id: 6,
		kalor: "522 Kal",
		fat: "28 g",
		protein: "31 g",
		karbo: "37 g",
		koles: "142 mg",
	},
	{
		id: 7,
		kalor: "605 Kal",
		fat: "36 g",
		protein: "6 g",
		karbo: "64 g",
		koles: "0 mg",
	},
	{
		id: 8,
		kalor: "121 Kal",
		fat: "1 g",
		protein: "2 g",
		karbo: "29 g",
		koles: "0 mg",
	},
	{
		id: 9,
		kalor: "523 Kal",
		fat: "27 g",
		protein: "46 g",
		karbo: "24 g",
		koles: "156 mg",
	},
	{
		id: 10,
		kalor: "425 Kal",
		fat: "27 g",
		protein: "9 g",
		karbo: "44 g",
		koles: "69 mg",
	},
];

const step = [
	{
		id: 1,
		ingridient: [
			"2 sweet potatoes",
			"1 Tbsp avocado oil",
			"2 shallots",
			"3 cloves garlic",
			"5 oz baby spinach",
			"8 eggs",
			"?? cup milk",
			"6 Tbsp grated parmesan cheese",
			"sea salt",
			"pepper",
			"?? cup ricotta cheese",
			"?? cup grated cheddar cheese",
			"basil",
		],
		step: [
			"Preheat oven to 350F.",
			"Peel and thinly slice sweet potatoes (preferably with a mandoline). Cut off the end of a handful of slices to get a flat edge. Add slices to a bowl, drizzle with avocado oil and work oil into the slices with your hands",
			"Line a 9 pie dish with the sweet potato slices. The round slices for the bottom and the slices with the flat edge for the sides. Ensure they all overlap. Then prebake for 15 minutes. Set a timer!",
			"In the meantime, finely chop shallots and galric and then brown them in a large pan over medium low heat in a little avocado oil. Once brown, add spinach and saut?? for about 30 seconds or until wilted. Remove from the heat and let cool completely.",
			"Add eggs, half of the grated Parmesan, milk, and sea salt and pepper to taste to a large bowl and whisk until well combined. Then add cooled spinach mixture and use a spatula to mix in. Do NOT add hot spinach, it has to be cold enough to not start cooking the eggs.",
			"In a separate bowl mix ricotta, cheddar cheese and remaining grated Parmesan.",
			"Carefully pour egg filling into prebaked sweet potato crust and then add dollops of the ricotta mixture in an uneven pattern all over.",
			"Bake the quiche for 40-45 minutes or until the eggs are set.",
			"Turn on the broiler the last minute or two for a nice brown top. Garnish with basil if desired.",
		],
	},
	{
		id: 2,
		ingridient: [
			"1 large onion",
			"1 red pepper",
			"2 garlic cloves",
			"1 tbsp oil",
			"1 heaped tsp hot chilli powder (or 1 level tbsp if you only have mild)",
			"1 tsp paprika",
			"1 tsp ground cumin",
			"500g lean minced beef",
			"1 beef stock cube",
			"400g can chopped tomatoes",
			"?? tsp dried marjoram",
			"1 tsp sugar (or add a thumbnail-sized piece of dark chocolate along with the beans instead, see tip)",
			"2 tbsp tomato pur??e",
			"410g can red kidney beans",
			"plain boiled long grain rice, to serve",
			"soured cream, to serve",
		],
		step: [
			"Prepare your vegetables.??Chop??1 large onion into small dice, about 5mm square. The easiest way to do this is to cut the onion in half from root to tip, peel it and slice each half into thick matchsticks lengthways, not quite cutting all the way to the root end so they are still held together. Slice across the matchsticks into neat dice.",
			"Cut 1 red pepper in half lengthways, remove stalk and wash the seeds away, then chop.??Peel??and finely chop 2 garlic cloves.",
			"Start cooking. Put your??pan??on the hob over a medium heat. Add 1 tbsp oil and leave it for 1-2 minutes until hot (a little longer for an electric hob).",
			"Add the onion and cook, stirring fairly frequently, for about 5 minutes, or until the onion is soft, squidgy and slightly translucent.",
			"Tip in the garlic, red pepper, 1 heaped tsp hot chilli powder or 1 level tbsp mild chilli powder, 1 tsp paprika and 1 tsp ground cumin.",
			"Give it a good stir, then leave it to cook for another 5 minutes, stirring occasionally.",
			"Brown 500g lean minced beef.??Turn the heat up a bit, add the meat to the pan and break it up with your spoon or spatula. The mix should sizzle a bit when you add the mince.",
			"Keep stirring and prodding for at least 5 minutes, until all the mince is in uniform, mince-sized lumps and there are no more pink bits. Make sure you keep the heat hot enough for the meat to fry and become brown, rather than just stew.",
			"Make the sauce. Crumble 1 beef stock cube into 300ml hot water. Pour this into the pan with the mince mixture.",
			"Add a 400g can of chopped tomatoes. Tip in ?? tsp dried marjoram, 1 tsp sugar and add a good shake of salt and pepper. Squirt in about 2 tbsp tomato pur??e and stir the sauce well.",
			"Simmer it gently. Bring the whole thing to the boil, give it a good stir and put a lid on the pan. Turn down the heat until it is gently bubbling and leave it for 20 minutes.",
			"Check on the pan occasionally to stir it and make sure the sauce doesn???t catch on the bottom of the pan or isn???t drying out. If it is, add a couple of tablespoons of water and make sure that the heat really is low enough. After simmering gently, the saucy mince mixture should look thick, moist and juicy.",
			"Drain and rinse a 410g can of red kidney beans in a sieve and stir them into the chilli pot. Bring to the boil again, and gently bubble without the lid for another 10 minutes, adding a little more water if it looks too dry.",
			"Taste a bit of the chilli and season. It will probably take a lot more seasoning than you think.??",
			"Now replace the lid, turn off the heat and leave your chilli to stand for 10 minutes before serving. This is really important as it allows the flavours to mingle.",
			"Serve with soured cream and plain boiled long grain rice.",
		],
	},
	{
		id: 3,
		ingridient: [
			"1 lbs haddock fillet(s)",
			"1 Tbsp butter",
			"1 cup couscous",
			"1 cup parsley",
			"1/4 cup mint",
			"1/4 cup dill",
			"2-3 Tbsp olive oil",
			"sea salt",
			"pepper",
			"lemon",
		],
		step: [
			"Pat dry haddock fillet(s) and season generously with sea salt and pepper, then set aside.",
			"Preheat the oven to 400F with an ovenproof baking dish inside it.",
			"Bring 1 cup water to a boil in a pot or saucepan with a tight-fitting lid and once boiling add couscous and a little sea salt. Cover with the lid and immediately remove from the heat and set aside.",
			"In the meantime, chop herbs finely.",
			"By now the oven and dish should be hot, remove the dish, add butter and haddock and place back in the oven for 12-15 minutes depending on the thickness.",
			"Fluff couscous with a fork and season with olive oil, sea salt, pepper, and herbs, then serve on a plate and put cooked haddock on top.",
			"Drizzle with plenty of lemon juice and enjoy.",
		],
	},
	{
		id: 4,
		ingridient: [
			"1 yellow onion",
			"2 cloves garlic",
			"5 oz green beans",
			"1 red bell pepper",
			"3 stalks celery",
			"2 carrots",
			"1/2 cup parsley",
			"1 lbs ground beef",
			"1 tsp paprika",
			"1 tsp oregano",
			"1 tsp chili powder",
			"sea salt",
			"pepper",
			"1.5 cups canned diced tomatoes",
			"4 cups beef broth",
		],
		step: [
			"Finely chop onion and garlic and set aside.",
			"Cut green beans into 1 pieces, deseed bell pepper and cut into 1  pieces, cut celery into 1 pieces, and peel carrots and cut into bite-size pieces as well. Set aside.",
			"Destalk parsley and chop stems and leaves separately and set aside.",
			"Preheat a large pot over medium heat and once hot, add a drizzle of avocado oil, then add ground beef and break it apart and brown it. Once it's brown, remove it from the pot and drain.",
			"Put the pot back on the burner with a little fat left in it and fry onions and garlic until translucent.",
			"Add spices and stir well, then add the chopped vegetables, chopped parsley stems, diced tomatoes, browned beef, and beef broth.",
			"Stir everything well together, bring to a boil, then cover and reduce heat to low and simmer for 45-60 minutes.",
			"Serve over cooked rice or quinoa and sprinkle with chopped parsley leaves.",
		],
	},
	{
		id: 5,
		ingridient: [
			"1/2 bunch fresh cilantro",
			"1-1.5 cups broth ",
			"2 tsp avocado oil",
			"1 onion",
			"2 cloves garlic",
			"1 carrots",
			"1 tsp Aj?? amarillo paste",
			"1 cup Jasmine rice",
			"1/2 cup frozen peas",
			"sea salt and pepper if necessary",
		],
		step: [
			"Chop onion and garlic and peel and dice carrot.",
			"Add cilantro and broth to your blender and blend until the cilantro is completely liquified.",
			"Preheat the Instant Pot or a small saucepan over medium heat and once hot add a drizzle of oil, then fry chopped onion and garlic in it until translucent. Then add aj?? and stir-fry for a few more seconds.",
			"Add rice, cilantro water, and carrots to the onions and stir to combine.",
			"Stove-top: bring to a boil and as soon as slightly bubbly, reduce heat to low and immediately cover. Set a timer for 15 minutes.",
			"Instant Pot: put on the lid and seal. Set the pot to 3 minutes on high pressure, then wait for full natural pressure release.",
			"Add frozen peas and use a spoon or fork to mix in and fluff the rice. Then serve immediately.",
			"NOTES *for the Instant Pot you need only 1 cup, for cooking on the stove in a small pot with a tight-fitting lid you???ll need 1.5 cups. If your broth is low sodium you might want to add some salt, rice absorbs a lot of salt.",
		],
	},
	{
		id: 6,
		ingridient: [
			"1 lbs Fingerling potatoes or baby or new or creamer",
			"4 bone-in skin-on chicken thighs",
			"5 oz green beans",
			"5 shallots",
			"4-5 cloves garlic, chopped",
			"1/3 cup white wine or chicken broth",
			"1/3 cup chicken broth",
			"3-4 sprigs fresh thyme",
			"1 lbs asparagus",
			"2 cups cherry tomatoes",
			"1/4 cup green olives",
			"1/2 Tbsp olive oil",
			"sea salt",
			"pepper",
			"1-2 lemons",
		],
		step: [
			"Precook your potatoes either 10 minutes in boiling water on the stove or 5 minutes on high pressure in the pressure cooker. Then season the chicken thighs generously with sea salt and pepper.",
			"Preheat a larget pan over medium low heat and once hot add a drizzle of olive oil, then brown the seasoned chicken thighs 6-7 minutes per side or until nice and brown. remove from the pan and set aside.",
			"Add whole shallots to the pan juices and brown 3-4 minutes, then add chopped garlic and saut?? for just a few seconds. Add wine, broth, and thyme and deglaze the pan with a spatula or wooden spoon to remove all stuck-on bits and pieces and mix into the sauce.",
			"Half all potatoes and place in one layer into the pan with the sauce and then place the browned chicken on top. Put on the lid, reduce the heat to low and let simmer for 20 minutes.",
			"In the meantime, cut off the dry ends of the asparagus and cut the asparagus into about 2-inch pieces.",
			"Add the asparagus, tomatoes, and olives into the pan to the chicken and potatoes and put the lid back on and let the vegetables steam for 10-15 minutes.",
			"Drizzle with fresh lemon juice, sprinkle with a few leaves of fresh thyme if desired and serve.",
			"for extra crispy skin place the chicken thighs alone on a baking sheet right under the broiler for a minute or two.",
		],
	},
	{
		id: 7,
		ingridient: [
			"2 frozen bananas",
			"1 cup hulled strawberries",
			"1/2 cup coconut milk",
			"assorted frozen berries for decoration",
		],
		step: [
			"If you don't have frozen bananas yet, PEEL THEM, and then freeze them for at least 4 hours. I wrap them in parchment paper to avoid from sticking to anything or each other.",
			"Wash and hull strawberries, add hulled strawberries, bananas and coconut milk to blender and blend until smooth.",
			"Add frozen berries on top to beautify",
		],
	},
	{
		id: 8,
		ingridient: [
			"2 cups water",
			"1/2 cup raw cacao powder",
			"3.5 oz piloncillo/(100g)",
			"2 cloves or 1/8 tsp ground clove",
			"1 anis star or 1/4 tsp ground anis",
			"2 sticks cinnamon or 1 tsp ground cinnamon",
			"1 tsp vanilla bean or 2 tsp vanilla extract",
			"4 cups any kind of milk",
			"ground cinnamon",
		],
		step: [
			"Cut open vanilla bean lengthwise so the seeds have an easy way out add vanilla bean, piloncillo, raw cacao powder, cloves, anis star and cinnamon sticks to a saucepan and cover with 2 cups of water.",
			"Bring to a boil and reduce heat to a simmer. Cover the pot for about 5 minutes or until the sugar dissolved. Then remove the lid and let simmer uncovered for 15-20 minutes or until syrup-like consistency.",
			"Fish out spices or strain using a sieve.",
			"Heat 1 cup of milk of choice (froth if you like) and mix 1/4 cup of syrup with 1 cup hot milk. Sprinkle with a little ground cinnamon and enjoy!",
			"The chocolate syrup can be stored in the fridge for 3-5 days.",
		],
	},
	{
		id: 9,
		ingridient: [
			"4 lbs chuck roast (or round)",
			"cajun seasoning",
			"1 cup roasted red bell peppers",
			"1 cup beef broth",
			"1.5 lbs red potatoes",
			"1.5 lbs small carrots",
			"1/2 Tbsp avocado oil",
			"thyme",
			"2 Tbsp corn starch",
			"2 Tbsp cold water",
			"sea salt",
			"pepper",
		],
		step: [
			"Press saut??e button to preheat instant pot.",
			"Season roast generously with sea salt, pepper and cajun seasoning on both sides.",
			"Add a little avocado oil to instant pot and then brown roast for 2 minutes on all sides.",
			"Remove roast from pot and add a splash of water to deglaze.",
			"Add roasted bell peppers and broth to a high speed blender and blend until smooth.",
			"Return pot roast to instant pot and pour bell pepper sauce over it.",
			"Put on the lid and turn valve to sealing position.",
			"Set to 60 minutes on high pressure and then let pressure release naturally. This can take anywhere from 20-40 minutes.",
			"When high pressure cooking time is over, prepare red potatoes and carrots by adding to a baking sheet, drizzling with avocado oil and sprinkling with sea salt and pepper. Massage oil into each vegetable and then place fresh thyme on top of all. Then roast at 400F for 30-40 minutes or until potatoes are cooked through.",
			"Remove meat from instant pot and shred and serve on a serving plate with potatoes and carrots.",
			"Now prepare the gravy. You may want to strain the gravy and separate the fat with a fat separator, if so, now is the time. Then return the less-fat sauce back into the instant pot and press the saut?? button to bring to a boil",
			"Add cornstarch and cold water to a small bowl and mix well until all lumps are gone. Then add slurry to sauce and stir until desired thickness",
			"Pour gravy over pot roast and enjoy!",
		],
	},
	{
		id: 10,
		ingridient: [
			"2 cups almond flour",
			"2 Tbsp coconut oil",
			"3-4 Tbsp maple syrup",
			"1.25 cups full fat canned coconut milk",
			"1 egg",
			"2 egg yolks",
			"1/3 cup maple syrup",
			"5 apples or any kind, all same color or different colors ",
			"1 lemon",
			"1/4 cup demerara sugar - or any other raw sugar",
		],
		step: [
			"Prepare the apples: Wash, dry, and core apples, then slice very thinly (preferably with a mandoline) and immediately add to a large bowl filled with filtered water and fresh lemon juice. This is to avoid the apple getting brown. If you have a specific color pattern in mind for your tart, keep different colored apples separate in different bowls. If not, add all apple slices to the same bowl. Set aside.",
			"Prepare the almond dough: Add 2 cups almond flour to an air-tight sealable container. Add coconut oil to a 1/3 measuring cup and then fill that measuring cup to the top with maple syrup. Add the cup's ingredients to a heatproof container and melt coconut oil and maple syrup in the microwave or water bath. We need about 1/3 cup liquid for the almond flour but adjust the ratio to achieve a soft playdough-like consistency. The exact amount will depend on the grind of your almond flour. Watch the video to see what consistency you need. Put on the lid onto your container and place the dough in the fridge for about 15 minutes.",
			"Preheat the oven: to 350 F (180 ??C).",
			"Mix the custard: Add coconut milk, egg, egg yolks, and 1/3 cup maple syrup to a jar with a spout and whisk until well combined. Add less milk and more maple syrup if you like your tarts very sweet.",
			"Make the crust: Take the almond dough out of the fridge and place it in between two sheets of parchment paper to roll out into a large circle about 1/6 (4mm) thick. Then remove the top parchment paper, slide your hand under the other and flip the rolled out dough in one quick move over your removable bottom tart pan (either round or heart-shaped but with removable bottom, that's important!). Use the bits and pieces falling out to press into the sides. Be thorough so you have same-thickness sides that can hold in the custard while baking. If you like a crispy bottom prebake the crust for 10 minutes at 350. If you like it soft like marzipan at the bottom, leave raw.",
			"Form your apple rose: Boil some water in the kettle and add boiling water to a small bowl. Add one apple slice at a time into the boiling water with some tongs for about 3-4 seconds to make it pliable and then tightly roll the first slice into a circle, the next slice around that one and so on until you feel like you're not bending them too much anymore and they don't need any more hot water. Form the center of your rose over a wooden cutting board so it can absorb the excess water. Then once it's bigger add it to your tart pan and start adding apple slices around the rose. Have a clean kitchen towel handy to wipe the apple slices and remove excess water or you risk your tart crust getting soggy.",
			"Pour the custard: Once your whole tart pan is full, give your custard another quick whisk and then pour it slowly and carefully in between the apple slices.",
			"Bake the tart: Add the tart to the center of your 350F preheated oven and bake for initially 35 minutes, then check on it to see if you need to move it to another corner of your oven or turn it to ensure some slices don't burn while others stay completely uncooked. Bake the tart for 45-50 minutes in total or until the custard is set.",
			"Cool: It's very important that you let the tart cool down completely before you remove the tart pan side and cut into the tart. If it's still warm it will fall apart. Take it out of the oven and place it on a wire rack for at least 1 hour to cool down completely. THEN cut into it and serve.",
		],
	},
];

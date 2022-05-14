/** @format */
const express = require("express");
const expressGraphQL = require("express-graphql");
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
				return cara.find(cara.id === recipe.id);
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
	description: "Mau Lihat Gizi ?",
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		step: { type: GraphQLString },
		ing: { type: GraphQLString },
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
				id: { type: GraphQLNonNull(GraphQLInt) },
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
					ket: args.koki,
					foto: args.koki,
					linkvid: args.koki,
					prep: args.koki,
					cook: args.koki,
					gizi: args.koki,
					step: args.koki,
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
app.listen(5000, () => console.log("Server Running"));
/** @format */
const recipe = [
	{
		id: 1,
		name: "Crustless Spinach Quiche",
		koki: "Foodin",
		ket: "This delicious Crustless Spinach Quiche uses thinly sliced sweet potatoes instead of puff pastry as a base. The filling with eggs, spinach, and ricotta makes it extra creamy and flavorful. A must-have for your vegetarian recipes collection.",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2021/06/Crustless-Spinach-Quiche-2.jpg",
		linkvid: "https://youtu.be/jdUJItIuo3A",
		prep: "10 minute",
		cook: "30 Menute",
		rat: 5,
		step: 2,
		gizi: 3,
	},
	{
		id: 2,
		name: "Vegan Overnight Oats",
		koki: "Foodin",
		ket: "The Most Amazing Vegan Overnight Oats with Vanilla flavor and topped with an out-of-this-world Vegan Chocolate Peanut Butter Banana Smoothie! All the hearts in my eyes!",
		foto: "https://greenhealthycooking.com/wp-content/uploads/2018/01/Vegan-Overnight-Oats-Image.jpg",
		linkvid: "https://youtu.be/9-N7J22bN3k",
		prep: "10 minute",
		cook: "30 Minute",
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
		linkvid: "https://www.youtube.com/embed=J2tag_pk078",
		prep: "10 minute",
		cook: "20 Minute",
		rat: 5,
		step: 1,
		gizi: 1,
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
		kalor: "219.9 Kal",
		fat: "108 g",
		protein: "7.8 g",
		karbo: "22.3 g",
		koles: "374 mg",
	},
	{
		id: 3,
		kalor: "219.9 Kal",
		fat: "108 g",
		protein: "7.8 g",
		karbo: "22.3 g",
		koles: "374 mg",
	},
];

const step = [
	{
		id: 1,
		ing: [
			"2 sweet potatoes",
			"1 Tbsp avocado oil",
			"2 shallots",
			"3 cloves garlic",
			"5 oz baby spinach",
			"8 eggs",
			"½ cup milk",
			"6 Tbsp grated parmesan cheese",
			"sea salt",
			"pepper",
			"½ cup ricotta cheese",
			"½ cup grated cheddar cheese",
			"basil",
		],
		step: [
			"Preheat oven to 350F.",
			"Peel and thinly slice sweet potatoes (preferably with a mandoline). Cut off the end of a handful of slices to get a flat edge. Add slices to a bowl, drizzle with avocado oil and work oil into the slices with your hands",
			"Line a 9 pie dish with the sweet potato slices. The round slices for the bottom and the slices with the flat edge for the sides. Ensure they all overlap. Then prebake for 15 minutes. Set a timer!",
			"In the meantime, finely chop shallots and galric and then brown them in a large pan over medium low heat in a little avocado oil. Once brown, add spinach and sauté for about 30 seconds or until wilted. Remove from the heat and let cool completely.",
			"Add eggs, half of the grated Parmesan, milk, and sea salt and pepper to taste to a large bowl and whisk until well combined. Then add cooled spinach mixture and use a spatula to mix in. Do NOT add hot spinach, it has to be cold enough to not start cooking the eggs.",
			"In a separate bowl mix ricotta, cheddar cheese and remaining grated Parmesan.",
			"Carefully pour egg filling into prebaked sweet potato crust and then add dollops of the ricotta mixture in an uneven pattern all over.",
			"Bake the quiche for 40-45 minutes or until the eggs are set.",
			"Turn on the broiler the last minute or two for a nice brown top. Garnish with basil if desired.",
		],
	},
	{
		id: 2,
		ing: [
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
			"½ tsp dried marjoram",
			"1 tsp sugar (or add a thumbnail-sized piece of dark chocolate along with the beans instead, see tip)",
			"2 tbsp tomato purée",
			"410g can red kidney beans",
			"plain boiled long grain rice, to serve",
			"soured cream, to serve",
		],
		step: [
			"Prepare your vegetables. Chop 1 large onion into small dice, about 5mm square. The easiest way to do this is to cut the onion in half from root to tip, peel it and slice each half into thick matchsticks lengthways, not quite cutting all the way to the root end so they are still held together. Slice across the matchsticks into neat dice.",
			"Cut 1 red pepper in half lengthways, remove stalk and wash the seeds away, then chop. Peel and finely chop 2 garlic cloves.",
			"Start cooking. Put your pan on the hob over a medium heat. Add 1 tbsp oil and leave it for 1-2 minutes until hot (a little longer for an electric hob).",
			"Add the onion and cook, stirring fairly frequently, for about 5 minutes, or until the onion is soft, squidgy and slightly translucent.",
			"Tip in the garlic, red pepper, 1 heaped tsp hot chilli powder or 1 level tbsp mild chilli powder, 1 tsp paprika and 1 tsp ground cumin.",
			"Give it a good stir, then leave it to cook for another 5 minutes, stirring occasionally.",
			"Brown 500g lean minced beef. Turn the heat up a bit, add the meat to the pan and break it up with your spoon or spatula. The mix should sizzle a bit when you add the mince.",
			"Keep stirring and prodding for at least 5 minutes, until all the mince is in uniform, mince-sized lumps and there are no more pink bits. Make sure you keep the heat hot enough for the meat to fry and become brown, rather than just stew.",
			"Make the sauce. Crumble 1 beef stock cube into 300ml hot water. Pour this into the pan with the mince mixture.",
			"Add a 400g can of chopped tomatoes. Tip in ½ tsp dried marjoram, 1 tsp sugar and add a good shake of salt and pepper. Squirt in about 2 tbsp tomato purée and stir the sauce well.",
			"Simmer it gently. Bring the whole thing to the boil, give it a good stir and put a lid on the pan. Turn down the heat until it is gently bubbling and leave it for 20 minutes.",
			"Check on the pan occasionally to stir it and make sure the sauce doesn’t catch on the bottom of the pan or isn’t drying out. If it is, add a couple of tablespoons of water and make sure that the heat really is low enough. After simmering gently, the saucy mince mixture should look thick, moist and juicy.",
			"Drain and rinse a 410g can of red kidney beans in a sieve and stir them into the chilli pot. Bring to the boil again, and gently bubble without the lid for another 10 minutes, adding a little more water if it looks too dry.",
			"Taste a bit of the chilli and season. It will probably take a lot more seasoning than you think. ",
			"Now replace the lid, turn off the heat and leave your chilli to stand for 10 minutes before serving. This is really important as it allows the flavours to mingle.",
			"Serve with soured cream and plain boiled long grain rice.",
		],
	},
	{
		id: 3,
		ing: [
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
			"½ tsp dried marjoram",
			"1 tsp sugar (or add a thumbnail-sized piece of dark chocolate along with the beans instead, see tip)",
			"2 tbsp tomato purée",
			"410g can red kidney beans",
			"plain boiled long grain rice, to serve",
			"soured cream, to serve",
		],
		step: [
			"Prepare your vegetables. Chop 1 large onion into small dice, about 5mm square. The easiest way to do this is to cut the onion in half from root to tip, peel it and slice each half into thick matchsticks lengthways, not quite cutting all the way to the root end so they are still held together. Slice across the matchsticks into neat dice.",
			"Cut 1 red pepper in half lengthways, remove stalk and wash the seeds away, then chop. Peel and finely chop 2 garlic cloves.",
			"Start cooking. Put your pan on the hob over a medium heat. Add 1 tbsp oil and leave it for 1-2 minutes until hot (a little longer for an electric hob).",
			"Add the onion and cook, stirring fairly frequently, for about 5 minutes, or until the onion is soft, squidgy and slightly translucent.",
			"Tip in the garlic, red pepper, 1 heaped tsp hot chilli powder or 1 level tbsp mild chilli powder, 1 tsp paprika and 1 tsp ground cumin.",
			"Give it a good stir, then leave it to cook for another 5 minutes, stirring occasionally.",
			"Brown 500g lean minced beef. Turn the heat up a bit, add the meat to the pan and break it up with your spoon or spatula. The mix should sizzle a bit when you add the mince.",
			"Keep stirring and prodding for at least 5 minutes, until all the mince is in uniform, mince-sized lumps and there are no more pink bits. Make sure you keep the heat hot enough for the meat to fry and become brown, rather than just stew.",
			"Make the sauce. Crumble 1 beef stock cube into 300ml hot water. Pour this into the pan with the mince mixture.",
			"Add a 400g can of chopped tomatoes. Tip in ½ tsp dried marjoram, 1 tsp sugar and add a good shake of salt and pepper. Squirt in about 2 tbsp tomato purée and stir the sauce well.",
			"Simmer it gently. Bring the whole thing to the boil, give it a good stir and put a lid on the pan. Turn down the heat until it is gently bubbling and leave it for 20 minutes.",
			"Check on the pan occasionally to stir it and make sure the sauce doesn t catch on the bottom of the pan or isn’t drying out. If it is, add a couple of tablespoons of water and make sure that the heat really is low enough. After simmering gently, the saucy mince mixture should look thick, moist and juicy.",
			"Drain and rinse a 410g can of red kidney beans in a sieve and stir them into the chilli pot. Bring to the boil again, and gently bubble without the lid for another 10 minutes, adding a little more water if it looks too dry.",
			"Taste a bit of the chilli and season. It will probably take a lot more seasoning than you think. ",
			"Now replace the lid, turn off the heat and leave your chilli to stand for 10 minutes before serving. This is really important as it allows the flavours to mingle.",
			"Serve with soured cream and plain boiled long grain rice.",
		],
	},
];

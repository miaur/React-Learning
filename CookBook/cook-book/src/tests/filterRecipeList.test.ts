import { Filter } from "../components/stores/RecipesListFilter/Filter";
import { DishType, RecipeModel } from "../models/RecipeModel";
import { IngredientType } from "../models/IngredientModel";
import { getFavoriresList } from "../components/RecepieControl/FavoritesList";
jest.mock("../components/RecepieControl/FavoritesList", () => ({
  getFavoriresList: jest.fn(),
}));
const mockedGetFavoriresList = getFavoriresList as jest.Mock;

const testRecipesList: Array<RecipeModel> = [
  {
    id: "56c782f18990ecf954f6e027",
    type: "second course",
    title: "Crock Pot Roast",
    date: "Tue Oct 27 2020",
    timetocook: 5,
    ingredients: [
      {
        quantity: "1",
        name: " beef roast",
        type: "meat",
      },
      {
        quantity: "1 package",
        name: "brown gravy mix",
        type: "meat",
      },
      {
        quantity: "1 package",
        name: "dried Italian salad dressing mix",
        type: "meat",
      },
      {
        quantity: "1 package",
        name: "dry ranch dressing mix",
        type: "meat",
      },
      {
        quantity: "1/2 cup",
        name: "water",
        type: "meat",
      },
    ],
    directions: [
      "Place beef roast in crock pot.",
      "Mix the dried mixes together in a bowl and sprinkle over the roast.",
      "Pour the water around the roast.",
      "Cook on low for 7-9 hours.",
    ],
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F08%2F30%2Fcreamy-pork-stew.jpeg&w=640&h=428&c=sc&poi=face&q=85",
  },
  {
    id: "56c782f18990ecf954f6e026",
    type: "vegan",
    title: "Roasted Asparagus",
    date: "Tue Oct 20 2020",
    timetocook: 16,
    ingredients: [
      {
        quantity: "1 lb",
        name: " asparagus",
        type: "other",
      },
      {
        quantity: "1 1/2 tbsp",
        name: "olive oil",
        type: "other",
      },
      {
        quantity: "1/2 tsp",
        name: "kosher salt",
        type: "flavoring",
      },
    ],
    directions: [
      "Preheat oven to 425°F.",
      "Cut off the woody bottom part of the asparagus spears and discard.",
      'With a vegetable peeler, peel off the skin on the bottom 2-3 inches of the spears (this keeps the asparagus from being all.",string.", and if you eat asparagus you know what I mean by that).',
      "Place asparagus on foil-lined baking sheet and drizzle with olive oil.",
      "Sprinkle with salt.",
      "With your hands, roll the asparagus around until they are evenly coated with oil and salt.",
      "Roast for 10-15 minutes, depending on the thickness of your stalks and how tender you like them.",
      "They should be tender when pierced with the tip of a knife.",
      "The tips of the spears will get very brown but watch them to prevent burning.",
      "They are great plain, but sometimes I serve them with a light vinaigrette if we need something acidic to balance out our meal.",
    ],
    image:
      "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/50/84/7/picMcSyVd.jpg",
  },
  {
    id: "56c782f18990ecf954f6e025",
    type: "desert",
    title: "Curried Lentils and Rice",
    date: "2016-06-09T15:03:23.000Z",
    timetocook: 20,
    ingredients: [
      {
        quantity: "1 quart",
        name: "beef broth",
        type: "fish",
      },
      {
        quantity: "1 cup",
        name: "dried green lentils",
        type: "fruits",
      },
      {
        quantity: "1/2 cup",
        name: "basmati rice",
        type: "dairy",
      },
      {
        quantity: "1 tsp",
        name: "curry powder",
        type: "spice",
      },
      {
        quantity: "1 tsp",
        name: "salt",
        type: "spice",
      },
    ],
    directions: [
      "Bring broth to a low boil.",
      "Add curry powder and salt.",
      "Cook lentils for 20 minutes.",
      "Add rice and simmer for 20 minutes.",
      "Enjoy!",
    ],
    image:
      "http://dagzhsfg97k4.cloudfront.net/wp-content/uploads/2012/05/lentils3.jpg",
  },
];

test("filter by title", () => {
  let filter: Filter = new Filter();
  filter.timeToCookFrom = "";
  filter.timeToCookTo = "";
  filter.favorites = false;
  filter.dishType = [];
  filter.ingredientsType = [];

  filter.currentRecipesList = testRecipesList;
  filter.title = "oa";

  expect(Filter.filterByTitle(filter.currentRecipesList[0], filter.title)).toBe(
    true
  );
  expect(Filter.filterByTitle(filter.currentRecipesList[1], filter.title)).toBe(
    true
  );
  expect(Filter.filterByTitle(filter.currentRecipesList[2], filter.title)).toBe(
    false
  );

  expect(filter.filteredRecipesList.length).toBe(2);
});

test("filter by timeToCookTo", () => {
  let filter: Filter = new Filter();
  filter.favorites = false;
  filter.dishType = [];
  filter.ingredientsType = [];
  filter.title = "";

  filter.currentRecipesList = testRecipesList;
  filter.timeToCookFrom = "10";
  filter.timeToCookTo = "21";

  expect(
    Filter.filterByTimeToCook(
      filter.currentRecipesList[0],
      filter.timeToCookFrom,
      filter.timeToCookTo
    )
  ).toBe(false);
  expect(
    Filter.filterByTimeToCook(
      filter.currentRecipesList[1],
      filter.timeToCookFrom,
      filter.timeToCookTo
    )
  ).toBe(true);
  expect(
    Filter.filterByTimeToCook(
      filter.currentRecipesList[2],
      filter.timeToCookFrom,
      filter.timeToCookTo
    )
  ).toBe(true);
  expect(filter.filteredRecipesList.length).toBe(2);
});

test("filter by dishType", () => {
  let filter: Filter = new Filter();
  filter.favorites = false;
  filter.ingredientsType = [];
  filter.title = "";
  filter.timeToCookFrom = "";
  filter.timeToCookTo = "";

  filter.currentRecipesList = testRecipesList;
  filter.dishType = [DishType.secondCourse];
  expect(filter.filteredRecipesList.length).toBe(1);

  filter.dishType = [DishType.secondCourse, DishType.vegan];
  expect(filter.filteredRecipesList.length).toBe(2);

  filter.dishType = [DishType.secondCourse, DishType.vegan, DishType.desert];
  expect(filter.filteredRecipesList.length).toBe(3);

  filter.dishType = [DishType.secondCourse, DishType.vegan, DishType.soup];
  expect(filter.filteredRecipesList.length).toBe(2);
});

test("filter by favorites", () => {
  let filter: Filter = new Filter();
  filter.ingredientsType = [];
  filter.title = "";
  filter.timeToCookFrom = "";
  filter.timeToCookTo = "";
  filter.dishType = [];

  filter.currentRecipesList = testRecipesList;
  filter.favorites = true;

  let favoritesList = new Array<string>();
  const mockLocalStorage = jest.fn((recipe) => {
    return Filter.filterFavorites(recipe, favoritesList);
  });

  testRecipesList.forEach(mockLocalStorage);
  expect(mockLocalStorage.mock.calls.length).toBe(3);
  expect(mockLocalStorage.mock.results[0].value).toBe(false);

  favoritesList = new Array<string>("56c782f18990ecf954f6e027");
  testRecipesList.forEach(mockLocalStorage);
  expect(mockLocalStorage.mock.calls.length).toBe(6);
  expect(mockLocalStorage.mock.results[3].value).toBe(true);
  expect(mockLocalStorage.mock.results[4].value).toBe(false);
});

test("filter by favorites with mock favorites list", () => {
  let filter: Filter = new Filter();
  filter.ingredientsType = [];
  filter.title = "";
  filter.timeToCookFrom = "";
  filter.timeToCookTo = "";
  filter.dishType = [];

  filter.currentRecipesList = testRecipesList;
  filter.favorites = true;

  mockedGetFavoriresList.mockImplementation(() => {
    return new Array<string>(
      "56c782f18990ecf954f6e027",
      "56c782f18990ecf954f6e026",
      "abra-cadabra"
    );
  });
  expect(filter.filteredRecipesList.length).toBe(2);
});

test("filter by ingredientsType", () => {
  let filter: Filter = new Filter();
  filter.title = "";
  filter.timeToCookFrom = "";
  filter.timeToCookTo = "";
  filter.dishType = [];
  filter.favorites = false;

  filter.currentRecipesList = testRecipesList;

  filter.ingredientsType = [IngredientType.fish];
  expect(filter.filteredRecipesList.length).toBe(1);

  filter.ingredientsType = [IngredientType.other];
  expect(filter.filteredRecipesList.length).toBe(1);

  filter.ingredientsType = [IngredientType.spice];
  expect(filter.filteredRecipesList.length).toBe(1);

  filter.ingredientsType = [IngredientType.spice, IngredientType.meat];
  expect(filter.filteredRecipesList.length).toBe(2);

  filter.ingredientsType = [
    IngredientType.meat,
    IngredientType.flavoring,
    IngredientType.fruits,
  ];
  expect(filter.filteredRecipesList.length).toBe(3);

  filter.ingredientsType = [IngredientType.condiments];
  expect(filter.filteredRecipesList.length).toBe(0);

  filter.ingredientsType = [IngredientType.spice, IngredientType.fish];
  expect(filter.filteredRecipesList.length).toBe(1);
});

test("filter by all criteria", () => {
  let filter: Filter = new Filter();
  filter.title = "oa";
  filter.timeToCookFrom = "";
  filter.timeToCookTo = "10";
  filter.dishType = [DishType.secondCourse];
  filter.ingredientsType = [IngredientType.meat];

  filter.currentRecipesList = testRecipesList;
  filter.favorites = false;
  expect(filter.filteredRecipesList.length).toBe(1);

  mockedGetFavoriresList.mockImplementation(() => {
    return new Array<string>();
  });
  filter.favorites = true;
  expect(filter.filteredRecipesList.length).toBe(0);

  mockedGetFavoriresList.mockImplementation(() => {
    return new Array<string>("56c782f18990ecf954f6e027");
  });
  expect(filter.filteredRecipesList.length).toBe(1);

  filter.dishType = [DishType.vegan];
  expect(filter.filteredRecipesList.length).toBe(0);

  filter.dishType = [DishType.vegan, DishType.secondCourse];
  expect(filter.filteredRecipesList.length).toBe(1);
});

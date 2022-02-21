import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      source: recipe.source_url,
      id: recipe.id,
      image: recipe.image_url,
      title: recipe.title,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      sourceUrl: recipe.source_url,
    };
  } catch (error) {
    console.log(error);
  }
};

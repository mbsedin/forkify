// Modules
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

// Polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

// Show recipe in the recipe container
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 0. Render spinner
    recipeView.renderSpinner();

    // 1. Rendering the recipe
    await model.loadRecipe(id);

    // 2. renderSpinner
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

// Show recipes in the result container
const controlSearchResults = async function () {
  try {
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResults(query);

    //3) Render results
    console.log(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

// Render recipe on load and HashChange
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

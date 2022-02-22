// Modules
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsViews from "./views/resultsViews.js";
// Polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

// Hot module reload
if (module.hot) {
  module.hot.accept();
}

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
    resultsViews.renderSpinner();

    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResults(query);

    //3) Render results
    resultsViews.render(model.state.search.results);
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

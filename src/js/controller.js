// Modules
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// Polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

// Show recipe in the recipe container
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // 1.) Rendering the recipe
    await model.loadRecipe(id);

    // 2. renderSpinner
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);

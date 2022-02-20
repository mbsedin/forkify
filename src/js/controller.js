const { async } = require("regenerator-runtime");

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function () {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=47161`
    );
    const data = await res.json();
    // Send customer error message to the tach() method
    if (!res.ok) throw new Error(`${data.error} (${res.status})`);

    // replace dashed_names properties from the api
    let { recipe } = data; // object destructuring , fields should match
    recipe = {
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      recipeId: recipe.recipe_id,
      imageUrl: recipe.image_url,
      socialRank: recipe.social_rank,
      publisherUrl: recipe.publisher_url,
      title: recipe.title,
    };
    console.log(recipe);
  } catch (error) {
    alert(error);
  }
};

showRecipe();

export const state = {};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.error} (${res.status})`);
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
    alert(error);
  }
};

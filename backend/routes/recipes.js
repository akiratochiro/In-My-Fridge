const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const selectedIngredient = req.query.ingredients?.toLowerCase();

    if (!selectedIngredient) {
      return res.status(400).json({
        message: 'Ingredient is required'
      });
    }

    // Primeira chamada: receitas que contêm o ingrediente
    const filterResponse = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`
    );

    if (!filterResponse.data.meals) {
      return res.json([]);
    }

    const firstFiveMeals = filterResponse.data.meals.slice(0, 5);

    // Segunda chamada: detalhes completos de cada receita
    const detailedRecipes = await Promise.all(
      firstFiveMeals.map(async (meal) => {
        const detailsResponse = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(meal.strMeal)}`
        );

        const recipe = detailsResponse.data.meals?.[0];

        if (!recipe) return null;

        return {
          id: recipe.idMeal,
          name: recipe.strMeal,
          thumbnail: recipe.strMealThumb,
          area: recipe.strArea,
          category: recipe.strCategory,
          instructions: recipe.strInstructions,
          youtube: recipe.strYoutube
        };
      })
    );

    res.json(detailedRecipes.filter(Boolean));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to fetch recipes'
    });
  }
});

module.exports = router;
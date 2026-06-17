const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let ingredients = req.query.ingredients;

    if (!ingredients) {
      return res.status(400).json({
        message: "Ingredients are required",
      });
    }

    // transforma em array
    const ingredientList = ingredients
      .split(",")
      .map((i) => i.trim().toLowerCase())
      .filter(Boolean);

    if (ingredientList.length === 0) {
      return res.json([]);
    }

    // 1. busca por cada ingrediente
    const responses = await Promise.all(
      ingredientList.map((ing) =>
        axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`,
        ),
      ),
    );

    // 2. transforma em sets de IDs
    const sets = responses.map(
      (res) => new Set((res.data.meals || []).map((meal) => meal.idMeal)),
    );

    // 3. interseção de sets (AND lógico)
    const intersection = [
      ...sets.reduce((acc, set) => {
        return new Set([...acc].filter((x) => set.has(x)));
      }),
    ];

    if (intersection.length === 0) {
      return res.json([]);
    }

    // 4. pega detalhes completos (limitado a 5)
    const finalIds = intersection.slice(0, 10);

    const detailedRecipes = await Promise.all(
      finalIds.map(async (id) => {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );

        const recipe = response.data.meals?.[0];

        if (!recipe) return null;

        return {
          id: recipe.idMeal,
          name: recipe.strMeal,
          thumbnail: recipe.strMealThumb,
          area: recipe.strArea,
          category: recipe.strCategory,
          instructions: recipe.strInstructions,
          ingredients: Array.from({ length: 20 })
            .map((_, i) => recipe[`strIngredient${i + 1}`])
            .filter(Boolean)
            .filter((ing) => ing.trim() !== ""),
          youtube: recipe.strYoutube,
        };
      }),
    );

    res.json(detailedRecipes.filter(Boolean));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch recipes",
    });
  }
});

module.exports = router;

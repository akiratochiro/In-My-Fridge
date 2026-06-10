const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {

  try{
const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=l'
    );
  const allRecipes = response.data.meals.map(
      item => item.strMeal
    );
    
       res.json(allRecipes.slice(0, 5));

  }catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to fetch recipes'
    });
  }


});

module.exports = router;
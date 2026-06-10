const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase() || '';

    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    );

    const ingredients = response.data.meals.map(
      item => item.strIngredient
    );

    const filtered = ingredients.filter(item =>
      item.toLowerCase().startsWith(query)
    );

    res.json(filtered.slice(0, 5));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to fetch ingredients'
    });
  }
});

module.exports = router;
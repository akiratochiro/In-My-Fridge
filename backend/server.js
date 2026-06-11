const express = require('express');
const cors = require('cors');

const ingredientsRoute = require('./routes/ingredients');
const recipesRoute = require('./routes/recipes');

const app = express();
const PORT = 3333;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'In My Fridge API running'
  });
});

// Routes
app.use('/ingredients', ingredientsRoute);
app.use('/recipes', recipesRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
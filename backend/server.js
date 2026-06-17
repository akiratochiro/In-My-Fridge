const express = require('express');
const cors = require('cors');

const ingredientsRoute = require('./routes/ingredients');
const recipesRoute = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 3333;

// Middlewares
app.use(cors({
  origin: '*', 
}));app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'in-my-fridge-api',
    time: new Date().toISOString()
  });
});

// Routes
app.use('/ingredients', ingredientsRoute);
app.use('/recipes', recipesRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
import { useState } from 'react';
import IngredientPanel from './components/IngredientPanel/IngredientPanel';
import RecipePanel from './components/RecipePanel/RecipePanel';
import { fetchRecipes } from './services/recipesService';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const handleIngredientsChange = async (newIngredients) => {
    setIngredients(newIngredients);

    if (newIngredients.length === 0) {
      setRecipes([]);
      return;
    }

    const data = await fetchRecipes(newIngredients);
    setRecipes(data);
  };

  return (
    <div className="container-fluid vh-100 bg-light p-3">
      <div className="row h-100 g-3">

        <div className="col-md-4 h-100">
          <div className="h-100 bg-white shadow-sm rounded-4 p-3">
            <IngredientPanel
              ingredients={ingredients}
              setIngredients={handleIngredientsChange}
            />
          </div>
        </div>

        <div className="col-md-8 h-100">
          <div className="h-100 bg-white shadow-sm rounded-4 p-3 overflow-hidden">
            <RecipePanel recipes={recipes} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
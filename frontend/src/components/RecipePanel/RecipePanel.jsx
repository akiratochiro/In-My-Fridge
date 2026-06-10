function RecipePanel({ recipes = [] }) {
    console.log(recipes);
    if (!Array.isArray(recipes)) {
  return <p>Loading recipes...</p>;
}
  return (
    <div className="h-100 overflow-auto">
      <h2>Recipes</h2>

      {recipes.length === 0 && (
        <p className="text-muted mt-3">
          Add ingredients to find recipes
        </p>
      )}

      <div className="mt-3 d-flex flex-column gap-2">
        {recipes.map((recipe, index) => (
          <div key={index} className="card p-3 shadow-sm">
            <h5>{recipe.name}</h5>

            {recipe.match && (
              <small className="text-muted">
                Match: {recipe.match} ingredients
              </small>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipePanel;
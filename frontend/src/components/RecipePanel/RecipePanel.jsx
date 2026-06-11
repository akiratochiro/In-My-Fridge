function RecipePanel({ recipes }) {
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

      <div className="mt-3 d-flex flex-column gap-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card shadow-sm border-0"
          >
            <div className="row g-0">

              <div className="col-md-4">
                <img
                  src={recipe.thumbnail}
                  alt={recipe.name}
                  className="img-fluid rounded-start h-100"
                  style={{
                    objectFit: 'cover',
                    minHeight: '220px'
                  }}
                />
              </div>

              <div className="col-md-8">
                <div className="card-body">

                  <h5 className="card-title">
                    {recipe.name}
                  </h5>

                  <div className="mb-2">
                    <span className="badge bg-primary me-2">
                      {recipe.category}
                    </span>

                    <span className="badge bg-secondary">
                      {recipe.area}
                    </span>
                  </div>

                  <p className="card-text text-muted">
                    {recipe.instructions?.length > 200
                      ? recipe.instructions.slice(0, 200) + '...'
                      : recipe.instructions}
                  </p>

                  {recipe.youtube && (
                    <a
                      href={recipe.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-danger btn-sm"
                    >
                      Watch on YouTube
                    </a>
                  )}

                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipePanel;
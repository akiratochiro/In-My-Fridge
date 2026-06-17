import { useState } from "react";

function RecipePanel({ recipes }) {
  const [expandedRecipes, setExpandedRecipes] = useState({});

  const toggleRecipe = (id) => {
    setExpandedRecipes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!Array.isArray(recipes)) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Loading recipes...
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Recipes
        </h2>

        <span className="text-xs text-gray-400">{recipes.length} results</span>
      </div>

      {/* Empty state */}
      {recipes.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🍳</div>
          <p className="text-sm">Add ingredients to find recipes</p>
        </div>
      )}

      {/* Cards */}
      <div className="flex flex-col gap-5">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/3 h-52 md:h-auto overflow-hidden">
                <img
                  src={recipe.thumbnail}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="md:w-2/3 p-5 flex flex-col justify-between">
                {/* Title */}
                <h5 className="text-lg font-semibold text-gray-800 mb-2">
                  {recipe.name}
                </h5>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-black text-white">
                    {recipe.category}
                  </span>

                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                    {recipe.area}
                  </span>
                </div>

                {/* Description */}
                <div className="text-sm text-gray-500 leading-relaxed">
                  {expandedRecipes[recipe.id] ? (
                    <>
                      <div className="space-y-3">
                        {recipe.instructions
                          ?.split(/\r\n|\n|\r/)
                          .filter((line) => line.trim() !== "")
                          ?.map((line, index) => (
                            <p key={index} className="whitespace-pre-line">
                              {line}
                            </p>
                          ))}
                      </div>

                      <button
                        onClick={() => toggleRecipe(recipe.id)}
                        className="mt-3 text-blue-500 text-xs font-medium hover:underline"
                      >
                        less
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="whitespace-pre-line">
                        {recipe.instructions
                          ?.split(/\r\n|\n|\r/)
                          .filter((line) => line.trim() !== "")
                          ?.slice(0, 1)
                          .join(" ")
                          .trim() +
                          (recipe.instructions
                            ?.split(/\r\n|\n|\r/)
                            .filter((line) => line.trim() !== "")?.length > 3
                            ? "..."
                            : "")}
                      </p>

                      {recipe.instructions
                        ?.split(/\r\n|\n|\r/)
                        .filter((line) => line.trim() !== "")?.length > 3 && (
                        <button
                          onClick={() => toggleRecipe(recipe.id)}
                          className="ml-2 text-blue-500 text-xs font-medium hover:underline"
                        >
                          more
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Ingredients */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                    Ingredients
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients?.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200 shadow-sm hover:shadow transition"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                {recipe.youtube && (
                  <a
                    href={recipe.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium transition"
                  >
                    ▶ Watch on YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipePanel;

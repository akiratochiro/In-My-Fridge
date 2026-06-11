import { useState } from 'react';
import { fetchIngredients } from '../../services/ingredientsService';

function IngredientPanel({ ingredients, setIngredients }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const addIngredient = (ingredient) => {
    if (!ingredient) return;

    if (!ingredients.includes(ingredient)) {
      const updated = [...ingredients, ingredient];
      console.log(updated);
      setIngredients(updated);
    }

    setInputValue('');
    setSuggestions([]);
  };

  const removeIngredient = (ingredientToRemove) => {
    const updated = ingredients.filter(i => i !== ingredientToRemove);
    setIngredients(updated);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    const data = await fetchIngredients(value);
    setSuggestions(data);
  };

  const handleSelect = (ingredient) => {
    addIngredient(ingredient);
    console.log("You have selected the ingredient ", ingredient);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addIngredient(inputValue.trim());
    }
  };

  return (
    <div className="h-100">
      <h2>Ingredients</h2>

      <input
        className="form-control mt-3"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type an ingredient..."
      />

      {/* suggestions */}
      {suggestions.length > 0 && (
        <ul className="list-group mt-2">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(item)}
              style={{ cursor: 'pointer' }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* tags */}
      <div className="d-flex flex-wrap gap-2 mt-3">
        {ingredients.map((item, index) => (
          <span
            key={index}
            className="badge bg-primary d-flex align-items-center gap-2 p-2"
          >
            {item}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => removeIngredient(item)}
            >
              ✕
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default IngredientPanel;
import { useState } from 'react';
import { fetchIngredients } from '../../services/ingredientsService';
import IntroCard from './introCard';

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
    <div className="h-full w-full flex flex-col gap-6 p-6 bg-gradient-to-b from-white to-gray-50 rounded-2xl">

  {/* Header / Intro */}
  <div className="space-y-2">

<br></br>
    <IntroCard />
  </div>

  {/* Section title */}
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
      Ingredients
    </h2>

    <span className="text-xs text-gray-400">
      {ingredients.length} added
    </span>
  </div>

  {/* Input */}
  <div className="relative">
    <input
      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Type an ingredient..."
    />

    {/* subtle glow effect */}
    <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-black/5"></div>
  </div>

  {/* Suggestions */}
  {suggestions.length > 0 && (
    <ul className="bg-white border border-gray-100 rounded-xl shadow-md overflow-hidden divide-y divide-gray-100">
      {suggestions.map((item, index) => (
        <li
          key={index}
          onClick={() => handleSelect(item)}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition"
        >
          {item}
        </li>
      ))}
    </ul>
  )}

  {/* Ingredients tags */}
  <div className="flex flex-wrap gap-2">
    {ingredients.map((item, index) => (
      <div
        key={index}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-sm shadow-sm hover:scale-105 transition-transform"
      >
        <span>{item}</span>

        <button
          onClick={() => removeIngredient(item)}
          className="text-white/70 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    ))}
  </div>

</div>
  );
}

export default IngredientPanel;
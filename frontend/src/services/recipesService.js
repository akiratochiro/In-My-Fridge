import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRecipes = async (ingredients) => {
  const query = ingredients.join(',');

  const res = await axios.get(
    `${API_URL}/recipes?ingredients=${query}`
  );

  return res.data;
};
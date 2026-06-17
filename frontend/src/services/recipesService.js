import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRecipes = async (ingredients) => {
  try {
    if (!ingredients || ingredients.length === 0) {
      return [];
    }

    const query = ingredients.join(',');

    const res = await axios.get(
      `${API_URL}/recipes?ingredients=${encodeURIComponent(query)}`
    );

    return res.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};
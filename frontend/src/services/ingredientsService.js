import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchIngredients = async (query) => {
  const res = await axios.get(
    `${API_URL}/ingredients?q=${query}`
  );

  return res.data;
};
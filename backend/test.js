const api_url = "www.themealdb.com/api/json/v1/1/filter.php?i=";
const ingredient = "chicken_breast";

fetch(`https://${api_url}${ingredient}`)
  .then(response => response.json())
  .then(data => {
    console.log(data.meals);
  })
  .catch(error => {
    console.error('Error fetching recipes:', error);
  });
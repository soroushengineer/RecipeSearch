import React, {useState, useEffect} from 'react';
import './App.css';
import Recipe from './Recipe';
// import axios from 'axios';

function App() {

  const APP_ID = 'd26d7af2';
  const APP_KEY = '50f88867868e3431c3391613a3d36c55';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits) //all the data gets trasferred to the state.
  };

  const updateSearch = (e) => {
    setSearch(e.target.value)
  };

  const getSearch = (e) => {
    e.preventDefault()
    setQuery(search);
    setSearch('');
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit"> Submit
          </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image ={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
    </div>
    </div>
  );
}

export default App;

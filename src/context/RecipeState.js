import { useEffect, useState } from "react";
import RecipeContext from "./RecipeContext";


const RecipeState = (props) => {

    const [query, setQuery] = useState('')
    const [fetchedData, setFetchedData] = useState([])

    const apiKey = 'b43ac05bd1aa1801f2902b56d49d3687'
    const id = 'd5055e25'
    const url = `https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${apiKey}`
    const url2 = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=d5055e25&app_key=b43ac05bd1aa1801f2902b56d49d3687`;



    const handleFetchRecipe = (event) => {
        if (event.key === "Enter") {
            fetchRecipe(url2)
            setQuery('')
        }
    };

    const fetchRecipe = (fetchURL) => {
        fetch(fetchURL)
            .then(response => response.json())
            .then(data => {
                console.log(data.hits); // Konsolenausgabe der Daten
                setFetchedData(data.hits);
              })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        //random 20 Rezepte
        fetchRecipe(`https://api.edamam.com/api/recipes/v2?type=public&q=c&app_id=${id}&app_key=${apiKey}&random=true`)
    }, [])

    return (
        <RecipeContext.Provider value={{ query, setQuery, handleFetchRecipe, fetchedData }}>
            {props.children}
        </RecipeContext.Provider >
    )
}

export default RecipeState
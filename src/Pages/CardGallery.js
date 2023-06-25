import React, { useContext } from "react";
import Card from "../components/Card/Card";
import RecipeContext from "../context/RecipeContext";

const CardGallery = () => {
  const { fetchedData } = useContext(RecipeContext);

  return (
    <>
      <div className="container d-flex my-4 flex-wrap justify-content-center">
        {fetchedData.map((item, i) => (
          <Card
            raedmore={item.recipe.url}
            key={item.recipe.uri}
            img={item.recipe.image}
            by={item.recipe.source}
            title={item.recipe.label}
            calories={item.recipe.calories}
            ingredients={item.recipe.ingredients.map(ingredient => ingredient.text)}
            healthLabels={item.recipe.healthLabels}
          />
        ))}
      </div>
    </>
  );
};

export default CardGallery;

import React from 'react';
import "./Card.css";

// import recipe from "./../../Assets/recipe-image-temp.jpg";

const Card = (props) => {

  const detail = (recipe) => {
    const newWindow = window.open('', '_blank');
    console.log(recipe);
    console.log(recipe.title);
    console.log(recipe.ingredients);
    console.log(recipe.healthLabels);
    //Um Ingredients untereinander auszugeben
    const ingredientsList = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
    const healthLabelsList = recipe.healthLabels.map(healthLabel => `<li>${healthLabel}</li>`).join('');

    newWindow.document.write(`
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f1f1f1;
        margin: 20px;
        padding: 20px;
      }
      
      h1 {
        font-size: 24px;
        margin-bottom: 10px;
      }
      
      img {
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
      }
      
      p {
        font-size: 16px;
        margin-bottom: 10px;
      }
      
      ul {
        font-size: 16px;
        margin-bottom: 10px;
        padding-left: 20px;
      }
      
      li {
        margin-bottom: 5px;
      }
    </style>
    <h1>${recipe.title}</h1>
    <img src="${recipe.img}" alt="${recipe.title}" />
    <p>Calories: ${recipe.calories}</p>
    <h2>Ingredients:</h2>
    <ul>
      ${ingredientsList}
    </ul>
    <h2>Health labels:</h2>
    <ul>
      ${healthLabelsList}
    </ul>
    `);
  };
  return (
    <>
      <div className="card-box">
        <img src={props.img} alt="food" />
        <div className="card-details my-2 ">
          <div className="card-title">{props.title}</div>
          <div className="card-by">by {props.by}</div>
        </div>
        <div className="card-btns">
          <button onClick={() => detail(props)} className="mx-1 ingredients card-btn">Get Details</button>
        </div>
      </div>
    </>
  );
};

export default Card;

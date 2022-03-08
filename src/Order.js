import React from 'react';

const Order = ({name, ingredients}) => {
  let allIngredients = ingredients.map(ingredient => {
    return (
    <li key={ingredient}>{ingredient}</li>
    )
  })
  
  return (
    <article className='order-card'>
      <h2>{name}</h2>
      <ul>
        {allIngredients}
      </ul>
    </article>
  )
}


export default Order;
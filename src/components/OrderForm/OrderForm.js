import React, { Component } from 'react';
import { postOrder } from '../../apiCalls';

class OrderForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      ingredients: []
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      ...this.state
    }
    if(this.state.name && this.state.ingredients.length > 0) {
      postOrder(newOrder)
      .then(data => this.props.addOrder(data))
      this.clearInputs();
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleIngredientChange = (event) => {
    event.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, event.target.name]})
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <div className='button-container'>
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
        </div>
      )
    });

    return (
      <form className='order-form'>
        <input
          id="name"
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
          required
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button className='submit' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;

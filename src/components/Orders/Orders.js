import React from 'react';
import Order from '../../Order';
import './Orders.css';

const Orders = ({orders}) => {
  let allOrders = orders.map(order => {
    return (
      <Order 
        key={order.id}
        name={order.name}
        ingredients={order.ingredients}
        />
    )
  })
  return (
    <section className='orders'>
      {console.log("all", allOrders)}
      {allOrders}
    </section>
  )

}

export default Orders;
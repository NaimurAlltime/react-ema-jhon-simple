import React from "react";
import "./Cart.css";

const Cart = ({ cart }) => {
  // const { cart } = props;

  let totalPrice = 0;
  let totalShipping = 0;
  for (const product of cart) {
    totalPrice = totalPrice + product.price;
    totalShipping = totalShipping + product.shipping;
  }

  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="cart">
      <h2>Order Summary</h2>
      <h3>Selected Items: {cart.length} </h3>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping Charge: ${totalShipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
      <button className="btn-one">Clear Cart</button>
      <button className="btn-two">Proceed Checkout</button>
    </div>
  );
};

export default Cart;

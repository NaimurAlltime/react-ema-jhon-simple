import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Order.css";

const Orders = () => {
  const saveCart = useLoaderData();
  const [cart, setCart] = useState(saveCart);

  const handleRemoveFromCart = (id) => {
    const remaining = cart.filter((product) => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  return (
    <div className="shop-container">
      {/* <h2>orders product: {cart.length}</h2> */}
      <div className="review-container">
        {cart.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
          ></ReviewItem>
        ))}
      </div>
      <div className="order-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Orders;

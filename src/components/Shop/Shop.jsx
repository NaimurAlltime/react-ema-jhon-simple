import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    console.log("products", products);
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step-1: get id
    for (const id in storedCart) {
      // step-2: get the product by using id
      const addedProduct = products.find((product) => product.id === id);
      console.log(addedProduct);

      if (addedProduct) {
        // step-3: get quantity of the product
        const quantity = storedCart[id];
        console.log(quantity);
        console.log(addedProduct.quantity);
        addedProduct.quantity = quantity;
        // step-4 : added cart to the save cart
        savedCart.push(addedProduct);
      }
      console.log("added product", addedProduct);
    }
    // step-5: set the cart
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    // console.log(product);
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="order-container">
        <Cart cart={cart} handleClearCart={handleClearCart}></Cart>
      </div>
    </div>
  );
};

export default Shop;

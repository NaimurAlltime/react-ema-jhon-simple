import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { totalProducts } = useLoaderData();
  // console.log(totalProducts);
  // const itemsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }
  // console.log(pageNumbers);

  // optional
  const pagesArray = Array.from(Array(totalPages).keys());
  console.log(pagesArray);

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    // console.log("products", products);
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step-1: get id
    for (const id in storedCart) {
      // step-2: get the product by using id
      const addedProduct = products.find((product) => product._id === id);
      // console.log(addedProduct);

      if (addedProduct) {
        // step-3: get quantity of the product
        const quantity = storedCart[id];
        // console.log(quantity);
        // console.log(addedProduct.quantity);
        addedProduct.quantity = quantity;
        // step-4 : added cart to the save cart
        savedCart.push(addedProduct);
      }
      // console.log("added product", addedProduct);
    }
    // step-5: set the cart
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);
  };

  return (
    <>
      <div className="shop-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="order-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link style={{ textDecoration: "none" }} to="/orders">
              <button className="btn-two">
                Review Order
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* pagination  */}
      <div className="pagination">
        <p>
          CurrentPage: {currentPage} and items per page: {itemsPerPage}{" "}
        </p>
        {pagesArray.map((page) => (
          <button
            className={currentPage === page ? "selected" : ""}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </>
  );
};

export default Shop;

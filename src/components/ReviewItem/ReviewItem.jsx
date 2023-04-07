import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ReviewItem.css";

const ReviewItem = ({ product, handleRemoveFromCart }) => {
  const { id, img, name, price, quantity } = product;
  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className="review-detail">
        <p className="product-title">{name}</p>
        <p>
          Price: <span className="orange-text">${price}</span>
        </p>
        <p>
          Order Quantity: <span className="orange-text">{quantity}</span>
        </p>
      </div>
      <button onClick={() => handleRemoveFromCart(id)} className="delete-btn">
        <FontAwesomeIcon className="delete-icon" icon={faTrashCan} />
      </button>
    </div>
  );
};

export default ReviewItem;

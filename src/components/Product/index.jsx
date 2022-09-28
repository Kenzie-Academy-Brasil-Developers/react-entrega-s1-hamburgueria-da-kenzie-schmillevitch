import React from "react";

const Product = ({ product, handleClick }) => {
  console.log(product);
  return (
    <li className="productCard">
      <div className="containerImg">
        <img className="imgList" src={product.img} alt="imagem do produto" />
      </div>
      <div className="divInfo">
        <h4>{product.name}</h4>
        <span>{product.category}</span>
        <p className="productPrice">R${product.price}</p>
        <button className="addButton" onClick={() => handleClick(product.id)}>
          Adicionar
        </button>
      </div>
    </li>
  );
};

export default Product;

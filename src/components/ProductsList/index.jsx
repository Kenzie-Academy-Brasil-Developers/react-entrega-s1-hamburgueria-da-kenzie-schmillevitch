import Product from "../Product";
import React from "react";

const ProductsList = ({ products, setProducts, handleClick }) => {
  return (
    <div className="contentList">
      {products.map((product) => (
        <ul key={product.id} className="containerProductsList">
          <Product
            product={product}
            setProducts={setProducts}
            handleClick={handleClick}
          />
        </ul>
      ))}
    </div>
  );
};

export default ProductsList;

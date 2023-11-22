import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} /> {/* <ReactStars {...options} />{" "} */}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

// const options = {
//   edit: false,
//   color: "rgba(20,20,20,0.1)",
//   activeColor: "tomato",
//   size: window.innerWidth < 600 ? 20 : 25,
//   value: 2.5,
//   isHalf: true,
// };

// const Product = ({ product }) => {
//   return (
//     <Link className="productCard" to={product.id}>
//       {/* <img src={logo} alt="Logo" /> */}
//       <img src={product.images[0].url} alt={product.name} />
//       {/* <img src={logo} alt={product.name} /> */}
//       <p>{product.name}</p>
//       <div>
//         <ReactStars {...options} /> <span>(256 Reviews)</span>
//       </div>
//       <span>{product.price}</span>
//     </Link>
//   );
// };

export default ProductCard;

'use client'
// https://tailwindcomponents.com/component/e-commerce-product-card
import Image from "next/image";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import { Star } from "./Star";
import { productExistInCart, removeProductFromCart } from "@/app/shopping-cart/actions";
import { useEffect, useState } from "react";


interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  addToCart: (id: string) => void;
}
export const ProductCard = ({id, name, price, rating, image, addToCart}:ProductCardProps) => {
  const [active, setActive] = useState(false);
  const handleAddToCart = ()=>{
    addToCart(id);
    cardActive();
  }

  const handleRemoveFromCart = ()=>{
    removeProductFromCart(id);
    cardActive();
  }

  const cardActive = async ()=> {
    const isActive = await productExistInCart(id);
    setActive(isActive);
  };

 useEffect(() => {
   cardActive();
 });


  return (
    <div className="bg-white shadow rounded-lg max-w-sm">
      {/* Product Image */}
      <div className="p-2">
        <Image
          width={500}
          height={500}
          className="rounded"
          src={image}
          alt="product image"
        />
      </div>

      {/* Title */}
      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
            {name}
          </h3>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {/* Stars */}
          {Array(rating > 0 ? rating - 1 : 0)
            .fill(0)
            .map((x, i) => (
              <Star key={i} />
            ))}
          <Star />

          {/* Rating Number */}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">
            {rating.toFixed(2)}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 ">{price}</span>

          <div className="flex">
            <button
              onClick={handleAddToCart}
              className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              <IoAddCircleOutline size={25} />
            </button>

            <button
              disabled={!active}
              onClick={handleRemoveFromCart}
              className="disabled:bg-gray-600 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

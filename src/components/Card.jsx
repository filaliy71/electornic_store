import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sort, cart, category, rating } from "../store/cardsSlice";
import OneCard from "./OneCard";
import star from "/src/assets/SvgStar.svg";
import Modal from "./Modal";

const sortOptions = [
  { name: "Most Popular" },
  { name: "Availability" },
  { name: "Best Rating" },
  { name: "Price: Low to High" },
  { name: "Price: High to Low" },
];

const ProductCard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.card.products);
  const [error, setError] = useState("");
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const boolItem = useSelector((state) => state.card.noItem);
  const rat = [5, 4, 3, 2, 1, "all"];

  const handleRat = (value) => {
    dispatch(rating(value));
  };
  const handleCart = (product) => {
    if (product.availability) {
      const info = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        availability: product.availability,
        description: product.description,
        qte: 1,
      };
      console.log(info);
      dispatch(cart(info));
      setError(false);
    } else {
      setError(true);
    }
  };

  useLayoutEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });
  const handleSelect = (Value) => {
    dispatch(Sort(Value));
  };
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    // Filter products when checkbox state changes
    dispatch(
      category({
        category: Object.keys(checkedItems).find((key) => checkedItems[key]),
      })
    );
  }, [checkedItems, dispatch]);

  const handleCheck = (category) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [category]: !prevCheckedItems[category],
    }));
  };
  return (
    <>
      {error && <Modal setError={setError} />}
      <div className="text-4xl font-semibold mx-6 mt-2">Products</div>
      <hr className="my-4 border-t-2 border-gray-500 w-full" />

      <div className="flex my-3">
        <div className="w-1/5 mx-5">
          <h4 className="text-xl mx-1 font-bold">Filters :</h4>
          <fieldset className="border border-gray-300 rounded  px-2 mb-4 w-52">
            <legend className="text-lg font-semibold text-gray-700 px-2 mx-2">
              Rating
            </legend>
            <ul role="list" className="py-2 mx-1 font-medium text-gray-900">
              {rat.map((number, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="btn btn-sm m-1 w-max"
                    value={number}
                    onClick={() => handleRat(number)}
                  >
                    {number === "all"
                      ? "all"
                      : Array.from({ length: number }, (_, idx) => (
                          <img
                            src={star}
                            className="w-5 h-5"
                            key={`${index}-${idx}`}
                          />
                        ))}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="border border-gray-300 rounded pb-3 px-2 mb-4 w-52">
            <legend className="text-lg font-semibold text-gray-700 px-2 mx-2">
              Sort By
            </legend>
            <select
              className="border rounded-md focus:outline-none bg-slate-900 focus:border-blue-500"
              onClick={(e) => handleSelect(e.target.value)}
            >
              {sortOptions.map((item, index) => (
                <option
                  key={index}
                  value={item.name}
                  className="hover:bg-gray-100"
                >
                  {item.name}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="border border-gray-300 rounded pb-3 px-2 mb-4 w-52">
            <legend className="text-lg font-semibold text-gray-700 px-2 mx-2">
              Category
            </legend>
            <label htmlFor="Laptops">Laptops </label>
            <input
              type="checkbox"
              name="Laptops"
              id="Laptops"
              value="Laptops"
              className="rounded-md"
              onChange={(e) => handleCheck(e.target.value)}
              checked={checkedItems["Laptops"]}
            />
            <br />
            <label htmlFor="Phones">Phones </label>
            <input
              type="checkbox"
              name="Phones"
              id="Phones"
              value="Phones"
              className="rounded-md"
              onChange={(e) => handleCheck(e.target.value)}
              checked={checkedItems["Phones"]}
            />
          </fieldset>
        </div>

        <div className="flex-wrap flex gap-3 justify-center">
          {products.map((item, index) => (
            <OneCard key={index} item={item} handleCart={handleCart} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCard;

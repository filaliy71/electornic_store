import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incr, decr, delet } from "../store/cardsSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.card.cart);
  const subtotal = useSelector((state) => state.card.total);
  const dispatch = useDispatch();
  const handldecr = (car) => {
    dispatch(decr({ id: car.id }));
  };

  const handlincr = (car) => {
    dispatch(incr({ id: car.id }));
  };
  const del = (car) => {
    dispatch(delet({ id: car.id }));
  };
  let tax = subtotal * 0.1;
  let ship = subtotal !== 0 ? 19 : 0; // Conditionally set ship based on subtotal
  let total = subtotal + tax + ship;

  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);
  return (
    <div className="container mx-auto w-full p-4">
      <h2 className=" font-bold w-full text-2xl">Your Cart</h2>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-3/4 overflow-x-auto">
          <table className="table-lg w-full">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((car) => (
                <tr key={car.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={car.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{car.name}</div>
                        <div className="text-sm opacity-50">
                          {car.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="flex">
                    <span>
                      <button
                        type="button"
                        className="badge badge-primary badge-outline hover:badge-ghost p-2"
                        onClick={() => handldecr(car)}
                      >
                        -
                      </button>
                    </span>

                    <p className="w-4 text-center">{car.qte}</p>
                    <span>
                      <button
                        type="button"
                        className="badge badge-primary badge-outline p-2 hover:badge-ghost"
                        onClick={() => handlincr(car)}
                      >
                        +
                      </button>
                    </span>
                  </td>
                  <td>{car.price}</td>
                  <th>
                    <button className="btn btn-ghost" onClick={() => del(car)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:w-1/4 md:ml-4 mt-8 md:mt-0 ">
          <div className="rounded-md bg-zinc-900 p-6 text-white">
            <h2 className="font-bold text-2xl ">Cart total</h2>
            <h3 className="text-base font-semibold border-b border-slate-700 py-6 flex justify-between">
              Sub Total<span>${subtotal.toFixed(2)}</span>
            </h3>

            <h3 className="font-bold text-zinc-300 mt-4 flex justify-between">
              Tax <span className="text-white">${tax.toFixed(2)}</span>
            </h3>

            <h3 className="font-bold text-zinc-300 mt-4 flex justify-between">
              Shipping in US
              <span className="text-white">$ {ship}</span>
            </h3>

            <p className="font-medium text-zinc-500 text-sm border-b py-3 border-slate-700">
              We only charge for shipping when you have over 2kg items
            </p>
            <h3 className="font-bold text-white py-5 flex justify-between">
              Total <span className="text-white">$ {total.toFixed(2)}</span>
            </h3>

            <button className="text-center bg-white text-black font-bold text-sm w-full py-4 rounded-md">
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

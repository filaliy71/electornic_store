import star from "/src/assets/SvgStar.svg";

function OneCard({ item, handleCart }) {
  return (
    <div className="flex-col w-72 rounded-lg overflow-hidden shadow-lg card">
      <img
        className="w-full h-64 object-cover"
        src={item.image}
        alt={item.name}
      />
      <div className="px-6 py-2">
        <div className="font-bold text-white text-xl mb-1">{item.name}</div>
        <p className="text-gray-500 text-base">{item.description}</p>
      </div>
      <div className="px-6 pb-1">
        <span className="text-gray-500 text-base">
          ${item.price.toFixed(2)}
        </span>
        {item.availability ? (
          <span className="ml-2 text-green-500">Available</span>
        ) : (
          <span className="ml-2 text-red-500">Not Available</span>
        )}
      </div>
      <div className="flex items-center px-6 pb-2">
        <span className="inline-block bg-green-50 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2">
          {item.category}
        </span>
        <span className="inline-flex bg-yellow-50 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2 items-center">
          <img src={star} alt="Star" className="w-5 h-5 text-yellow-500 mr-1" />
          {item.rating}
        </span>
      </div>
      <div className="mt-auto w-full">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={() => handleCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default OneCard;

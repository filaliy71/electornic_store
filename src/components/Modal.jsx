function Modal({ setError }) {
  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center shadow-2xl">
      <div className="bg-white p-4 rounded-md shadow-md w-64">
        <p className="text-gray-800 mb-4">The product is not available</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setError(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;

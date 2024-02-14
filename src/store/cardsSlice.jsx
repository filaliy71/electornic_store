import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchProduct = createAsyncThunk("card/fetchProduct", async () => {
  try {
    const apiUrl = "http://localhost:5173/db.json";
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
});

const initialState = {
  originalProducts: [],
  products: [],
  cart: [],
  wishlist: [],
  total: 0,
  ratings: [],
  noItem: false,
};

const cardsSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    cart: (state, action) => {
      const { payload } = action;
      const existingProduct = state.cart.find(
        (product) => product.id === payload.id
      );

      if (existingProduct) {
        existingProduct.qte++;
      } else {
        state.cart.push(payload);
      }

      state.total = calculateTotal(state.cart);
    },
    incr: (state, action) => {
      const { payload } = action;
      const existingProduct = state.cart.find((item) => item.id === payload.id);

      if (existingProduct) {
        existingProduct.qte++;
      }

      state.total = calculateTotal(state.cart);
    },
    decr: (state, action) => {
      const { payload } = action;
      const existingProduct = state.cart.find((item) => item.id === payload.id);

      if (existingProduct) {
        existingProduct.qte--;

        if (existingProduct.qte <= 0) {
          state.cart = state.cart.filter((item) => item.id !== payload.id);
        }

        state.total -= existingProduct.price;
      }
    },
    delet: (state, action) => {
      const { payload } = action;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === payload.id
      );

      if (existingProductIndex !== -1) {
        // Subtract the product of price and quantity from total
        state.total -=
          state.cart[existingProductIndex].price *
          state.cart[existingProductIndex].qte;

        // Remove the item from the cart
        state.cart.splice(existingProductIndex, 1);
      }
    },
    rating: (state, action) => {
      const { payload } = action;
      const filteredProducts = state.originalProducts.filter(
        (product) => parseInt(product.rating) === payload
      );

      if (filteredProducts.length > 0) {
        state.products = filteredProducts;
      } else if (payload === "all") {
        state.products = state.originalProducts;
      } else {
        state.noItem = true;
        console.log("There are no items");
      }
    },
    Sort(state, action) {
      const value = action.payload;
      if (value == "Price: Low to High") {
        state.products = state.products
          .slice()
          .sort((a, b) => a.price - b.price);
      }
      if (value == "Price: High to Low") {
        state.products = state.products
          .slice()
          .sort((a, b) => b.price - a.price);
      }
      if (value == "Best Rating") {
        state.products = state.products
          .slice()
          .sort((a, b) => b.rating - a.rating);
      }
      if (value == "Availability") {
        state.products = state.products
          .slice()
          .sort((a, b) => b.availability - a.availability);
      }
    },
    category(state, action) {
      const data = action.payload;
      if (data.category) {
        state.products = state.originalProducts.filter(
          (item) => item.category === data.category
        );
      } else {
        state.products = state.originalProducts;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.originalProducts = action.payload.product;
      state.products = action.payload.product;
      state.ratings = action.payload.product.map((product) =>
        parseInt(product.rating)
      );
    });
  },
});

export const { cart, incr, decr, delet, rating, Sort, category } =
  cardsSlice.actions;
export { cardsSlice };

function calculateTotal(cart) {
  return cart.reduce(
    (total, product) => total + product.price * product.qte,
    0
  );
}

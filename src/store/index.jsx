import { configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./cardsSlice";
import { AuthSlice } from "./AuthSlice";

const store = configureStore({
  reducer: {
    card: cardsSlice.reducer,
    auth: AuthSlice.reducer,
  },
});
export default store;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./views/Layout";
import ProductCard from "./components/Card";
import ShoppingCart from "./components/Cart";
import Login from "./components/Login";
import Inscription from "./components/Inscription";
import Profile from "./components/Profile";
import { useEffect } from "react";
import { fetchProduct } from "./store/cardsSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/card" element={<ProductCard />} />
        <Route path="/card/cart" element={<ShoppingCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;

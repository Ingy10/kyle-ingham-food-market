import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PriceComparePage from "./pages/PriceComparePage/PriceComparePage";
import GroceryListPage from "./pages/GroceryListPage/GroceryListPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PriceComparePage />}></Route>
          <Route path="/grocery-list" element={<GroceryListPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

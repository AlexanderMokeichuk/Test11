import {Route, Routes} from "react-router-dom";
import Layout from "./UI/components/Layout/Layout";
import Register from "./features/Users/Register";
import Login from "./features/Users/Login";
import NotFound from "./UI/components/NotFound/NotFound";
import Products from "./features/Products/Products";
import AddNewProduct from "./features/Products/AddNewProduct";
import Product from "./features/Products/Product";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<Products />}/>
        <Route path={"/new-product"} element={<AddNewProduct />} />
        <Route path={"/show-product/:id"} element={<Product />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path={"*"} element={<NotFound/>}/>
      </Routes>
    </Layout>
  );
}

export default App;

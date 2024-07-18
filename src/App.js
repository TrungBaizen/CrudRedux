import {Route, Routes} from "react-router-dom";
import {Login} from "./pages/users/Login";
import {Home} from "./pages/Home";
import {ListProduct} from "./pages/products/ListProduct";
import {AddProduct} from "./pages/products/AddProduct";
import {EditProduct} from "./pages/products/EditProduct";

function App() {
    return (
        <>
            <Routes>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'products'} element={<Home/>}>
                    <Route path={'home'} element={<ListProduct/>}/>
                    <Route path={'add'} element={<AddProduct/>}/>
                    <Route path={'edit/:id'} element={<EditProduct/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/services/productService";

function SearchProduct() {
    const location = useLocation();
    const dispatch = useDispatch();
    const query = new URLSearchParams(location.search);
    const name = query.get('name');
    const products = useSelector(({ products }) => products.list.data);
    const [listSearch, setListSearch] = useState([]);

    useEffect(() => {
        dispatch(getAll()).catch((error) => {
            console.error("Failed to fetch categories:", error);
        });
    }, [dispatch]);

    useEffect(() => {
        const productList = products.filter((product) =>
            product.name.toLowerCase().includes(name ? name.toLowerCase() : '')
        );
        (productList != '')? setListSearch(productList):setListSearch(products);
    }, [products, name]);

    return (
        <>
            <table border={1}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {listSearch.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.category ? item.category.name : 'Chưa có danh mục'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default SearchProduct;
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAll, remove} from "../../redux/services/productService";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

export function ListProduct() {
    const dispatch = useDispatch();
    let products = useSelector(({products}) => {
        return products.list;
    });
    const removeProduct = (id) => {
        Swal.fire({
            title: 'Mày chắc chưa?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Chắc chắn',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(remove(id)).then(() => {
                    Swal.fire('Xóa thành công', '', 'success');
                    dispatch(getAll());
                })
            } else {
                Swal.fire('Mày đùa tao à?', '', 'info');
            }
        });
    }

    useEffect(() => {
        dispatch(getAll())
    }, []);
    return (
        <>
            <table border={1}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Des</th>
                    <th>Action</th>
                    <th colSpan={2}>Edit/Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.action}</td>
                            <td>
                                <Link to={`/products/edit/${item.id}`}>
                                    <button>Sửa</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={()=>removeProduct(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}
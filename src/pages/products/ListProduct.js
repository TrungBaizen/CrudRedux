import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllPaginate, remove} from "../../redux/services/productService";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

export function ListProduct() {
    const dispatch = useDispatch();
    const products = useSelector(({products}) => {
        return products.list.data;
    });
    const pages = useSelector(({products}) => {
        return products.list.pages;
    })
    const removeProduct = (id) => {
        let name = products.find(product => product.id === id).name;
        Swal.fire({
            title: `Mày chắc muốn xóa sản phẩm ${name} chưa?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Chắc chắn',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(remove(id)).then(() => {
                    Swal.fire('Xóa thành công', '', 'success');
                })
            } else {
                Swal.fire('Mày đùa tao à?', '', 'info');
            }
        });
    }
    const handlePageClick = (e) => {
        let page = e.selected + 1;
        dispatch(getAllPaginate(page));
    }

    useEffect(() => {
        dispatch(getAllPaginate(1))
    }, [dispatch]);
    return (
        <>
            <table border={1}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th colSpan={2}>Edit/Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.category ? item.category.name : 'Chưa có danh mục'}</td>
                            <td>
                                <Link to={`/products/edit/${item.id}`}>
                                    <button>Sửa</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => removeProduct(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageCount={pages}
                previousLabel="< previous"
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </>
    )
}
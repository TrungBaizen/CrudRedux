import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";

export function Navbar() {
    let navigate = useNavigate();
    const searchProduct = (value) => {
        navigate(`/products/search?name=${value.name}`)
    }
    return (
        <>
            <h1>
                <Link to={'/products/home'}>Home</Link>
                <Link to={'/products/add'}>Add</Link>
            </h1>
            <Formik initialValues={{
                name: ''
            }}
                    onSubmit={searchProduct}>
                <Form>
                    <Field name={"name"} placeholder={"Nhập tên sản phẩm"} type={'text'}/>
                    <button type={"submit"}>Search</button>
                </Form>
            </Formik>
        </>
    )
}
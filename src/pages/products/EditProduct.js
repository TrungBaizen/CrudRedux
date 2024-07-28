import * as Yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {edit, getById} from "../../redux/services/productService";
import {useEffect, useState} from "react";
import {getAll} from "../../redux/services/categoryService";

const productSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'To Short!')
        .max(70, 'To Long!')
        .required('Không để trông')
    ,
    price: Yup.number()
        .min(1000,'Giá trị tối thiểu 1000VNĐ')
        .required('Không để trông')
    ,
    quantity: Yup.number()
        .min(1,'Số lượng tối thiểu là 1')
        .required('Không để trông')
    ,
    categoryId: Yup.string()
        .required('Không để trông')
})
export function EditProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const categories = useSelector(({categories})=>{
        return categories.list;
    })
    const [initialValues, setInitialValues] = useState({
        name: '',
        price: '',
        quantity: '',
        categoryId:''
    });
    const editProduct = (value) => {
        dispatch(edit({id,value})).then(()=>{
            navigate('/products/home')
        })
    }
    useEffect(() => {
        dispatch(getAll()).catch(error => {
            console.error("Failed to fetch categories:", error);
        });
        dispatch(getById(id)).then(res => {
            let product = res.payload;
            setInitialValues({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                categoryId:product.category.id
            });
        });
    }, [dispatch, id]);

    return(
        <>
            <h1>Edit</h1>
            <Formik
                //  giá trị khởi tạo các ô input
                initialValues={initialValues}
                onSubmit={editProduct}
                validationSchema={productSchema}
                enableReinitialize={true}
            >
                <Form>
                    <Field name={"name"} placeholder={"Name"} type={'text'}/>
                    <span style={{color: 'red'}}><ErrorMessage name={'name'}/></span><br/>
                    <Field name={"price"} placeholder={"Price"} type={'text'}/>
                    <span style={{color: 'red'}}><ErrorMessage name={'price'}/></span><br/>
                    <Field name={"quantity"} placeholder={"Quantity"} type={'number'}/>
                    <span style={{color: 'red'}}><ErrorMessage name={'quantity'}/></span><br/>
                    <Field name={"categoryId"} as={"select"}>
                        <option value={""} label={"Select category"}/>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Field>
                    <span style={{color: 'red'}}><ErrorMessage name={'categoryId'}/></span><br/>
                    <button type={"submit"}>Sửa</button>
                </Form>
            </Formik>
        </>
    )
}
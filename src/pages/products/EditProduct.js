import * as Yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {edit, getById} from "../../redux/services/productService";
import {useEffect, useState} from "react";

const StudentSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'To Short!')
        .max(70, 'To Long!')
        .required('Required')
    ,
    description: Yup.string()
        .required('Required')
    ,
    action: Yup.string()
        .required('Required')
})
export function EditProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: '',
        action: ''
    });
    const editProduct = (value) => {
        dispatch(edit({id,value})).then(()=>{
            navigate('/products/home')
        })
    }
    useEffect(() => {
        dispatch(getById(id)).then(res => {
            let product = res.payload;
            setInitialValues({
                name: product.name,
                description: product.description,
                action: product.action
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
                validationSchema={StudentSchema}
                enableReinitialize={true}
            >
                <Form>
                    <Field name={"name"} placeholder={"Name"} type={'text'}/>
                    <span style={{color: 'red'}}><ErrorMessage name={'name'}/></span><br/>
                    <Field name={"description"} placeholder={"Description"} type={'text'}/>
                    <span style={{color: 'red'}}><ErrorMessage name={'description'}/></span><br/>
                    <Field name={"action"} placeholder={"Action"} type={'text'}/>
                    <span style={{color: 'red'}}><ErrorMessage name={'action'}/></span><br/>
                    <button type={"submit"}>Sửa</button>
                </Form>
            </Formik>
        </>
    )
}
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {add} from "../../redux/services/productService";

const StudentSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'To Short!')
        .max(70, 'To Long!')
        .required('Không để trông')
    ,
    description: Yup.string()
        .required('Required')
        .matches(/([A-Z])\w+/, "Input Text")
    ,
    action: Yup.string()
        .required('Required')
})
export function AddProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addProduct = (value) => {
        dispatch(add(value)).then(()=>{
            navigate('/products/home')
        })
    }
    return(
        <>
            <h1>Create</h1>
            <Formik
                //  giá trị khởi tạo các ô input
                initialValues={{
                    name: '',
                    description: '',
                    action: ''
                }} onSubmit={addProduct}
                validationSchema={StudentSchema}
            >
                <Form>
                    <Field name={"name"} placeholder={"Name"} type={'text'}/>
                    <span style={{color: 'red'}}><ErrorMessage name={'name'}/></span><br/>
                    <Field name={"description"} placeholder={"Description"} type={'text'}/>
                    <span style={{color: 'red'}}><ErrorMessage name={'description'}/></span><br/>
                    <Field name={"action"} placeholder={"Action"} type={'text'}/>
                    <span style={{color: 'red'}}><ErrorMessage name={'action'}/></span><br/>
                    <button>Thêm</button>
                </Form>
            </Formik>
        </>
    )
}
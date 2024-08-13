import { Field, Form, Formik} from "formik";
import React from "react";
import pako from "pako";

export default function Image(){
    // Hàm để chuyển đổi Uint8Array thành chuỗi Base64
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };
    // Hàm để nén và mã hóa file ảnh thành Base64
    const compressAndEncodeImageFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result;
                // Nén dữ liệu
                const compressedData = pako.deflate(new Uint8Array(arrayBuffer));
                // Mã hóa dữ liệu nén thành Base64
                const base64String = arrayBufferToBase64(compressedData);
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    };
    // Hàm để giải mã và giải nén dữ liệu Base64 thành file ảnh
    const decodeAndDecompressImageFile = (base64String) => {
        // Giải mã dữ liệu Base64
        const binaryString = atob(base64String);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        // Giải nén dữ liệu
        const decompressedData = pako.inflate(bytes);
        // Tạo lại Blob từ dữ liệu giải nén
        return new Blob([decompressedData]);
    };
    const addImage =async  (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                // Nén và mã hóa file ảnh
                const base64Compressed = await compressAndEncodeImageFile(file);
                console.log('Base64 Compressed:', base64Compressed);

                // Giải mã và giải nén file ảnh
                const decompressedBlob = decodeAndDecompressImageFile(base64Compressed);
                // Tạo URL từ Blob để hiển thị ảnh
                const imageUrl = URL.createObjectURL(decompressedBlob);
                document.getElementById('image').src = imageUrl;
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
    return(
        <>
            <h1>Create</h1>
            <Formik
                //  giá trị khởi tạo các ô input
                initialValues={{
                    name: '',
                    image:''
                }} onSubmit={addImage}
            >
                <Form>
                    <Field name={"name"} placeholder={"Name"} type={'text'}/>
                    <Field name={"image"}  placeholder={"Image"} onChange={addImage} type={'file'}/>
                    <img src="" alt="" id={"image"}/>
                    <button type={"submit"}>Thêm</button>
                </Form>
            </Formik>
        </>
    )
}
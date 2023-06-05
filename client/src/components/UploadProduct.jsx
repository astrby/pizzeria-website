import React from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {storage} from '../storage/firebase'
import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'

const UploadProduct = () => {

    const uploadData = async(e) =>{
        e.preventDefault();
        const productName = document.getElementById("productName").value;
        const productDescription = document.getElementById("productDescription").value;
        const productCategory = document.getElementById("productCategory").value
        const productImage = document.getElementById("productImage").files[0];

        if(!productName || !productDescription || !productImage){
            console.log("Falta llenar fomrulario");
        }else{
            const storageRef = ref(storage, `products/${productName}`);
            uploadBytes(storageRef, productImage).then((image)=>{
                getDownloadURL(image.ref).then(async(urlImage)=>{
                    await axios.post('https://pizzeria-website-ten.vercel.app/uploadProduct',{productName, productDescription, productCategory, urlImage});
                })
            })
            
        }
    }

  return (
    <Container className='mw-100 vh-100'>
        <h3 className=' bg-primary text-center mt-2 text-light py-4'>Subir producto</h3>
        <Form className='text-center pt-5 w-50 mx-auto fw-bold' onSubmit={uploadData}>
        <h3 className='text-center mt-2 py-4'>Producto</h3>
            <Form.Label className='mt-3'>Nombre del producto</Form.Label>
            <Form.Control id='productName'/>
            <Form.Label className='pt-4'>Descripción del producto</Form.Label>
            <Form.Control id='productDescription'/>
            <Form.Label className='pt-4'>Categoría</Form.Label>
            <Form.Select id='productCategory'>
                <option>Pizzas</option>
                <option>Acompañamientos</option>
                <option>Bebidas</option>
                <option>Postres</option>
            </Form.Select>
            <Form.Label className='pt-4'>Imagen del producto</Form.Label>
            <Form.Control type='file' id='productImage'/>
            <Button className='mt-5 btn-dark' type='submit'>Subir</Button>
        </Form>
    </Container>
  )
}

export default UploadProduct
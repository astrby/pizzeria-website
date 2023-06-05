import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import {localCart} from '../storage/localStorage'
import LogoCart from '../components/LogoCart'
import Swal from 'sweetalert2'

const Product = () =>{

    const params = useParams();
    const navigate = useNavigate();
    const[product, setProduct] = useState([]);
    const addToCart = localCart(state=>state.addToCart);

    const getProduct = async(productId)=>{
        const peticion = await axios.post('https://pizzeria-website-ten.vercel.app/getProduct',{productId});
        setProduct(peticion.data)
    }

    const ActionAddToCart = ()=>{
        const urlImage = document.getElementById('urlImage').src;
        const productName = document.getElementById('productName').textContent;
        const productDescription = document.getElementById('productDescription').textContent;
        const productId = document.getElementById('productId').textContent;
        const productPrice = document.getElementById('productPrice').textContent;
        addToCart({
            productId: productId,
            urlImage: urlImage,
            productName: productName,
            productDescription: productDescription,
            productPrice:  productPrice
        })
        Swal.fire({
            icon: 'info',
            title: 'Agregado al carrito',
            showConfirmButton: false,
            timer: 1500
        })
    }

    useEffect(()=>{
        getProduct(params.Id);
    },[])

    return(
        <div>
            <Button className='mt-2 ms-2' onClick={()=>{navigate(-1)}}>Atrás</Button>
                <LogoCart/>
            <Container className='mw-100 vh-100 d-flex justify-content-center align-items-center' style={{marginTop:'-5rem'}}>
                {
                    product !== null
                    ?
                    <Row>
                        <Col className='text-center'>
                            <img src={product.urlImage} style={{maxWidth:'25rem', minWidth:'25rem'}} className='rounded' id='urlImage'/>
                        </Col>
                        <Col className='text-center mt-4'>
                            <h3 id='productName'>{product.productName}</h3>
                            <h5 className='mt-5'>Descripción</h5>
                            <p id='productDescription'>{product.productDescription}</p>
                            <h5 className='mt-4'>Precio: <p id='productPrice'>{product.price}</p></h5>
                            <Button className='mt-2' onClick={ActionAddToCart}>Agregar al carrito</Button>
                            <label style={{display: 'none'}} id='productId'>{product._id}</label>
                        </Col>
                    </Row>
                    :''
                }
            </Container>
        </div>
        
    )
}

export default Product;
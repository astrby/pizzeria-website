import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import  Row from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import  Button from 'react-bootstrap/Button'
import {localCart} from '../storage/localStorage'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'

const CartPage = () => {

  const cart = localCart(state=>state.cart);
  const updateCart = localCart(state=>state.updateCart)
  const clearCart = localCart(state=>state.clearCart)
  const[cartList, setCartList] = useState([]);
  const[totalPrice, setTotalPrice] = useState(0);
  const[pk,setPk]=useState('')
  const navigate = useNavigate();

  const getPK = async()=>{
    const response = await axios.get('http://localhost:3001/getPK');
    setPk(response.data)
  }

  const actionDeleteProduct = (productName) =>{
    var updatedCartList = [];
    updatedCartList.push(...cartList)
    
    for(let i=0; i < updatedCartList.length; i++){
      if(updatedCartList[i].productName === productName){
        updatedCartList.splice(i, 1);
        break;
      }
    }
    setCartList(updatedCartList);
    updateCart(updatedCartList);
  }

  const addPrices = ()=>{
    var total=0;
    cartList.map((product)=>{
      total= total + Number(product.productPrice);
    })
    setTotalPrice(total)
  }

  const pay = async token =>{
    const location = document.getElementById('location');
    const response = await axios.post('http://localhost:3001/payment',{
      amount: Number(totalPrice+'00'),
      token
    });
    if(response.data === 'error'){
      Swal.fire({
        icon: 'error',
        title: 'Error en el pago',
        showConfirmButton: false,
        timer: 2000
      })
    }else if(response.data === 'success'){
      clearCart();
      Swal.fire({
        icon: 'success',
        title: 'Pago realizado correctamente. Puede recoger el pedido en el restaurante seleccionado ubicado '+location.elements['location'].value,
        showConfirmButton: true,
        timer: 3000
      });
    };
  }

  useEffect(()=>{
    setCartList(cart);
    getPK();
  },[])

  useEffect(()=>{
    addPrices();
  },[cartList])

  return (
    <div>
      <Button className='mt-2 ms-2' onClick={()=>{navigate(-1)}}>Atrás</Button>
      <Container>
        <h3 className='text-center mt-5'>Carrito</h3>
        <Container className='mw-100 d-flex justify-content-center align-items-center' style={{height:'85vh', marginTop: '-3rem'}}>
          <Row className='d-flex justify-content-center align-items-center'>
            <Col className='text-center' style={{flexDirection: 'row', maxHeight: '70vh', width: '40vh', overflowY: 'scroll'}}>
              {
                cartList.length > 0
                ?
                cartList.map((product, i)=>{
                  return <Row key={i} className='mt-4 d-flex justify-content-center'>
                    <Col>
                    <img src={product.urlImage}  style={{maxWidth:'8rem', minWidth:'8rem'}}/>
                    <h5 className='mt-2'>{product.productName}</h5>
                    </Col>
                    <Col>
                      <Button className='bg-transparent' style={{color: 'red'}} id='btnDelete' value={product.productName} onClick={()=>{actionDeleteProduct(product.productName)}}>Eliminar</Button>
                    </Col>
                  </Row>
                })
                : <h4>El carrito está vacío</h4>
              }
            </Col>
            {
              cart.length > 0
              ?
               <Col className='text-center'>
                <h5>Seleccione la tienda en donde desea recoger el pedido</h5>
                <Form className='mb-5 mt-3' id='location'>
                    <Form.Check value='En San José' name='location' type='radio' label='En San José' defaultChecked/>
                    <Form.Check value='En Cartago'  name='location' type='radio' label='En Cartago'/>
                </Form>
                <h4 className='mb-4'>Total: {totalPrice}</h4>
                <StripeCheckout 
                  stripeKey={pk}
                  label="Pagar"
                  name="Pago con tarjeta"
                  billingAddress
                  shippingAddress
                  amount={Number(totalPrice+'00')}
                  description={'El total es de '+totalPrice}
                  token={pay}
                  currency='CRC'
                >
                  <Button>Pagar</Button>
                </StripeCheckout>
              </Col>
              :''
            }
            
          </Row>
        </Container>
      </Container>
    </div>
  )
}

export default CartPage
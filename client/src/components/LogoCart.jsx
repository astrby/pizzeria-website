import React from 'react'
import Container from 'react-bootstrap/Container'
import {localCart} from '../storage/localStorage'

const LogoCart = () => {

    const cart = localCart(state=>state.cart);

  return (
    <Container className='mw-100 mt-2 text-end'>
       <a href='/cart'>Carrito ({cart.length})</a>
    </Container>
  )
}

export default LogoCart
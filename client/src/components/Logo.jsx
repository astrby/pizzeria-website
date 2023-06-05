import React from 'react'
import Container from 'react-bootstrap/Container'
import LogoImg from '../assets/logo.png'

const Logo = () => {
  return (
    <Container className='text-center mb-5'>
        <img src={LogoImg} className='mt-3 mb-3' style={{width: '10%'}}/>
        <h3 className='text-danger'>Pizzeria</h3>
    </Container>
  )
}

export default Logo
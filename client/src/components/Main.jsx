import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import LogoCart from './LogoCart'
import Logo from './Logo'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';

const Main = () =>{

    const[products, setProducts] = useState([]);
    const[category, setCategory] = useState('');

    const getProducts = async() =>{
        const peticion = await axios.get('https://pizzeria-website-nzm4.vercel.app/getProducts');
        setProducts(peticion.data);
    }

    const responsive = {
        LargeDesktop:{
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop:{
            breakpoint: {max: 3000, min: 1024},
            items: 5
        },
        tablet:{
            breakpoint: {max: 1024, min: 600},
            items: 3
        },
        mobile:{
            breakpoint: {max: 600, min: 0},
            items: 2
        },
    }


    useEffect(()=>{
        getProducts();
        setCategory('Todos');
    },[])

    return(
        <Container className='mw-100 bg-light vh-100 fluid'>
            <Logo/>
            <Row className=' row flex-nowrap overflow-auto'>
                <Carousel responsive={responsive} className='text-center'>
                    <Col>
                        <Button className='pt-3 bg-transparent text-black fs-3' onClick={()=>{setCategory('Todos')}}>Todos</Button>
                    </Col>
                    <Col>
                        <Button className='pt-3 bg-transparent text-black fs-3' onClick={()=>{setCategory('Pizzas')}}>Pizzas</Button>
                    </Col>
                    <Col>
                        <Button className='pt-3 bg-transparent text-black fs-3' onClick={()=>{setCategory('Acompañamientos')}}>Acompañamientos</Button>
                    </Col>
                    <Col>
                        <Button className='pt-3 bg-transparent text-black fs-3' onClick={()=>{setCategory('Bebidas')}}>Bebidas</Button>
                    </Col>
                    <Col>
                        <Button className='pt-3 bg-transparent text-black fs-3' onClick={()=>{setCategory('Postres')}}>Postres</Button>
                    </Col>
                </Carousel>
            </Row>
            <LogoCart/>
            <h3 className='text-center mb-5' style={{marginTop: '5rem'}}>Menú</h3>
            <Row className='gx-3 gap-2 d-flex justify-content-sm-start justify-content-center'>
                {
                    products.length > 0
                    ?
                    products.map((product,i)=>{
                        if(category === product.productCategory){
                            return <a href={`product/${product._id}`} key={i} className='text-center' style={{textDecoration: 'none',width:'18rem', height:'18rem'}}>
                                <Card style={{width:'18rem', height:'18rem'}}>
                                    <img className='mb-2 mt-2 mx-auto rounded' src={product.urlImage} style={{height: '10rem', width: '10rem'}}/>
                                    <Card.Title className='mt-4'>{product.productName}</Card.Title>
                                    <Card.Body >
                                        <Card.Text>{product.productDescription}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </a>
                        }else if(category === 'Todos'){
                            return <a href={`product/${product._id}`} style={{textDecoration: 'none',width:'18rem'}} key={i} className='text-center'>
                            <Card style={{width:'18rem', height:'18rem'}}>
                                <img className='mb-2 mt-2 mx-auto rounded' src={product.urlImage} style={{height: '10rem', width: '10rem'}}/>
                                <Card.Title className='mt-4'>{product.productName}</Card.Title>
                                <Card.Body>
                                    <Card.Text>{product.productDescription}</Card.Text>
                                </Card.Body>
                            </Card>
                            </a>
                        }
                    })
                    :''
                }
            
            </Row>
        </Container>
    )
}

export default Main;
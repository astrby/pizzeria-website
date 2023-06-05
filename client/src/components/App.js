import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import '../theme/bootstrap.min.css';
import Main from './Main'
import UploadProduct from './UploadProduct'
import Product from './Product'
import Cart from './Cart'

const App = () =>{
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/upload-product' element={<UploadProduct/>}/>
          <Route path='/product/:Id' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
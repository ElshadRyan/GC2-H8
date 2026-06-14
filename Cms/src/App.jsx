import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router";
import Footer from './components/Footer';
import Home from './view/Home';
import Login from './view/Login';
import BaseLayout from './view/BaseLayout';
import AddProduct from './view/AddProduct';
import Detail from './view/Detail';
import EditProduct from './view/EditProduct';
import Categories from './view/Categories';
import CategoryDetails from './view/CategoryDetails';
import CategoryEdit from './view/CategoryEdit';
import AddCategory from './view/AddCategory';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
          <BrowserRouter>
            <Routes>
              <Route path='/login' element= {<Login/>}/>
              <Route element={<BaseLayout/>}>
                <Route path = "/" element = {<Home/>}/>
                <Route path = "/categories" element = {<Categories/>}/>
                <Route path='/addProduct' element = {<AddProduct/>}/>
                <Route path='/addCategory' element = {<AddCategory/>}/>
                <Route path = "/categories/:id" element = {<CategoryDetails/>}/>
                <Route path = "/categories/edit/:id" element = {<CategoryEdit/>}/>
                <Route path = "/details/:id" element = {<Detail/>}/>
                <Route path='/edit/:id' element = {<EditProduct/>}/>
              </Route>
              
            </Routes>
          </BrowserRouter>
        <Footer/>

  </>
  )
}

export default App

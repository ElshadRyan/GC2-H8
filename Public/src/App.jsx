import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Detail from './view/Detail'
import Home from './view/Home'
import { BrowserRouter, Routes, Route } from "react-router";


function App() {

  return (
    <>
      
      <Navbar />
          <BrowserRouter>
            <Routes>
              <Route path = "/" element = {<Home />}/>
              <Route path = "/details/:id" element = {<Detail/>}/>
            </Routes>
          </BrowserRouter>
        <Footer/>

  </>

  )
}

export default App

import React from 'react'
import {Routes,Route,useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Myorders from './pages/Myorders'
import MyBookings from './pages/MyBookings'
import Contact from './pages/Contact'
import About from './pages/About'
import MenuDetails from './pages/MenuDetails'
import BookTable from './pages/BookTable'
import Navbar from './components/navbar'

const App = () => {
  const adminPath=useLocation().pathname.includes('admin');
  return (
    <div>
      {!adminPath && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/menu-details/:id' element={<MenuDetails/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/book-table' element={<BookTable/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/my-orders' element={<Myorders/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </div>
  )
}

export default App

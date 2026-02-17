import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const navbar = () => {
    const {navigate,user,setUser}=useContext(AppContext);
    const[isMenuOpen,setIsMenuOpen]=useState(false);
  return (
    <nav className="bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
        <div>
            <div>
                {/* Left- Logo and navigation links */}
                <div></div>
                {/*center- Menu Items */}
                <div></div>
                {/*Right- cart and login*/}
                <div></div>
            </div>
        </div>

    </nav>
  )
}

export default navbar
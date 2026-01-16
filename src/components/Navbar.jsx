import { NavLink } from 'react-router-dom'
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from '../context/AuthContext'

// Icons
import logo from '../assets/icons/logo.png'
import userProfile from '../assets/icons/user.png'
import bag from '../assets/icons/bag.png'
import menu from '../assets/icons/menu.png'
import { useState } from 'react'

function Navbar() {

    const { user, logOut } = useContext(AuthContext)
    const { cartItems } = useContext(CartContext);
    const [menuItems, setmenuItems] = useState(false)
    const [profileDetails, setprofileDetails] = useState(false)

    const cartCount = cartItems.reduce((total, item) => total + item.qty, 0)

    const handleprofileDetails = () => {
        setprofileDetails(!profileDetails)
    }

    const handleMenu = () => {
        setmenuItems(!menuItems)
    }

    const menuList = [
        { menu: "Home", to: "/" },
        { menu: "Men", to: "/men" },
        { menu: "Women", to: "/women" },
        { menu: "About", to: "/about" }
    ]

    return (
        <section className='Navbar bg-gray-50 py-4 px-5 shadow-md flex items-center justify-between sticky top-0 z-30'>

            <div className='Navbar__logo text-2xl sm:text-3xl font-bold flex items-center gap-1'>
                <img src={logo} alt="" className='w-10 sm:w-12' />
                <h1 className='text-[#FD913C]'>Wear</h1>
                <h1 className='text-[#F13AB1]'>Well</h1>
            </div>

            <div className='Navbar__menu'>

                {/* Menu from Large screen device */}
                <ul className='Navbar__menu hidden lg:flex gap-6 text-lg text-gray-500 font-semibold'>
                    {menuList.map((data) => {
                        return (
                            <li key={data.menu}>
                                <NavLink to={data.to} className={({ isActive }) => isActive ? "text-black" : ""}>{data.menu}</NavLink>
                            </li>
                        )
                    })}
                </ul>

                {/* Menu from Small screen device */}
                <ul className={`Navbar__menu absolute top-0 text-lg text-gray-500 font-semibold py-28 w-full h-screen flex flex-col items-center gap-8 bg-gray-50 transition-all duration-700 z-30 lg:hidden
                    ${menuItems ? "left-0" : "-left-[100%]"}`}>
                    {menuList.map((data) => {
                        return (
                            <li key={data.menu}>
                                <NavLink to={data.to} className={({ isActive }) => isActive ? "text-black" : ""} onClick={handleMenu} >{data.menu}</NavLink>
                            </li>
                        )
                    })}

                    <div className='absolute right-4 top-5 text-black cursor-pointer' onClick={handleMenu}>
                        <i className="ri-close-line font-light text-3xl"></i>
                    </div>
                </ul>
            </div>

            <div className='Navbar__icons flex items-center gap-3'>

                <div className='navbar__icons__user relative cursor-pointer'>
                    <img src={userProfile} alt="user-icon" className='w-7' onClick={handleprofileDetails} />

                    <div className={`absolute bg-white font-semibold border-gray-300 flex flex-col gap-2 items-center pt-10 py-3 w-28 lg:w-32 shadow-md rounded-xl mt-2 lg:right-0 transition-all duration-500 ${profileDetails ? "block" : "hidden"} z-30`}>
                        <div className='text-gray-500 hover:text-black'><NavLink to={'/orders'}>My Orders</NavLink></div>
                        <div className='text-gray-500 hover:text-black'>{user ? (<button onClick={logOut}>Logout</button>) : (<NavLink to={'/login'}>Login</NavLink>)}</div>
                        <button><i className="ri-close-large-line absolute top-2 right-3" onClick={handleprofileDetails}></i></button>
                    </div>
                </div>

                <NavLink to={'/cart'} className='Navbar__bag cursor-pointer relative'>
                    <img src={bag} alt="" className='w-8' />
                    {cartCount > 0 && (
                        <p className='text-white text-xs bg-rose-500 w-4 rounded-full text-center leading-4 absolute top-0 -right-2'>{cartCount}</p>
                    )}
                </NavLink>

                <div className='Navbar__menu cursor-pointer lg:hidden'>
                    <img src={menu} alt="" className='w-8' onClick={handleMenu} />
                </div>
            </div>

        </section>
    )
}

export default Navbar

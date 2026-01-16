import { Link } from 'react-router-dom'

import facebook from '../assets/icons/facebook.png'
import instagram from '../assets/icons/instagram.png'
import twitter from '../assets/icons/twitter.png'

function Footer() {

    const apps = [
        { img: facebook, link: "https://www.facebook.com" },
        { img: instagram, link: "https://www.instagram.com" },
        { img: twitter, link: "https://x.com/" }
    ]

    return (
        <div className='footer bg-gray-50 px-5 pt-12 mt-10'>

            <div className="footer__about-brand flex flex-col gap-4 md:flex-row justify-evenly">
                <div className="md:w-80 lg:w-96">
                    <h1 className='text-2xl font-semibold text-[#FD913C]'>Wear<span className='text-[#F13AB1]'>Well</span></h1>
                    <p className='text-sm text-gray-500 font-medium'>Wear Well delivers stylish, comfortable, and high-quality clothing for everyone, helping you look confident, feel great, and embrace everyday fashion effortlessly.</p>
                </div>

                <div className="footer__customer-policies">
                    <h1 className='font-semibold'>Customer Policies</h1>
                    <ul className='text-sm text-gray-500 font-medium'>
                        <li>Contact Us</li>
                        <li>T&C</li>
                        <li>FAQ</li>
                        <li>Track Orders</li>
                        <li>Terms Of Use</li>
                    </ul>
                </div>

                <div className='footer__keepintouch font-semibold flex flex-col gap-1'>
                    <h1>Keep In Touch</h1>
                    <div className='flex items-center gap-3'>
                        {apps.map(function (data, index) {
                            return (
                                <Link to={data.link} key={index}>
                                    <img src={data.img} alt="" className='w-6' />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>

            <hr className='w-full mt-10 h-1' />
            <p className='text-sm text-center mt-5 font-semibold pb-5'>&#169; All Rights Reserved By CodeWithRagu</p>

        </div>
    )
}

export default Footer

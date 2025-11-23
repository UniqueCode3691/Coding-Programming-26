import React from 'react'
import { Link } from 'react-router-dom'
import FB_Image from '../../assets/Socials/FB_Logo.svg'
import Twitter_Image from "../../assets/Socials/Twitter_Logo.svg"
import YT_Image from "../../assets/Socials/YT_Logo.svg"

const Footer = () => {
  return (
    <div className='bg-oliveleather w-full h-15 text-white text-lg flex flex-row items-center justify-between'>
        <p className='ml-5'>©2026 NearMeer. All Rights Reserved.</p>
        <p><Link className='underline'>About Us</Link> | <Link className='underline'>Privacy Policy</Link> | <Link className='underline'>Terms of Service</Link></p>
        <div className='flex flex-row items-center'>
            <Link><img src={FB_Image} className='w-8' alt="Facebook" /></Link>
            <Link><img src={Twitter_Image} className='ml-4 w-7' alt="Twitter" /></Link>
            <Link><img src={YT_Image} className="ml-5 mr-5 w-8" alt="YouTube" /></Link>
        </div>
    </div>
  )
}

export default Footer
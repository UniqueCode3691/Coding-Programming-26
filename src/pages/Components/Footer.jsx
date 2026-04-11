// Footer.jsx - Footer component for the NearMeer application.
// This component displays the copyright notice and social media links at the bottom of the page.
// It uses React and React Router for navigation.

import React from 'react'
import { Link } from 'react-router-dom'
import FB_Image from '../../assets/Socials/FB_Logo.svg'
import Twitter_Image from "../../assets/Socials/Twitter_Logo.svg"
import YT_Image from "../../assets/Socials/YT_Logo.svg"

// Define the Footer functional component.
// Renders a footer with copyright text and social media icons.
const Footer = () => {
  return (
    // Footer container with background color and flex layout for alignment.
    <div className='bg-oliveleather w-full h-15 text-white text-lg flex flex-row items-center justify-between'>
        {/* Copyright notice on the left. */}
        <p className='ml-5'>©2026 NearMeer. All Rights Reserved.</p>
        {/* Privacy and terms links in the center. */}
        <p><Link className='underline'>Privacy Policy</Link> | <Link className='underline'>Terms of Service</Link> | <a href="https://github.com/UniqueCode3691/Coding-Programming-26" className='underline'>Help</a></p>
        {/* Social media icons on the right. */}
        <div className='flex flex-row items-center'>
            <Link><img src={FB_Image} className='w-8' alt="Facebook" /></Link>
            <Link><img src={Twitter_Image} className='ml-4 w-7' alt="Twitter" /></Link>
            <Link><img src={YT_Image} className="ml-5 mr-5 w-8" alt="YouTube" /></Link>
        </div>
    </div>
  )
}

export default Footer
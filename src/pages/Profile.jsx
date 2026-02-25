// Profile.jsx - User profile page component.
// This component displays user information, allows bio editing, and provides navigation between reviews, saved items, and personal settings.
// Uses Supabase auth for user data and profile updates.

import { useState } from 'react'
import Header from './Components/Header'
import { UserAuth } from '../context/AuthContext'
import { supabase } from '../SupabaseClient'

// Profile functional component.
// Manages user profile display and bio editing functionality.
// Shows user name, join date, bio, and tabbed navigation for different profile sections.
const Profile = () => {
  // Get user session and sign out function from auth context.
  const {session, signOut} = UserAuth()

  // State for bio input field.
  const [bio, setBio] = useState("");

  // State for selected tab (reviews, saved, personal).
  const [selected, setSelected] = useState("r");

  // Function to update user profile with new bio.
  // Validates bio length and updates Supabase auth metadata.
  const updateProfile = async () => {
    if (!bio || bio.length > 150) return;
    const { data, error } = await supabase.auth.updateUser({
      data: {
        bio: bio,
      }
    })
    if (error) alert(error.message)
    else window.location.reload(); // Reload to show updated bio
  }

  // Function to format ISO date string to readable format.
  const formatDate = (isoString) => {
    if (!isoString) return "Unknown";

    const date = new Date(isoString);

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <>
        <Header />

        {/* Profile header with user name and join date */}
        <div className='flex flex-col items-center justify-center'>
        <p className='text-center mt-35 font-semibold text-6xl font-stretch-110% text-olivegreen'>{session?.user?.user_metadata?.name}</p>
        <p className='mt-3 text-lg  text-olivedarkgreen italic'>Member since {formatDate(session?.user?.created_at)}</p>

        {/* Display existing bio or bio editing form */}
        {session?.user?.user_metadata?.bio ? <p className='text-center mt-3 font-semibold text-xl opacity-90 text-olivesepia'>{session?.user?.user_metadata?.bio}</p> :
        <>
        <div className='flex flex-row mt-10 items-center justify-center'>
          <input type="text" maxLength={160} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Say a little bit about yourself!" className='bg-white w-90 hidden sm:flex rounded-full pl-4 py-2 border-1 flex-row focus-within:border-2 hover:border-2 border-olivegreen' />
          <p onClick={updateProfile} className={`text-center font-semibold ml-6 text-xl cursor-pointer transition-opacity ${
                    bio.length > 150 || !bio ? 'opacity-30 cursor-not-allowed' : 'hover:underline text-olivedarkgreen'
                }`}>Add a Bio</p>
        </div>
        {/* Error message for bio too long */}
        {bio.length > 150 && (
              <p className='text-red-600 mt-8 font-bold'>That's a bit too long for a neighborly bio!</p>
            )}
        </>}

          {/* Tab navigation for profile sections */}
          <div className='flex flex-row justify-center space-x-10 text-olivegreen font-semibold mt-30 text-lg'>
            <button onClick={() => setSelected("r")} className={`hover:underline hover:underline-offset-16 z-10 hover:decoration-3 decoration-olivegreen ${selected == "r" ? 'underline-offset-16 decoration-3 transform transition-transform duration-500 ease-in-out underline text-2xl' : 'transform transition-transform duration-200 ease-in-out hover:scale-110'}`}>Reviews</button>
            <button onClick={() => setSelected("s")} className={`hover:underline hover:underline-offset-16 z-10 hover:decoration-3 decoration-olivegreen ${selected == "s" ? 'underline-offset-16 decoration-3 transform transition-transform duration-500 ease-in-out underline text-2xl' : 'transform transition-transform duration-200 ease-in-out hover:scale-110'}`}>Saved</button>
            <button onClick={() => setSelected("p")} className={`hover:underline hover:underline-offset-16 z-10 hover:decoration-3 decoration-olivegreen ${selected == "p" ? 'underline-offset-16 decoration-3 transform transition-transform duration-500 ease-in-out underline text-2xl' : 'transform transition-transform duration-200 ease-in-out hover:scale-110'}`}>Personal</button>
          </div>
          <hr className='border-2 w-3/5 mt-2 border-olivegreen/50 rounded-full' />
        </div>

        {/* Content area for selected tab */}
        <div className='flex flex-col items-center justify-center mt-10'>
          {selected == "p" &&
          <p className=''>Change Bio</p>}
        </div>
    </>
  )
}

export default Profile
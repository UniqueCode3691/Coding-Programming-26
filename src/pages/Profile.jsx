// Profile.jsx - User profile page component.
// This component displays user information, allows bio editing, and provides navigation between reviews, saved items, and personal settings.
// Uses Supabase auth for user data and profile updates.

import { useState, useEffect } from 'react'
import Header from './Components/Header'
import { UserAuth } from '../context/AuthContext'
import { supabase } from '../SupabaseClient'
import { Link } from 'react-router-dom'

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
  const [favorites, setFavorites] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

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

  useEffect(() => {
    if (!session?.user) return;

    const fetchUserData = async () => {
      // 1. Fetch Favorites
      const { data: favs } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', session.user.id);
      setFavorites(favs || []);

      // 2. Fetch User Reviews from your existing table
      const { data: revs } = await supabase
          .from('reviews') // Your existing table name
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
      setUserReviews(revs || []);
    };

    fetchUserData();
  }, [session]);

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
            <button onClick={() => setSelected("s")} className={`hover:underline hover:underline-offset-16 z-10 hover:decoration-3 decoration-olivegreen ${selected == "s" ? 'underline-offset-16 decoration-3 transform transition-transform duration-500 ease-in-out underline text-2xl' : 'transform transition-transform duration-200 ease-in-out hover:scale-110'}`}>Saved</button>          </div>
          <hr className='border-2 w-3/5 mt-2 border-olivegreen/50 rounded-full' />
        </div>

        {/* Content area for selected tab */}
        <div className='flex flex-col items-center justify-center mt-10 w-full max-w-2xl mx-auto px-4'>
        {/* REVIEWS CONTENT */}
        {selected === "r" && userReviews.map((rev) => (
          <div key={rev.id} className="w-full p-4 border-b border-olivegreen/20 mb-4 bg-white rounded-lg">
            <h4 className="font-bold text-olivegreen text-lg">{rev.business_name}</h4>
            <div className="flex text-yellow-500 mb-2">
               {/* Star rendering logic here */}
               <span className="font-bold mr-2">{rev.rating}/5</span>
            </div>
            <p className="text-olivesepia italic">"{rev.content}"</p>
            <p className="text-xs text-gray-400 mt-2">{new Date(rev.created_at).toLocaleDateString()}</p>
          </div>
        ))}

        {/* FAVORITES (SAVED) CONTENT */}
        {selected === "s" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {favorites.map((fav) => (
              <div key={fav.id} className="bg-white rounded-xl p-3 border border-olivegreen/10 shadow-sm">
                <img src={fav.business_data.image} className="h-32 w-full object-cover rounded-md mb-2" />
                <h4 className="font-bold text-olivegreen">{fav.business_name}</h4>
                <Link to={`/business/${fav.business_id}`} state={{ businessData: fav.business_data }} className="text-xs underline text-olivedarkgreen">
                  View Business
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Profile
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import right from "../assets/icons/right.png"
import reviewsIcon from "../assets/icons/reviews.png"
import payments from "../assets/icons/paryments.png"
import { supabase } from '../SupabaseClient.jsx'
import { UserAuth } from '../context/AuthContext'

export default function BusinessTemplate() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id: paramId } = useParams();

    const [business, setBusiness] = useState(location.state?.businessData || null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [userRating, setUserRating] = useState(5);
    const [showForm, setShowForm] = useState(false);
    const { session } = UserAuth()
    const user = session?.user || null
    const totalReviews = reviews.length;
    const [sortOrder, setSortOrder] = useState({ column: 'created_at', ascending: false });
    const averageRating = totalReviews > 0
        ? (reviews.reduce((acc, item) => acc + (item.rating || 0), 0) / totalReviews).toFixed(1)
        : 0;

    const fetchReviews = async () => {
        if (!business?.id) return;

        const { data, error } = await supabase
            .from('reviews')
            .select('*, review_likes(*)')
            .eq('business_id', business.id)
            .order(sortOrder.column, { ascending: sortOrder.ascending });

        if (error) {
            console.error("Error fetching reviews:", error);
        } else if (data) {
            const formattedReviews = data.map(rev => ({
                ...rev,
                likes_count: Array.isArray(rev.review_likes) ? rev.review_likes.length : 0
            }));
            setReviews(formattedReviews);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', reviewId);

        if (error) {
            alert("Error deleting review: " + error.message);
        } else {
            setReviews(prev => prev.filter(r => r.id !== reviewId));
        }
    };

    const handleLikeReview = async (reviewId) => {
        if (!user) return alert("Please sign in to like reviews");

        try {
            // Check if user already liked this review
            const { data: existing, error: checkErr } = await supabase
                .from('review_likes')
                .select('id')
                .match({ review_id: reviewId, user_id: user.id })
                .maybeSingle();

            if (checkErr) throw checkErr;

            if (existing && existing.id) {
                // already liked, remove
                await supabase.from('review_likes').delete().eq('id', existing.id);
            } else {
                await supabase.from('review_likes').insert({ review_id: reviewId, user_id: user.id });
            }
        } catch (err) {
            console.error('Error toggling like:', err)
        } finally {
            fetchReviews();
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) return alert('Please sign in to post a review.')
        if (!newReview || newReview.trim().length < 5) return alert('Please write a longer review (at least 5 characters).')
        if (!business?.id) return alert('Business not found.')

        try {
            const { data, error } = await supabase
                .from('reviews')
                .insert([
                    {
                        business_id: business.id,
                        user_id: user.id,
                        content: newReview.trim(),
                        rating: userRating,
                        user_name: user.user_metadata?.name || user.email
                    }
                ])

            if (error) {
                console.error('Insert review error', error)
                return alert(error.message || 'Failed to post review.')
            }

            setNewReview("");
            setUserRating(5);
            await fetchReviews();
            setShowForm(false);
        } catch (err) {
            console.error('Unexpected error posting review', err)
            alert('Failed to post review. Please try again.')
        }
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === "Recent") {
            setSortOrder({ column: 'created_at', ascending: false });
        } else if (value === "Highest Rated") {
            setSortOrder({ column: 'rating', ascending: false });
        } else if (value === "Lowest Rated") {
            setSortOrder({ column: 'rating', ascending: true });
        }
    };

    // Load reviews when business changes or sort order changes
    useEffect(() => {
        fetchReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [business?.id, sortOrder]);

    // If no business was passed via navigation state, attempt to load by :id
    useEffect(() => {
        const loadBusiness = async () => {
            try {
                if (business) return;
                const id = paramId || location.state?.businessData?.id;
                if (!id) return;

                const { data, error } = await supabase.from('locations').select('*').eq('id', id).single();
                if (error) {
                    console.error('Failed to load business by id:', error)
                    return;
                }

                const normalized = {
                    id: data.id,
                    name: data.name || data.business_name || 'Local Business',
                    image: data.image || null,
                    description: data.description || data.address || '',
                    categories: data.category ? [data.category] : (data.categories || ['Local Business']),
                    tags: data.tags ? (Array.isArray(data.tags) ? data.tags : String(data.tags).split(',').map(t => t.trim())) : [],
                    price: data.price || data.price_level || null,
                    distance: data.distance || null,
                    created_at: data.created_at || null,
                }
                setBusiness(normalized)
            } catch (err) {
                console.error('Error loading business for template:', err)
            }
        }

        loadBusiness();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramId, location.state]);

    if (!business) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-olivedarkgreen text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No Business Data Found</h2>
                    <button onClick={() => navigate('/')} className="bg-olivegreen px-6 py-2 rounded-lg">Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <nav className="flex items-center gap-2 text-sm text-olivedarkgreen/60 mb-6">
                    <button onClick={() => navigate('/')} className="hover:text-olivesepia">Home</button>
                    <img src={right} alt="right arrow" className="w-4 h-4" />
                    <span className="hover:text-olivesepia">{(business.categories && business.categories[0]) || 'Business'}</span>
                    <img src={right} alt="right arrow" className="w-4 h-4" />
                    <span className="text-olivedarkgreen font-medium">{business.name}</span>
                </nav>
                <section className="mb-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-start justify-between bg-white p-6 rounded-xl border border-olivesepia/20">
                        <div className="flex gap-6 items-center">
                            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-xl overflow-hidden shadow-lg border-2 border-olivetan">
                                <img className="w-full h-full object-cover" alt={business.name} src={business.image} />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-2xl sm:text-3xl font-bold text-olivedarkgreen">{business.name}</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex text-yellow-500">
                                        <span className="font-bold text-olivegreen">{averageRating > 0 ? `${averageRating} ★` : "No ratings yet"}</span>
                                    </div>
                                    <span className="text-sm text-olivedarkgreen/60">({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="bg-olivegreen/10 text-olivegreen text-xs font-bold px-2 py-1 rounded uppercase">
                                        {business.tags && business.tags[0] ? business.tags[0] : 'Local Business'}
                                    </span>
                                    <span className="text-olivedarkgreen/40 text-sm">•</span>
                                    <span className="text-olivedarkgreen/60 text-sm italic">{business.distance ?? ''} miles away</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <div className="bg-white p-6 rounded-xl border border-olivesepia/20 mb-6">
                            <h3 className="text-xl font-bold text-olivedarkgreen mb-4">About</h3>
                            <p className="text-olivedarkgreen/80 leading-relaxed">{business.description}</p>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-olivedarkgreen">
                                Community Reviews
                                <span className="text-sm font-normal text-olivedarkgreen/60 bg-olivetan px-2 py-0.5 rounded-full">{totalReviews} Total</span>
                            </h3>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <span className="text-olivedarkgreen/60">Sort by:</span>
                                <select onChange={handleSortChange} className="bg-transparent border-none focus:ring-0 text-olivedarkgreen text-sm cursor-pointer">
                                    <option>Recent</option>
                                    <option>Highest Rated</option>
                                    <option>Lowest Rated</option>
                                </select>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowForm(!showForm)}
                            className="w-full mb-10 lg:w-auto bg-olivesepia text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <img src={reviewsIcon} alt="Reviews Icon" className="w-5 h-5" />
                            {showForm ? "Close Form" : "Write a Review"}
                        </button>
                        <div className="space-y-6">
                            {showForm && (
                                user ? (
                                    <form onSubmit={handleSubmitReview} className="p-6 bg-olivetan/20 rounded-xl border border-olivesepia/10">
                                        <h4 className="font-bold mb-2 text-olivedarkgreen">How was your experience?</h4>
                                        <div className="flex gap-1 mb-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setUserRating(star)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <span className={`text-2xl ${userRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}>
                                                        ★
                                                    </span>
                                                </button>
                                            ))}
                                            <span className="ml-2 text-sm font-bold text-olivedarkgreen/60 self-center">
                                                {userRating} / 5
                                            </span>
                                        </div>

                                        <textarea 
                                            value={newReview} 
                                            onChange={(e) => setNewReview(e.target.value)}
                                            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-olivegreen outline-none min-h-[100px]"
                                            placeholder="Share your experience..."
                                            required
                                        />
                                        <button type="submit" className="mt-3 bg-olivegreen text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity">
                                            Post Review
                                        </button>
                                    </form>
                                ) : (
                                    <div className="p-6 bg-gray-100 rounded-xl text-center border border-dashed border-gray-300">
                                        <p className="text-gray-600">Please <Link to="/sign-in" className="text-olivegreen font-bold underline">sign in</Link> to leave a review.</p>
                                    </div>
                                )
                            )}
                            {reviews.map((rev) => (
                            <article key={rev.id} className="bg-white border border-olivesepia/10 rounded-xl p-6 shadow-sm group">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-bold text-olivedarkgreen">
                                            {rev.user_name?.split('@')[0]}
                                            {user && user.id === rev.user_id && (
                                                <span className="ml-2 text-[10px] bg-olivegreen/10 text-olivegreen px-1.5 py-0.5 rounded">YOU</span>
                                            )}
                                        </p>
                                        <div className="flex text-yellow-500 text-xs">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <span className={i < (rev.rating || 0) ? 'text-yellow-500' : 'text-gray-300'} key={i}>{i < (rev.rating || 0) ? '★' : '☆'}</span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                                        <button 
                                            onClick={() => handleLikeReview(rev.id)}
                                            className="flex items-center gap-1.5 text-gray-500 hover:text-olivegreen transition-colors group"
                                        >
                                            <span className="material-icons text-lg group-active:scale-150 transition-transform">
                                                thumb_up
                                            </span>
                                            <span className="text-xs font-bold">{rev.likes_count} Helpful</span>
                                        </button>
                                        {user && user.id === rev.user_id && (
                                            <button 
                                                onClick={() => handleDeleteReview(rev.id)}
                                                className="text-red-400 hover:text-red-600 ml-auto"
                                            >
                                                <span className="material-icons text-sm">delete</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="text-olivedarkgreen/80 text-sm leading-relaxed">{rev.content}</p>
                            </article>
                        ))}
                        </div>
                    </div>
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-xl overflow-hidden border border-olivesepia/20 p-6">
                             <h4 className="font-bold mb-4 text-olivedarkgreen">Business Details</h4>
                             <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <img src={payments} alt="Payments Icon" className="w-5 h-5" />
                                    <span className="text-sm">Price Level: {business.price}</span>
                                </div>
                             </div>
                        </div>
                    </aside>
                </div>
            </main>
            <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-olivesepia text-white rounded-full shadow-2xl flex items-center justify-center z-50">
                <span className="material-icons">add</span>
            </button>

            <Footer />
        </>
    )
}
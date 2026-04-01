'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import Loading from "@/components/Loading";
import BestSelling from '@/components/BestSelling'

export default function WishlistPage() {
    const { userId } = useAuth()
    const router = useRouter() 
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchWishlist = async () => {
        if (!userId) return
        try {
            const res = await fetch(`/api/favorite?userId=${userId}`)
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            console.error("Lỗi fetch wishlist:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveFromUI = (productId) => {
        setProducts((prev) => prev.filter(item => item.id !== productId))
    }

    useEffect(() => {
        fetchWishlist()
    }, [userId])

    if (!userId) {
        return (
            <div className="flex justify-center items-center h-[60vh] font-medium text-slate-500">
                Please log in to view your wishlist
            </div>
        )
    }

    if (loading) return <Loading />

    return (
        <div className="min-h-[70vh] mx-6">
            <div className="max-w-7xl mx-auto">
                <h1
                    onClick={() => router.push('/shop')}
                    className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer hover:text-slate-700 transition"
                >
                    Your <span className="text-slate-700 font-medium">Wishlist</span>
                </h1>

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-xl my-10 bg-slate-50/50">
                        <p className="text-slate-400 italic">Your wishlist is empty.</p>
                        <button
                            onClick={() => router.push('/')}
                            className="mt-6 bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-900 transition"
                        >
                            Back to Home
                        </button>
                    </div>
                ) : (
                    <div className="my-10">
                        <div className='grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12'>
                            {products.map((item) => (
                                <ProductCard 
                                    key={item.id} 
                                    product={item} 
                                    onRemove={handleRemoveFromUI} 
                                />
                            ))}
                        </div>
                    </div>
                )}
                <BestSelling/>
            </div>
        </div>
    )
}
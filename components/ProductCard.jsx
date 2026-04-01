'use client'
import { assets } from '@/assets/assets'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'

const ProductCard = ({ product, onRemove }) => {
    const { userId } = useAuth()
    const [liked, setLiked] = useState(false)
    const [loading, setLoading] = useState(false)

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    useEffect(() => {
        if (userId && product.id) {
            fetch(`/api/favorite?userId=${userId}&productId=${product.id}`)
                .then(res => res.json())
                .then(data => setLiked(data.liked))
                .catch(err => console.error("Error fetching favorite status", err))
        }
    }, [userId, product.id])

    const trackBehavior = async (action) => {
        if (!userId || !product.id) return;
        try {
            await fetch("/api/track-behavior", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    productId: product.id,
                    action
                })
            });
        } catch (error) {
            console.error(`Error tracking ${action}:`, error);
        }
    }

    const handleFavorite = async (e) => {
        e.preventDefault() 
        e.stopPropagation() 

        if (!userId) {
            alert("Vui lòng đăng nhập để thực hiện chức năng này!")
            return
        }


        setLoading(true)
        try {
            const res = await fetch('/api/favorite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    productId: product.id
                })
            })
            const data = await res.json()
            if (res.ok) {
                setLiked(data.liked)
                
                // 2. LOGIC QUAN TRỌNG: Nếu đây là hành động "Hủy tim" (liked === false)
                // và có hàm onRemove truyền từ trang Wishlist vào
                if (data.liked) {
                    trackBehavior("favorite");
                }

                if (data.liked === false && onRemove) {
                    onRemove(product.id)
                }
            }
            

        } catch (error) {
            console.error("Error toggling favorite", error)
        } finally {
            setLoading(false)
        }
    }

    const ratingArray = Array.isArray(product.rating) ? product.rating : [];
    const rating = ratingArray.length > 0
        ? Math.round(ratingArray.reduce((acc, curr) => acc + (curr.rating || 0), 0) / ratingArray.length)
        : 0;
        

    return (
        <Link
            href={`/product/${product.id}`}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                <Image
                    src={product.images && product.images[0] ? product.images[0] : assets.placeholder_img}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />

                <button
                    onClick={handleFavorite}
                    disabled={loading}
                    // Thêm z-20 để đảm bảo nút bấm luôn nằm trên cùng
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-20 hover:scale-110 active:scale-90 transition disabled:opacity-50"
                >
                    <Image
                        className={`h-3 w-3 transition-all ${liked ? "opacity-100" : "opacity-40"}`}
                        src={assets.heart_icon || '/fallback-heart.svg'}
                        alt="heart_icon"
                        style={{
                            filter: liked 
                                ? 'invert(21%) sepia(100%) saturate(7414%) hue-rotate(359deg) brightness(94%) contrast(117%)' 
                                : 'none'
                        }}
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>

            <div className="flex items-center gap-2">
                <p className="text-xs">{rating}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon
                            key={index}
                            size={14}
                            className='text-transparent'
                            fill={rating >= index + 1 ? "#FF6900" : "#ffc4b7"}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.price}</p>
                <button className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                    Buy now
                </button>
            </div>
        </Link>
    )
}

export default ProductCard
'use client'
import { assets } from '@/assets/assets'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // 1. SỬA LỖI NaN: Kiểm tra mảng rating có tồn tại và có phần tử không
    const ratingArray = Array.isArray(product.rating) ? product.rating : [];
    const rating = ratingArray.length > 0 
        ? Math.round(ratingArray.reduce((acc, curr) => acc + (curr.rating || 0), 0) / ratingArray.length)
        : 0; // Nếu không có rating nào thì mặc định là 0

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
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    {/* 2. SỬA LỖI SRC TRỐNG: Luôn đảm bảo src không bao giờ là "" */}
                    <Image
                        className="h-3 w-3"
                        src={assets.heart_icon || '/fallback-heart.svg'} 
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            
            <div className="flex items-center gap-2">
                {/* Hiển thị con số rating thực tế thay vì fix cứng 4.5 */}
                <p className="text-xs">{rating}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon 
                            key={index} 
                            size={14} 
                            className='text-transparent' 
                            // Rating đã là số (0-5) nên logic này sẽ chạy mượt
                            fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"} 
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.price}</p>
                <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                    Buy now
                </button>
            </div>
        </Link>
    )
}

export default ProductCard
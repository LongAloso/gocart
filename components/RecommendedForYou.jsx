'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Title from './Title' 
import ProductCard from './ProductCard' 
import { useSelector } from 'react-redux'
import { useAuth } from '@clerk/nextjs' 

const RecommendedForYou = () => {
    const { userId, isLoaded } = useAuth() 
    const [recommendedIds, setRecommendedIds] = useState([])
    const [isAILoaded, setIsAILoaded] = useState(false)
    const allProducts = useSelector(state => state.product.list)

    const fetchRecommendations = useCallback(async () => {
        if (!isLoaded || !userId) {
            setRecommendedIds([]);
            setIsAILoaded(false);
            return;
        }

        try {
            
            const res = await fetch(`http://127.0.0.1:8000/recommend/${userId}`)
            const data = await res.json()
            
            if (data.recommended && data.recommended.length > 0) {
                setRecommendedIds(data.recommended)
                setIsAILoaded(true)
            }
        } catch (error) {
            console.error("AI Server Not Response", error)
        }
    }, [userId, isLoaded])

    useEffect(() => {
        fetchRecommendations()

        const interval = setInterval(() => {
            fetchRecommendations()
        }, 120000)

        return () => clearInterval(interval)
    }, [fetchRecommendations])

    const recommendedProducts = allProducts.filter(product => {
        return recommendedIds.some(aiId => 
            String(aiId).trim() === String(product.id).trim()
        )
    })

    const displayProducts = recommendedProducts.length > 0 
        ? recommendedProducts 
        : allProducts.slice(0, 10); 

    if (allProducts.length === 0) return null

    return (
        <section className='px-5 my-12 max-w-7xl mx-auto'>
            <Title 
                title={isAILoaded ? "Recommended For You" : "You might like this"} 
                description={isAILoaded ? `Here are some picks just for you` : "You might like this"} 
                href='/shop' 
            />
            
            <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-12'>
                {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default RecommendedForYou
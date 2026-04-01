'use client'
import BestSelling from "@/components/BestSelling";
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/nextjs";

export default function Product() {

    const { productId } = useParams();
    const { userId } = useAuth();
    const [product, setProduct] = useState();
    const products = useSelector(state => state.product.list);
    const hasTracked = useRef(false);

    const fetchProduct = async () => {
        const product = products.find((product) => product.id === productId);
        setProduct(product);
    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProduct()
        }
        scrollTo(0, 0)
    }, [productId,products]);

    useEffect(() => {
            if (hasTracked.current || !userId || !productId) return;

            hasTracked.current = true;

            fetch("/api/track-behavior", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productId, action: "view" })
            }).catch(err => {
                console.error("Track error:", err);
                hasTracked.current = false;
            });
            
        }, [userId, productId]);

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrums */}
                <div className="  text-gray-600 text-sm mt-8 mb-5">
                    Home / Products / {product?.category}
                </div>

                {/* Product Details */}
                {product && (<ProductDetails product={product} />)}

                {/* Description & Reviews */}
                {product && (<ProductDescription product={product} />)}
                            <div className="h-0.5 w-full bg-slate-200 mx-auto rounded-full"></div>
            </div>

                <BestSelling/>
        </div>
    );
}
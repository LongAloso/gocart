'use client'
import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import RecommendedForYou from "@/components/RecommendedForYou"; 
import { useSelector } from "react-redux";

export default function Home() {
    // Giả sử bạn lưu thông tin user trong Redux sau khi đăng nhập
    const user = useSelector(state => state.auth?.user); 
    const userId = user?.id || "user_3BiKJNIf4FaxIhDjfyLS5DZsS9U"; // ID test từ file CSV

    return (
        <div>
            <Hero />
            
            
            {/* Chèn AI Recommend vào đây để giữ chân khách hàng */}
            <RecommendedForYou userId={userId} />
            <BestSelling />
            <LatestProducts />
            <OurSpecs />
            <Newsletter />
        </div>
    );
}
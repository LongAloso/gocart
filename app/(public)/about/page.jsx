'use client'
import React from "react";
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function AboutPage() {
    const router = useRouter()
    return (
        <div className="bg-white text-gray-800">
        <section className="max-w-6xl mx-auto px-6 py-16 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
            About Our <span className="text-orange-500">CellGenS</span> E-Commerce Platform
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are more than just an online store. Our mission is to connect people
            with quality products, trusted sellers, and a seamless shopping
            experience built on technology and transparency.
            </p>
        </section>

        <section className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
                <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                Our platform was born from a simple idea: make online shopping
                easier, smarter, and more personalized. We started as a small
                project with a passion for technology and quickly grew into a
                full-featured e-commerce ecosystem.
                </p>
                <p className="text-gray-600">
                Today, we continue to innovate by integrating AI-powered
                recommendations, ensuring that every customer finds exactly what
                they need.
                </p>
            </div>
                <section style={{ textAlign: 'center' }}>
                    
                    <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ 
                            width: '150px',          
                            height: '150px', 
                            borderRadius: '50%',       
                            overflow: 'hidden',          
                            margin: '0 auto 15px',       
                            border: '4px solid #fff',    
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
                            }}>
                            <Image 
                                src={assets.FounderAvatar} 
                                alt="Founder LongAloso" 
                                style={{ 
                                width: '100%',           
                                height: '100%',           
                                objectFit: 'cover',       
                                objectPosition: 'center' 
                                }} 
                            />
                            </div>

                            <h3 style={{ marginBottom: '5px', fontSize: '1.25rem', fontWeight: '600', color: '#333' }}>LongAloso</h3>
                            <p style={{ fontStyle: 'italic', color: '#666', margin: 0 }}>Lead Developer & Founder</p>
                    </div>
                </section>
            </div>
        </section>

        <section className="py-16">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
            <div>
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                To empower customers with a fast, reliable, and enjoyable shopping
                experience while helping sellers grow their business through
                modern technology.
                </p>
            </div>
            <div>
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-600">
                To become a leading e-commerce platform that transforms how people
                discover, evaluate, and purchase products online.
                </p>
            </div>
            </div>
        </section>

        {/* Core Values */}
        <section className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-10">
                Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-2xl shadow">
                <h4 className="font-semibold mb-2">Trust & Transparency</h4>
                <p className="text-gray-600 text-sm">
                    We build trust by being transparent in everything we do.
                </p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow">
                <h4 className="font-semibold mb-2">Customer First</h4>
                <p className="text-gray-600 text-sm">
                    Every decision we make is focused on improving user experience.
                </p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow">
                <h4 className="font-semibold mb-2">Innovation</h4>
                <p className="text-gray-600 text-sm">
                    We continuously improve with AI and modern technologies.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* How it works */}
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-10">
                How We Work
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                <div className="text-4xl mb-3">🛍️</div>
                <h4 className="font-semibold">Browse Products</h4>
                <p className="text-gray-600 text-sm">
                    Discover thousands of products from trusted sellers.
                </p>
                </div>
                <div className="text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h4 className="font-semibold">Smart Suggestions</h4>
                <p className="text-gray-600 text-sm">
                    Get AI-powered product recommendations tailored to you.
                </p>
                </div>
                <div className="text-center">
                <div className="text-4xl mb-3">🚚</div>
                <h4 className="font-semibold">Fast Delivery</h4>
                <p className="text-gray-600 text-sm">
                    Enjoy quick and reliable delivery services.
                </p>
                </div>
            </div>
            </div>
        </section>


        {/* CTA */}
        <section className="bg-orange-400 text-white py-16 text-center">
            <h2 className="text-3xl font-semibold mb-4">
            Become a Seller Today
            </h2>
            <p className="text-white mb-6">
            Have products to sell? We make it easy to connect with customers, manage your store, and build your brand.
            </p>
            <button onClick={() => router.push('/create-store')} className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90" >
            Join Now
            </button>
        </section>
        </div>
    );
    }

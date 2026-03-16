'use client'
import React from 'react'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const ContactPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 text-slate-600">
            <div className="text-center mb-16 space-y-6">
                <h1 className="text-3xl sm:text-4xl font-semibold text-slate-800">
                    Contact <span className="text-green-600">Support</span>
                </h1>
                <p className="text-slate-500 leading-relaxed max-w-5xl mx-auto">
                    If you encounter any problems while using our services, please contact us via 
                    email, hotline, or directly at our company headquarters. We are committed to 
                    responding to customers as quickly as possible. We always value customer 
                    feedback and are committed to providing information and support to ensure 
                    maximum customer satisfaction when using 
                    <span className="font-semibold text-slate-800 ml-1">TechGenZ</span> services.
                </p>
                <div className="h-1 w-50 bg-green-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <a className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <Mail size={28} />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Send an Email</p>
                            <h3 className="text-lg font-semibold text-slate-800">longaloso@gmail.com</h3>
                        </div>
                    </div>
                </a>
                <a className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-green-500 hover:shadow-xl hover:shadow-green-50/50 transition-all duration-300">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <Phone size={28} />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Call Hotline</p>
                            <h3 className="text-lg font-semibold text-slate-800">+84 344 760 204</h3>
                        </div>
                    </div>
                </a>
            </div>
            <a  href="https://maps.app.goo.gl/nsnfKfhxtCKdtwdW6" className="p-8 bg-slate-100 border border-slate-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-white shadow-sm rounded-xl text-slate-700">
                        <MapPin size={28} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 uppercase text-xs tracking-wider">Headquarters</h4>
                        <p className="text-sm text-slate-500 mt-1">Dormitory Area B - Hanoi University of Mining and Geology, Dong Ngac, Ha Noi</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 text-black-600 font-medium hover:gap-3 transition-all">
                    Find on Google Maps <ArrowRight size={16} />
                </button>
            </a>
        </div>
    )
}

export default ContactPage
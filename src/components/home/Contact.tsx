'use client';

import { useState } from 'react';
import { sendContactEmail } from '@/lib/actions/contact';

export default function Contact() {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    
    // Kita panggil action yang sudah dibuat
    const result = await sendContactEmail(formData);

    setStatus({ 
      success: result.success, 
      message: result.success ? result.message : result.error 
    });
    
    setIsPending(false);

    if (result.success) {
      (event.target as HTMLFormElement).reset();
    }
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg flex flex-col lg:flex-row">
          
          {/* Contact Information */}
          <div className="bg-emerald-600 text-white p-10 lg:p-16 lg:w-2/5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
              <p className="text-emerald-100 mb-10">
                Ready to source the best Indonesian commodities? Contact us today.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <h4 className="font-semibold text-lg">Address</h4>
                    <p className="text-emerald-100 mt-1">
                      PT Gatha Gemilang Global<br/>
                      Jalan Amplas 14a/31<br/>
                      Medan - North Sumatra, Indonesia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <h4 className="font-semibold text-lg">Phone / WhatsApp</h4>
                    <p className="text-emerald-100 mt-1">+62 812 6451 588</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-2xl mr-4">✉️</span>
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-emerald-100 mt-1">admin@gggindonesia.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <a href="https://linkedin.com/in/gathagemilangglobal" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white hover:text-emerald-200 transition-colors">
                <span className="text-xl mr-2">in</span> linkedin.com/in/gathagemilangglobal
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 lg:p-16 lg:w-3/5">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
                    placeholder="john@company.com" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject / Interested Product</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
                  placeholder="e.g. Inquiry for Betel Nuts" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={4} 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              {/* Status Message */}
              {status && (
                <div className={`p-4 rounded-lg text-sm font-medium border ${status.success ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition-colors flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
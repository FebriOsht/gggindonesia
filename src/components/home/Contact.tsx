export default function Contact() {
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
                    <p className="text-emerald-100 mt-1">Hendra.GGG.ID@gmail.com</p>
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

          {/* Contact Form Placeholder */}
          <div className="p-10 lg:p-16 lg:w-3/5">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="john@company.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject / Interested Product</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="e.g. Inquiry for Betel Nuts" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
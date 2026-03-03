export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-sm font-bold text-emerald-600 tracking-wide uppercase mb-2">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              A Premier Export Trading Company from Indonesia
            </h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Based in Medan, North Sumatra, Indonesia, Gatha Gemilang Global is a premier export trading company founded in 2025. Backed by stakeholders with years of deep expertise in the Business and Banking Industries, we focus on connecting global markets with the finest products from across the Indonesian archipelago.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our expertise lies in sourcing authentic, high-quality commodities and ensuring they strictly meet international standards for our clients worldwide.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="space-y-6">
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xl mr-4">
                  👁️
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Our Vision</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be the first brand that purchasers think of when looking for dependable and high-quality Indonesian commodities.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl mr-4">
                  🎯
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Our Mission</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To facilitate the export of high-quality Indonesian produce by offering foreign companies a dependable, open, and effective sourcing partner.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
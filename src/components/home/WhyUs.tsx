export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-emerald-400 font-bold tracking-wide uppercase mb-2 text-sm">Value Proposition</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Why Partner With GGG?
            </h3>
            <p className="text-emerald-100 text-lg md:text-xl leading-relaxed mb-8">
              We eliminate the complexity of international sourcing. Our local presence means we can personally inspect farms and factories, ensuring consistent quality and ethical practices.
            </p>
            <p className="text-emerald-100 text-lg md:text-xl leading-relaxed">
              We manage the entire supply chain, from the remote village to your designated port, with absolute professionalism.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-800/50 p-6 rounded-2xl border border-emerald-700">
              <div className="text-3xl mb-4">🌍</div>
              <h4 className="text-xl font-bold mb-2">Local Presence</h4>
              <p className="text-emerald-200 text-sm leading-relaxed">Direct inspection of farms and factories across Indonesia.</p>
            </div>
            <div className="bg-emerald-800/50 p-6 rounded-2xl border border-emerald-700">
              <div className="text-3xl mb-4">✨</div>
              <h4 className="text-xl font-bold mb-2">Consistent Quality</h4>
              <p className="text-emerald-200 text-sm leading-relaxed">Strict adherence to international hygiene and quality standards.</p>
            </div>
            <div className="bg-emerald-800/50 p-6 rounded-2xl border border-emerald-700">
              <div className="text-3xl mb-4">🔗</div>
              <h4 className="text-xl font-bold mb-2">Supply Chain</h4>
              <p className="text-emerald-200 text-sm leading-relaxed">End-to-end management from remote villages to your port.</p>
            </div>
            <div className="bg-emerald-800/50 p-6 rounded-2xl border border-emerald-700">
              <div className="text-3xl mb-4">🤝</div>
              <h4 className="text-xl font-bold mb-2">Professionalism</h4>
              <p className="text-emerald-200 text-sm leading-relaxed">Backed by deep expertise in Business and Banking industries.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
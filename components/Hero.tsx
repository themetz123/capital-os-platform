export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#4a5fff] to-black flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          We Do Not Waste Anyone's <span className="text-[#ffb800]">Fucking Time</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
          Do you?
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          If you can commit 1 hour/week (unless your GP Velocity proves you're executing), we're here. If you can't, we're not. No meetings. No hand-holding. No bullshit.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <a href="#pricing" className="inline-block bg-[#ffb800] text-black px-8 py-4 font-bold text-lg hover:bg-opacity-90 transition">
            JOIN PLATFORM ($999/YEAR)
          </a>
          <a href="#apply" className="inline-block border-2 border-[#ffb800] text-[#ffb800] px-8 py-4 font-bold text-lg hover:bg-[#ffb800] hover:text-black transition">
            APPLY FOR PREMIUM
          </a>
        </div>

        <p className="text-sm text-gray-500">
          142+ real GPs. ~5 LP intros/month. Zero carry. All behavior-based.
        </p>
      </div>
    </section>
  );
}

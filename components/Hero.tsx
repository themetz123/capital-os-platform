export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#4a5fff] to-black flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          Stop <span className="text-[#ffb800]">Fundraising</span> Alone
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
          You're not just getting tools. You're getting a team that keeps you from making $1M mistakes.
        </p>
        
        
          href="#pricing"
          className="inline-block bg-[#ffb800] text-black px-8 py-4 font-bold text-lg hover:bg-opacity-90 transition border-2 border-[#ffb800]"
        >
          GET STARTED NOW
        </a>
      </div>
    </section>
  );
}

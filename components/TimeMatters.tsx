export default function TimeMatters() {
  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          The Cost of Momentum Loss
        </h2>
        <p className="text-center text-[#ffb800] text-lg mb-16">
          You're deploying Fund I. Your competitors are raising Fund II. What happens next?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900 rounded p-8 border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">LP RELATIONSHIPS COOLING</p>
            <p className="text-4xl font-bold text-red-400">6 Months</p>
            <p className="text-gray-400 text-sm mt-4">Of radio silence while you deploy = LPs taking calls from your competitors</p>
          </div>

          <div className="bg-gray-900 rounded p-8 border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">MARKET POSITION LOST</p>
            <p className="text-4xl font-bold text-red-400">12 Months</p>
            <p className="text-gray-400 text-sm mt-4">Behind on Fund II while competitors close theirs during your deployment</p>
          </div>

          <div className="bg-gray-900 rounded p-8 border-2 border-[#ffb800]">
            <p className="text-[#ffb800] text-sm mb-2 font-bold">TOTAL MOMENTUM COST</p>
            <p className="text-4xl font-bold text-[#ffb800]">18 Months</p>
            <p className="text-gray-400 text-sm mt-4">Lost competitive edge. Lost LP optionality. Lost time.</p>
          </div>
        </div>

        <div className="bg-[#4a5fff] bg-opacity-10 border border-[#4a5fff] rounded p-8 text-center">
          <p className="text-white text-xl font-bold mb-4">
            Perpetual formation isn't a luxury. It's competitive necessity.
          </p>
          <p className="text-gray-300">
            While you deploy Fund I, we maintain your Fund II pipeline. No cold starts. No massive sprint. No gap where LPs go window shopping. You stay in the game. Continuously.
          </p>
        </div>
      </div>
    </section>
  );
}

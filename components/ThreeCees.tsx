export default function ThreeCees() {
  return (
    <section className="bg-gradient-to-b from-black to-[#1a1a1a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          The 3 Cs: Who We Actually Introduce
        </h2>
        <p className="text-center text-[#ffb800] text-lg mb-16">
          LP intros only happen if you have Carry, Commit, and Control.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 border-l-4 border-[#ffb800] p-8 rounded">
            <h3 className="text-2xl font-bold text-[#ffb800] mb-4">Carry</h3>
            <p className="text-gray-300">
              You're incentivized to win. You have real carry in your fund. You're not just a portfolio manager playing with other people's money. You have skin in the game.
            </p>
          </div>

          <div className="bg-gray-900 border-l-4 border-[#ffb800] p-8 rounded">
            <h3 className="text-2xl font-bold text-[#ffb800] mb-4">Commit</h3>
            <p className="text-gray-300">
              You can commit real capital. $50M fund? 2.5% minimum per LP. $100M+? 2% minimum. If an LP can't move that needle, it's not worth either of your time.
            </p>
          </div>

          <div className="bg-gray-900 border-l-4 border-[#ffb800] p-8 rounded">
            <h3 className="text-2xl font-bold text-[#ffb800] mb-4">Control</h3>
            <p className="text-gray-300">
              You have decision-making authority. You're not asking permission from a committee. You can move fast. You can commit capital without 6 layers of approval.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-lg">
            Missing even one? We don't make intros. Simple as that.
          </p>
        </div>
      </div>
    </section>
  );
}

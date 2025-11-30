export default function NotPlacementAgents() {
  return (
    <section className="bg-gradient-to-b from-[#1a1a1a] to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          We're Not Placement Agents
        </h2>
        <p className="text-center text-[#ffb800] text-lg mb-12">
          Here's what we don't do.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-8 rounded border-l-4 border-red-600">
            <h3 className="text-2xl font-bold text-white mb-6">The Placement Agent Model</h3>
            <ul className="space-y-3 text-gray-300">
              <li>✗ Work on commission (1-3%)</li>
              <li>✗ Take carry, equity, or referral fees</li>
              <li>✗ Shop your deal to every LP hoping something sticks</li>
              <li>✗ Make 50+ intros per month</li>
              <li>✗ Profit from your desperation</li>
              <li>✗ Don't care if the intro is actually a fit</li>
            </ul>
          </div>

          <div className="bg-gray-900 p-8 rounded border-l-4 border-[#ffb800]">
            <h3 className="text-2xl font-bold text-white mb-6">The Capital OS Model</h3>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Fixed annual fee ($999 or $7,875)</li>
              <li>✓ Zero commission, carry, or hidden fees</li>
              <li>✓ Introduce you to specific LPs we think are immediate, very strong fits</li>
              <li>✓ Make ~5 intros per month, not 50</li>
              <li>✓ Our reputation is our only business model</li>
              <li>✓ Every intro must make sense for both sides</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-[#4a5fff] rounded p-8 text-center">
          <p className="text-white text-lg font-bold">
            We want LPs to tell other LPs: "LP Blueprint gave our team a really great intro. They must know some truly amazing emerging fund managers."
          </p>
          <p className="text-gray-200 mt-4 text-sm">
            That's the only business model that matters. Reputation. One conversation at a time.
          </p>
        </div>
      </div>
    </section>
  );
}

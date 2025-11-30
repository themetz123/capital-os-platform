export default function Pricing() {
  return (
    <section id="pricing" className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Pick Your Path
        </h2>
        <p className="text-center text-[#ffb800] text-lg mb-16">
          Platform = Database access. Premium = LP intros (if you hit the 7 items).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Platform Tier */}
          <div className="bg-gray-900 border-2 border-[#ffb800] p-12 rounded">
            <h3 className="text-3xl font-bold text-white mb-2">Platform</h3>
            <div className="text-4xl font-bold text-[#ffb800] mb-8">$999<span className="text-xl text-gray-400">/year</span></div>
            
            <div className="mb-8">
              <h4 className="font-bold text-white mb-4">Includes:</h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li>✓ Weekly 1-on-1 feedback</li>
                <li>✓ 750+ Non-Anchor LP database (export 10 at a time)</li>
                <li>✓ 13 months of capital formation playbook</li>
                <li>✓ Unlimited diagnostic tools</li>
                <li>✓ AI narrative builder</li>
                <li>✓ Discord community (142+ GPs)</li>
                <li>✓ Priority support</li>
              </ul>
            </div>

            <a 
              href="https://buy.stripe.com/fZu14mdow4FEaGL2NfcEw0I"
              className="w-full block text-center bg-[#ffb800] text-black px-8 py-4 font-bold text-lg hover:bg-opacity-90 transition"
            >
              GET STARTED NOW
            </a>
          </div>

          {/* Premium Tier */}
          <div className="bg-gray-900 border-2 border-[#ffb800] p-12 rounded">
            <h3 className="text-3xl font-bold text-white mb-2">Premium</h3>
            <div className="text-4xl font-bold text-[#ffb800] mb-8">$7,875<span className="text-xl text-gray-400">/year</span></div>
            
            <div className="mb-8">
              <h4 className="font-bold text-white mb-4">Everything in Platform PLUS:</h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li>✓ Direct LP introductions (~5/month)</li>
                <li>✓ Family Office & Fund-of-Funds database (70% of North America)</li>
                <li>✓ Executive coaching (beyond weekly check-ins)</li>
                <li>✓ Deal review & portfolio analysis</li>
                <li>✓ Anchor LP strategy</li>
                <li>✓ 2 hours/week minimum commitment</li>
              </ul>
            </div>

            <button 
              onClick={() => alert('Contact team@lpblueprint.com for Premium access')}
              className="w-full block text-center bg-[#ffb800] text-black px-8 py-4 font-bold text-lg hover:bg-opacity-90 transition"
            >
              APPLY FOR PREMIUM
            </button>

            <p className="text-gray-400 text-xs mt-4 text-center">
              *Requires: Hit all 7 items + 90 days minimum enrollment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

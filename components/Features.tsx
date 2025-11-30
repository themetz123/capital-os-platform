export default function Features() {
  return (
    <section className="bg-gradient-to-b from-black to-[#1a1a1a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          The Perpetual Formation Operating System
        </h2>
        <p className="text-center text-[#ffb800] text-lg mb-4">
          This is just the tip of the iceberg.
        </p>
        <p className="text-center text-gray-400 text-lg mb-16">
          Capital OS Premium is a complete, 70-page playbook engineered for Fund II-IV GPs who are deploying while raising.
        </p>

        <div className="space-y-8">
          {/* LP Website Tracking */}
          <div className="bg-gray-900 rounded p-8 border-l-4 border-[#ffb800]">
            <h3 className="text-2xl font-bold text-[#ffb800] mb-4">Automatic LP Presence (While You Deploy)</h3>
            <p className="text-gray-300 mb-4">
              Your website identifies LPs automatically. RB2B/Clearbit matches anonymous traffic to fund names. HubSpot tracks intent signals. n8n triggers immediate action: deal creation, Slack alerts, LP assignment.
            </p>
            <p className="text-gray-400 text-sm">
              Result: LPs experience you as constantly present and responsive—even though you're 100% focused on portfolio companies. They never know you're not thinking about Fund II. You are. Automatically.
            </p>
          </div>

          {/* IC Intelligence */}
          <div className="bg-gray-900 rounded p-8 border-l-4 border-[#ffb800]">
            <h3 className="text-2xl font-bold text-[#ffb800] mb-4">Investment Committee Intelligence</h3>
            <p className="text-gray-300 mb-4">
              Map every LP's IC structure. Identify decision-makers, influence points, internal politics, and landmines. Get a multi-stage penetration plan: who to target first, what they care about, how to move past gatekeepers.
            </p>
            <p className="text-gray-400 text-sm">
              Result: You move faster than competitors because you understand the buyer's psychology before the first call. You know who decides. You know what they fear. You know how to build consensus.
            </p>
          </div>

          {/* Three-Close Framework */}
          <div className="bg-gray-900 rounded p-8 border-l-4 border-[#ffb800]">
            <h3 className="text-2xl font-bold text-[#ffb800] mb-4">Perpetual Close Framework (Not One Massive Sprint)</h3>
            <p className="text-gray-300 mb-4">
              Close 1 (best terms) → Close 2 (standard terms) → Close 3 (oversubscription). Each close uses pressure architecture and social proof. You're always fundraising. Never sprinting. Continuous momentum.
            </p>
            <p className="text-gray-400 text-sm">
              Result: Fund II closes naturally during deployment instead of requiring a painful 18-month pause. LPs FOMO drives early closes. You control timing, not the other way around.
            </p>
          </div>

          {/* Data Room Automation */}
          <div className="bg-gray-900 rounded p-8 border-l-4 border-[#ffb800]">
            <h3 className="text-2xl font-bold text-[#ffb800] mb-4">Automated Data Room (Qualification Built In)</h3>
            <p className="text-gray-300 mb-4">
              SumSub verification gates. Information access correlates to commitment level and timing. LPs self-qualify through access tiers. Due diligence happens automatically. No manual triage.
            </p>
            <p className="text-gray-400 text-sm">
              Result: Your team doesn't manage data rooms. The system does. Serious LPs get what they need. Time-wasters hit a wall. You save 200+ hours per fundraise.
            </p>
          </div>

          {/* The Full Playbook */}
          <div className="bg-[#4a5fff] bg-opacity-20 border border-[#4a5fff] rounded p-8">
            <h3 className="text-2xl font-bold text-[#ffb800] mb-4">This Is Just the Beginning</h3>
            <p className="text-gray-300 mb-4">
              The full Capital OS Premium playbook includes:
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ 70-page strategic playbook (complete methodology)</li>
              <li>✓ LP penetration strategy templates for every major allocator type</li>
              <li>✓ Pressure & punishment close architecture with scripting</li>
              <li>✓ Investment Committee intelligence gathering framework</li>
              <li>✓ Data room sequencing and qualification logic</li>
              <li>✓ Live case studies (how we closed Fund II for 47+ GPs while they deployed)</li>
              <li>✓ Weekly office hours + direct access to Capital OS team</li>
              <li>✓ All 7 items execution roadmap + accountability tracking</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#4a5fff] to-[#ffb800] rounded p-1">
          <div className="bg-black rounded p-8 text-center">
            <p className="text-white text-lg font-bold">
              Premium isn't a service. It's a complete operating system for perpetual formation.
            </p>
            <p className="text-gray-300 mt-4">
              Designed for Fund II-IV GPs who are deploying Fund I while raising Fund II. Built on data, psychology, and 142+ fund manager interviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Comparison() {
  const years = [
    {
      title: "YEAR 1: THE LAUNCH",
      items: [
        { label: "Timeline", sprint: "14-week accelerator sprint", os: "Platform onboarding + first weekly 1-on-1" },
        { label: "Cost", sprint: "Free", os: "$999" },
        { label: "Support After Close", sprint: "Gone. Radio silence.", os: "Weekly 1-on-1 feedback starts immediately" },
        { label: "Your Mindset", sprint: '"I closed Fund I. Done."', os: '"I closed Fund I. Now perpetual formation begins."' },
      ],
      reality: {
        sprint: "You're deployed. Support vanished. You're alone.",
        os: "You're deployed. We're still meeting weekly. Formation engine running."
      }
    },
    {
      title: "YEAR 2: THE DEPLOYMENT & SILENCE",
      items: [
        { label: "Weekly Support", sprint: "None", os: "Weekly 1-on-1s continue" },
        { label: "LP Communication", sprint: "You're figuring it out alone", os: "We're coaching you on every conversation" },
        { label: "Fund II Anchor Search", sprint: "You haven't started", os: "We've identified 3-4 warm anchors already" },
        { label: "Burn-out Risk", sprint: "High. You're alone managing everything.", os: "Low. You have weekly strategic support." },
        { label: "Your Mental State", sprint: '"Should I even raise Fund II?"', os: '"Fund II is already happening. Just need to formalize."' },
      ],
      reality: {
        sprint: "You're 12 months into deployment. You haven't started Fund II process. Your anchor is still a mystery. You're burned out. 37% of GPs in this model never raise Fund II.",
        os: "You're 12 months into deployment. Your Fund II anchor knows you. Your narrative is tight. You're ready to close."
      }
    },
    {
      title: "YEAR 3: THE FUND II RACE",
      items: [
        { label: "Timeline to Fund II Close", sprint: "18-24 months (2.6 years industry average)", os: "6 months" },
        { label: "LP Relationship Status", sprint: "Cold. They haven't heard from you in 12 months.", os: "Warm. They've been updated monthly." },
        { label: "Anchor Status", sprint: "Still looking. Still pitching.", os: "Already committed" },
        { label: "Your Confidence Level", sprint: "Low. Desperate.", os: "High. Momentum-driven. Excited." },
        { label: "Value Preserved This Year", sprint: "$0 (you're behind)", os: "$4M in management fees" },
      ],
      reality: {
        sprint: "You just closed Fund II. You're 18-24 months behind schedule. Your LPs are frustrated. Your IRR will suffer 200-400 bps drag. You're exhausted. Now you owe 1% carry.",
        os: "You closed Fund II 6 months ago. Fund II capital deployed on schedule. No IRR drag. You're already scouting Fund III. You're energized. You've paid $3K total."
      }
    }
  ];

  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Choose Your Path.
        </h2>
        <p className="text-center text-[#ffb800] text-xl mb-16">
          See Where You End Up. The Sprint Model vs. Perpetual Formation. Year by Year. Dollar by Dollar.
        </p>

        {years.map((year, idx) => (
          <div key={idx} className="mb-20 border-t border-[#ffb800] pt-12">
            <h3 className="text-2xl font-bold text-[#ffb800] mb-8">{year.title}</h3>
            
            <div className="space-y-4 mb-8">
              {year.items.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-800 pb-4">
                  <div className="font-bold text-white">{item.label}</div>
                  <div className="text-gray-400">{item.sprint}</div>
                  <div className="text-[#ffb800]">{item.os}</div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded p-6 space-y-4">
              <div>
                <p className="text-sm font-bold text-gray-400 mb-2">THE SPRINT MODEL:</p>
                <p className="text-white">{year.reality.sprint}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#ffb800] mb-2">CAPITAL OS:</p>
                <p className="text-white">{year.reality.os}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

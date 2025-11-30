export default function Features() {
  const platformFeatures = [
    { title: "Weekly 1-on-1 Feedback", desc: "Real strategic guidance on your capital formation" },
    { title: "750+ LP Database", desc: "Access to Non-Anchor LP database. Export 10 at a time. All 750+ available." },
    { title: "13 Months of Playbook", desc: "Everything we've learned from 142+ GPs across VC, PE, fundless, first-time" },
    { title: "Diagnostic Tools", desc: "Run unlimited diagnostics. Find where your velocity is leaking." },
    { title: "AI Narrative Builder", desc: "Tighten your story. Make sure every LP email radiates alignment." },
    { title: "Discord Community", desc: "142+ GPs solving capital formation in real-time. All day." },
  ];

  const premiumFeatures = [
    "Everything in Platform PLUS:",
    "Direct LP Introductions (~5/month, not 50)",
    "Family Office & Fund-of-Funds Database (70% of North America)",
    "Executive Coaching (beyond weekly check-ins)",
    "Deal Review & Portfolio Analysis",
    "Anchor LP Strategy",
  ];

  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          What You Actually Get
        </h2>
        <p className="text-center text-[#ffb800] text-lg mb-16">
          Platform = Database & Community. Premium = LP Intros (if you qualify).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Capital OS Platform ($999/year)</h3>
            <div className="space-y-4">
              {platformFeatures.map((feature, idx) => (
                <div key={idx} className="bg-gray-900 p-4 rounded border border-gray-800">
                  <h4 className="font-bold text-[#ffb800]">{feature.title}</h4>
                  <p className="text-gray-300 text-sm mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Capital OS Premium ($7,875/year)</h3>
            <div className="space-y-3 bg-gray-900 p-8 rounded border-2 border-[#ffb800]">
              {premiumFeatures.map((feature, idx) => (
                <p key={idx} className={idx === 0 ? "font-bold text-[#ffb800] mb-4" : "text-gray-300"}>
                  {feature}
                </p>
              ))}
              <p className="text-gray-400 text-sm mt-6 italic">
                *Requires: 7 items completed + 90 days minimum enrollment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

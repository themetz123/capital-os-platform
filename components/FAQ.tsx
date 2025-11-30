'use client';
import { useState } from 'react';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { 
      q: "Will you introduce me to LPs if I buy Platform?", 
      a: "No. Platform gives you database access. LP intros are Premium only, and only if you hit the 3 Cs and complete the 7 items. We do ~5 intros/month, not 50. Quality > volume." 
    },
    { 
      q: "What are the 7 items I need to hit for Premium?", 
      a: "1) CRM configured with real pipeline data, 2) LP landing pages per type, 3) All partners enrolled 90+ days, 4) LP has deployed into your stage in 18 months, 5) You help us source that evidence, 6) They can commit real capital (2.5% min for <$50M, 2% for $50M+), 7) You have the bandwidth (3-4 people for $50M raise, 4-8 for $50-100M, 8+ for $100M+)." 
    },
    { 
      q: "Are you a placement agent?", 
      a: "No. We don't work on commission. We don't take carry, equity, or referral fees. We're not shopping your deal hoping something sticks. Reputation is our only business model." 
    },
    { 
      q: "How many LP intros do you actually make?", 
      a: "~5 per month. Not 50. We only introduce GPs we actually want to work with. No assholes. No arrogant operators. No one too proud to learn." 
    },
    { 
      q: "Can I get the Family Office database with Platform?", 
      a: "No. Family Office & Fund-of-Funds database (70% of North America) is Premium only. Platform gets the 750+ Non-Anchor LP database. Both are gold." 
    },
  ];

  return (
    <section className="bg-gradient-to-b from-black to-[#1a1a1a] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Questions?</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-800 rounded">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-6 text-left flex justify-between hover:bg-gray-900 bg-gray-800">
                <h3 className="font-bold text-white">{faq.q}</h3>
                <span className="text-[#ffb800] text-2xl">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <div className="p-6 bg-gray-950 border-t border-gray-800 text-gray-300">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

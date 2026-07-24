import { useState } from 'react'
import { Heart, Shield, CheckCircle, ChevronRight, Globe, Leaf, Droplets, Users, Star } from 'lucide-react'

const impactPerDollar: Record<number, string[]> = {
  10: ['10 coral fragments planted', '1 hour of reef monitoring', '50 student learning resources'],
  25: ['25 marine species tracked', '4 hours of cleanup ops', 'Sponsors 2 volunteer hours'],
  50: ['1 sq meter of reef restored', '1 drone monitoring flight', 'Funds 1 day of AI analysis'],
  100: ['10 sq meters reef restored', '3 cleanup crew days', 'Sponsors 1 research diver'],
  250: ['Community education event', 'Emergency bleaching response', 'Funds 1 week expedition'],
  500: ['Full reef zone assessment', '1 ton of plastic removed', 'Sponsors entire school term'],
}

const campaigns = [
  { title: 'Great Barrier Reef', raised: 245000, goal: 400000, color: '#14B8A6', icon: '🪸' },
  { title: 'Pacific Cleanup', raised: 182000, goal: 300000, color: '#06B6D4', icon: '🌊' },
  { title: 'Coral Triangle', raised: 98000, goal: 200000, color: '#22C55E', icon: '🐠' },
]

const successStories = [
  {
    quote: "With the funds raised through REEF, we restored 2 hectares of coral at Agincourt Reef — it's now home to over 800 fish species.",
    name: 'Dr. James Morrison',
    role: 'Lead Scientist, AIMS',
    avatar: 'photo-1507003211169-0a1dd7228f2d',
  },
  {
    quote: "Our beach cleanup campaign removed 8.4 tons of plastic from Phuket's coastline. The community response was overwhelming.",
    name: 'Nadia Patel',
    role: 'Campaign Director, REEF',
    avatar: 'photo-1494790108755-2616b612b786',
  },
]

const amounts = [10, 25, 50, 100, 250, 500]

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [campaign, setCampaign] = useState(0)
  const [step, setStep] = useState<'select' | 'payment' | 'success'>('select')

  const amount = customAmount ? parseInt(customAmount) : selectedAmount
  const impacts = impactPerDollar[selectedAmount] || impactPerDollar[50]

  if (step === 'success') {
    return (
      <div style={{ background: '#0A0F1E', minHeight: '100vh', paddingTop: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          <div style={{ fontSize: '4rem', marginBottom: 24 }}>🌊</div>
          <h2 className="heading-display" style={{ fontSize: '2.4rem', color: '#F8FAFC', marginBottom: 16 }}>
            Thank you for protecting our{' '}
            <span className="text-gradient-ocean">oceans!</span>
          </h2>
          <p style={{ color: 'rgba(248,250,252,0.5)', lineHeight: 1.7, marginBottom: 32 }}>
            Your ${amount} donation has been received and will be allocated within 48 hours to your chosen campaign.
          </p>
          <div className="glass-teal" style={{ borderRadius: 16, padding: '24px', marginBottom: 28, border: '1px solid rgba(20,184,166,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <CheckCircle size={20} color="#22C55E" />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: '#F8FAFC', fontSize: '0.95rem' }}>Impact Summary</span>
            </div>
            {impacts.map((imp, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < impacts.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <CheckCircle size={14} color="#14B8A6" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: '0.84rem', color: 'rgba(248,250,252,0.7)' }}>{imp}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setStep('select')} className="btn-primary" style={{ padding: '14px 32px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
            Make Another Donation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh', paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #0D1B3E 0%, #0A0F1E 100%)', padding: '56px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="ocean-orb" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(251,113,133,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ color: '#FB7185', marginBottom: 12 }}>Make a Difference</div>
          <h1 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#F8FAFC', marginBottom: 16 }}>
            Fund Ocean{' '}
            <span className="text-gradient-warm">Conservation</span>
          </h1>
          <p style={{ color: 'rgba(248,250,252,0.5)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            100% of donations go directly to active campaigns. Full transparency, real impact.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28, alignItems: 'start' }}>
          {/* Donation form */}
          <div className="glass" style={{ borderRadius: 20, padding: '32px', border: '1px solid rgba(255,255,255,0.07)' }}>
            {step === 'select' && (
              <>
                {/* Frequency toggle */}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4, marginBottom: 28 }}>
                  {(['once', 'monthly'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFrequency(f)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: 9,
                        border: 'none',
                        background: frequency === f ? 'rgba(20,184,166,0.15)' : 'transparent',
                        color: frequency === f ? '#14B8A6' : 'rgba(248,250,252,0.5)',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textTransform: 'capitalize',
                      }}
                    >
                      {f === 'once' ? 'One-time' : 'Monthly'}
                      {f === 'monthly' && (
                        <span style={{ fontSize: '0.65rem', color: '#22C55E', marginLeft: 6, background: 'rgba(34,197,94,0.1)', padding: '2px 6px', borderRadius: 4 }}>
                          2x impact
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Amount grid */}
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'rgba(248,250,252,0.6)', marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  Select Amount
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 12 }}>
                  {amounts.map((a) => (
                    <button
                      key={a}
                      onClick={() => { setSelectedAmount(a); setCustomAmount('') }}
                      style={{
                        padding: '14px 8px',
                        borderRadius: 12,
                        border: `1px solid ${selectedAmount === a && !customAmount ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.1)'}`,
                        background: selectedAmount === a && !customAmount ? 'rgba(20,184,166,0.1)' : 'rgba(255,255,255,0.03)',
                        color: selectedAmount === a && !customAmount ? '#14B8A6' : 'rgba(248,250,252,0.7)',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      ${a}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div style={{ position: 'relative', marginBottom: 24 }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(248,250,252,0.4)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>$</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="input-glass"
                    style={{ paddingLeft: 28 }}
                  />
                </div>

                {/* Campaign picker */}
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', color: 'rgba(248,250,252,0.6)', marginBottom: 14, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Choose Campaign
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {campaigns.map((c, i) => {
                    const pct = Math.round((c.raised / c.goal) * 100)
                    return (
                      <button
                        key={i}
                        onClick={() => setCampaign(i)}
                        style={{
                          padding: '14px 16px',
                          borderRadius: 12,
                          border: `1px solid ${campaign === i ? `${c.color}40` : 'rgba(255,255,255,0.08)'}`,
                          background: campaign === i ? `${c.color}08` : 'rgba(255,255,255,0.02)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                        }}
                      >
                        <span style={{ fontSize: '1.4rem' }}>{c.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: '#F8FAFC', marginBottom: 6 }}>
                            {c.title}
                          </div>
                          <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999 }}>
                            <div style={{ height: '100%', width: `${pct}%`, background: c.color, borderRadius: 999 }} />
                          </div>
                        </div>
                        <span className="stat-number" style={{ fontSize: '0.9rem', color: c.color, flexShrink: 0 }}>{pct}%</span>
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <Heart size={16} />
                  <span>Donate ${amount}{frequency === 'monthly' ? '/mo' : ''}</span>
                  <ChevronRight size={16} />
                </button>

                <p style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.3)', textAlign: 'center', marginTop: 12 }}>
                  <Shield size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                  Secure, encrypted payment · 100% goes to campaigns
                </p>
              </>
            )}

            {step === 'payment' && (
              <>
                <button onClick={() => setStep('select')} style={{ background: 'none', border: 'none', color: 'rgba(248,250,252,0.4)', cursor: 'pointer', fontSize: '0.85rem', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6, padding: 0 }}>
                  ← Back
                </button>
                <h3 className="heading-display" style={{ fontSize: '1.3rem', color: '#F8FAFC', marginBottom: 24 }}>
                  Payment Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 8 }}>Email</label>
                    <input type="email" placeholder="you@example.com" className="input-glass" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 8 }}>Full Name</label>
                    <input type="text" placeholder="Your name" className="input-glass" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 8 }}>Card Number</label>
                    <input type="text" placeholder="4242 4242 4242 4242" className="input-glass" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 8 }}>Expiry</label>
                      <input type="text" placeholder="MM / YY" className="input-glass" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 8 }}>CVC</label>
                      <input type="text" placeholder="•••" className="input-glass" />
                    </div>
                  </div>
                </div>
                <div style={{ borderRadius: 12, padding: '14px 16px', background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)', margin: '20px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.875rem', color: 'rgba(248,250,252,0.6)' }}>Total</span>
                    <span className="stat-number" style={{ fontSize: '1.1rem', color: '#14B8A6' }}>${amount}{frequency === 'monthly' ? '/mo' : ''}</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep('success')}
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  <Shield size={16} />
                  Complete Donation
                </button>
              </>
            )}
          </div>

          {/* Impact sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Impact calculator */}
            <div className="glass-teal" style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(20,184,166,0.2)' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 16 }}>
                Your Impact — ${selectedAmount}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {impacts.map((imp, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(20,184,166,0.2)', border: '1px solid rgba(20,184,166,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <CheckCircle size={10} color="#14B8A6" />
                    </div>
                    <span style={{ fontSize: '0.84rem', color: 'rgba(248,250,252,0.75)', lineHeight: 1.4 }}>{imp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust signals */}
            <div className="glass" style={{ borderRadius: 18, padding: '20px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC', marginBottom: 14 }}>
                Why Trust REEF?
              </h3>
              {[
                { icon: Shield, label: '100% Transparent', desc: 'Every dollar tracked on-chain', color: '#22C55E' },
                { icon: Globe, label: '60+ Countries', desc: 'Active campaigns worldwide', color: '#06B6D4' },
                { icon: Star, label: '4.9/5 Rating', desc: 'From 12,000+ donors', color: '#FBBF24' },
              ].map((t) => (
                <div key={t.label} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.color}12`, border: `1px solid ${t.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <t.icon size={16} color={t.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#F8FAFC' }}>{t.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.4)' }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Success story */}
            <div className="glass" style={{ borderRadius: 18, padding: '20px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontSize: '0.84rem', color: 'rgba(248,250,252,0.7)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 14 }}>
                "{successStories[0].quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img
                  src={`https://images.unsplash.com/${successStories[0].avatar}?w=40&h=40&fit=crop&auto=format`}
                  alt={successStories[0].name}
                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(20,184,166,0.3)' }}
                />
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.8rem', color: '#F8FAFC' }}>{successStories[0].name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(248,250,252,0.4)' }}>{successStories[0].role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

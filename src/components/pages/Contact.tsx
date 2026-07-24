import { useState } from 'react'
import { Mail, MapPin, Globe, ChevronDown, ChevronUp, Send, ExternalLink } from 'lucide-react'

const faqs = [
  {
    q: 'How are donations allocated?',
    a: '100% of donations go directly to campaign operational costs. REEF Foundation is funded separately through institutional grants. We publish quarterly impact reports with full financial transparency.',
  },
  {
    q: 'How can I volunteer with REEF?',
    a: 'Sign up through our Volunteer Hub to browse local and remote missions. We have opportunities ranging from 2-hour beach cleanups to 3-month field research expeditions across 60+ countries.',
  },
  {
    q: 'What is ReefLens and how accurate is it?',
    a: 'ReefLens is our AI-powered coral and marine species identification tool. Trained on 2M+ labeled images from GBIF and partner institutions, it achieves 94% accuracy on known species and flags unknowns for expert review.',
  },
  {
    q: 'Can organizations partner with REEF?',
    a: 'Yes! We have partnership programs for NGOs, research institutions, dive operators, and corporate sponsors. Contact partnerships@reef.earth or fill out the form below for details.',
  },
  {
    q: 'Is REEF a registered nonprofit?',
    a: 'REEF Foundation is registered as a 501(c)(3) nonprofit in the United States and has equivalents in 12 other jurisdictions. Donations are tax-deductible where applicable.',
  },
]

const offices = [
  { city: 'Sydney', country: 'Australia', address: '1 Darling Harbour, NSW 2000', role: 'APAC HQ' },
  { city: 'Miami', country: 'United States', address: '500 Brickell Ave, FL 33131', role: 'Americas HQ' },
  { city: 'Amsterdam', country: 'Netherlands', address: 'Keizersgracht 241, 1016', role: 'Europe HQ' },
]

export default function Contact() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh', paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #0D1B3E 0%, #0A0F1E 100%)', padding: '56px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="ocean-orb" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ color: '#14B8A6', marginBottom: 12 }}>Get In Touch</div>
          <h1 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#F8FAFC', marginBottom: 16 }}>
            Contact{' '}
            <span className="text-gradient-ocean">REEF</span>
          </h1>
          <p style={{ color: 'rgba(248,250,252,0.5)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Whether you want to partner, volunteer, research, or simply ask a question — we&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Contact form */}
          <div>
            <div className="glass" style={{ borderRadius: 20, padding: '36px', border: '1px solid rgba(255,255,255,0.07)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 20 }}>🌊</div>
                  <h3 className="heading-display" style={{ fontSize: '1.5rem', color: '#F8FAFC', marginBottom: 12 }}>
                    Message received!
                  </h3>
                  <p style={{ color: 'rgba(248,250,252,0.5)', lineHeight: 1.7 }}>
                    We&apos;ll get back to you within 24 hours. Check your inbox for a confirmation.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-ghost" style={{ marginTop: 24, padding: '10px 24px', borderRadius: 10, cursor: 'pointer', fontSize: '0.875rem' }}>
                    Send another
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="heading-display" style={{ fontSize: '1.4rem', color: '#F8FAFC', marginBottom: 24 }}>
                    Send us a message
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 8 }}>First Name</label>
                        <input type="text" placeholder="Alex" className="input-glass" />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 8 }}>Last Name</label>
                        <input type="text" placeholder="Rivera" className="input-glass" />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 8 }}>Email</label>
                      <input type="email" placeholder="alex@example.com" className="input-glass" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 8 }}>Topic</label>
                      <select className="input-glass">
                        <option style={{ background: '#0A0F1E' }}>General Inquiry</option>
                        <option style={{ background: '#0A0F1E' }}>Partnership</option>
                        <option style={{ background: '#0A0F1E' }}>Research Collaboration</option>
                        <option style={{ background: '#0A0F1E' }}>Media & Press</option>
                        <option style={{ background: '#0A0F1E' }}>Volunteer Inquiry</option>
                        <option style={{ background: '#0A0F1E' }}>Technical Support</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 8 }}>Message</label>
                      <textarea
                        className="input-glass"
                        placeholder="Tell us about your interest in ocean conservation..."
                        rows={5}
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                    <button
                      onClick={() => setSubmitted(true)}
                      className="btn-primary"
                      style={{ padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Newsletter */}
            <div
              className="glass-teal"
              style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(20,184,166,0.2)', marginTop: 20 }}
            >
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 8 }}>
                Weekly Ocean Digest
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'rgba(248,250,252,0.5)', marginBottom: 16, lineHeight: 1.5 }}>
                Conservation alerts, new campaigns, and field reports every Tuesday.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <input type="email" placeholder="you@example.com" className="input-glass" style={{ flex: 1 }} />
                <button className="btn-primary" style={{ padding: '12px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Contact info */}
            <div className="glass" style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 18 }}>
                Contact Details
              </h3>
              {[
                { icon: Mail, label: 'hello@reef.earth', sub: 'General inquiries' },
                { icon: Mail, label: 'partnerships@reef.earth', sub: 'Partnerships & sponsors' },
                { icon: Globe, label: 'reef.earth', sub: 'Main website' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none', alignItems: 'center' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <c.icon size={16} color="#14B8A6" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#F8FAFC' }}>{c.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.4)' }}>{c.sub}</div>
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                {[
                  { label: 'Twitter', color: '#06B6D4', char: 'X' },
                  { label: 'Instagram', color: '#FB7185', char: 'IG' },
                  { label: 'LinkedIn', color: '#0F4C81', char: 'in' },
                  { label: 'YouTube', color: '#F97316', char: 'YT' },
                ].map((s) => (
                  <button
                    key={s.label}
                    title={s.label}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${s.color}12`,
                      border: `1px solid ${s.color}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${s.color}25`; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${s.color}12`; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <span style={{ fontSize: '0.7rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: s.color }}>{s.char}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Offices */}
            <div className="glass" style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 18 }}>
                Global Offices
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {offices.map((o, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '12px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={16} color="#06B6D4" />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: '#F8FAFC', marginBottom: 2 }}>
                        {o.city}, {o.country}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.35)', marginBottom: 4 }}>{o.address}</div>
                      <span className="badge" style={{ background: 'rgba(20,184,166,0.1)', color: '#14B8A6', border: '1px solid rgba(20,184,166,0.2)' }}>
                        {o.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="glass" style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 18 }}>
                Frequently Asked Questions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {faqs.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 10,
                      overflow: 'hidden',
                      border: `1px solid ${expanded === i ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.05)'}`,
                      background: expanded === i ? 'rgba(20,184,166,0.04)' : 'transparent',
                      marginBottom: 4,
                    }}
                  >
                    <button
                      onClick={() => setExpanded(expanded === i ? null : i)}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#F8FAFC', flex: 1 }}>
                        {f.q}
                      </span>
                      {expanded === i ? <ChevronUp size={16} color="rgba(248,250,252,0.4)" /> : <ChevronDown size={16} color="rgba(248,250,252,0.4)" />}
                    </button>
                    {expanded === i && (
                      <div style={{ padding: '0 16px 14px' }}>
                        <p style={{ fontSize: '0.84rem', color: 'rgba(248,250,252,0.55)', lineHeight: 1.65 }}>{f.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

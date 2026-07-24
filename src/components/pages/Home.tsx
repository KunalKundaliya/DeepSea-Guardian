import { useState, useEffect, useRef } from 'react'
import {
  ArrowRight, Play, TrendingUp, Users, MapPin, Leaf,
  ChevronRight, Star, Quote, Globe, Zap, Shield, Heart,
  Fish, Anchor, Droplets,
} from 'lucide-react'

const stats = [
  { value: '2.4B', label: 'Ocean Area Mapped', icon: Globe, color: '#06B6D4' },
  { value: '847K', label: 'Species Monitored', icon: Fish, color: '#14B8A6' },
  { value: '156K', label: 'Active Volunteers', icon: Users, color: '#22C55E' },
  { value: '$8.2M', label: 'Funds Raised', icon: Heart, color: '#FB7185' },
]

const campaigns = [
  {
    id: 1,
    title: 'Great Barrier Reef Restoration',
    location: 'Queensland, Australia',
    raised: 245000,
    goal: 400000,
    volunteers: 1240,
    image: 'photo-1559825481-12a05cc00344',
    tag: 'Urgent',
    tagColor: '#FB7185',
    daysLeft: 18,
  },
  {
    id: 2,
    title: 'Pacific Plastic Cleanup Initiative',
    location: 'North Pacific Ocean',
    raised: 182000,
    goal: 300000,
    volunteers: 892,
    image: 'photo-1484291470158-b8f8d608850d',
    tag: 'Active',
    tagColor: '#22C55E',
    daysLeft: 34,
  },
  {
    id: 3,
    title: 'Coral Triangle Conservation',
    location: 'Southeast Asia',
    raised: 98000,
    goal: 200000,
    volunteers: 567,
    image: 'photo-1546026423-cc4642628d2b',
    tag: 'New',
    tagColor: '#14B8A6',
    daysLeft: 61,
  },
]

const testimonials = [
  {
    quote: "REEF transformed how our NGO operates. The real-time data and volunteer coordination tools are unmatched.",
    name: 'Dr. Maya Chen',
    role: 'Marine Biologist, WWF',
    avatar: 'photo-1494790108755-2616b612b786',
  },
  {
    quote: "Using ReefLens, our team identified 3 new coral species in just one month. This platform is revolutionary.",
    name: 'James Hartwell',
    role: 'Field Researcher, Oceana',
    avatar: 'photo-1507003211169-0a1dd7228f2d',
  },
  {
    quote: "The impact dashboard gives our donors complete transparency. Fundraising has increased 340% since we joined.",
    name: 'Sarah Okonkwo',
    role: 'Campaign Director, Blue Ocean',
    avatar: 'photo-1438761681033-6461ffad8d80',
  },
]

const partners = [
  'UNESCO', 'WWF', 'Oceana', 'IUCN', 'UN Environment', 'Greenpeace',
]

interface HomeProps {
  setCurrentPage: (page: string) => void
}

function AnimatedStat({ value, label, icon: Icon, color }: typeof stats[0]) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="glass card-hover"
      style={{
        borderRadius: 20,
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `${color}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${color}30`,
        }}
      >
        <Icon size={22} color={color} />
      </div>
      <div>
        <div
          className="stat-number"
          style={{ fontSize: '2.4rem', color, letterSpacing: '-0.03em', lineHeight: 1 }}
        >
          {value}
        </div>
        <div style={{ color: 'rgba(248,250,252,0.55)', fontSize: '0.875rem', marginTop: 6 }}>
          {label}
        </div>
      </div>
    </div>
  )
}

export default function Home({ setCurrentPage }: HomeProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background layers */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #0A0F1E 0%, #0D1B3E 40%, #071428 100%)',
          }}
        />

        {/* Ocean photo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1920&h=1080&fit=crop&auto=format)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
          }}
        />

        {/* Orbs */}
        <div
          className="ocean-orb animate-pulse-glow"
          style={{
            position: 'absolute',
            top: '10%',
            left: '-10%',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          className="ocean-orb animate-pulse-glow"
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '-5%',
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
            animationDelay: '1.5s',
          }}
        />
        <div
          className="ocean-orb"
          style={{
            position: 'absolute',
            top: '40%',
            right: '20%',
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Floating coral illustrations */}
        <div
          className="animate-float"
          style={{
            position: 'absolute',
            top: '20%',
            right: '8%',
            width: 180,
            height: 180,
            opacity: 0.4,
          }}
        >
          <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="90" cy="160" rx="40" ry="10" fill="rgba(20,184,166,0.3)" />
            <path d="M90 160 Q70 120 60 80 Q55 60 70 50 Q85 40 90 60 Q95 40 110 50 Q125 60 120 80 Q110 120 90 160Z" fill="rgba(20,184,166,0.25)" stroke="rgba(20,184,166,0.5)" strokeWidth="1"/>
            <path d="M90 130 Q75 100 72 70 Q80 65 88 75 Q92 65 100 70 Q107 100 90 130Z" fill="rgba(6,182,212,0.3)" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
            <circle cx="68" cy="48" r="6" fill="rgba(251,113,133,0.6)" />
            <circle cx="112" cy="48" r="5" fill="rgba(251,113,133,0.5)" />
            <circle cx="90" cy="38" r="4" fill="rgba(34,197,94,0.6)" />
          </svg>
        </div>

        <div
          className="animate-float-delay"
          style={{
            position: 'absolute',
            bottom: '18%',
            right: '18%',
            width: 120,
            height: 120,
            opacity: 0.35,
          }}
        >
          <svg viewBox="0 0 120 120" fill="none">
            <path d="M60 100 Q40 70 35 45 Q38 30 50 35 Q58 20 60 38 Q62 20 70 35 Q82 30 85 45 Q80 70 60 100Z" fill="rgba(251,113,133,0.25)" stroke="rgba(251,113,133,0.4)" strokeWidth="1"/>
            <circle cx="45" cy="33" r="4" fill="rgba(251,113,133,0.6)" />
            <circle cx="75" cy="33" r="3" fill="rgba(251,113,133,0.5)" />
          </svg>
        </div>

        {/* Bubbles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: `${10 + i * 8}%`,
              left: `${8 + i * 11}%`,
              width: 6 + i * 2,
              height: 6 + i * 2,
              borderRadius: '50%',
              border: '1px solid rgba(6,182,212,0.4)',
              background: 'rgba(6,182,212,0.06)',
              animation: `bubble ${4 + i * 0.7}s ease-in-out ${i * 0.4}s infinite`,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: 1280,
            margin: '0 auto',
            padding: '120px 24px 80px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          <div>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(20,184,166,0.1)',
                border: '1px solid rgba(20,184,166,0.25)',
                borderRadius: 999,
                padding: '6px 14px',
                marginBottom: 28,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#14B8A6', animation: 'pulseGlow 2s ease-in-out infinite' }} />
              <span className="section-label" style={{ color: '#14B8A6', fontSize: '0.7rem' }}>
                Ocean Conservation Platform
              </span>
            </div>

            <h1
              className="heading-display"
              style={{
                fontSize: 'clamp(3rem, 5vw, 4.8rem)',
                color: '#F8FAFC',
                marginBottom: 24,
                lineHeight: 1.05,
              }}
            >
              Protect{' '}
              <span className="text-gradient-ocean">Oceans.</span>
              <br />
              Inspire Action.
              <br />
              Create{' '}
              <span style={{ color: '#22C55E' }}>Impact.</span>
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(248,250,252,0.6)',
                lineHeight: 1.75,
                maxWidth: 480,
                marginBottom: 40,
              }}
            >
              REEF unites scientists, volunteers, and donors to monitor, protect, and restore ocean ecosystems through AI-powered tools and collective action.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                onClick={() => setCurrentPage('campaigns')}
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>Explore Campaigns</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setCurrentPage('reeflens')}
                className="btn-ghost"
                style={{
                  padding: '14px 28px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Play size={15} />
                <span>Try ReefLens AI</span>
              </button>
            </div>

            {/* Mini stats */}
            <div style={{ display: 'flex', gap: 32, marginTop: 48 }}>
              {[
                { v: '2.4B+', l: 'km² mapped' },
                { v: '847K', l: 'species tracked' },
                { v: '156K', l: 'volunteers' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="stat-number" style={{ fontSize: '1.5rem', color: '#14B8A6', letterSpacing: '-0.02em' }}>
                    {s.v}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.45)', marginTop: 2 }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual panel */}
          <div style={{ position: 'relative' }}>
            <div
              className="animate-float-slow"
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '4/5',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1559825481-12a05cc00344?w=700&h=875&fit=crop&auto=format"
                alt="Coral reef underwater"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(10,15,30,0.8) 100%)',
                }}
              />

              {/* Floating card */}
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  right: 24,
                  borderRadius: 16,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <TrendingUp size={18} color="#0A0F1E" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#14B8A6' }}>
                    +23% this month
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.55)' }}>
                    Coral coverage restored
                  </div>
                </div>
              </div>

              {/* Top badge */}
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  borderRadius: 12,
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'pulseGlow 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: '#22C55E' }}>
                  Live Monitoring
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: 'linear-gradient(180deg, transparent 0%, #0A0F1E 100%)',
          }}
        />
      </section>

      {/* Stats section */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ color: '#14B8A6', marginBottom: 12 }}>
            Global Impact
          </div>
          <h2
            className="heading-display"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#F8FAFC', marginBottom: 16 }}
          >
            Numbers that{' '}
            <span className="text-gradient-ocean">define our mission</span>
          </h2>
          <p style={{ color: 'rgba(248,250,252,0.5)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Every metric represents real change — coral restored, plastic removed, species protected.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {stats.map((s) => (
            <AnimatedStat key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          position: 'relative',
          padding: '80px 0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #0A0F1E 0%, #0D1B3E 50%, #0A0F1E 100%)',
          }}
        />
        <div
          className="ocean-orb"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            height: 800,
            background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
          }}
        />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ color: '#14B8A6', marginBottom: 12 }}>
              Platform Features
            </div>
            <h2
              className="heading-display"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#F8FAFC' }}
            >
              Built for conservation at scale
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {[
              {
                icon: Zap,
                color: '#06B6D4',
                title: 'ReefLens AI',
                desc: 'Upload coral images and let our AI instantly identify species, health status, and bleaching risk with 94% accuracy.',
                page: 'reeflens',
              },
              {
                icon: Globe,
                color: '#14B8A6',
                title: 'Global Dashboard',
                desc: 'Real-time ocean health metrics, coral coverage maps, plastic accumulation zones, and volunteer deployment heatmaps.',
                page: 'dashboard',
              },
              {
                icon: Shield,
                color: '#22C55E',
                title: 'Campaign Engine',
                desc: 'Launch, fund, and coordinate conservation campaigns with built-in volunteer management and transparent impact tracking.',
                page: 'campaigns',
              },
              {
                icon: Users,
                color: '#FB7185',
                title: 'Volunteer Hub',
                desc: 'Gamified volunteer experience with XP, badges, leaderboards, and event coordination across 60+ countries.',
                page: 'volunteer',
              },
              {
                icon: Leaf,
                color: '#A78BFA',
                title: 'Species Tracker',
                desc: 'Monitor endangered marine species with citizen science data collection and AI-assisted identification tools.',
                page: 'explore',
              },
              {
                icon: Anchor,
                color: '#F97316',
                title: 'Donation Gateway',
                desc: 'Transparent fund allocation, impact calculators, and real-time campaign goal tracking for donors worldwide.',
                page: 'donate',
              },
            ].map((f) => (
              <button
                key={f.title}
                onClick={() => setCurrentPage(f.page)}
                className="glass card-hover"
                style={{
                  borderRadius: 20,
                  padding: '28px 24px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `${f.color}15`,
                    border: `1px solid ${f.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <f.icon size={22} color={f.color} />
                </div>
                <div>
                  <h3
                    className="heading-display"
                    style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(248,250,252,0.5)', lineHeight: 1.65 }}>
                    {f.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: f.color, fontSize: '0.8rem', fontWeight: 600, marginTop: 'auto' }}>
                  <span>Explore</span>
                  <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="section-label" style={{ color: '#14B8A6', marginBottom: 12 }}>
              Featured Campaigns
            </div>
            <h2
              className="heading-display"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#F8FAFC' }}
            >
              Active conservation missions
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('campaigns')}
            className="btn-ghost"
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              cursor: 'pointer',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>View all campaigns</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {campaigns.map((c) => {
            const pct = Math.round((c.raised / c.goal) * 100)
            return (
              <div
                key={c.id}
                className="glass card-hover"
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div style={{ position: 'relative', height: 200, background: '#0D1B3E' }}>
                  <img
                    src={`https://images.unsplash.com/${c.image}?w=600&h=200&fit=crop&auto=format`}
                    alt={c.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                  />
                  <div style={{ position: 'absolute', top: 14, left: 14 }}>
                    <span
                      className="badge"
                      style={{
                        background: `${c.tagColor}20`,
                        color: c.tagColor,
                        border: `1px solid ${c.tagColor}40`,
                      }}
                    >
                      {c.tag}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', top: 14, right: 14 }}>
                    <span
                      className="badge"
                      style={{
                        background: 'rgba(10,15,30,0.8)',
                        color: 'rgba(248,250,252,0.7)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {c.daysLeft}d left
                    </span>
                  </div>
                </div>

                <div style={{ padding: '20px 20px 24px' }}>
                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#F8FAFC',
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {c.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                    <MapPin size={12} color="rgba(248,250,252,0.4)" />
                    <span style={{ fontSize: '0.78rem', color: 'rgba(248,250,252,0.4)' }}>{c.location}</span>
                  </div>

                  {/* Progress */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#14B8A6' }}>
                        ${c.raised.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'rgba(248,250,252,0.4)' }}>
                        {pct}% of ${(c.goal / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 999 }}>
                      <div className="progress-bar" style={{ height: '100%', width: `${pct}%` }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Users size={13} color="rgba(248,250,252,0.35)" />
                    <span style={{ fontSize: '0.78rem', color: 'rgba(248,250,252,0.35)' }}>
                      {c.volunteers.toLocaleString()} volunteers
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{
          background: 'linear-gradient(180deg, #0A0F1E 0%, #0D1B3E 50%, #0A0F1E 100%)',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ color: '#14B8A6', marginBottom: 12 }}>
            Testimonials
          </div>
          <h2
            className="heading-display"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#F8FAFC', marginBottom: 48 }}
          >
            Trusted by ocean defenders worldwide
          </h2>

          <div style={{ position: 'relative', minHeight: 220 }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: i === activeTestimonial ? 1 : 0,
                  transform: i === activeTestimonial ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                  pointerEvents: i === activeTestimonial ? 'auto' : 'none',
                }}
              >
                <div
                  className="glass"
                  style={{
                    borderRadius: 20,
                    padding: '36px 40px',
                    textAlign: 'left',
                    position: 'relative',
                  }}
                >
                  <Quote size={32} color="rgba(20,184,166,0.3)" style={{ marginBottom: 20 }} />
                  <p
                    style={{
                      fontSize: '1.1rem',
                      color: 'rgba(248,250,252,0.85)',
                      lineHeight: 1.7,
                      marginBottom: 28,
                      fontStyle: 'italic',
                    }}
                  >
                    "{t.quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <img
                      src={`https://images.unsplash.com/${t.avatar}?w=80&h=80&fit=crop&auto=format`}
                      alt={t.name}
                      style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(20,184,166,0.3)' }}
                    />
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC' }}>
                        {t.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'rgba(248,250,252,0.45)', marginTop: 2 }}>
                        {t.role}
                      </div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} fill="#14B8A6" color="#14B8A6" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: i === activeTestimonial ? 24 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: i === activeTestimonial ? '#14B8A6' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px' }}>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(248,250,252,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 32 }}>
          Trusted Partners
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 32 }}>
          {partners.map((p) => (
            <div
              key={p}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                color: 'rgba(248,250,252,0.25)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(20,184,166,0.8)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,250,252,0.25)')}
            >
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div
          className="glass-teal"
          style={{
            borderRadius: 24,
            padding: 'clamp(40px, 6vw, 64px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            className="ocean-orb"
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-20%',
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            className="ocean-orb"
            style={{
              position: 'absolute',
              bottom: '-50%',
              right: '-10%',
              width: 350,
              height: 350,
              background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '2rem', marginBottom: 16 }}>🌊</div>
            <h2
              className="heading-display"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#F8FAFC', marginBottom: 12 }}
            >
              Join the ocean movement
            </h2>
            <p style={{ color: 'rgba(248,250,252,0.55)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
              Get weekly conservation updates, campaign alerts, and volunteer opportunities.
            </p>
            <div style={{ display: 'flex', gap: 12, maxWidth: 440, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="input-glass"
                style={{ flex: 1, minWidth: 220 }}
              />
              <button
                className="btn-primary"
                style={{
                  padding: '12px 24px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '48px 24px 32px',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Droplets size={16} color="#0A0F1E" />
                </div>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#F8FAFC' }}>
                  REEF
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(248,250,252,0.4)', lineHeight: 1.65, maxWidth: 220 }}>
                Protect Oceans. Inspire Action. Create Impact.
              </p>
            </div>
            {[
              { title: 'Platform', links: ['Campaigns', 'Volunteer Hub', 'ReefLens AI', 'Dashboard'] },
              { title: 'Resources', links: ['Ocean Learning', 'Marine Species', 'Research', 'Reports'] },
              { title: 'Organization', links: ['About REEF', 'Partners', 'Press', 'Contact'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#F8FAFC', marginBottom: 16, letterSpacing: '0.03em' }}>
                  {col.title}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map((l) => (
                    <span
                      key={l}
                      style={{ fontSize: '0.85rem', color: 'rgba(248,250,252,0.4)', cursor: 'pointer', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#14B8A6')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,250,252,0.4)')}
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(248,250,252,0.3)' }}>
              © 2024 REEF Ocean Conservation Platform. All rights reserved.
            </span>
            <span style={{ fontSize: '0.8rem', color: 'rgba(248,250,252,0.3)' }}>
              Built with 🌊 for ocean conservation
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

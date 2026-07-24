import { useState } from 'react'
import { Search, MapPin, Users, Clock, Filter, ChevronRight, Heart, Globe, Leaf, Droplets } from 'lucide-react'

const filters = ['All', 'Coral Restoration', 'Plastic Cleanup', 'Species Protection', 'Research', 'Education']

const campaigns = [
  {
    id: 1,
    title: 'Great Barrier Reef Coral Restoration',
    org: 'REEF Foundation',
    location: 'Queensland, Australia',
    category: 'Coral Restoration',
    raised: 245000,
    goal: 400000,
    volunteers: 1240,
    daysLeft: 18,
    image: 'photo-1559825481-12a05cc00344',
    tag: 'Urgent',
    tagColor: '#FB7185',
    desc: 'Planting 50,000 coral fragments across 12km of reef using micro-fragmentation techniques developed at Mote Marine Laboratory.',
    impact: ['50,000 coral fragments', '12km reef restored', '200+ species protected'],
  },
  {
    id: 2,
    title: 'Pacific Plastic Cleanup Initiative',
    org: 'Ocean Cleanup Alliance',
    location: 'North Pacific Ocean',
    category: 'Plastic Cleanup',
    raised: 182000,
    goal: 300000,
    volunteers: 892,
    daysLeft: 34,
    image: 'photo-1484291470158-b8f8d608850d',
    tag: 'Active',
    tagColor: '#22C55E',
    desc: 'Deploying 8 autonomous cleanup vessels to intercept plastic waste before it fragments into microplastics.',
    impact: ['8 cleanup vessels', '400 tons plastic removed', '3,000 km² cleaned'],
  },
  {
    id: 3,
    title: 'Coral Triangle Conservation Network',
    org: 'WWF Marine Division',
    location: 'Southeast Asia',
    category: 'Species Protection',
    raised: 98000,
    goal: 200000,
    volunteers: 567,
    daysLeft: 61,
    image: 'photo-1546026423-cc4642628d2b',
    tag: 'New',
    tagColor: '#14B8A6',
    desc: 'Establishing a network of marine protected areas across Indonesia, Philippines, and Malaysia.',
    impact: ['75,000 km² protected', '3,000+ species', '12 MPAs established'],
  },
  {
    id: 4,
    title: 'Sea Turtle Nesting Protection',
    org: 'Oceana',
    location: 'Caribbean Sea',
    category: 'Species Protection',
    raised: 67000,
    goal: 150000,
    volunteers: 423,
    daysLeft: 45,
    image: 'photo-1437622368342-7a3d73a34c8f',
    tag: 'Active',
    tagColor: '#22C55E',
    desc: 'Protecting 400+ nesting sites for critically endangered Leatherback and Hawksbill sea turtles.',
    impact: ['400 nests protected', '12,000 hatchlings', '95% survival rate'],
  },
  {
    id: 5,
    title: 'Deep Sea Research Expedition',
    org: 'IUCN Science Team',
    location: 'Mariana Trench',
    category: 'Research',
    raised: 312000,
    goal: 500000,
    volunteers: 45,
    daysLeft: 90,
    image: 'photo-1518020382113-a7e8fc38eac9',
    tag: 'Featured',
    tagColor: '#A78BFA',
    desc: 'Mapping previously unexplored hadal ecosystems and documenting new species at extreme depths.',
    impact: ['3 expeditions', '15km depth', '50+ new species'],
  },
  {
    id: 6,
    title: 'Ocean Literacy School Program',
    org: 'UNESCO Ocean',
    location: 'Global',
    category: 'Education',
    raised: 44000,
    goal: 100000,
    volunteers: 234,
    daysLeft: 120,
    image: 'photo-1546026423-cc4642628d2b',
    tag: 'New',
    tagColor: '#14B8A6',
    desc: 'Training 500 educators and reaching 50,000 students with ocean conservation curriculum.',
    impact: ['50K students', '500 educators', '40 countries'],
  },
]

const upcomingEvents = [
  { date: 'Dec 15', title: 'Global Reef Survey Day', location: '60 Countries', participants: 12400 },
  { date: 'Dec 21', title: 'Solstice Beach Cleanup', location: 'Worldwide', participants: 8900 },
  { date: 'Jan 8', title: 'Coral Planting Workshop', location: 'Cairns, AU', participants: 240 },
  { date: 'Jan 15', title: 'Marine Data Hackathon', location: 'Virtual', participants: 1800 },
]

export default function Campaigns() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [joined, setJoined] = useState<number[]>([])

  const filtered = campaigns.filter((c) => {
    const matchCat = activeFilter === 'All' || c.category === activeFilter
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh', paddingTop: 72 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, #0D1B3E 0%, #0A0F1E 100%)',
          padding: '56px 24px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="ocean-orb" style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ color: '#14B8A6', marginBottom: 12 }}>Active Missions</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 36 }}>
            <h1 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#F8FAFC' }}>
              Conservation{' '}
              <span className="text-gradient-ocean">Campaigns</span>
            </h1>
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { v: campaigns.length, l: 'Active', c: '#14B8A6' },
                { v: '3.2K', l: 'Volunteers', c: '#22C55E' },
                { v: '$948K', l: 'Raised', c: '#06B6D4' },
              ].map((s) => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <div className="stat-number" style={{ fontSize: '1.6rem', color: s.c }}>{s.v}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.4)', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search + filter row */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
              <Search size={16} color="rgba(248,250,252,0.35)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search campaigns or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-glass"
                style={{ paddingLeft: 40 }}
              />
            </div>
            <button className="btn-ghost" style={{ padding: '12px 18px', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              <Filter size={15} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                border: activeFilter === f ? '1px solid rgba(20,184,166,0.4)' : '1px solid rgba(255,255,255,0.1)',
                background: activeFilter === f ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.04)',
                color: activeFilter === f ? '#14B8A6' : 'rgba(248,250,252,0.6)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>
          {/* Campaign cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map((c) => {
              const pct = Math.round((c.raised / c.goal) * 100)
              const isJoined = joined.includes(c.id)
              return (
                <div
                  key={c.id}
                  className="glass card-hover"
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ position: 'relative', height: 180, background: '#0D1B3E' }}>
                    <img
                      src={`https://images.unsplash.com/${c.image}?w=500&h=180&fit=crop&auto=format`}
                      alt={c.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,15,30,0.75) 100%)' }} />
                    <div style={{ position: 'absolute', top: 12, left: 12 }}>
                      <span className="badge" style={{ background: `${c.tagColor}20`, color: c.tagColor, border: `1px solid ${c.tagColor}40` }}>
                        {c.tag}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', top: 12, right: 12 }}>
                      <span className="badge" style={{ background: 'rgba(10,15,30,0.8)', color: 'rgba(248,250,252,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Clock size={10} style={{ display: 'inline', marginRight: 4 }} />
                        {c.daysLeft}d left
                      </span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                      <span style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.5)', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {c.org}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 8, lineHeight: 1.3 }}>
                      {c.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12 }}>
                      <MapPin size={11} color="rgba(248,250,252,0.35)" />
                      <span style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.35)' }}>{c.location}</span>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: 'rgba(248,250,252,0.5)', lineHeight: 1.55, marginBottom: 16 }}>
                      {c.desc}
                    </p>

                    {/* Impact tags */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                      {c.impact.map((imp) => (
                        <span key={imp} className="badge" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(248,250,252,0.5)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.65rem' }}>
                          {imp}
                        </span>
                      ))}
                    </div>

                    {/* Progress */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#14B8A6' }}>
                          ${(c.raised / 1000).toFixed(0)}K
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)' }}>
                          {pct}% of ${(c.goal / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 999 }}>
                        <div className="progress-bar" style={{ height: '100%', width: `${pct}%` }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                      <button
                        onClick={() => setJoined((prev) => isJoined ? prev.filter((i) => i !== c.id) : [...prev, c.id])}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: 10,
                          border: `1px solid ${isJoined ? 'rgba(34,197,94,0.3)' : 'rgba(20,184,166,0.3)'}`,
                          background: isJoined ? 'rgba(34,197,94,0.1)' : 'rgba(20,184,166,0.1)',
                          color: isJoined ? '#22C55E' : '#14B8A6',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <Users size={13} />
                        {isJoined ? 'Joined!' : 'Volunteer'}
                      </button>
                      <button
                        className="btn-primary"
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: 10,
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.82rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <Heart size={13} />
                        Donate
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 96 }}>
            {/* Upcoming events */}
            <div className="glass" style={{ borderRadius: 18, padding: '22px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 18 }}>
                Upcoming Events
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {upcomingEvents.map((e, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 14,
                      padding: '12px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(el) => { el.currentTarget.style.borderColor = 'rgba(20,184,166,0.25)'; el.currentTarget.style.background = 'rgba(20,184,166,0.04)' }}
                    onMouseLeave={(el) => { el.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; el.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                  >
                    <div style={{ flexShrink: 0, textAlign: 'center', width: 40 }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#14B8A6', lineHeight: 1 }}>
                        {e.date.split(' ')[1]}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(248,250,252,0.35)', marginTop: 2 }}>
                        {e.date.split(' ')[0]}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#F8FAFC', marginBottom: 4, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {e.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.4)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={10} />
                        {e.location}
                        <span style={{ marginLeft: 'auto' }}>{e.participants.toLocaleString()} joining</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global impact map placeholder */}
            <div className="glass" style={{ borderRadius: 18, padding: '22px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 14 }}>
                Global Reach
              </h3>
              <div style={{ borderRadius: 12, height: 160, background: 'linear-gradient(135deg, #0D1B3E, #071428)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={48} color="rgba(20,184,166,0.25)" />
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#14B8A6',
                      opacity: 0.7,
                      top: `${20 + Math.sin(i * 1.1) * 35}%`,
                      left: `${15 + i * 15}%`,
                      boxShadow: '0 0 12px rgba(20,184,166,0.5)',
                      animation: `pulseGlow ${2 + i * 0.3}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(248,250,252,0.4)', marginTop: 12, lineHeight: 1.5 }}>
                Active campaigns across 60+ countries, 12 ocean regions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

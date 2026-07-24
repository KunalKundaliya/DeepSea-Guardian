import { useState } from 'react'
import { Search, Filter, BookOpen, Fish, Clock, TrendingUp, ExternalLink, Play } from 'lucide-react'

const categories = ['All', 'Coral Reefs', 'Marine Species', 'Ocean Plastics', 'Climate Impact', 'Conservation']

const species = [
  { name: 'Blue Tang', scientific: 'Paracanthurus hepatus', status: 'Least Concern', color: '#06B6D4', image: 'photo-1544552866-d3ed42536cfd', fact: 'Can live up to 30 years in the wild.' },
  { name: 'Sea Turtle', scientific: 'Chelonia mydas', status: 'Endangered', color: '#22C55E', image: 'photo-1437622368342-7a3d73a34c8f', fact: 'Navigate using Earth\'s magnetic field.' },
  { name: 'Clownfish', scientific: 'Amphiprioninae', status: 'Least Concern', color: '#FB7185', image: 'photo-1535591273668-578e31182c4f', fact: 'All clownfish are born male.' },
  { name: 'Whale Shark', scientific: 'Rhincodon typus', status: 'Endangered', color: '#14B8A6', image: 'photo-1559825481-12a05cc00344', fact: 'The world\'s largest fish, up to 12m.' },
  { name: 'Manta Ray', scientific: 'Mobula birostris', status: 'Vulnerable', color: '#A78BFA', image: 'photo-1546026423-cc4642628d2b', fact: 'Brain-to-body ratio highest of fish.' },
  { name: 'Hammerhead', scientific: 'Sphyrna lewini', status: 'Critically Endangered', color: '#F97316', image: 'photo-1484291470158-b8f8d608850d', fact: 'Hunt prey buried in sand.' },
]

const articles = [
  {
    title: 'Rising Ocean Temperatures: What the 2024 Data Tells Us',
    category: 'Climate Impact',
    readTime: '8 min',
    date: 'Dec 12, 2024',
    image: 'photo-1518020382113-a7e8fc38eac9',
    excerpt: 'New satellite data reveals record-breaking sea surface temperatures in 94% of monitored zones...',
  },
  {
    title: 'Coral Bleaching Events: A Comprehensive Field Guide',
    category: 'Coral Reefs',
    readTime: '12 min',
    date: 'Dec 8, 2024',
    image: 'photo-1559825481-12a05cc00344',
    excerpt: 'Understanding thermal bleaching triggers and the signs of early recovery in reef ecosystems...',
  },
  {
    title: 'Microplastics in the Deep: New Research from 4,000m',
    category: 'Ocean Plastics',
    readTime: '6 min',
    date: 'Nov 30, 2024',
    image: 'photo-1484291470158-b8f8d608850d',
    excerpt: 'A landmark study found microplastic concentrations 4x higher than surface readings in hadal zones...',
  },
]

const statusColor: Record<string, string> = {
  'Least Concern': '#22C55E',
  'Vulnerable': '#F97316',
  'Endangered': '#FB7185',
  'Critically Endangered': '#EF4444',
}

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh', paddingTop: 72 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, #0D1B3E 0%, #0A0F1E 100%)',
          padding: '60px 24px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="ocean-orb"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ color: '#14B8A6', marginBottom: 12 }}>
            Ocean Learning Center
          </div>
          <h1 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: '#F8FAFC', marginBottom: 16 }}>
            Explore &{' '}
            <span className="text-gradient-ocean">Learn</span>
          </h1>
          <p style={{ color: 'rgba(248,250,252,0.5)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Deep-dive into marine science, conservation research, and species profiles curated by our expert network.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
            <Search
              size={18}
              color="rgba(248,250,252,0.35)"
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              type="text"
              placeholder="Search species, topics, articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-glass"
              style={{ paddingLeft: 46, fontSize: '0.95rem' }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Category filters */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, marginBottom: 48, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                border: activeCategory === cat ? '1px solid rgba(20,184,166,0.4)' : '1px solid rgba(255,255,255,0.1)',
                background: activeCategory === cat ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.04)',
                color: activeCategory === cat ? '#14B8A6' : 'rgba(248,250,252,0.6)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Marine Species */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <Fish size={20} color="#14B8A6" />
            <h2 className="heading-display" style={{ fontSize: '1.5rem', color: '#F8FAFC' }}>
              Marine Species
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {species.map((s) => (
              <div
                key={s.name}
                className="glass card-hover"
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div style={{ position: 'relative', height: 160, background: '#0D1B3E' }}>
                  <img
                    src={`https://images.unsplash.com/${s.image}?w=400&h=160&fit=crop&auto=format`}
                    alt={s.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,15,30,0.7) 100%)' }} />
                  <span
                    className="badge"
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: `${statusColor[s.status] || '#06B6D4'}20`,
                      color: statusColor[s.status] || '#06B6D4',
                      border: `1px solid ${statusColor[s.status] || '#06B6D4'}40`,
                    }}
                  >
                    {s.status}
                  </span>
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 4 }}>
                    {s.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.35)', fontStyle: 'italic', marginBottom: 12 }}>
                    {s.scientific}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(248,250,252,0.55)', lineHeight: 1.5 }}>
                    {s.fact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <BookOpen size={20} color="#14B8A6" />
            <h2 className="heading-display" style={{ fontSize: '1.5rem', color: '#F8FAFC' }}>
              Latest Research
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {articles.map((a, i) => (
              <div
                key={i}
                className="glass card-hover"
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div style={{ background: '#0D1B3E', position: 'relative' }}>
                  <img
                    src={`https://images.unsplash.com/${a.image}?w=220&h=160&fit=crop&auto=format`}
                    alt={a.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, display: 'block' }}
                  />
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span
                      className="badge"
                      style={{
                        background: 'rgba(20,184,166,0.1)',
                        color: '#14B8A6',
                        border: '1px solid rgba(20,184,166,0.2)',
                      }}
                    >
                      {a.category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(248,250,252,0.35)', fontSize: '0.75rem' }}>
                      <Clock size={11} />
                      <span>{a.readTime} read</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.35)', marginLeft: 'auto' }}>{a.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#F8FAFC', marginBottom: 10, lineHeight: 1.35 }}>
                    {a.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'rgba(248,250,252,0.45)', lineHeight: 1.6 }}>
                    {a.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ocean Facts */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <TrendingUp size={20} color="#14B8A6" />
            <h2 className="heading-display" style={{ fontSize: '1.5rem', color: '#F8FAFC' }}>
              Ocean Facts
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {[
              { n: '71%', l: 'of Earth covered by oceans', c: '#06B6D4' },
              { n: '80%', l: 'of life on Earth is aquatic', c: '#14B8A6' },
              { n: '95%', l: 'of ocean remains unexplored', c: '#A78BFA' },
              { n: '8M', l: 'metric tons of plastic per year', c: '#FB7185' },
              { n: '50%', l: 'of world\'s oxygen from oceans', c: '#22C55E' },
              { n: '1°C', l: 'avg temp rise since 1900', c: '#F97316' },
            ].map((f) => (
              <div
                key={f.l}
                className="glass card-hover"
                style={{
                  borderRadius: 16,
                  padding: '24px 20px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div className="stat-number" style={{ fontSize: '2rem', color: f.c, letterSpacing: '-0.03em' }}>
                  {f.n}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'rgba(248,250,252,0.5)', lineHeight: 1.4 }}>
                  {f.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

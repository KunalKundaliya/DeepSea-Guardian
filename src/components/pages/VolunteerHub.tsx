import { useState } from 'react'
import { Award, Clock, MapPin, Star, TrendingUp, Users, ChevronRight, Shield, Zap, Calendar } from 'lucide-react'

const leaderboard = [
  { rank: 1, name: 'Sarah Chen', location: 'Sydney, AU', xp: 12480, hours: 340, avatar: 'photo-1438761681033-6461ffad8d80', badge: '🏆' },
  { rank: 2, name: 'Marcus Webb', location: 'Miami, US', xp: 11230, hours: 298, avatar: 'photo-1507003211169-0a1dd7228f2d', badge: '🥈' },
  { rank: 3, name: 'Priya Mehta', location: 'Mumbai, IN', xp: 9870, hours: 267, avatar: 'photo-1494790108755-2616b612b786', badge: '🥉' },
  { rank: 4, name: 'Liam O\'Brien', location: 'Dublin, IE', xp: 8540, hours: 234, avatar: 'photo-1472099645785-5658abf4ff4e', badge: null },
  { rank: 5, name: 'Yuki Tanaka', location: 'Tokyo, JP', xp: 7920, hours: 218, avatar: 'photo-1544005313-94ddf0286df2', badge: null },
  { rank: 6, name: 'Ana Silva', location: 'São Paulo, BR', xp: 7410, hours: 201, avatar: 'photo-1531746020798-e6953c6e8e04', badge: null },
]

const allBadges = [
  { icon: '🔬', name: 'Species Expert', level: 'Gold', earned: true, desc: 'Identified 25+ species' },
  { icon: '🌊', name: 'Ocean Guardian', level: 'Platinum', earned: true, desc: 'Completed 50 missions' },
  { icon: '📍', name: 'Global Explorer', level: 'Silver', earned: true, desc: 'Reported from 5+ locations' },
  { icon: '⚡', name: 'First Responder', level: 'Gold', earned: true, desc: 'First to report bleaching' },
  { icon: '📸', name: 'ReefLens Pro', level: 'Silver', earned: true, desc: '100+ photos uploaded' },
  { icon: '🤝', name: 'Team Leader', level: 'Bronze', earned: false, desc: 'Lead a volunteer team' },
  { icon: '🏆', name: 'Conservation Hero', level: 'Platinum', earned: false, desc: 'Verified by 10 experts' },
  { icon: '💎', name: 'Reef Legend', level: 'Diamond', earned: false, desc: 'Top 10 globally' },
]

const missions = [
  { title: 'Coral Health Survey', location: 'Ningaloo Reef, AU', xp: 350, deadline: 'Dec 20', type: 'Survey', color: '#06B6D4', difficulty: 'Intermediate' },
  { title: 'Beach Cleanup Coordination', location: 'Bondi Beach, AU', xp: 200, deadline: 'Dec 15', type: 'Cleanup', color: '#22C55E', difficulty: 'Beginner' },
  { title: 'Species Photo Documentation', location: 'Remote', xp: 500, deadline: 'Dec 31', type: 'Research', color: '#A78BFA', difficulty: 'Advanced' },
  { title: 'Community Education Workshop', location: 'Virtual', xp: 180, deadline: 'Jan 5', type: 'Education', color: '#F97316', difficulty: 'Beginner' },
]

const levelColor: Record<string, string> = {
  Bronze: '#CD7F32',
  Silver: '#9CA3AF',
  Gold: '#FBBF24',
  Platinum: '#14B8A6',
  Diamond: '#60A5FA',
}

export default function VolunteerHub() {
  const [activeTab, setActiveTab] = useState<'profile' | 'leaderboard' | 'missions'>('profile')

  const userXP = 8450
  const nextLevelXP = 10000
  const xpPct = Math.round((userXP / nextLevelXP) * 100)

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh', paddingTop: 72 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, #0D1B3E 0%, #0A0F1E 100%)',
          padding: '56px 24px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="ocean-orb" style={{ position: 'absolute', top: 0, right: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(251,113,133,0.08) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ color: '#14B8A6', marginBottom: 12 }}>Community</div>
          <h1 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#F8FAFC', marginBottom: 32 }}>
            Volunteer{' '}
            <span className="text-gradient-ocean">Hub</span>
          </h1>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {(['profile', 'leaderboard', 'missions'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '10px 10px 0 0',
                  border: `1px solid ${activeTab === tab ? 'rgba(20,184,166,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  borderBottom: activeTab === tab ? '1px solid #0A0F1E' : '1px solid rgba(255,255,255,0.08)',
                  background: activeTab === tab ? 'rgba(10,15,30,1)' : 'rgba(255,255,255,0.03)',
                  color: activeTab === tab ? '#14B8A6' : 'rgba(248,250,252,0.5)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize',
                }}
              >
                {tab === 'profile' ? '👤 Profile' : tab === 'leaderboard' ? '🏆 Leaderboard' : '🎯 Missions'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(20,184,166,0.15)', background: '#0A0F1E' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 24px 80px' }}>

          {activeTab === 'profile' && (
            <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 28 }}>
              {/* Profile card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="glass" style={{ borderRadius: 20, padding: '28px', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 16px' }}>
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format"
                      alt="Profile"
                      style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(20,184,166,0.4)' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0A0F1E' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0A0F1E' }} />
                    </div>
                  </div>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#F8FAFC', marginBottom: 4 }}>
                    Sarah Chen
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(248,250,252,0.4)', marginBottom: 16 }}>
                    Marine Conservation Specialist · Sydney, AU
                  </p>

                  {/* XP progress */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#14B8A6' }}>
                        {userXP.toLocaleString()} XP
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.35)' }}>
                        Level 7 → 8
                      </span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 999 }}>
                      <div style={{ height: '100%', width: `${xpPct}%`, background: 'linear-gradient(90deg, #14B8A6, #06B6D4)', borderRadius: 999, transition: 'width 1s ease' }} />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(248,250,252,0.3)', marginTop: 6, textAlign: 'right' }}>
                      {nextLevelXP - userXP} XP to next level
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    {[
                      { v: '340', l: 'Hours', c: '#06B6D4' },
                      { v: '52', l: 'Missions', c: '#22C55E' },
                      { v: '#1', l: 'Global Rank', c: '#FB7185' },
                    ].map((s) => (
                      <div key={s.l} style={{ padding: '12px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="stat-number" style={{ fontSize: '1.2rem', color: s.c }}>{s.v}</div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(248,250,252,0.35)', marginTop: 2 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming events */}
                <div className="glass" style={{ borderRadius: 18, padding: '20px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Calendar size={16} color="#14B8A6" />
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC' }}>
                      Upcoming
                    </span>
                  </div>
                  {[
                    { date: 'Dec 15', event: 'Reef Survey Day', loc: 'Ningaloo' },
                    { date: 'Dec 21', event: 'Beach Cleanup', loc: 'Bondi' },
                    { date: 'Jan 8', event: 'Coral Workshop', loc: 'Cairns' },
                  ].map((e, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none', alignItems: 'center' }}>
                      <div style={{ width: 36, flexShrink: 0, textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#14B8A6', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
                          {e.date.split(' ')[1]}
                        </div>
                        <div style={{ fontSize: '0.6rem', color: 'rgba(248,250,252,0.35)' }}>{e.date.split(' ')[0]}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.82rem', color: '#F8FAFC', fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{e.event}</div>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(248,250,252,0.35)' }}>{e.loc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges grid */}
              <div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.2rem', color: '#F8FAFC', marginBottom: 20 }}>
                  Achievement Badges
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
                  {allBadges.map((b) => (
                    <div
                      key={b.name}
                      className={b.earned ? 'glass card-hover' : ''}
                      style={{
                        borderRadius: 16,
                        padding: '20px 16px',
                        border: `1px solid ${b.earned ? `${levelColor[b.level]}25` : 'rgba(255,255,255,0.05)'}`,
                        background: b.earned ? `${levelColor[b.level]}06` : 'rgba(255,255,255,0.02)',
                        opacity: b.earned ? 1 : 0.45,
                        textAlign: 'center',
                        cursor: b.earned ? 'pointer' : 'default',
                      }}
                    >
                      <div style={{ fontSize: '2.2rem', marginBottom: 10 }}>{b.icon}</div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#F8FAFC', marginBottom: 6 }}>
                        {b.name}
                      </div>
                      <span
                        className="badge"
                        style={{
                          background: `${levelColor[b.level]}15`,
                          color: levelColor[b.level],
                          border: `1px solid ${levelColor[b.level]}30`,
                          display: 'inline-block',
                          marginBottom: 8,
                        }}
                      >
                        {b.level}
                      </span>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.4)' }}>{b.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Certificates section */}
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#F8FAFC', marginTop: 32, marginBottom: 16 }}>
                  Certificates
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { title: 'Marine Conservation Specialist', date: 'Nov 2024', issuer: 'REEF x UNESCO', color: '#14B8A6' },
                    { title: 'Coral Reef Monitoring Expert', date: 'Sep 2024', issuer: 'REEF x IUCN', color: '#06B6D4' },
                    { title: 'Ocean Volunteer Leader', date: 'Jul 2024', issuer: 'REEF Foundation', color: '#22C55E' },
                  ].map((cert, i) => (
                    <div
                      key={i}
                      className="glass"
                      style={{
                        borderRadius: 14,
                        padding: '16px 20px',
                        border: '1px solid rgba(255,255,255,0.07)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                      }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cert.color}15`, border: `1px solid ${cert.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Shield size={20} color={cert.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC' }}>
                          {cert.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', marginTop: 3 }}>
                          {cert.issuer} · {cert.date}
                        </div>
                      </div>
                      <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 12px', color: 'rgba(248,250,252,0.5)', fontSize: '0.75rem', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {leaderboard.map((v, i) => (
                  <div
                    key={v.rank}
                    className={i < 3 ? 'glass-teal' : 'glass'}
                    style={{
                      borderRadius: 16,
                      padding: '18px 24px',
                      border: `1px solid ${i < 3 ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.07)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(el) => el.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseLeave={(el) => el.currentTarget.style.transform = 'translateX(0)'}
                  >
                    <div style={{ width: 40, textAlign: 'center', flexShrink: 0 }}>
                      {v.badge ? (
                        <span style={{ fontSize: '1.4rem' }}>{v.badge}</span>
                      ) : (
                        <span className="stat-number" style={{ fontSize: '1.2rem', color: 'rgba(248,250,252,0.35)' }}>
                          #{v.rank}
                        </span>
                      )}
                    </div>
                    <img
                      src={`https://images.unsplash.com/${v.avatar}?w=48&h=48&fit=crop&auto=format`}
                      alt={v.name}
                      style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: i < 3 ? '2px solid rgba(20,184,166,0.4)' : '2px solid rgba(255,255,255,0.1)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#F8FAFC', marginBottom: 4 }}>
                        {v.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)' }}>
                        <MapPin size={11} />
                        {v.location}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 24, textAlign: 'right' }}>
                      <div>
                        <div className="stat-number" style={{ fontSize: '1.1rem', color: '#14B8A6' }}>{v.xp.toLocaleString()}</div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(248,250,252,0.35)' }}>XP</div>
                      </div>
                      <div>
                        <div className="stat-number" style={{ fontSize: '1.1rem', color: '#06B6D4' }}>{v.hours}</div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(248,250,252,0.35)' }}>Hours</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'missions' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {missions.map((m, i) => (
                <div
                  key={i}
                  className="glass card-hover"
                  style={{
                    borderRadius: 18,
                    padding: '24px 20px',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="badge" style={{ background: `${m.color}15`, color: m.color, border: `1px solid ${m.color}25` }}>
                      {m.type}
                    </span>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(248,250,252,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      {m.difficulty}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#F8FAFC', marginBottom: 8 }}>
                      {m.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={12} color="rgba(248,250,252,0.35)" />
                      <span style={{ fontSize: '0.78rem', color: 'rgba(248,250,252,0.35)' }}>{m.location}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <div className="stat-number" style={{ fontSize: '1.1rem', color: m.color }}>+{m.xp}</div>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(248,250,252,0.35)' }}>XP reward</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC' }}>{m.deadline}</div>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(248,250,252,0.35)' }}>Deadline</div>
                    </div>
                  </div>
                  <button
                    className="btn-primary"
                    style={{ padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <Zap size={14} />
                    Accept Mission
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

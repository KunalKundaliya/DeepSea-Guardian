import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { TrendingUp, TrendingDown, Globe, Users, Droplets, Fish, Leaf, AlertCircle, CheckCircle } from 'lucide-react'

const coralData = [
  { month: 'Jul', coverage: 42, bleaching: 28 },
  { month: 'Aug', coverage: 38, bleaching: 34 },
  { month: 'Sep', coverage: 35, bleaching: 38 },
  { month: 'Oct', coverage: 40, bleaching: 30 },
  { month: 'Nov', coverage: 46, bleaching: 22 },
  { month: 'Dec', coverage: 52, bleaching: 18 },
]

const volunteerData = [
  { month: 'Jul', count: 8200 },
  { month: 'Aug', count: 9400 },
  { month: 'Sep', count: 11200 },
  { month: 'Oct', count: 13600 },
  { month: 'Nov', count: 14900 },
  { month: 'Dec', count: 15640 },
]

const donationData = [
  { month: 'Jul', amount: 420 },
  { month: 'Aug', amount: 380 },
  { month: 'Sep', amount: 520 },
  { month: 'Oct', amount: 680 },
  { month: 'Nov', amount: 760 },
  { month: 'Dec', amount: 920 },
]

const plasticData = [
  { region: 'Pacific', tons: 420 },
  { region: 'Atlantic', tons: 280 },
  { region: 'Indian', tons: 190 },
  { region: 'Arctic', tons: 85 },
  { region: 'Southern', tons: 60 },
]

const kpis = [
  { label: 'Coral Coverage', value: '52%', change: '+12%', up: true, color: '#14B8A6', icon: Leaf, sub: 'Global average, healthy reefs' },
  { label: 'Plastic Collected', value: '1,035t', change: '+340t', up: true, color: '#06B6D4', icon: Droplets, sub: 'This month across all ops' },
  { label: 'Active Volunteers', value: '156.4K', change: '+8.2K', up: true, color: '#22C55E', icon: Users, sub: 'Across 62 countries' },
  { label: 'Species Monitored', value: '847K', change: '+12.3K', up: true, color: '#A78BFA', icon: Fish, sub: 'Active tracking programs' },
  { label: 'Funds Deployed', value: '$8.2M', change: '+$920K', up: true, color: '#FB7185', icon: Globe, sub: 'Active campaign allocation' },
  { label: 'Bleaching Events', value: '18%', change: '-6%', up: false, color: '#F97316', icon: AlertCircle, sub: 'Reduction vs last quarter' },
]

const alerts = [
  { type: 'critical', msg: 'Coral bleaching detected — Northwest Pacific, Zone 7B', time: '2h ago' },
  { type: 'warning', msg: 'Plastic accumulation spike — Coral Sea, sector 12', time: '5h ago' },
  { type: 'success', msg: 'Campaign funded: Great Barrier Reef Restoration reached 65% goal', time: '8h ago' },
  { type: 'info', msg: 'New species documented: Undescribed Nudibranch sp. — Maldives', time: '12h ago' },
]

const alertColors: Record<string, string> = {
  critical: '#FB7185',
  warning: '#F97316',
  success: '#22C55E',
  info: '#06B6D4',
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: 'rgba(10,15,30,0.95)',
        border: '1px solid rgba(20,184,166,0.2)',
        borderRadius: 12,
        padding: '12px 16px',
        backdropFilter: 'blur(20px)',
      }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.5)', marginBottom: 8 }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ fontSize: '0.85rem', fontWeight: 700, color: p.color, fontFamily: "'Space Grotesk', sans-serif" }}>
            {p.dataKey}: {p.value}{p.unit || ''}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<'6m' | '1y' | '3y'>('6m')

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh', paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #0D1B3E 0%, #0A0F1E 100%)', padding: '40px 24px 40px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="section-label" style={{ color: '#14B8A6', marginBottom: 8 }}>Live Data</div>
              <h1 className="heading-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#F8FAFC' }}>
                Impact{' '}
                <span className="text-gradient-ocean">Dashboard</span>
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['6m', '1y', '3y'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: timeframe === t ? '1px solid rgba(20,184,166,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    background: timeframe === t ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.04)',
                    color: timeframe === t ? '#14B8A6' : 'rgba(248,250,252,0.5)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* KPI grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {kpis.map((k) => (
            <div
              key={k.label}
              className="glass card-hover"
              style={{
                borderRadius: 16,
                padding: '20px 18px',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${k.color}15`, border: `1px solid ${k.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <k.icon size={16} color={k.color} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: k.up ? '#22C55E' : '#FB7185', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {k.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {k.change}
                </div>
              </div>
              <div className="stat-number" style={{ fontSize: '1.6rem', color: k.color, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4 }}>
                {k.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#F8FAFC', fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>
                {k.label}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(248,250,252,0.35)', lineHeight: 1.4 }}>
                {k.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Coral coverage chart */}
          <div className="glass" style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 4 }}>
                  Coral Health Index
                </h3>
                <p style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.4)' }}>Coverage vs bleaching events</p>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                {[{ c: '#14B8A6', l: 'Coverage' }, { c: '#FB7185', l: 'Bleaching' }].map((l) => (
                  <div key={l.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.c }} />
                    <span style={{ fontSize: '0.7rem', color: 'rgba(248,250,252,0.4)' }}>{l.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={coralData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="coralGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bleachGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FB7185" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#FB7185" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(248,250,252,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(248,250,252,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="coverage" stroke="#14B8A6" strokeWidth={2} fill="url(#coralGrad)" />
                <Area type="monotone" dataKey="bleaching" stroke="#FB7185" strokeWidth={2} fill="url(#bleachGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Volunteer growth */}
          <div className="glass" style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 4 }}>
                Volunteer Growth
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.4)' }}>Monthly active volunteers worldwide</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={volunteerData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(248,250,252,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(248,250,252,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" stroke="#22C55E" strokeWidth={2} fill="url(#volGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 380px', gap: 20, marginBottom: 28 }}>
          {/* Donations */}
          <div className="glass" style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 4 }}>
                Donations ($K)
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.4)' }}>Monthly fundraising performance</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={donationData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'rgba(248,250,252,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(248,250,252,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#06B6D4" radius={[6, 6, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Plastic by region */}
          <div className="glass" style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 4 }}>
                Plastic Collected (tons)
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(248,250,252,0.4)' }}>By ocean region, this quarter</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={plasticData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'rgba(248,250,252,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="region" type="category" tick={{ fill: 'rgba(248,250,252,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="tons" fill="#FB7185" radius={[0, 6, 6, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Live alerts */}
          <div className="glass" style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'pulseGlow 2s ease-in-out infinite' }} />
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC' }}>
                Live Alerts
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {alerts.map((a, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px',
                    borderRadius: 10,
                    background: `${alertColors[a.type]}08`,
                    border: `1px solid ${alertColors[a.type]}20`,
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: alertColors[a.type], flexShrink: 0, marginTop: 5 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.75)', lineHeight: 1.4, marginBottom: 4 }}>
                      {a.msg}
                    </p>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(248,250,252,0.3)' }}>{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ocean health zones */}
        <div className="glass" style={{ borderRadius: 18, padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 20 }}>
            Ocean Health Zones
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
            {[
              { zone: 'Great Barrier Reef', health: 72, status: 'Recovering', color: '#22C55E' },
              { zone: 'Caribbean Sea', health: 54, status: 'Stressed', color: '#F97316' },
              { zone: 'Coral Triangle', health: 81, status: 'Healthy', color: '#14B8A6' },
              { zone: 'Red Sea', health: 63, status: 'Recovering', color: '#22C55E' },
              { zone: 'Maldives', health: 45, status: 'Critical', color: '#FB7185' },
              { zone: 'Pacific Reefs', health: 69, status: 'Stressed', color: '#F97316' },
            ].map((z) => (
              <div
                key={z.zone}
                style={{
                  padding: '16px 14px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span className="badge" style={{ background: `${z.color}15`, color: z.color, border: `1px solid ${z.color}25` }}>
                    {z.status}
                  </span>
                  <span className="stat-number" style={{ fontSize: '1.1rem', color: z.color }}>{z.health}%</span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F8FAFC', fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 10 }}>
                  {z.zone}
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999 }}>
                  <div style={{ height: '100%', width: `${z.health}%`, background: z.color, borderRadius: 999, opacity: 0.8, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

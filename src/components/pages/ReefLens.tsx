import { useState, useRef } from 'react'
import {
  Camera, Upload, MapPin, CheckCircle, Award,
  Eye, Zap, Share2, Clock, ChevronRight, X,
} from 'lucide-react'
// import {
//   Camera,
//   Upload,
//   MapPin,
//   CheckCircle,
//   Award,
//   Eye,
//   Zap,
//   Share2,
//   Clock,
//   ChevronRight,
//   X,
// } from 'lucide-react'

const sampleDetections = [
  { species: 'Staghorn Coral', confidence: 94, health: 'Healthy', color: '#22C55E', icon: '🪸' },
  { species: 'Table Coral', confidence: 87, health: 'Bleached', color: '#FB7185', icon: '🐠' },
  { species: 'Brain Coral', confidence: 91, health: 'Stressed', color: '#F97316', icon: '🧠' },
]

const history = [
  { id: 'RF-2847', species: 'Staghorn Coral', location: 'Great Barrier Reef, AU', date: 'Dec 12, 2024', status: 'Verified', badge: 'First Discovery', image: 'photo-1546026423-cc4642628d2b' },
  { id: 'RF-2712', species: 'Sea Turtle', location: 'Maldives', date: 'Dec 8, 2024', status: 'Verified', badge: 'Species Expert', image: 'photo-1437622368342-7a3d73a34c8f' },
  { id: 'RF-2601', species: 'Bleaching Event', location: 'Red Sea, EG', date: 'Nov 25, 2024', status: 'Under Review', badge: null, image: 'photo-1559825481-12a05cc00344' },
]

const badges = [
  { icon: '🔬', name: 'Species Expert', desc: 'Identified 25+ species', earned: true },
  { icon: '📍', name: 'Global Explorer', desc: 'Reported from 5+ locations', earned: true },
  { icon: '⚡', name: 'First Responder', desc: 'First to report bleaching', earned: true },
  { icon: '🏆', name: 'Conservation Hero', desc: 'Report verified by 10 experts', earned: false },
  { icon: '🌊', name: 'Deep Diver', desc: '100+ reports submitted', earned: false },
]

type Mode = 'upload' | 'result' | 'history'

export default function ReefLens() {
  const [mode, setMode] = useState<Mode>('upload')
  const [dragging, setDragging] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [activeDetection, setActiveDetection] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file)
    setSelectedImage(url)
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setMode('result')
    }, 2400)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  const useSampleImage = () => {
    setSelectedImage('https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&h=600&fit=crop&auto=format')
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setMode('result')
    }, 2400)
  }

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh', paddingTop: 72 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, #0D1B3E 0%, #0A0F1E 100%)',
          padding: '56px 24px 64px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="ocean-orb" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: 999,
              padding: '6px 16px',
              marginBottom: 20,
            }}
          >
            <Zap size={13} color="#06B6D4" />
            <span className="section-label" style={{ color: '#06B6D4', fontSize: '0.7rem' }}>AI-Powered Identification</span>
          </div>
          <h1 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#F8FAFC', marginBottom: 12 }}>
            🌊 ReefLens
          </h1>
          <p style={{ color: 'rgba(248,250,252,0.5)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Capture or upload coral and marine life images. Our AI identifies species, assesses health, and maps your discovery in real time.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Tab selector */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 48 }}>
          {(['upload', 'history'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '10px 24px',
                borderRadius: 10,
                border: mode === m ? '1px solid rgba(20,184,166,0.4)' : '1px solid rgba(255,255,255,0.1)',
                background: mode === m ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.04)',
                color: mode === m ? '#14B8A6' : 'rgba(248,250,252,0.6)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize',
              }}
            >
              {m === 'upload' ? '📷 Capture / Upload' : '📋 My Reports'}
            </button>
          ))}
        </div>

        {mode === 'upload' && !analyzing && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
            {/* Upload zone */}
            <div>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                style={{
                  borderRadius: 20,
                  border: `2px dashed ${dragging ? 'rgba(20,184,166,0.6)' : 'rgba(255,255,255,0.12)'}`,
                  background: dragging ? 'rgba(20,184,166,0.05)' : 'rgba(255,255,255,0.02)',
                  padding: '64px 40px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: 20,
                }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    background: 'rgba(6,182,212,0.1)',
                    border: '1px solid rgba(6,182,212,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  <Upload size={28} color="#06B6D4" />
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#F8FAFC', marginBottom: 10 }}>
                  Drop your image here
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(248,250,252,0.4)', marginBottom: 20 }}>
                  JPG, PNG, HEIC up to 20MB — coral, reef, or marine life
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', color: '#06B6D4', fontSize: '0.8rem', fontWeight: 600 }}>
                    Browse Files
                  </span>
                  <span
                    onClick={(e) => { e.stopPropagation(); useSampleImage() }}
                    style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(248,250,252,0.6)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Use Sample Image
                  </span>
                </div>
              </div>

              {/* Workflow steps */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[
                  { step: '1', icon: Camera, label: 'Capture', color: '#06B6D4' },
                  { step: '2', icon: Zap, label: 'AI Analyzes', color: '#14B8A6' },
                  { step: '3', icon: MapPin, label: 'Geo-tag', color: '#22C55E' },
                  { step: '4', icon: Award, label: 'Earn Badge', color: '#FB7185' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="glass"
                    style={{ borderRadius: 14, padding: '16px 12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div style={{ fontSize: '0.65rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: 'rgba(248,250,252,0.3)', letterSpacing: '0.1em', marginBottom: 8 }}>
                      STEP {s.step}
                    </div>
                    <s.icon size={20} color={s.color} style={{ margin: '0 auto 8px', display: 'block' }} />
                    <div style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.6)', fontWeight: 600 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Location card */}
              <div className="glass" style={{ borderRadius: 18, padding: '20px', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <MapPin size={18} color="#14B8A6" />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC' }}>
                    Location Detection
                  </span>
                  <span className="badge" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)', marginLeft: 'auto', fontSize: '0.65rem' }}>
                    Active
                  </span>
                </div>
                <div style={{ borderRadius: 12, height: 140, background: 'linear-gradient(135deg, #0D1B3E, #071428)', overflow: 'hidden', position: 'relative', marginBottom: 14 }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.3)' }}>GPS ready</span>
                    </div>
                  </div>
                  {/* Grid lines */}
                  {[...Array(5)].map((_, i) => (
                    <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 25}%`, height: 1, background: 'rgba(20,184,166,0.08)' }} />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 25}%`, width: 1, background: 'rgba(20,184,166,0.08)' }} />
                  ))}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(248,250,252,0.45)' }}>
                  Auto-detecting: <span style={{ color: '#14B8A6' }}>Great Barrier Reef, QLD</span>
                </div>
              </div>

              {/* Badges */}
              <div className="glass" style={{ borderRadius: 18, padding: '20px', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <Award size={18} color="#FB7185" />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC' }}>
                    Your Badges
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {badges.map((b) => (
                    <div
                      key={b.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: b.earned ? 'rgba(20,184,166,0.06)' : 'rgba(255,255,255,0.02)',
                        border: b.earned ? '1px solid rgba(20,184,166,0.15)' : '1px solid rgba(255,255,255,0.05)',
                        opacity: b.earned ? 1 : 0.5,
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{b.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: b.earned ? '#F8FAFC' : 'rgba(248,250,252,0.4)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {b.name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'rgba(248,250,252,0.35)' }}>{b.desc}</div>
                      </div>
                      {b.earned && <CheckCircle size={14} color="#22C55E" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {analyzing && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 32px' }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  border: '2px solid rgba(20,184,166,0.15)',
                  borderTop: '2px solid #14B8A6',
                  animation: 'spin-slow 1s linear infinite',
                  position: 'absolute',
                  inset: 0,
                }}
              />
              <div style={{ position: 'absolute', inset: 12, borderRadius: '50%', overflow: 'hidden' }}>
                {selectedImage && (
                  <img src={selectedImage} alt="analyzing" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                )}
              </div>
            </div>
            <h3 className="heading-display" style={{ fontSize: '1.5rem', color: '#F8FAFC', marginBottom: 12 }}>
              AI Analyzing...
            </h3>
            <p style={{ color: 'rgba(248,250,252,0.4)', fontSize: '0.9rem' }}>
              Identifying species, assessing coral health, detecting bleaching patterns
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
              {['Species ID', 'Health Score', 'Geo-tag', 'Classification'].map((s, i) => (
                <span
                  key={s}
                  className="badge"
                  style={{
                    background: 'rgba(20,184,166,0.1)',
                    color: '#14B8A6',
                    border: '1px solid rgba(20,184,166,0.2)',
                    animation: `countUp 0.4s ease ${i * 0.2}s both`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {mode === 'result' && !analyzing && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
            {/* Image with detections */}
            <div>
              <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', marginBottom: 20 }}>
                {selectedImage && (
                  <img src={selectedImage} alt="reef" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,15,30,0.8) 100%)' }} />

                {/* Detection boxes overlay */}
                <div style={{ position: 'absolute', top: 20, left: 20 }}>
                  <span className="badge" style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={11} />
                    Analysis Complete
                  </span>
                </div>

                <button
                  onClick={() => { setMode('upload'); setSelectedImage(null) }}
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'rgba(10,15,30,0.7)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    padding: '6px',
                    cursor: 'pointer',
                    color: '#F8FAFC',
                    display: 'flex',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Detection results */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {sampleDetections.map((d, i) => (
                  <button
                    key={d.species}
                    onClick={() => setActiveDetection(i)}
                    style={{
                      borderRadius: 14,
                      padding: '16px 20px',
                      border: `1px solid ${activeDetection === i ? d.color + '40' : 'rgba(255,255,255,0.07)'}`,
                      background: activeDetection === i ? `${d.color}08` : 'rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: `${d.color}15`,
                        border: `1px solid ${d.color}25`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                        flexShrink: 0,
                      }}
                    >
                      {d.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC', marginBottom: 4 }}>
                        {d.species}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="badge" style={{ background: `${d.color}15`, color: d.color, border: `1px solid ${d.color}25` }}>
                          {d.health}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)' }}>
                          {d.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ height: 6, width: 80, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                        <div className="progress-bar" style={{ height: '100%', width: `${d.confidence}%` }} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Report panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="glass" style={{ borderRadius: 18, padding: '22px', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#F8FAFC', marginBottom: 16 }}>
                  Report Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 6 }}>Report ID</label>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: '#14B8A6', fontSize: '0.95rem' }}>RF-2848</div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 6 }}>Location</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={13} color="#06B6D4" />
                      <span style={{ fontSize: '0.875rem', color: '#F8FAFC' }}>Great Barrier Reef, QLD</span>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 6 }}>Category</label>
                    <select className="input-glass" style={{ padding: '10px 14px', fontSize: '0.85rem' }}>
                      <option style={{ background: '#0A0F1E' }}>Coral Health Report</option>
                      <option style={{ background: '#0A0F1E' }}>Species Sighting</option>
                      <option style={{ background: '#0A0F1E' }}>Bleaching Alert</option>
                      <option style={{ background: '#0A0F1E' }}>Pollution Report</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.4)', display: 'block', marginBottom: 6 }}>Notes</label>
                    <textarea
                      className="input-glass"
                      placeholder="Add field observations..."
                      rows={3}
                      style={{ resize: 'vertical', padding: '10px 14px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <button
                    className="btn-primary"
                    style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <Share2 size={14} />
                    Submit Report
                  </button>
                  <button
                    className="btn-ghost"
                    style={{ padding: '12px 14px', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              {/* Badge earned */}
              <div
                className="glass-teal"
                style={{ borderRadius: 16, padding: '18px', border: '1px solid rgba(20,184,166,0.2)', textAlign: 'center' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>🔬</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: '#14B8A6', fontSize: '0.9rem' }}>
                  Badge Earned!
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.45)', marginTop: 4 }}>
                  Species Expert — identified 26 species
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === 'history' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {history.map((h) => (
                <div
                  key={h.id}
                  className="glass card-hover"
                  style={{
                    borderRadius: 18,
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr auto',
                    border: '1px solid rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ background: '#0D1B3E', position: 'relative' }}>
                    <img
                      src={`https://images.unsplash.com/${h.image}?w=180&h=120&fit=crop&auto=format`}
                      alt={h.species}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', color: 'rgba(248,250,252,0.35)' }}>{h.id}</span>
                      <span
                        className="badge"
                        style={{
                          background: h.status === 'Verified' ? 'rgba(34,197,94,0.1)' : 'rgba(251,113,133,0.1)',
                          color: h.status === 'Verified' ? '#22C55E' : '#FB7185',
                          border: `1px solid ${h.status === 'Verified' ? 'rgba(34,197,94,0.2)' : 'rgba(251,113,133,0.2)'}`,
                        }}
                      >
                        {h.status === 'Verified' ? <CheckCircle size={10} style={{ display: 'inline', marginRight: 4 }} /> : <Clock size={10} style={{ display: 'inline', marginRight: 4 }} />}
                        {h.status}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#F8FAFC', marginBottom: 6 }}>
                      {h.species}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={12} color="rgba(248,250,252,0.35)" />
                      <span style={{ fontSize: '0.78rem', color: 'rgba(248,250,252,0.35)' }}>{h.location}</span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.25)', marginLeft: 8 }}>{h.date}</span>
                    </div>
                    {h.badge && (
                      <div style={{ marginTop: 10 }}>
                        <span className="badge" style={{ background: 'rgba(251,113,133,0.1)', color: '#FB7185', border: '1px solid rgba(251,113,133,0.2)' }}>
                          🏅 {h.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
                    <ChevronRight size={18} color="rgba(248,250,252,0.3)" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

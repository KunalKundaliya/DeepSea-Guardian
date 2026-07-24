import { useState, useEffect } from 'react'
import { Waves, Menu, X, ChevronRight } from 'lucide-react'

const pages = [
  { id: 'home', label: 'Home' },
  { id: 'explore', label: 'Explore' },
  { id: 'reeflens', label: 'ReefLens' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'donate', label: 'Donate' },
  { id: 'contact', label: 'Contact' },
]

interface NavbarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = (page: string) => {
    setCurrentPage(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s ease',
          background: scrolled
            ? 'rgba(10, 15, 30, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', height: 72, gap: 40 }}>
            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Waves size={18} color="#0A0F1E" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  color: '#F8FAFC',
                  letterSpacing: '-0.02em',
                }}
              >
                REEF
              </span>
            </button>

            {/* Desktop Nav */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
              className="hidden md:flex"
            >
              {pages.slice(0, 7).map((page) => (
                <button
                  key={page.id}
                  onClick={() => navigate(page.id)}
                  className={`nav-link ${currentPage === page.id ? 'active' : ''}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 14px',
                    borderRadius: 8,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {page.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
              <button
                onClick={() => navigate('donate')}
                className="btn-primary"
                style={{
                  padding: '10px 20px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>Donate Now</span>
                <ChevronRight size={14} />
              </button>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: '8px',
                  cursor: 'pointer',
                  color: '#F8FAFC',
                  display: 'flex',
                }}
                className="md:hidden"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 72,
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'rgba(10, 15, 30, 0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '16px 24px 24px',
          }}
        >
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => navigate(page.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: currentPage === page.id ? 'rgba(20, 184, 166, 0.1)' : 'none',
                border: 'none',
                borderRadius: 10,
                padding: '12px 16px',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.95rem',
                color: currentPage === page.id ? '#14B8A6' : 'rgba(248, 250, 252, 0.8)',
                transition: 'all 0.2s ease',
              }}
            >
              {page.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

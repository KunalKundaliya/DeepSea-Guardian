import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import Explore from './components/pages/Explore'
import ReefLens from './components/pages/ReefLens'
import Campaigns from './components/pages/Campaigns'
import VolunteerHub from './components/pages/VolunteerHub'
import Dashboard from './components/pages/Dashboard'
import Donate from './components/pages/Donate'
import Contact from './components/pages/Contact'

type Page = 'home' | 'explore' | 'reeflens' | 'campaigns' | 'volunteer' | 'dashboard' | 'donate' | 'contact'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigate = (page: string) => {
    setCurrentPage(page as Page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setCurrentPage={navigate} />
      case 'explore': return <Explore />
      case 'reeflens': return <ReefLens />
      case 'campaigns': return <Campaigns />
      case 'volunteer': return <VolunteerHub />
      case 'dashboard': return <Dashboard />
      case 'donate': return <Donate />
      case 'contact': return <Contact />
      default: return <Home setCurrentPage={navigate} />
    }
  }

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh' }}>
      <Navbar currentPage={currentPage} setCurrentPage={navigate} />
      <main>{renderPage()}</main>
    </div>
  )
}

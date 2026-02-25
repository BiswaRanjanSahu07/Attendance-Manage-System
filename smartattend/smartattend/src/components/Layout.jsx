import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="noise-overlay" />
      <Sidebar />
      <main className="main-content flex-1 relative z-10">
        {children}
      </main>
    </div>
  )
}

import Header from './Header'
import Footer from './Footer'
import PageBanner from './PageBanner'

export default function StandardPageTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="page-mx">
        <PageBanner imageUrl={null} alt="" />
      </div>
      <main className="flex-grow">
        <div className="page-mx">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

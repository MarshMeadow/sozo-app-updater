import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from './components/Loading'
import Layout from './components/Layout'
import Footer from './components/Footer'
import DisclaimerGate from './components/DisclaimerGate'

const Home = lazy(() => import('./pages/Home'))
const Downloads = lazy(() => import('./pages/Downloads'))
const Platform = lazy(() => import('./pages/Platform'))
const Explorer = lazy(() => import('./pages/Explorer'))
const Community = lazy(() => import('./pages/Community'))
const Contributors = lazy(() => import('./pages/Contributors'))
const Obtainium = lazy(() => import('./pages/Obtainium'))
const Sitemap = lazy(() => import('./pages/Sitemap'))
const Settings = lazy(() => import('./pages/Settings'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Dmca = lazy(() => import('./pages/Dmca'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <>
      <DisclaimerGate />
      <Suspense fallback={<Loading />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/apk" element={<Platform slug="apk" />} />
            <Route path="/tv" element={<Platform slug="tv" />} />
            <Route path="/desktop" element={<Platform slug="desktop" />} />
            <Route path="/legacy" element={<Platform slug="legacy" />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/obtainium" element={<Obtainium />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/dmca" element={<Dmca />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Footer />
      </Suspense>
    </>
  )
}

export default App

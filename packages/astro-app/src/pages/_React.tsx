import { Suspense, lazy } from "react"


const App = lazy(() => import('viteApp/ViteApp'))

export default function Test() {


  return <Suspense fallback="loading">
    <App onRouteChange={url => {
      history.pushState({}, '', '/')
    }} />
  </Suspense>
}
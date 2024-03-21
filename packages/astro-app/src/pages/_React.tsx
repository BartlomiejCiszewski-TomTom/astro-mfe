import { Suspense, lazy } from "react";

const App = lazy(() => import("viteApp/ViteApp"));

export default function Test({baseRoute}: {baseRoute: string}) {
  return (
    <Suspense fallback="loading">
      <App
        onRouteChange={(url: string) => {
          console.log(`Remote app navigated to: ${url}`);
        }}
        baseRoute={baseRoute}
      />
    </Suspense>
  );
}

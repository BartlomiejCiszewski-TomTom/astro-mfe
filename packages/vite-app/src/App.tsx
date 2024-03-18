import { createContext, useContext, useEffect } from "react";
import {
  Link,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <div>Homepage from vite</div>
      </Layout>
    ),
    id: "home",
  },
  {
    path: "/docs",
    element: (
      <Layout>
        <div>Docs page from vite</div>
      </Layout>
    ),
    id: "docs",
  },
  {
    path: "/about",
    element: (
      <Layout>
        <div>About page from vite</div>
      </Layout>
    ),
    id: "about",
  },
]);

type RouteChangeHandler = (url: string) => void;

type RoutingContextType = {
  onRouteChange?: RouteChangeHandler;
} | null;

const RoutingContext = createContext<RoutingContextType>(null);

function App({ onRouteChange }: { onRouteChange?: RouteChangeHandler }) {
  return (
    <RoutingContext.Provider value={{ onRouteChange }}>
      <RouterProvider router={router} />
    </RoutingContext.Provider>
  );
}

export default App;

function Layout({ children }: { children: React.ReactNode }) {
  const context = useContext(RoutingContext);
  const location = useLocation();

  // Send signal to devportal to handle the route change in the parent.
  // This is just an MVP, we could a better way to handle this eg. using the postMessage API.
  useEffect(() => {
    context?.onRouteChange?.(location.pathname as string);
  }, [location.pathname, context]);

  return (
    <>
      <nav style={{ marginBottom: 24, display: "flex", gap: 12 }}>
        {router.routes.map((route) => (
          <Link key={route.id} to={route.path as string}>
            {route.id}
          </Link>
        ))}
      </nav>
      {children}
    </>
  );
}

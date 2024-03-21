import { createContext, useContext, useEffect } from "react";
import {
  Link,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";

type RouteChangeHandler = (url: string) => void;

type RoutingContextType = {
  onRouteChange?: RouteChangeHandler;
} | null;

const RoutingContext = createContext<RoutingContextType>(null);

function App({
  onRouteChange,
  baseRoute = "/",
}: {
  onRouteChange?: RouteChangeHandler;
  baseRoute?: string;
}) {
  const router = createBrowserRouter(
    [
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
    ],
    { basename: baseRoute }
  );

  return (
    <RoutingContext.Provider value={{ onRouteChange }}>
      <RouterProvider router={router} />
    </RoutingContext.Provider>
  );
}

export default App;

const routes = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/docs",
    label: "Docs",
  },
  {
    to: "/about",
    label: "About",
  },
];

function Layout({ children }: { children: React.ReactNode }) {
  const context = useContext(RoutingContext);
  const location = useLocation();

  // Send signal to devportal to handle the route change in the parent.
  // This is just an MVP, we could a better way to handle this eg. using the postMessage API.
  useEffect(() => {
    context?.onRouteChange?.(location.pathname);
  }, [location.pathname, context]);

  return (
    <>
      <nav style={{ marginBottom: 24, display: "flex", gap: 12 }}>
        {routes.map(({ to, label }) => (
          <Link key={to} to={to}>
            {label}
          </Link>
        ))}
      </nav>
      {children}
    </>
  );
}

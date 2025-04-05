import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppLayout from "../layout";

// 1. Create root route
export const Route = createRootRoute({
 component: () => (
  <AppLayout>
   <Outlet />
   <TanStackRouterDevtools position="bottom-right" />
  </AppLayout>
 ),
 notFoundComponent: () => {
  return (
   <div>
    <p>This is the notFoundComponent configured on root route</p>
    <Link to="/">Start Over</Link>
   </div>
  );
 },
});

// 2. Import and declare child routes
import { indexRoute } from "./main/route";
import { submittedApplicationRoute } from "./submitted-application/route";

// 3. Create route tree
export const routeTree = Route.addChildren([
 indexRoute,
 submittedApplicationRoute,
]);

import { routeTree } from "@/app/routes/__root";
import { createRouter } from "@tanstack/react-router";

export const router = createRouter({
 routeTree,
 defaultPreload: "intent",
 defaultStaleTime: 5000,
 scrollRestoration: true,
});

declare module "@tanstack/react-router" {
 interface Register {
  router: typeof router;
 }
}

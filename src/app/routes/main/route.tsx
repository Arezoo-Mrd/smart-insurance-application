import { createRoute } from "@tanstack/react-router";
import { Route } from "../__root";
import { MainPage } from ".";

export const indexRoute = createRoute({
 getParentRoute: () => Route,
 path: "/",
 component: MainPage,
});

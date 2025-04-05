import { createRoute } from "@tanstack/react-router";
import SubmittedApplicationPage from ".";
import { Route } from "../__root";

export const submittedApplicationRoute = createRoute({
 getParentRoute: () => Route,
 path: "/submitted-application",
 component: SubmittedApplicationPage,
});

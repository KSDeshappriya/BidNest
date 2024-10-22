import { redirect } from "@sveltejs/kit";
import type { Handle } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const access = event.cookies.get("role") === "Seller" || event.cookies.get("role") === "Buyer";

  if (!access && event.route.id?.startsWith("/dashboards")) {
    throw redirect(302, "/login");
  }

  event.locals.user = {
    id: event.cookies.get("userId") || "",
    role: event.cookies.get("role") || ""
  };

  const theme = event.cookies.get("siteTheme");

  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('data-theme=""', `data-theme="${theme}"`),
  });
  return response;
};
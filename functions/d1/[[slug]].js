export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Customer JSON files are static assets
  if (url.pathname.startsWith("/d1/data/")) {
    return context.env.ASSETS.fetch(context.request);
  }

  // Serve the D1 template for customer URLs
  if (url.pathname.startsWith("/d1/")) {
    const templateUrl = new URL("/d1/", url);

    return context.env.ASSETS.fetch(
      new Request(templateUrl, context.request)
    );
  }

  return context.env.ASSETS.fetch(context.request);
}

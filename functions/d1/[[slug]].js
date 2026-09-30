export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Serve customer JSON files normally
  if (url.pathname.startsWith("/d1/data/")) {
    return context.env.ASSETS.fetch(context.request);
  }

  // Serve the single D1 template for customer URLs.
  // IMPORTANT: use the pretty /d1/ asset path.
  // Do not fetch /d1/index.html because Cloudflare redirects
  // index.html to /d1/.
  if (url.pathname.startsWith("/d1/")) {
    const templateUrl = new URL("/d1/", url);

    return context.env.ASSETS.fetch(
      new Request(templateUrl, context.request)
    );
  }

  return context.env.ASSETS.fetch(context.request);
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // JSON files are served normally
  if (url.pathname.startsWith("/d1/data/")) {
    return context.env.ASSETS.fetch(context.request);
  }

  // All /d1/<customer> URLs use the single D1 template.
  // Fetch the HTML asset internally and return it directly,
  // without redirecting the browser URL.
  if (url.pathname.startsWith("/d1/")) {
    const assetUrl = new URL("/d1/index.html", url);

    const response = await context.env.ASSETS.fetch(
      new Request(assetUrl)
    );

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }

  return context.env.ASSETS.fetch(context.request);
}

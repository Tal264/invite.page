cat > functions/d1/[[slug]].js <<'EOF'
export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Let customer JSON files load normally
  if (url.pathname.startsWith("/d1/data/")) {
    return context.env.ASSETS.fetch(context.request);
  }

  // Serve the D1 template for every customer URL
  // Use /d1/ instead of /d1/index.html because
  // Cloudflare Pages automatically redirects index.html -> /
  if (url.pathname.startsWith("/d1/")) {
    const templateUrl = new URL("/d1/", url);

    return context.env.ASSETS.fetch(
      new Request(templateUrl, context.request)
    );
  }

  return context.env.ASSETS.fetch(context.request);
}
EOF
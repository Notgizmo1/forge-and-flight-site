/**
 * Cloudflare Pages Middleware
 * Redirects www.forgeandflight.com → forgeandflight.com (canonical 301)
 */
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (url.hostname === 'www.forgeandflight.com') {
    url.hostname = 'forgeandflight.com';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}

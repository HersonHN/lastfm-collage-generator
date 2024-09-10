import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return blank();
  }

  const content = await fetch(url);
  const blob = await content.blob();

  return new Response(blob, { headers: { "content-type": "image/jpeg" } });
}

function blank() {
  return new Response("", { headers: { "content-type": "text/plain" } });
}

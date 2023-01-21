import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { email, event } = await req.json();

  const sk = Deno.env.get("PLUNK_SK");

  const res = await fetch("https://api.useplunk.com/v1/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sk}`,
    },
    body: JSON.stringify({
      event,
      email,
    }),
  });

  const data: { success: boolean; contact: string } = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});

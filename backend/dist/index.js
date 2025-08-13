import { Hono } from 'hono';
const app = new Hono();
app.get('/health', (c) => c.json({ ok: true }));
app.post('/api/chat', async (c) => {
    const body = await c.req.json().catch(() => ({}));
    const messages = body?.messages ?? [{ role: 'user', content: 'Hello' }];
    const url = `https://api.cloudflare.com/client/v4/accounts/${c.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`;
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${c.env.CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages })
    });
    if (!resp.ok) {
        const t = await resp.text();
        return c.json({ error: t }, 500);
    }
    const json = await resp.json();
    return c.json(json);
});
export default app;
//# sourceMappingURL=index.js.map
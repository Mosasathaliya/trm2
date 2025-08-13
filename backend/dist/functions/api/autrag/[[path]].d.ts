import { Hono } from 'hono';
interface Env {
    AI: any;
    AUTORAG_ENDPOINT?: string;
    CLOUDFLARE_ACCOUNT_ID?: string;
    CLOUDFLARE_API_TOKEN?: string;
}
declare const app: Hono<{
    Bindings: Env;
}, import("hono/types").BlankSchema, "/">;
export default app;
//# sourceMappingURL=%5B%5Bpath%5D%5D.d.ts.map
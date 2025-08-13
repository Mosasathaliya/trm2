import { Hono } from 'hono';
type Env = {
    CLOUDFLARE_API_TOKEN: string;
    CLOUDFLARE_ACCOUNT_ID: string;
};
declare const app: Hono<{
    Bindings: Env;
}, import("hono/types").BlankSchema, "/">;
export default app;
//# sourceMappingURL=index.d.ts.map
import { drizzle } from 'drizzle-orm/d1';
import { user } from './schema';
import { eq } from 'drizzle-orm';
import { json } from 'itty-router-extras';
import { z } from 'zod';
import * as schema from './schema';

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const db = drizzle(env.DB, { schema });

    if (path.startsWith('/api/user')) {
      if (path === '/api/user') {
        if (method === 'GET') {
          const params = url.searchParams;

          if (params.has('id')) {
            const id = params.get('id') as string;
            const res = await db.query.user.findFirst({
              where: (user, { eq }) => eq(user.id, id),
              with: {
                virtualBox: true,
              },
            });
            return json(res ?? {});
          } else {
            const res = await db.select().from(user).all();
            return new Response(JSON.stringify(res));
          }
        } else if (method === 'POST') {
          const userSchema = z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
          });

          const body = await request.json();
          const { id, name, email } = userSchema.parse(body);

          const res = await db.insert(user).values({ id, name, email }).returning().get();
          return json({ res });
        } else {
          return new Response('Method Not Found', { status: 405 });
        }
      } else {
        return new Response('Not Found', { status: 404 });
      }
    }

    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;

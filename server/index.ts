import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const todoInputType = z.object({
    title: z.string(),
    description: z.string(),
})

const appRouter = router({

    signUp: publicProcedure
        .input(z.object({
            email: z.string(),
            password: z.string()
        }))
        .mutation(async (opts) => {
            // context

            let email = opts.input.email
            let password = opts.input.password

            // Do DataBase Stuff here

            let token = "12328754"
            return {
                token
            }
        }),
    creareTodo: publicProcedure
        .input(z.object({
            title: z.string()
        }))
        .mutation(async (opts) => {
            console.log(opts.ctx.username)
        })

});

const server = createHTTPServer({
    router: appRouter,
    createContext(opts) {
        let authHeader = opts.req.headers["authorization"]
        console.log(authHeader)

        return {
            username: "12324"
        }
    }
});

server.listen(3000);

export type AppRouter = typeof appRouter;


import initializeTracing from './tracing';
const tracer = initializeTracing('express-server')


import { PrismaClient } from '@prisma/client';
// import { Post, User, PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {v4 as uuid} from 'uuid';
import {random} from './prisma/seed';
import {xprisma} from "./extensions";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 4000;

const prisma = new PrismaClient({});
// server.ts

// Before tracing
// app.get("/users/random", async (_req: Request, res: Response) => {
//     try {
//         let users = await prisma.user.findMany({
//             include: {
//                 posts: true
//             }
//         });
//
//         // select 10 users randomly
//         const shuffledUsers = users.sort(() => 0.5 - Math.random());
//         const selectedUsers = shuffledUsers.slice(0, 10);
//
//         res.status(200).json(selectedUsers);
//     } catch (e) {
//         res.status(500).json({ error: 500, details: e });
//     } finally {
//     }
// });

// Before running manually trace your Prisma queries below
// app.get("/users/random", async (_req: Request, res: Response) => {
//     await tracer.startActiveSpan("GET /users/random", async (requestSpan) => {
//         try {
//             let users = await prisma.user.findMany({
//                 include: {
//                     posts: true
//                 }
//             });
//
//             // select 10 users randomly
//             const shuffledUsers = users.sort(() => 0.5 - Math.random());
//             const selectedUsers = shuffledUsers.slice(0, 10);
//
//             requestSpan.setAttribute("http.status", 200);
//             res.status(200).json(selectedUsers);
//         } catch (e) {
//             requestSpan.setAttribute("http.status", 500);
//             res.status(500).json({ error: 500, details: e });
//         } finally {
//             requestSpan.end();
//         }
//     });
// });


// Manually trace Prisma Queries
// app.get("/users/random", async (_req: Request, res: Response) => {
//     await tracer.startActiveSpan("GET /users/random", async (requestSpan) => {
//         try {
//             // define "users" along with its type.
//                         let users: (User & { posts: Post[]; })[] | undefined;
//                         await tracer.startActiveSpan("prisma.user.findmany", async (findManyQuerySpan) => {
//                             try {
//                                 users = await prisma.user.findMany({
//                                     include: {
//                                         posts: true
//                                     }
//                                 });
//                             } finally {
//                                 findManyQuerySpan.end()
//                             }
//                         });
//
//                         if (!users) {
//                             throw new Error("Failed to fetch users");
//                         }
//
//                 // select 10 users randomly
//                 const shuffledUsers = users.sort(() => 0.5 - Math.random());
//                 const selectedUsers = shuffledUsers.slice(0, 10);
//
//                 res.status(200).json(selectedUsers);
//                 requestSpan.setAttribute("http.status", 200);
//             } catch (e) {
//                 requestSpan.setAttribute("http.status", 500);
//                 res.status(500).json({ error: 500, details: e });
//             } finally {
//                 requestSpan.end();
//             }
//         });
//     });

// After running manually trace your Prisma queries
app.get("/users/random", async (_req: Request, res: Response) => {
    try {
        let users = await prisma.user.findMany({
            include: {
                posts: true
            }
        });

        // select 10 users randomly
        const shuffledUsers = users.sort(() => 0.5 - Math.random());
        const selectedUsers = shuffledUsers.slice(0, 10);

        res.status(200).json(selectedUsers);
    } catch (e) {
        res.status(500).json({ error: 500, details: e });
    } finally {
    }
});


//  curl -X POST -H "Content-Type: application/json" -d '{"userId": "user-26"}' http://localhost:4000/user/create
app.post("/user/create", async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;
        const posts = [];
        let newUser: any;

        for (let k = 0; k < 5; k++) {
            posts.push({
                id: uuid(),
                description: random(22222, 88888).toString(),
            });
        }
        // create user with posts
        newUser = await xprisma.user.create({
            data: {
                id: userId,
                name: random(22222, 88888).toString(),
                posts: {
                    create: posts,
                },
            },
        });

        res.status(200).json(newUser);
    } catch (e) {
        res.status(400).json({ error: 400, details: e });
    } finally {

    }
});

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
});

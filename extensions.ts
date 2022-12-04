import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const xprisma = prisma.$extends({
    query: {
        $allModels: {
            $allOperations({ model, operation, args, query }: any) {
                return query(args)
            },
        },
    },
})

export {xprisma};
// await xprisma.user.findMany() // returns users whose age is greater than 18

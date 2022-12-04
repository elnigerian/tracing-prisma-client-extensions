## Prisma tracing tutorial

Reference code for ["Get Started With Tracing Using OpenTelemetry and Prisma Tracing"](https://prisma.io/blog/tracing-tutorial-prisma-pmkddgq1lm2).

This branch reflects the code at the _end of the tutorial_.

For reference express server used at the _beginning of the tutorial_ go to the [`tracing-begin`](https://github.com/TasinIshmam/tracing-tutorial-prisma/tree/tracing-begin) branch. 

### Installation

1. Clone this branch: `git clone git@github.com:elnigerian/tracing-prisma-client-extensions.git`.
2. Navigate to the cloned directory: `cd tracing-prisma-client-extensions`.
3. Install dependencies: `yarn install`.
4. Run migrations: `npx prisma migrate dev`.
5. Start jaeger: `docker-compose up -d`
6. Start the server: `yaarn dev`.
7. Test out the example endpoint: [http://localhost:4000/users/random](http://localhost:4000/users/random).
8. See the generated traces in Jaeger: [http://localhost:16686](http://localhost:16686).
9. Test out the example by creating a user using curl - `curl -X POST -H "Content-Type: application/json" -d '{"userId": "user-26"}' http://localhost:4000/user/create`

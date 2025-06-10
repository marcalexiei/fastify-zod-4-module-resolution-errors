import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod/v4";

const app = Fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/",
  // Define your schema
  schema: {
    querystring: z.object({
      name: z.string().min(4),
    }),
    response: {
      200: z.object({ status: z.string() }),
    },
  },
  handler: (req, res) => {
    res.send({ status: req.query.name });
  },
});

app.listen({ port: 4949 });

setTimeout(() => {
  app.close();
}, 1500);

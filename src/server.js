import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import z from "zod/v4";

const app = Fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.withTypeProvider().route({
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
    res.send(req.query.name);
  },
});

app.listen({ port: 4949 });

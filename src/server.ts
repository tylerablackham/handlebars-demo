import Fastify from 'fastify'
import handlebars from "handlebars";
import { join, dirname } from "path";
import view from "@fastify/view";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
  logger: true
})

// Register the Handlebars view engine
fastify.register(view, {
  engine: { handlebars },
  root: join(__dirname, "views"),
  layout: "layout.hbs", // optional default layout
});

fastify.get("/", async (req, reply) => {
  return reply.view("index.hbs", {
    title: "Fastify + Handlebars",
    message: "Welcome to your first Fastify/Handlebars page!",
  });
});

fastify.get('/simple-expressions', async(req, reply) => {
  return reply.view('simpleExpressions.hbs', {
    title: 'Simple Expressions'
  })
})

fastify.get('/basic-helpers', async(req, reply) => {
  return reply.view('basicHelpers.hbs', {
    title: 'Basic Helpers'
  })
})

fastify.get('/block-helpers', async(req, reply) => {
  return reply.view('blockHelpers.hbs', {
    title: 'Block Helpers'
  })
})

fastify.get('/partials', async(req, reply) => {
  return reply.view('partials.hbs', {
    title: 'Partials'
  })
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
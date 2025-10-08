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
  options: {
    partials: {
      header: "partials/header.hbs",
      exclaim: "partials/exclaim.hbs"
    }
  }
});

fastify.get("/", async (req, reply) => {
  return reply.view("index.hbs", {
    title: "Fastify + Handlebars Demo",
    home: true,
    message: "Welcome to your first Fastify + Handlebars page!",
  });
});

fastify.get('/simple-expressions', async(req, reply) => {
  return reply.view('simpleExpressions.hbs', {
    title: 'Simple Expressions',
    header: 'Hello',
    person: {
      firstName: 'Foo',
      lastName: 'Baz',
      age: 35,
    }
  })
})

fastify.get('/basic-helpers', async(req, reply) => {
  return reply.view('basicHelpers.hbs', {
    title: 'Basic Helpers',
    header: 'Hello',
    person: {
      firstName: 'Foo',
      lastName: 'Baz',
      age: 35,
    }
  })
})

fastify.get('/block-helpers', async(req, reply) => {
  return reply.view('blockHelpers.hbs', {
    title: 'Block Helpers',
    names: [
      {first: 'Foo', last: 'Baz'},
      {first: 'Bar', last: 'Baz'},
      {first: 'Foobar'},
    ]
  })
})

fastify.get('/partials', async(req, reply) => {
  return reply.view('partials.hbs', {
    title: 'Partials',
    exclamation: 'Hello',
    names: [
      'foo',
      'bar',
      'baz'
    ],
    context: {
      exclamation: 'Go Context'
    }
  })
})

/**
 * Define Handlebars helpers
 */
handlebars.registerHelper('loud', function(string: String):String {
  return string.toUpperCase();
})

handlebars.registerHelper('append', function(s1: String, s2: String, addSpace:boolean = true):String {
  return s1 + (addSpace ? ' ' : '') + s2;
})

/**
 * Run the server
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
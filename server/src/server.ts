import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
	validatorCompiler,
	serializerCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
	origin: true,
});

app.post(
	"/subscriptions",
	{
		schema: {
			body: z.object({
				name: z.string(),
				email: z.string().email(),
			}),
		},
	},
	(request, reply) => {
		const { name, email } = request.body;

		return reply.status(201).send({
			name,
			email,
		});
	},
);

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log("HTTPS server running");
	});

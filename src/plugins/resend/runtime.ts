import { env } from "cloudflare:workers";
import { definePlugin } from "emdash";
import { deliverEmail } from "./transport.ts";

// Native mode is required for access to the Worker's runtime secret binding.
export function createPlugin(options: { from: string }) {
	return definePlugin({
		id: "sinlc-resend",
		version: "1.0.0",
		capabilities: ["hooks.email-transport:register", "network:request"],
		allowedHosts: ["api.resend.com"],
		hooks: {
			"email:deliver": {
				exclusive: true,
				timeout: 15000,
				handler: async ({ message }) => {
					await deliverEmail(message, env.RESEND_API_KEY, options.from);
				},
			},
		},
	});
}

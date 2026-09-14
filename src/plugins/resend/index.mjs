import { fileURLToPath } from "node:url";

// This descriptor runs at build time. Keep runtime imports and secrets out of it.
/** @returns {import("emdash").PluginDescriptor} */
export function resendPlugin() {
	return {
		id: "sinlc-resend",
		version: "1.0.0",
		format: "native",
		entrypoint: fileURLToPath(new URL("./runtime.ts", import.meta.url)),
		options: { from: "Long Ching Sin <noreply@sin.lc>" },
	};
}

declare namespace Cloudflare {
	interface Env {
		/** Configure as a runtime Worker secret, not a build variable. */
		RESEND_API_KEY?: string;
	}
}

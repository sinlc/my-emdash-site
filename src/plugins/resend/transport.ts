import { Resend } from "resend";

// EmDash 0.37's delivery message shape (not exported from its public entrypoint).
interface EmailMessage {
	to: string;
	subject: string;
	text: string;
	html?: string;
}

export async function deliverEmail(
	message: EmailMessage,
	apiKey: string | undefined,
	from: string,
): Promise<void> {
	if (!apiKey?.trim()) {
		throw new Error(
			"Set RESEND_API_KEY in the Worker's runtime Variables and Secrets (not Build settings).",
		);
	}

	const resend = new Resend(apiKey);
	const { data, error } = await resend.emails.send({
		from,
		to: message.to,
		subject: message.subject,
		text: message.text,
		...(message.html ? { html: message.html } : {}),
	});

	if (error) {
		// Do not log message bodies, authentication links, or the API key.
		throw new Error(`Resend email delivery failed (${error.name}). Check the Resend dashboard.`);
	}
	if (!data?.id) {
		throw new Error("Resend did not confirm email acceptance.");
	}
}

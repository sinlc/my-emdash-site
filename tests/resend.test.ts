import assert from "node:assert/strict";
import { test } from "node:test";
import { deliverEmail } from "../src/plugins/resend/transport.ts";

const from = "Long Ching Sin <noreply@sin.lc>";
const message = {
	to: "delivered@resend.dev",
	subject: "EmDash email test",
	text: "Test message",
	html: "<p>Test message</p>",
};

test("sends the verified sender and both email bodies through the Resend SDK", async (t) => {
	const fetch = t.mock.method(globalThis, "fetch", async (url, init) => {
		assert.equal(url, "https://api.resend.com/emails");
		assert.equal(init.method, "POST");
		assert.equal(new Headers(init.headers).get("Authorization"), "Bearer test-key");
		assert.deepEqual(JSON.parse(init.body), { from, ...message });
		return Response.json({ id: "test-email-id" });
	});
	await deliverEmail(message, "test-key", from);
	assert.equal(fetch.mock.callCount(), 1);
});

test("missing runtime secret fails before making a network request", async (t) => {
	const fetch = t.mock.method(globalThis, "fetch", async () => {
		throw new Error("Unexpected network request");
	});
	for (const key of [undefined, "", "   "]) {
		await assert.rejects(deliverEmail(message, key, from), /runtime Variables and Secrets/);
	}
	assert.equal(fetch.mock.callCount(), 0);
});

test("Resend rejection propagates without including provider details or auth links", async (t) => {
	t.mock.method(globalThis, "fetch", async () => Response.json({
		name: "validation_error",
		message: "Private provider detail with an authentication link",
	}, { status: 403 }));
	await assert.rejects(deliverEmail(message, "test-key", from), (error: Error) => {
		assert.match(error.message, /delivery failed \(validation_error\)/);
		assert.doesNotMatch(error.message, /Private provider detail/);
		return true;
	});
});

test("an unconfirmed response is not reported as success", async (t) => {
	t.mock.method(globalThis, "fetch", async () => Response.json({}));
	await assert.rejects(deliverEmail(message, "test-key", from), /did not confirm/);
});

test("plain-text email works and network failures propagate", async (t) => {
	const { html, ...plainMessage } = message;
	t.mock.method(globalThis, "fetch", async (_url, init) => {
		assert.deepEqual(JSON.parse(init.body), { from, ...plainMessage });
		throw new Error("Connection failed");
	});
	await assert.rejects(deliverEmail(plainMessage, "test-key", from), /delivery failed/);
});

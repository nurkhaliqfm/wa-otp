import { IChat } from "types/chat";

export async function handleIncomingMessage(chat: IChat) {
	if (!chat.isCommand) console.log("Upsert Messages Log : ", chat);

	switch (chat.command) {
		case "otp":
			chat.replay({
				text: `🔐 OTP VERIFICATION\n\nKode OTP Anda: 880062\n\n> ⁠Jangan bagikan kode ini kepada siapa pun demi keamanan akun Anda.`,
			});

			break;

		default:
			break;
	}
}

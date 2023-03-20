import nodemailer from "nodemailer";
import Email from "../../../../emails/testing";
import { render } from "@react-email/render";
import { NextRequest } from "next/server";

const transporter = nodemailer.createTransport({
	service: process.env.MAIL_HOST,
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
	},
});

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const emailHtml = render(<Email teamName={body.name} />);

	const mailOptions = {
		from: process.env.MAIL_USERNAME,
		to: body.email as string,
		subject: "Message from contact form",
		html: emailHtml,
	};

	try {
		await transporter.sendMail(mailOptions);
		return new Response("Message sent successfully!", { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Message failed to send!", { status: 500 });
	}
};

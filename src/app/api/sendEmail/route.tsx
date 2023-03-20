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

export const GET = async () => {
	const emailHtml = render(<Email teamName="KIDIBRA" />);

	const mailOptions = {
		from: process.env.MAIL_USERNAME,
		to: "johnibrahimfrank@gmail.com",
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

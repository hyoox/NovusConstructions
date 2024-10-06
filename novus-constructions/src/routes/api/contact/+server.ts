import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const name = formData.get('name');
	const email = formData.get('email');
	const message = formData.get('message');

	// Here you would typically use a service to send an email
	// For this example, we'll just log the data and return a success response
	console.log('Received contact form submission:');
	console.log('Name:', name);
	console.log('Email:', email);
	console.log('Message:', message);

	// TODO: Implement email sending logic here
	// You can use a service like Nodemailer, SendGrid, or any other email service

	return json({ success: true, message: 'Message sent successfully' });
};

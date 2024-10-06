import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '$env/static/private';

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const name = formData.get('name') as string;
	const email = formData.get('email') as string;
	const message = formData.get('message') as string;

	const templateParams = {
		from_name: name,
		from_email: email,
		message: message,
		to_name: 'Novus Constructions'
	};

	try {
		await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
		return json({ success: true, message: 'Το μήνυμα στάλθηκε επιτυχώς' });
	} catch (error) {
		console.error('Σφάλμα κατά την αποστολή email:', error);
		return json({ success: false, message: 'Αποτυχία αποστολής μηνύματος' }, { status: 500 });
	}
};

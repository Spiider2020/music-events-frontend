import cookie from 'cookie';
import { API_URL } from '@/config/index.js';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const cors = initMiddleware(
	// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
	Cors({
		// Only allow requests with GET, POST and OPTIONS
		origin: '*',
		methods: ['GET', 'POST', 'OPTIONS'],
	})
);

export default async (req, res) => {
	// Run cors
	await cors(req, res);
	// Rest of API logic
	if (req.method === 'POST') {
		const { username, email, password } = req.body;

		const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});
		const data = await strapiRes.json();
		console.log(data.jwt);

		if (strapiRes.ok) {
			//Set cookie
			res.setHeader(
				'Set-Cookie',
				cookie.serialize('token', data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					maxAge: 60 * 60 * 24 * 7, // 1 week
					sameSite: 'strict',
					path: '/',
				})
			);
			res.status(200).json({ user: data.user });
		} else {
			res.status(data.statusCode).json({ message: data.message[0].messages[0].message });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed.` });
	}
};

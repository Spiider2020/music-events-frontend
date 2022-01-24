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
	if (req.method === 'GET') {
		if (!req.headers.cookie) {
			res.status(403).json({ message: 'Not Authorized' });
			return;
		}

		const { token } = cookie.parse(req.headers.cookie);

		const strapiRes = await fetch(`${API_URL}/users/me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const user = strapiRes.json();

		if (strapiRes.ok) {
			res.status(200).json({ user });
		} else {
			res.status(403).json({ message: 'User forbidden' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ message: `Method ${req.method} not allowed.` });
	}
};

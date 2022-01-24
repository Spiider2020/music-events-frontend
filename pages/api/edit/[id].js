import { API_URL } from '@/config/index.js';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

const cors = initMiddleware(
	// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
	Cors({
		// Only allow requests with GET, POST and OPTIONS
		methods: ['PUT'],
	})
);

export default async (req, res) => {
	// Run cors
	await cors(req, res);
	if (req.method === 'PUT') {
		const strapiRes = await fetch(`${API_URL}/events/${req.query.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
			body: JSON.stringify(req.body),
		});
		const data = await strapiRes.json();
		res.json(data);
	} else {
		res.setHeader('Allow', ['PUT']);
		res.status(405).json({ message: `Method ${req.method} not allowed.` });
	}
};

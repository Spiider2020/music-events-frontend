import { API_URL } from '@/config/index.js';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

const cors = initMiddleware(
	// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
	Cors({
		// Only allow requests with GET, POST and OPTIONS
		methods: ['DELETE'],
	})
);

export default async (req, res) => {
	// Run cors
	await cors(req, res);
	if (req.method === 'DELETE') {
		const strapiRes = await fetch(`${API_URL}/events/${req.query.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: req.headers.authorization,
			},
		});
		const data = await strapiRes;
		res.json(data);
	} else {
		res.setHeader('Allow', ['DELETE']);
		res.status(405).json({ message: `Method ${req.method} not allowed.` });
	}
};

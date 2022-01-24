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
		//destroy cookie
		res.setHeader(
			'Set-Cookie',
			cookie.serialize('token', '', {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				expires: new Date(0),
				sameSite: 'strict',
				path: '/',
			})
		);
		res.status(200).json({ message: 'Sucess' });
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed.` });
	}
};

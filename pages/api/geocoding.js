import { POSITIONSTACK_URL } from '@/config/index';

export default async (req, res) => {
	const response = await fetch(
		POSITIONSTACK_URL + '?access_key=' + process.env.NEXT_PUBLIC_POSITIONSTACK_API_KEY + '&query=' + req.body
	);
	const data = await response.json();
	res.json({ latitude: data.data[0].latitude, longitude: data.data[0].longitude });
};

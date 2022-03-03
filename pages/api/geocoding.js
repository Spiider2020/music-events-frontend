import { POSITIONSTACK_URL } from '@/config/index';

export default async (req, res) => {
	const response = await fetch(
		POSITIONSTACK_URL + '?access_key=' + process.env.NEXT_PUBLIC_POSITIONSTACK_API_KEY + '&query=' + req.body
	);
	const verifyService = await response.json();
	if (response.status === 502) {
		res.json({ latitude: 0, longitude: 0, res_status: 502 });
	} else if (response.status !== 200) {
		res.json({ latitude: 0, longitude: 0, res_status: response.status });
	} else {
		res.json({
			latitude: verifyService.data[0].latitude,
			longitude: verifyService.data[0].longitude,
			res_status: 200,
		});
	}
};

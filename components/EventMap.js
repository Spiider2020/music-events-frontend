import Image from 'next/image';
import { useState, useEffect } from 'react';
import { NEXT_URL } from '@/config/index';
import ReactMapGl, { Marker } from 'react-map-gl';
import pin from '../public/images/pin.svg';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function EventMap({ evt }) {
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [loading, setLoading] = useState(true);
	const [viewport, setViewport] = useState({
		width: '100%',
		height: '500px',
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 15,
	});

	useEffect(async () => {
		//get latitude and longitude fr
		const response = await fetch(`${NEXT_URL}/api/geocoding`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(evt.address),
		});
		const data = await response.json();
		setLat(data.latitude);
		setLng(data.longitude);
		setViewport({ ...viewport, latitude: data.latitude, longitude: data.longitude });
		setLoading(false);
	}, []);

	if (loading) return false;

	return (
		<ReactMapGl
			{...viewport}
			mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
			onViewportChange={(vp) => setViewport(vp)}
		>
			<Marker key={evt.id} latitude={lat} longitude={lng}>
				<Image src={pin} width={30} height={30} alt='pin' />
			</Marker>
		</ReactMapGl>
	);
}

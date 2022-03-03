import Image from 'next/image';
import ApiError from './ApiError';
import { useState, useEffect } from 'react';
import { NEXT_URL } from '@/config/index';
import ReactMapGl, { Marker } from 'react-map-gl';
import pin from '../public/images/pin.svg';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function EventMap({ evt }) {
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [resStatus, setResStatus] = useState(null);
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
		setResStatus(data.res_status);
		setViewport({ ...viewport, latitude: data.latitude, longitude: data.longitude });
		setLoading(false);
	}, []);

	if (loading) return false;

	const getError = () => {
		switch (resStatus) {
			case 502:
				return <ApiError>Map could not be loaded. Geocoding API Offline.</ApiError>;
				break;
			case 401:
				return <ApiError>Invalid Geocoding API key.</ApiError>;
				break;
			case 403:
				return <ApiError>Endpoint not supported with current Geocoding API subscription plan.</ApiError>;
				break;
			case 404:
				return <ApiError>Invalid Geocoding API endpoint.</ApiError>;
				break;
			case 429:
				return <ApiError>Geocoding API account rate limit reached.</ApiError>;
				break;
			default:
				return <ApiError>Unknown Geocoding API Error.</ApiError>;
		}
	};

	return resStatus !== 200 ? (
		getError()
	) : (
		<ReactMapGl
			{...viewport}
			mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
			onViewportChange={(vp) => setViewport(vp)}
			crossOrigin='anonymous'
		>
			<Marker key={evt.id} latitude={lat} longitude={lng} crossOrigin='anonymous'>
				<Image src={pin} width={30} height={30} alt='pin' crossOrigin='anonymous' />
			</Marker>
		</ReactMapGl>
	);
}

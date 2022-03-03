import React from 'react';
import { FaWindowClose } from 'react-icons/fa';

export default function ApiError({ children }) {
	return (
		<p style={{ color: 'red', display: 'flex', alignItems: 'center', gap: '5px' }}>
			<FaWindowClose />
			{children}
		</p>
	);
}

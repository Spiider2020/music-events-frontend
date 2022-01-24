import { parseCookies } from '@/helpers/index';
import Layout from '@/components/Layout';
import DashboardEvent from '@/components/DashboardEvent';
import { NEXT_URL, API_URL } from '@/config/index';
import { useRouter } from 'next/router';
import styles from '@/styles/Dashboard.module.css';

export default function DashboardPage({ events, token }) {
	const router = useRouter();

	const deleteEvent = async (id) => {
		if (confirm('You are going to delete this event!')) {
			const res = await fetch(`${NEXT_URL}/api/delete/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();
			if (!res.ok) {
				toast.error(data.message, { position: 'bottom-right', theme: 'colored' });
			} else {
				router.reload();
			}
		}
	};

	return (
		<Layout title='User Dashboard'>
			<div className={styles.dash}>
				<h1>Dashboard</h1>
				<h3>My Events</h3>

				{events.map((evt) => (
					<DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent}></DashboardEvent>
				))}
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ req }) {
	const { token } = parseCookies(req);

	const res = await fetch(`${API_URL}/events/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const events = await res.json();

	return {
		props: { events, token },
	};
}

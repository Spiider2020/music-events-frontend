import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';
import { API_URL } from '@/config/index';
const PER_PAGE = 5;

export default function EventsPage({ events, page, total }) {
	const lastPage = Math.ceil(total / PER_PAGE);
	return (
		<Layout>
			<h1>All Events</h1>
			{events.length === 0 && <h3>No events to display</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
			<Pagination page={page} lastPage={lastPage} />
		</Layout>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	//Calculate page
	const start = parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * PER_PAGE;

	//Fetch total/count
	const totalRes = await fetch(`${API_URL}/events/count`);
	const total = await totalRes.json();

	//Fetch events
	const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
	const events = await eventRes.json();

	return {
		props: { events, page: parseInt(page), total: total },
	};
}

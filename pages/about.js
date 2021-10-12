import Link from 'next/link';

export default function AboutPage() {
	return (
		<div>
			<h1>About page</h1>
			<p>This is an app to find the latest musical events.</p>
			<p>version: 1.0.0</p>
			<Link href='/'>Home</Link>
		</div>
	);
}

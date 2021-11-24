import Link from 'next/link';

export default function Pagination({ page, lastPage }) {
	const displayPages = () => {
		let content = [];
		for (let i = 1; i <= lastPage; i++) {
			content.push(
				<Link key={'page-' + i} href={`/events?page=${i}`}>
					<a className={i === page ? 'btn-secondary secondary-active' : 'btn-secondary'}>{i}</a>
				</Link>
			);
		}
		return content;
	};

	return (
		<>
			{page > 1 && (
				<Link href={`/events?page=${page - 1}`}>
					<a className='btn-secondary'>Prev</a>
				</Link>
			)}
			{displayPages()}
			{page < lastPage && (
				<Link href={`/events?page=${page + 1}`}>
					<a className='btn-secondary'>Next</a>
				</Link>
			)}
			{page !== lastPage && (
				<Link href={`/events?page=${lastPage}`}>
					<a className='btn-secondary'>Last</a>
				</Link>
			)}
		</>
	);
}

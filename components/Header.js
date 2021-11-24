import Link from 'next/link';
import Search from './Search';
import styles from '@/styles/Header.module.css';
import AuthContext from '@/context/AuthContext';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';

export default function Header() {
	const { user, logout } = useContext(AuthContext);

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href='/'>Music Events</Link>
			</div>
			<Search />
			<nav>
				<ul>
					<li>
						<Link href='/events'>Events</Link>
					</li>
					{user ? (
						//If logged in
						<>
							<li>
								<Link href='/events/add'>Add Event</Link>
							</li>
							<li>
								<Link href='/account/dashboard'>Dashboard</Link>
							</li>
							<li>
								<button
									className='btn-secondary'
									onClick={() => {
										logout();
									}}
								>
									<span>
										<FaSignOutAlt className='btn-secondary-icon' />
										Logout
									</span>
								</button>
							</li>
						</>
					) : (
						//If not logged in
						<>
							<li>
								<Link href='/account/login'>
									<a className='btn-secondary btn-icon'>
										<span className='btn-container'>
											<FaSignInAlt className='btn-secondary-icon' />
											Login
										</span>
									</a>
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}

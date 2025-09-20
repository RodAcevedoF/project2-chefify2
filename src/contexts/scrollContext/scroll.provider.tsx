import { type ReactNode, useState, useEffect } from 'react';
import { ScrollContext, type BackgroundMode } from './scroll.context';
import { useLocation } from 'react-router-dom';

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
	const [scrolled, setScrolled] = useState(false);
	const [mode, setMode] = useState<BackgroundMode>('default');
	const location = useLocation();

	useEffect(() => {
		const onScroll = () => {
			const isScrolled = window.scrollY > 75;
			setScrolled(isScrolled);

			if (isScrolled) {
				setMode('light');
			} else {
				setMode('default');
			}
		};

		window.addEventListener('scroll', onScroll);
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		if (location.pathname === '/') {
			document.body.style.transition = 'background-color 0.6s ease';
			document.body.style.backgroundColor =
				mode === 'light' ? '#ffffeb' : '#5ea85e';
		} else {
			document.body.style.backgroundColor = '';
		}
	}, [mode, location.pathname]);

	return (
		<ScrollContext.Provider value={{ scrolled, setScrolled, mode }}>
			{children}
		</ScrollContext.Provider>
	);
};

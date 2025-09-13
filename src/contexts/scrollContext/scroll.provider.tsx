import { type ReactNode, useState, useEffect } from 'react';
import { ScrollContext, type BackgroundMode } from './scroll.context';

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
	const [scrolled, setScrolled] = useState(false);
	const [mode, setMode] = useState<BackgroundMode>('default');

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
		document.body.style.transition = 'background-color 0.6s ease';
		document.body.style.backgroundColor =
			mode === 'light' ? '#ffffeb' : '#5ea85e';
	}, [mode]);

	return (
		<ScrollContext.Provider value={{ scrolled, setScrolled, mode }}>
			{children}
		</ScrollContext.Provider>
	);
};

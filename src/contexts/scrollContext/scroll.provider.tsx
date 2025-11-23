import { type ReactNode, useState, useEffect } from 'react';
import { ScrollContext, type BackgroundMode } from './scroll.context';
import { useLocation } from 'react-router-dom';
import GradientBackground from '../../features/common/GradientBackground';

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
		document.body.style.background = '';
	}, [location.pathname]);

	return (
		<ScrollContext.Provider value={{ scrolled, setScrolled, mode }}>
			{location.pathname === '/' && <GradientBackground mode={mode} />}
			{<GradientBackground mode={'default'} />}
			{children}
		</ScrollContext.Provider>
	);
};

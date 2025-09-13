import { createContext, useContext } from 'react';

export type BackgroundMode = 'default' | 'light';

type ScrollContextType = {
	mode: BackgroundMode;
	scrolled: boolean;
	setScrolled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ScrollContext = createContext<ScrollContextType>({
	scrolled: false,
	setScrolled: () => {},
	mode: 'default',
});

export const useScrollContext = () => {
	const context = useContext(ScrollContext);
	if (context === undefined) {
		throw new Error('useScrollContext must be used within a ScrollProvider');
	}
	return context;
};

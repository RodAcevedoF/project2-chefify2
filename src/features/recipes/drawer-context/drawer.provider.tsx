import { useState } from 'react';
import { DrawerContext } from './drawer.context';

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	return (
		<DrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
			{children}
		</DrawerContext.Provider>
	);
};

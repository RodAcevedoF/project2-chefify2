import { createContext, useContext } from 'react';

export const DrawerContext = createContext<{
	drawerOpen: boolean;
	setDrawerOpen: (open: boolean) => void;
}>({
	drawerOpen: false,
	setDrawerOpen: () => {},
});

export const useDrawerContext = () => useContext(DrawerContext);

import type { NavigateFunction, To } from 'react-router-dom';

type PathFactory = (param?: string) => To;

/**
 * Returns a closure that navigates to a static path or a path built from a parameter.
 * Usage:
 *  const nav = handleNavigate('/recipes', navigate); // nav() navigates to /recipes
 *  const navWithId = handleNavigate((id) => `/recipes/${id}`, navigate); // navWithId('abc') navigates to /recipes/abc
 */
export const handleNavigate = (
	pathOrFactory: To | PathFactory,
	nav: NavigateFunction,
) => {
	return (param?: string) => {
		if (typeof pathOrFactory === 'function') {
			return nav((pathOrFactory as PathFactory)(param));
		}
		return nav(pathOrFactory as To);
	};
};

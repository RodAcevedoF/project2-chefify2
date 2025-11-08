import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { To } from 'react-router-dom';

type PathFactory = (param?: string) => To;

export const useHandleNavigate = (pathOrFactory: To | PathFactory) => {
	const navigate = useNavigate();

	return useCallback(
		(param?: string) => {
			if (typeof pathOrFactory === 'function') {
				return navigate((pathOrFactory as PathFactory)(param));
			}
			return navigate(pathOrFactory as To);
		},
		[navigate, pathOrFactory],
	);
};

export default useHandleNavigate;

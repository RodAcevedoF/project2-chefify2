import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { To, NavigateOptions } from 'react-router-dom';

type Param = string | undefined;

type PathFactory = (param?: Param) => To;

type NavigateInput = To | PathFactory;

export const useHandleNavigate = (
	pathOrFactory: NavigateInput,
	options?: NavigateOptions,
) => {
	const navigate = useNavigate();

	return useCallback(
		(param?: Param) => {
			const to =
				typeof pathOrFactory === 'function'
					? (pathOrFactory as PathFactory)(param)
					: (pathOrFactory as To);

			navigate(to, options);
		},
		[navigate, pathOrFactory, options],
	);
};

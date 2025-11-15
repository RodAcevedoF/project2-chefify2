import { useQuery } from '@tanstack/react-query';
import AdminService from '../services/admin.service';
import type { Operation } from '../services/admin.service';

export const useOperations = (limit?: number) => {
	return useQuery<Operation[]>({
		queryKey: ['admin', 'operations', limit ?? 'all'],
		queryFn: () => AdminService.getOperations(limit),
		staleTime: 1000 * 60 * 1,
	});
};

export default useOperations;

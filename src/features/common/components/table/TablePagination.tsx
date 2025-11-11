import TablePagination from '@mui/material/TablePagination';
import type { TablePaginationProps } from '@mui/material/TablePagination';
import React from 'react';

type Props = Pick<
	TablePaginationProps,
	| 'count'
	| 'page'
	| 'rowsPerPage'
	| 'onPageChange'
	| 'onRowsPerPageChange'
	| 'rowsPerPageOptions'
> & {
	btnColor?: string;
};

const TablePaginationWrapper: React.FC<Props> = ({
	count,
	page,
	rowsPerPage,
	onPageChange,
	onRowsPerPageChange,
	rowsPerPageOptions = [5, 10, 25, 50],
	btnColor,
}) => {
	return (
		<TablePagination
			component='div'
			count={count}
			page={page}
			onPageChange={onPageChange}
			rowsPerPage={rowsPerPage}
			onRowsPerPageChange={onRowsPerPageChange}
			rowsPerPageOptions={rowsPerPageOptions}
			slotProps={{
				root: { sx: { color: btnColor } },
				actions: {
					firstButton: {
						sx: { color: btnColor, '& .MuiSvgIcon-root': { color: btnColor } },
					},
					lastButton: {
						sx: { color: btnColor, '& .MuiSvgIcon-root': { color: btnColor } },
					},
					nextButton: {
						sx: { color: btnColor, '& .MuiSvgIcon-root': { color: btnColor } },
					},
					previousButton: {
						sx: { color: btnColor, '& .MuiSvgIcon-root': { color: btnColor } },
					},
				},
				select: {
					sx: {
						color: btnColor,
						'& .MuiSelect-icon': { color: btnColor },
						'& .MuiSvgIcon-root': { color: btnColor },
					},
				},
				displayedRows: { sx: { color: btnColor } },
				menuItem: { sx: { color: btnColor } },
			}}
		/>
	);
};

export default TablePaginationWrapper;

import React, { memo } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	CircularProgress,
	Typography,
} from '@mui/material';
import TablePaginationWrapper from '@/features/common/components/table/TablePagination';
import { genericComparator } from '@/features/admin/utils/genericComparator';

export type Column<T> = {
	key: string;
	label: string;
	render?: (row: T) => React.ReactNode;
	hideBelow?: 'xs' | 'sm' | 'md' | 'lg';
	align?: 'left' | 'center' | 'right';
	width?: string | number;
};

type Props<T> = {
	columns?: Column<T>[];
	rowRenderer?: (row: T) => React.ReactNode;
	rows: T[];
	data?: { items: T[]; meta?: { total: number; page: number; limit: number } };
	page: number;
	rowsPerPage: number;
	setPage: (p: number) => void;
	setRowsPerPage: (n: number) => void;
	isLoading?: boolean;
	isError?: boolean;
	cellSx?: Record<string, unknown>;
	headerCellSx?: Record<string, unknown>;
	rowKey?: (r: T) => string;
	watchKeys?: string[];
	btnColor?: string;
};

const TableHeadMemo = React.memo(
	({
		cols,
		headerSx,
	}: {
		cols?: Column<unknown>[];
		headerSx?: Record<string, unknown>;
	}) => {
		if (!cols) return null;
		return (
			<TableHead>
				<TableRow>
					{cols.map((c) => {
						const displayStyle = c.hideBelow
							? c.hideBelow === 'xs'
								? { xs: 'table-cell' }
								: c.hideBelow === 'sm'
								? { xs: 'none', sm: 'table-cell' }
								: c.hideBelow === 'md'
								? { xs: 'none', sm: 'none', md: 'table-cell' }
								: { xs: 'none', sm: 'none', md: 'none', lg: 'table-cell' }
							: 'table-cell';

						return (
							<TableCell
								key={c.key}
								sx={{
									...(headerSx ?? {}),
									textAlign: c.align ?? 'left',
									display: displayStyle,
								}}>
								{c.label}
							</TableCell>
						);
					})}
				</TableRow>
			</TableHead>
		);
	},
	(a, b) => a.cols === b.cols && a.headerSx === b.headerSx,
);

type RowsProps = {
	rowsProp: unknown[];
	columns?: Column<unknown>[];
	rowRenderer?: (row: unknown) => React.ReactNode;
	rowKey?: (r: unknown) => string;
	cellSx?: Record<string, unknown>;
};

const RowsComponent = React.memo(
	({ rowsProp, columns, rowRenderer, rowKey, cellSx }: RowsProps) => (
		<TableBody>
			{rowsProp.map((r) => {
				const asRecord = r as Record<string, unknown>;
				const rk = rowKey
					? rowKey(r)
					: asRecord && asRecord._id
					? String(asRecord._id)
					: String(r as unknown);
				if (rowRenderer)
					return <React.Fragment key={rk}>{rowRenderer(r)}</React.Fragment>;
				return (
					<TableRow key={rk} hover>
						{columns?.map((c) => (
							<TableCell key={c.key} sx={cellSx}>
								{c.render
									? c.render(r)
									: String((asRecord?.[c.key] ?? '') as string)}
							</TableCell>
						))}
					</TableRow>
				);
			})}
		</TableBody>
	),
);

type PaginationProps = {
	meta?: { total: number; page: number; limit: number };
	page: number;
	rowsPerPage: number;
	setPage: (p: number) => void;
	setRowsPerPage: (n: number) => void;
};

const PaginationComponent = React.memo(
	({ meta, page, rowsPerPage, setPage, setRowsPerPage }: PaginationProps) => {
		if (!meta) return null;
		return (
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
				<TablePaginationWrapper
					count={meta?.total ?? 0}
					page={page}
					rowsPerPage={rowsPerPage}
					onPageChange={(_: unknown, newPage: number) => setPage(newPage)}
					onRowsPerPageChange={(
						e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
					) => {
						setRowsPerPage(parseInt(e.target.value, 10));
						setPage(0);
					}}
					rowsPerPageOptions={[5, 10, 25, 50]}
					btnColor='primary.main'
				/>
			</Box>
		);
	},
);

function GenericAdminTableInner<T>({
	columns,
	rowRenderer,
	rows,
	data,
	page,
	rowsPerPage,
	setPage,
	setRowsPerPage,
	isLoading,
	isError,
	cellSx,
	headerCellSx,
	rowKey,
}: Props<T>) {
	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (isError) {
		return (
			<Box sx={{ p: 4 }}>
				<Typography variant='h6'>Failed to load items.</Typography>
			</Box>
		);
	}

	return (
		<TableContainer
			component={Paper}
			sx={{ borderRadius: 5, p: { xs: 2, sm: 5 } }}>
			<Table>
				<TableHeadMemo
					cols={columns as unknown as Column<unknown>[]}
					headerSx={headerCellSx}
				/>
				<RowsComponent
					rowsProp={rows as unknown as unknown[]}
					columns={columns as unknown as Column<unknown>[]}
					rowRenderer={
						rowRenderer as unknown as (r: unknown) => React.ReactNode
					}
					rowKey={rowKey as unknown as (r: unknown) => string}
					cellSx={cellSx}
				/>
			</Table>

			{data && (
				<PaginationComponent
					meta={data.meta}
					page={page}
					rowsPerPage={rowsPerPage}
					setPage={setPage}
					setRowsPerPage={setRowsPerPage}
				/>
			)}
		</TableContainer>
	);
}

const GenericAdminTable = memo(
	GenericAdminTableInner,
	genericComparator,
) as unknown as typeof GenericAdminTableInner;

export default GenericAdminTable;

import { createPortal } from 'react-dom';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import type { ReactNode } from 'react';
import { Box, Modal as MuiModal, IconButton } from '@mui/material';
import { CircleX } from 'lucide-react';

type ModalProps = {
	id: string;
	children: ReactNode;
};

export const Modal = ({ id, children }: ModalProps) => {
	const { activeModal, closeModal } = useModalContext();
	const modalRoot = document.getElementById('modal');

	if (activeModal !== id || !modalRoot) return null;

	return createPortal(
		<MuiModal
			open={activeModal === id}
			onClose={closeModal}
			container={modalRoot}
			disablePortal={false}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 100,
			}}>
			<Box
				sx={{
					position: 'relative',
					p: 4,
					borderRadius: 2,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					boxShadow: 8,
					width: 'fit-content',
					animation: 'fade-in 0.3s ease-out forwards',
					background: 'rgba(255, 255, 255, 0.25)',
					backdropFilter: 'blur(12px)',
					WebkitBackdropFilter: 'blur(12px)',
					border: '1px solid rgba(255,255,255,0.4)',
				}}
				onClick={(e) => e.stopPropagation()}>
				{children}
				<IconButton
					aria-label='close'
					onClick={closeModal}
					sx={{
						position: 'absolute',
						top: 1,
						right: 1,
						color: 'background.default',
						fontWeight: 'bold',
					}}>
					<CircleX />
				</IconButton>
			</Box>
		</MuiModal>,
		modalRoot,
	);
};

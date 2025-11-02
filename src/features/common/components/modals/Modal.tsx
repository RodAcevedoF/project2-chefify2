import { createPortal } from 'react-dom';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import type { ReactNode, MouseEvent } from 'react';
import { Box, Modal as MuiModal, IconButton } from '@mui/material';
import { CircleX } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type ModalProps = {
	id: string;
	children: ReactNode;
};

export const Modal = ({ id, children }: ModalProps) => {
	const { activeModal, closeModal } = useModalContext();
	const modalRoot = document.getElementById('modal');

	if (!modalRoot) return null;

	return createPortal(
		<MuiModal
			open={activeModal === id}
			onClose={closeModal}
			container={modalRoot}
			keepMounted
			disablePortal={false}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 100,
				overflowY: 'auto',
			}}>
			<AnimatePresence>
				{activeModal === id && (
					<motion.div
						initial={{ opacity: 0, y: 40, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -20, scale: 0.96 }}
						transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						aria-hidden={false}>
						<Box
							sx={{
								position: 'relative',
								p: 2,
								borderRadius: 2,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'flex-start',
								boxShadow: 8,
								width: 'fit-content',
								background: 'rgba(255, 255, 255, 0.25)',
								backdropFilter: 'blur(12px)',
								WebkitBackdropFilter: 'blur(12px)',
								border: '1px solid rgba(255,255,255,0.4)',
								overflowY: 'auto',
								maxHeight: '90vh',
							}}
							onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
							{children}
							<IconButton
								aria-label='close'
								onClick={closeModal}
								sx={{
									position: 'absolute',
									top: 1,
									right: 1,
									color: 'primary.main',
									fontWeight: 'bold',
								}}>
								<CircleX />
							</IconButton>
						</Box>
					</motion.div>
				)}
			</AnimatePresence>
		</MuiModal>,
		modalRoot,
	);
};

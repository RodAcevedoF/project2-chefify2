import { createPortal } from 'react-dom';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import type { ReactNode } from 'react';

type ModalProps = {
	id: string;
	children: ReactNode;
};

export const Modal = ({ id, children }: ModalProps) => {
	const { activeModal, closeModal } = useModalContext();
	const modalRoot = document.getElementById('modal');

	if (activeModal !== id || !modalRoot) return null;

	return createPortal(
		<div
			className='fixed inset-0 z-50 bg-[var(--clear-secondary)] backdrop-blur-sm flex items-center justify-center'
			onClick={closeModal}>
			<div
				className='relative p-8 rounded-md shadow-lg animate-[fade-in_0.3s_ease-out_forwards]'
				style={{ background: 'var(--dark-bg)' }}
				onClick={(e) => e.stopPropagation()}>
				{children}

				<button
					className='absolute top-2 right-4 font-extrabold text-blue-500 hover:text-white'
					onClick={closeModal}>
					✕
				</button>
			</div>
		</div>,
		modalRoot,
	);
};

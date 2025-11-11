import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
	children: ReactNode;
	className?: string;
};

const variants = {
	initial: { opacity: 0, y: 8 },
	enter: { opacity: 1, y: 0, transition: { duration: 0.36 } },
	exit: { opacity: 0, y: -6, transition: { duration: 0.24 } },
};

const PageTransition = ({ children, className }: Props) => {
	const shouldReduce = useReducedMotion();
	if (shouldReduce) return <div className={className}>{children}</div>;

	return (
		<motion.div
			className={className}
			initial='initial'
			animate='enter'
			exit='exit'
			variants={variants}
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				alignContent: 'center',
			}}>
			{children}
		</motion.div>
	);
};

export default PageTransition;

export const viewportOptions = { once: true, amount: 0.25 } as const;

export const titleVariants = {
	hidden: { opacity: 0, y: 12 },
	show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
export const imgVariant = {
	hidden: { opacity: 0, y: 100 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const textSlide = {
	hidden: { opacity: 0, x: -40 },
	show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

export const imageSlide = {
	hidden: { opacity: 0, x: 40 },
	show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

export const listContainer = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12 } },
};

export const listItem = {
	hidden: { opacity: 0, y: 12 },
	show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

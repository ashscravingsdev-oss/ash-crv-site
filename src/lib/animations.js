export const fadeUp = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25 }
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.25 }
};

export const fadeInStagger = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.25, staggerChildren: 0.05 }
};

export const scaleUp = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.25, ease: "easeOut" }
};

export const slideInLeft = {
    initial: { opacity: 0, x: -12 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.25 }
};

export const slideInRight = {
    initial: { opacity: 0, x: 12 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.25 }
};
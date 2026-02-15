import { writable, type Writable } from "svelte/store";

export function useInView(threshold = 0.18) {
    const isVisible: Writable<boolean> = writable(false);

    function inView(node: HTMLElement) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisible.set(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(node);

        const checkVisibility = () => {
            const rect = node.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                isVisible.set(true);
                observer.disconnect();
            }
        };

        requestAnimationFrame(() => {
            checkVisibility();
            setTimeout(checkVisibility, 50);
        });

        return {
            destroy() {
                observer.disconnect();
            },
        };
    }

    return { inView, isVisible };
}
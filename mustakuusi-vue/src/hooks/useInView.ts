import { ref, onMounted, onUnmounted, type Ref } from "vue";

export function useInView(threshold = 0.18) {
    const element: Ref<HTMLElement | null> = ref(null);
    const isVisible = ref(false);

    let observer: IntersectionObserver;

    onMounted(() => {
        if (!element.value) return;

        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    isVisible.value = true;
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(element.value);
    });

    onUnmounted(() => {
        if (observer) observer.disconnect();
    });

    return { ref: element, isVisible };
}

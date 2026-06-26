// Initialize Lucide Icons
window.addEventListener("load", () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
});

// Services Horizontal Scroll
(() => {

    const initParallax = () => {

        const wrapper = document.getElementById("services-scroll");

        if (!wrapper) {
            requestAnimationFrame(initParallax);
            return;
        }

        const track = wrapper.querySelector(".scroll-track");
        const progress = wrapper.querySelector(".scroll-progress");

        if (!track) return;

        track.style.transition = "none";

        if (progress)
            progress.style.transition = "none";

        const START_PAUSE = 0.14;
        const END_PAUSE = 0.14;
        const SMOOTH = 0.09;

        let maxScroll = 0;
        let scrollableDistance = 1;

        let targetX = 0;
        let currentX = 0;

        let targetP = 0;
        let currentP = 0;

        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

        const easeInOut = t =>
            t < .5
                ? 2 * t * t
                : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const remap = ratio => {

            if (ratio <= START_PAUSE) return 0;

            if (ratio >= 1 - END_PAUSE) return 1;

            const t =
                (ratio - START_PAUSE) /
                (1 - START_PAUSE - END_PAUSE);

            return easeInOut(t);

        };

        function updateMeasurements() {

            maxScroll = Math.max(
                0,
                track.scrollWidth - wrapper.offsetWidth + 48
            );

            scrollableDistance = Math.max(
                1,
                wrapper.offsetHeight - window.innerHeight
            );

        }

        function updateTargets() {

            const rect = wrapper.getBoundingClientRect();

            const ratio = clamp(
                (-rect.top) / scrollableDistance,
                0,
                1
            );

            const eased = remap(ratio);

            targetX = eased * maxScroll;

            targetP = eased * 100;

        }

        function animate() {

            currentX += (targetX - currentX) * SMOOTH;

            currentP += (targetP - currentP) * SMOOTH;

            track.style.transform =
                `translate3d(${-currentX}px,0,0)`;

            if (progress)
                progress.style.width = currentP + "%";

            requestAnimationFrame(animate);

        }

        window.addEventListener(
            "scroll",
            updateTargets,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            () => {
                updateMeasurements();
                updateTargets();
            }
        );

        updateMeasurements();

        updateTargets();

        requestAnimationFrame(animate);

    };

    setTimeout(initParallax, 100);

})();
document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------
    // LIVE RETRO DIGITAL CLOCK
    // --------------------------------------------------
    const liveClock = document.getElementById('live-clock');

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const hourStr = String(hours).padStart(2, '0');

        if (liveClock) {
            liveClock.textContent = `${hourStr}:${minutes}:${seconds} ${ampm}`;
        }
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial run

    // --------------------------------------------------
    // WATER/VIBE RANGE SLIDER
    // --------------------------------------------------
    const vibeSlider = document.getElementById('vibe-range');
    const vibeStatusText = document.getElementById('vibe-status-text');

    if (vibeSlider && vibeStatusText) {
        vibeSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            let status = 'HYPERACTIVE';

            if (val <= 25) {
                status = 'BATTERY_SAVER 🔋';
            } else if (val <= 50) {
                status = 'FOCUSED_MODE ☕';
            } else if (val <= 75) {
                status = 'SOCIAL_CREATIVE ⚡';
            } else if (val <= 90) {
                status = 'HYPERACTIVE 🍒';
            } else {
                status = 'CREATIVE_OVERDRIVE! 🔥';
            }
            vibeStatusText.textContent = status;
        });
    }

    // --------------------------------------------------
    // CUSTOM CURSOR & CLICK BURST (Mouse users only)
    // --------------------------------------------------
    const cursor = document.getElementById('custom-cursor');
    const burst = document.getElementById('cursor-burst');

    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Burst effect on click
        document.addEventListener('click', (e) => {
            if (burst) {
                burst.style.left = `${e.clientX}px`;
                burst.style.top = `${e.clientY}px`;
                burst.style.width = '60px';
                burst.style.height = '60px';
                burst.style.opacity = '1';

                // Reset burst after transition completes
                setTimeout(() => {
                    burst.style.width = '0px';
                    burst.style.height = '0px';
                    burst.style.opacity = '0';
                }, 300);
            }
        });

        // Hover activations
        const hoverables = document.querySelectorAll('a, button, select, input, textarea, .filter-btn, .work-tab-btn');
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }

    // --------------------------------------------------
    // CORE SKILLS GRID FILTER
    // --------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Manage Active States
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'block';
                    // Trigger minor opacity fade in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Delay hiding till animations finish
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 150);
                }
            });
        });
    });

    // --------------------------------------------------
    // CORE SKILLS GRID FILTER END
    // --------------------------------------------------
});

// --------------------------------------------------
// GLOBAL TAB SWITCHER FOR CASE STUDIES
// --------------------------------------------------
function switchWorkTab(btnElement, targetTabId) {
    const parentCard = btnElement.closest('.work-card');
    if (!parentCard) return;

    // Toggle active state on buttons within this specific card
    const btns = parentCard.querySelectorAll('.work-tab-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    // Toggle active state on tab panels within this specific card
    const tabs = parentCard.querySelectorAll('.work-tab-content');
    tabs.forEach(tab => {
        if (tab.id === targetTabId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

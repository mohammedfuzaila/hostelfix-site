// HostelFix - Core JavaScript V2

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Logic (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Sticky Header Transformation
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.padding = '0.7rem 0';
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.padding = '1.2rem 0';
                header.style.boxShadow = 'none';
            }
        });
    }

    // 3. Background Parallax Blobs

    // 4. Background Parallax Blobs
    const blob1 = document.createElement('div');
    blob1.className = 'bg-blob';
    blob1.style.top = '10%';
    blob1.style.right = '5%';
    document.body.appendChild(blob1);

    const blob2 = document.createElement('div');
    blob2.className = 'bg-blob';
    blob2.style.bottom = '10%';
    blob2.style.left = '5%';
    blob2.style.background = 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)';
    document.body.appendChild(blob2);

    // 5. Apply Floating Animation to Icons
    document.querySelectorAll('.bento-item div, .dash-card div').forEach((icon, index) => {
        if (icon.innerText.length <= 4) { // Target emoji/icon divs
            icon.classList.add('float-anime');
            icon.style.animationDelay = `${index * 0.5}s`;
        }
    });

    // 4. Dynamic Booking Workflow (Finding -> Found -> OTP -> Fixing -> Done)
    const bookingHTML = `
<div class="booking-overlay" id="bookingOverlay">
<div class="booking-modal">
    <!-- Step 1: Finding -->
    <div class="booking-step active" id="stepFinding">
        <div class="finding-loader"></div>
        <h2>Finding Your Hero...</h2>
        <p style="color: var(--text-muted); margin-top: 1rem;">Searching for nearby HostelFix specialists in your block.</p>
    </div>

    <!-- Step 2: Found & OTP -->
    <div class="booking-step" id="stepFound">
        <div class="hero-avatar">🎓</div>
        <h2>Hero Found: Akash!</h2>
        <p style="color: var(--text-muted);">Akash from CSE Dept is on the way. Share this OTP with him to begin.</p>
        <div class="otp-box">4829</div>
        <button class="btn btn-primary" id="confirmOTP" style="width: 100%;">OTP Confirmed →</button>
    </div>

    <!-- Step 3: Fixing -->
    <div class="booking-step" id="stepFixing">
        <div class="hero-avatar">🛠️</div>
        <h2>Fixing in Progress...</h2>
        <p style="color: var(--text-muted);">Please wait while the Hero resolves your issue.</p>
        <div class="progress-container">
            <div class="progress-bar" id="progressBar"></div>
        </div>
    </div>

    <!-- Step 4: Completed -->
    <div class="booking-step" id="stepDone">
        <div class="hero-avatar" style="background: var(--accent);">✅</div>
        <h2 style="color: var(--accent);">Mission Completed!</h2>
        <p style="color: var(--text-muted); margin-top: 1rem;">Problem solved. You can now close this window and check your dashboard.</p>
        <button class="btn btn-outline" id="closeBooking" style="width: 100%; margin-top: 2rem;">Close & Back to Portal</button>
    </div>
</div>
    `;

    document.body.insertAdjacentHTML('beforeend', bookingHTML);

    const overlay = document.getElementById('bookingOverlay');
    const steps = ['Finding', 'Found', 'Fixing', 'Done'];

    function showStep(stepName) {
        document.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));
        document.getElementById('step' + stepName).classList.add('active');
    }

    function startBookingWorkflow() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        showStep('Finding');

        // Logic sequence
        setTimeout(() => {
            showStep('Found');
        }, 3000); // 3 seconds to "find" someone
    }

    document.getElementById('confirmOTP').addEventListener('click', () => {
        showStep('Fixing');
        const bar = document.getElementById('progressBar');
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                showStep('Done');
            } else {
                width += 2;
                bar.style.width = width + '%';
            }
        }, 100);
    });

    document.getElementById('closeBooking').addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        // If on dashboard, we could refresh, but for now just hide
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');

            // Body scroll lock
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Attach to all "Book Now" or "Book" or "Booking" buttons
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button');
        if (target && target.innerText.toLowerCase().includes('book')) {
            // If it's a "Booking" button or a hash link with "book" in it, trigger the workflow
            const href = target.getAttribute('href');
            if (!href || href.startsWith('#') || target.innerText.toLowerCase().includes('booking')) {
                e.preventDefault();
                startBookingWorkflow();
            }
        }
    });
});


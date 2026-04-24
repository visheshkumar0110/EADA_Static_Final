// Navigation & Mobile Menu
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');

function closeMobileMenu() {
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    navOverlay.classList.remove('active');
}

// Toggle mobile menu
mobileToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    const isActive = navMenu.classList.toggle('active');
    this.classList.toggle('active');
    navOverlay.classList.toggle('active', isActive);
});

// Click on overlay to close
navOverlay.addEventListener('click', closeMobileMenu);

// Dropdown toggle for mobile
document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            this.parentElement.classList.toggle('active');
        }
    });
});

// Close menu on normal link click (exclude dropdown triggers)
document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', (e) => {
        if(window.innerWidth <= 768) {
            // Only close if it's NOT a dropdown trigger
            if (!link.classList.contains('nav-dropdown-trigger')) {
                closeMobileMenu();
            }
        }
    });
});

// Language Dropdown Toggle
const langBtn = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');

if(langBtn && langMenu) {
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langMenu.classList.toggle('active');
        let expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
    });
}

// Hero Slider Logic
const track = document.getElementById('banner-track');
const slides = document.querySelectorAll('.banner-slide');
const nextBtn = document.getElementById('slide-next');
const prevBtn = document.getElementById('slide-prev');
const pauseBtn = document.getElementById('slide-pause');
const pauseIcon = document.getElementById('pause-icon');
const playIcon = document.getElementById('play-icon');

let currentIndex = 0;
let isPaused = false;
let slideInterval = setInterval(nextSlide, 5000);

function updateSlider() {
    if (track) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

function nextSlide() {
    if (slides.length > 0) {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
}

function prevSlide() {
    if (slides.length > 0) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }
}

function resetInterval() {
    if (!isPaused) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
}

if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(slideInterval);
            if (pauseIcon) pauseIcon.style.display = 'none';
            if (playIcon) playIcon.style.display = 'block';
        } else {
            slideInterval = setInterval(nextSlide, 5000);
            if (pauseIcon) pauseIcon.style.display = 'block';
            if (playIcon) playIcon.style.display = 'none';
        }
    });
}

// Close on outside click for BOTH menus
document.addEventListener('click', function(e) {
    // Mobile Nav
    if (navMenu && navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
    
    // Lang Menu
    if (langMenu && langMenu.classList.contains('active') && !langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.remove('active');
        if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
    }
});

// Complete Translation Map
const translations = {
    en: {
        ministryTitle: 'Ministry of Environment, Forest and Climate Change',
        ministrySubtitle: 'Government of India',
        brandEada: 'Environment Audit Designated Agency',
        navHome: 'Home',
        navAbout: 'About EADA',
        navRules: 'Environment Audit Rules 2025',
        navGuidelines: 'Guidelines',
        navCea: 'Guideline for CEA through RPL',
        navRea: 'Guideline for REA',
        navMedia: 'Media',
        navContact: 'Contact',
        noticeLabel: 'Latest Update',
        mediaTitle: 'Media Coverage',
        noticeText: 'Application forms for CEA (RPL) & REA will be available soon.',
        heroTitle: 'Empowering Sustainable Development',
        heroDesc: 'The official portal for environmental auditing, compliance certification, and regulatory oversight across India.',
        heroBtn: 'Explore Services <span>&darr;</span>',
        modHeading: 'Mode of Certification / Registration',
        modSoon1: 'Coming Soon',
        modSoon2: 'Coming Soon',
        modSoon3: 'Coming Soon',
        ceaTitle: 'Certified Environment Auditor through Recognition of Prior Learning (RPL)',
        modAccess1: 'Apply here &rarr;',
        reaTitle: 'Registered Environment Auditor (REA)',
        modAccess2: 'Apply here &rarr;',
        nceTitle: 'National Certification Examination',
        modAccess3: 'Apply here &rarr;',
        aboutLabel: 'Who We Are',
        aboutTitle: 'About Environment Audit Designated Agency',
        aboutRoles: 'Roles and Responsibilities of EADA',
        aboutP1: 'The Environment Audit Designated Agency (EADA) has been established under the Environment Audit Rules, 2025, notified by the Ministry of Environment, Forest and Climate Change (MoEF&CC) on 29 August 2025. The EADA is responsible for the overall management of the environmental audit framework in India.',
        aboutP2: 'The framework is designed to strengthen compliance with major environmental legislations, including the Environment (Protection) Act, 1986; Water (Prevention and Control of Pollution) Act, 1974; Air (Prevention and Control of Pollution) Act, 1981; Van (Sanrakshan Evam Samvardhan) Adhiniyam, 1980; the Wild Life (Protection) Act, 1972; and rules framed thereunder. It also supports compliance with regulatory approvals such as Environmental Clearance (EC), Consent to Establish (CTE), and Consent to Operate (CTO).',
        aboutRolesIntro: 'The roles and responsibilities of the Environment Audit Designated Agency shall include, but not be limited to, the following:',
        aboutRolesP1_1: 'Specifying minimum eligibility criteria for Certified Environment Auditors;',
        aboutRolesP1_2: 'Developing screening methodologies, which may include conducting examinations and/or other processes to identify qualified candidates for their certification as Certified Environment Auditor;',
        aboutRolesP1_3: 'Certifying environment auditors including renewal, suspension, withdrawal, or cancellation of such certifications;',
        aboutRolesP1_4: 'Specifying the criteria for registration of the Certified Environment Auditor;',
        aboutRolesP1_5: 'Registration of the Certified Environment Auditor including renewal, suspension, withdrawal, or cancellation of such registrations;',
        aboutRolesP1_6: 'Monitoring the performance of Registered Environment Auditor and issuing directions as necessary;',
        aboutRolesP1_7: 'Facilitating capacity building through training programs, workshops, seminars, conferences, online courses, and other relevant initiatives for Certified Environment Auditor and Registered Environment Auditor;',
        aboutRolesP1_8: 'Taking disciplinary action against Certified Environment Auditor and Registered Environment Auditor, wherever required;',
        aboutRolesP1_9: 'Specifying guidelines, procedures, and standards governing the functioning of Certified Environment Auditor and Registered Environment Auditor;',
        aboutRolesP1_10: 'Maintaining an online register of all Certified Environment Auditors and Registered Environment Auditors, which shall be publicly accessible;',
        aboutRolesP1_11: 'Publishing an annual report of its activities within six months from the end of each financial year, and submitting a copy of the report to the Central Government within thirty days of its publication.',
        footerTitle: 'Environment Audit Designated Agency',
        footerDesc: 'EADA is an initiative of the Ministry of Environment, Forest and Climate Change (MoEF&CC), Government of India.',
        ftQuick: 'Quick Links',
        ftHome: 'Home',
        ftAbout: 'About EADA',
        ftRules: 'Enviroment Audit Rules 2025',
        ftNotices: 'Notices & Circulars',
        ftPolicy: 'Policies',
        ftPrivacy: 'Privacy Policy',
        ftTerms: 'Terms & Conditions',
        ftCopy: 'Copyright Policy',
        ftHyper: 'Hyperlinking Policy',
        ftContact: 'Contact Us',
        ftAddress: 'Address',
        ftMap: 'Map View',
        ftEmail: 'Email:',
        ftPhone: 'Phone:',
        ftCopyright: '&copy; 2026 Environment Audit Designated Agency. All Rights Reserved.'
    },
    hi: {
        ministryTitle: 'पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय',
        ministrySubtitle: 'भारत सरकार',
        brandEada: 'पर्यावरण लेखापरीक्षा नामित एजेंसी',
        navHome: 'होम',
        navAbout: 'ई.ए.डी.ए. के बारे में',
        navRules: 'पर्यावरण लेखापरीक्षा नियम',
        navGuidelines: 'दिशानिर्देश',
        navCea: 'आरपीएल के माध्यम से सीईए के लिए दिशानिर्देश',
        navRea: 'आरईए के लिए दिशानिर्देश',
        navMedia: 'मीडिया',
        navContact: 'संपर्क करें',
        noticeLabel: 'नवीनतम अपडेट',
        mediaTitle: 'मीडिया कवरेज',
        noticeText: 'पर्यावरण लेखापरीक्षा नियम, 2025 के तहत पर्यावरण लेखापरीक्षा नामित एजेंसी (EADA) अब लाइव है। | आधिकारिक पोर्टल फ्रेमवर्क के माध्यम से ईसी/एफसी/डब्ल्यूएल/सीआरजेड के लिए आवेदन करें।',
        heroTitle: 'सतत विकास को सशक्त बनाना',
        heroDesc: 'भारत भर में पर्यावरण लेखापरीक्षा, अनुपालन प्रमाणन और नियामक निगरानी के लिए आधिकारिक पोर्टल।',
        heroBtn: 'सेवाएं खोजें <span>&darr;</span>',
        modHeading: 'प्रविष्टि के तरीके',
        modSoon1: 'जल्द आ रहा है',
        modSoon2: 'जल्द आ रहा है',
        modSoon3: 'जल्द आ रहा है',
        ceaTitle: 'प्रायर लर्निंग (RPL) की मान्यता के माध्यम से प्रमाणित पर्यावरण लेखापरीक्षक',
        modAccess1: 'यहां आवेदन करें &rarr;',
        reaTitle: 'पंजीकृत पर्यावरण लेखापरीक्षक (REA)',
        modAccess2: 'यहां आवेदन करें &rarr;',
        nceTitle: 'राष्ट्रीय प्रमाणन परीक्षा',
        modAccess3: 'यहां आवेदन करें &rarr;',
        aboutLabel: 'हम कौन हैं',
        aboutTitle: 'पर्यावरण लेखापरीक्षा नामित एजेंसी के बारे में',
        aboutRoles: 'EADA की भूमिका और जिम्मेदारियां',
        aboutP1: 'पर्यावरण लेखापरीक्षा नामित एजेंसी (EADA) एक भूमिका है जिसे पर्यावरण लेखापरीक्षा नियम, 2025 के तहत स्थापित किया गया है, जिसे 29 अगस्त 2025 को पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय (MoEF&CC) द्वारा अधिसूचित किया गया था। EADA भारत में पर्यावरण लेखापरीक्षा ढांचे के समग्र प्रबंधन के लिए जिम्मेदार है।',
        aboutP2: 'यह ढांचा प्रमुख पर्यावरणीय कानूनों के अनुपालन को मजबूत करने के लिए तैयार किया गया है, जिसमें पर्यावरण (संरक्षण) अधिनियम, 1986; जल (प्रदूषण निवारण और नियंत्रण) अधिनियम, 1974; वायु (प्रदूषण निवारण और नियंत्रण) अधिनियम, 1981; वन (संरक्षण एवं संवर्धन) अधिनियम, 1980; वन्य जीव (संरक्षण) अधिनियम, 1972 और उसके तहत बनाए गए नियम शामिल हैं।',
        aboutRolesIntro: 'पर्यावरण लेखापरीक्षा नामित एजेंसी की भूमिकाओं और जिम्मेदारियों में निम्नलिखित शामिल होंगे, लेकिन ये इन्हीं तक सीमित नहीं होंगे:',
        aboutRolesP1_1: 'प्रमाणित पर्यावरण लेखापरीक्षकों के लिए न्यूनतम पात्रता मानदंड निर्दिष्ट करना;',
        aboutRolesP1_2: 'स्क्रीनिंग कार्यप्रणाली विकसित करना, जिसमें प्रमाणित पर्यावरण लेखापरीक्षक के रूप में उनके प्रमाणन के लिए योग्य उम्मीदवारों की पहचान करने हेतु परीक्षा और/या अन्य प्रक्रियाएं आयोजित करना शामिल हो सकता है;',
        aboutRolesP1_3: 'नवीनीकरण, निलंबन, वापसी या प्रमाणन को रद्द करने सहित पर्यावरण लेखापरीक्षकों को प्रमाणित करना;',
        aboutRolesP1_4: 'प्रमाणित पर्यावरण लेखापरीक्षक के पंजीकरण के मानदंड निर्दिष्ट करना;',
        aboutRolesP1_5: 'नवीनीकरण, निलंबन, वापसी या पंजीकरण को रद्द करने सहित प्रमाणित पर्यावरण लेखापरीक्षक का पंजीकरण;',
        aboutRolesP1_6: 'पंजीकृत पर्यावरण लेखापरीक्षक के प्रदर्शन की निगरानी करना और आवश्यकतानुसार निर्देश जारी करना;',
        aboutRolesP1_7: 'प्रमाणित पर्यावरण लेखापरीक्षक और पंजीकृत पर्यावरण लेखापरीक्षक के लिए प्रशिक्षण कार्यक्रमों, कार्यशालाओं, सेमिनारों, सम्मेलनों, ऑनलाइन पाठ्यक्रमों और अन्य प्रासंगिक पहलों के माध्यम से क्षमता निर्माण की सुविधा प्रदान करना;',
        aboutRolesP1_8: 'जहां भी आवश्यक हो, प्रमाणित पर्यावरण लेखापरीक्षक और पंजीकृत पर्यावरण लेखापरीक्षक के खिलाफ अनुशासनात्मक कार्रवाई करना;',
        aboutRolesP1_9: 'प्रमाणित पर्यावरण लेखापरीक्षक और पंजीकृत पर्यावरण लेखापरीक्षक के कामकाज को नियंत्रित करने वाले दिशानिर्देश, प्रक्रियाएं और मानक निर्दिष्ट करना;',
        aboutRolesP1_10: 'सभी प्रमाणित पर्यावरण लेखापरीक्षकों और पंजीकृत पर्यावरण लेखापरीक्षकों का एक ऑनलाइन रजिस्टर बनाए रखना, जो सार्वजनिक रूप से सुलभ होगा;',
        aboutRolesP1_11: 'प्रत्येक वित्तीय वर्ष की समाप्ति से छह महीने के भीतर अपनी गतिविधियों की एक वार्षिक रिपोर्ट प्रकाशित करना, और इसकी एक प्रति केंद्र सरकार को प्रस्तुत करना।',
        footerTitle: 'पर्यावरण लेखापरीक्षा नामित एजेंसी',
        footerDesc: 'ई.ए.डी.ए. पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय (MoEF&CC), भारत सरकार की एक पहल है।',
        ftQuick: 'त्वरित लिंक',
        ftHome: 'होम',
        ftAbout: 'ई.ए.डी.ए. के बारे में',
        ftRules: 'ऑडिट नियम, 2025',
        ftNotices: 'नोटिस और परिपत्र',
        ftPolicy: 'नीतियां',
        ftPrivacy: 'गोपनीयता नीति',
        ftTerms: 'नियम और शर्तें',
        ftCopy: 'कॉपीराइट नीति',
        ftHyper: 'हाइपरलिंकिंग नीति',
        ftContact: 'संपर्क करें',
        ftAddress: 'पता',
        ftMap: 'मैप व्यू',
        ftEmail: 'ईमेल:',
        ftPhone: 'फोन:',
        ftCopyright: '&copy; 2026 पर्यावरण लेखापरीक्षा नामित एजेंसी। सर्वाधिकार सुरक्षित।'
    }
};

function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    
    if(langBtn) langBtn.innerHTML = lang.toUpperCase() + ' ▾';
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('eada_lang', lang);
    
    if(langMenu) {
        langMenu.classList.remove('active');
        if(langBtn) langBtn.setAttribute('aria-expanded', 'false');
    }
}

// Initialize language & Media Slider
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('eada_lang') || 'en';
    setLanguage(savedLang);

    // --- Media Slider Logic (Reference Match) ---
    const mediaTrack = document.getElementById('media-track');
    const mediaSlides = document.querySelectorAll('.media-slide');
    const mediaDotsContainer = document.getElementById('media-dots');
    const mPrevBtn = document.getElementById('media-prev');
    const mNextBtn = document.getElementById('media-next');
    
    let mediaIndex = 0;
    let mediaInterval;
    
    function getItemsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1100) return 2;
        return 3;
    }

    function getMaxIndex() {
        return Math.max(0, mediaSlides.length - getItemsPerView());
    }

    if (mediaTrack && mediaSlides.length > 0) {
        // Create Dots
        function setupDots() {
            if (!mediaDotsContainer) return;
            mediaDotsContainer.innerHTML = '';
            const itemsPerView = getItemsPerView();
            const dotCount = Math.max(0, mediaSlides.length - itemsPerView + 1);
            
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot-ref');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToMediaSlide(i));
                mediaDotsContainer.appendChild(dot);
            }
        }

        function updateMediaSlider() {
            const itemsPerView = getItemsPerView();
            const offset = mediaIndex * (100 / itemsPerView);
            mediaTrack.style.transform = `translateX(-${offset}%)`;
            
            const dots = document.querySelectorAll('.dot-ref');
            dots.forEach((d, i) => d.classList.toggle('active', i === mediaIndex));
            
            // Disable/Enable Arrows
            if (mPrevBtn) {
                mPrevBtn.style.opacity = mediaIndex === 0 ? '0.3' : '1';
                mPrevBtn.style.pointerEvents = mediaIndex === 0 ? 'none' : 'auto';
            }
            if (mNextBtn) {
                mNextBtn.style.opacity = mediaIndex >= getMaxIndex() ? '0.3' : '1';
                mNextBtn.style.pointerEvents = mediaIndex >= getMaxIndex() ? 'none' : 'auto';
            }
        }

        function nextMediaSlide() {
            if (mediaIndex < getMaxIndex()) {
                mediaIndex++;
            } else {
                mediaIndex = 0; // Loop back
            }
            updateMediaSlider();
        }

        function prevMediaSlide() {
            if (mediaIndex > 0) {
                mediaIndex--;
                updateMediaSlider();
                resetMediaInterval();
            }
        }

        function goToMediaSlide(index) {
            mediaIndex = index;
            updateMediaSlider();
            resetMediaInterval();
        }

        function resetMediaInterval() {
            clearInterval(mediaInterval);
            mediaInterval = setInterval(nextMediaSlide, 6000);
        }

        // Event Listeners
        mNextBtn?.addEventListener('click', () => {
            nextMediaSlide();
            resetMediaInterval();
        });
        mPrevBtn?.addEventListener('click', () => {
            prevMediaSlide();
            resetMediaInterval();
        });

        window.addEventListener('resize', () => {
            const max = getMaxIndex();
            if (mediaIndex > max) mediaIndex = max;
            setupDots();
            updateMediaSlider();
        });

        // Init
        setupDots();
        updateMediaSlider();
        mediaInterval = setInterval(nextMediaSlide, 6000);

        // Pause on hover
        const mediaSection = document.getElementById('media-section');
        mediaSection?.addEventListener('mouseenter', () => clearInterval(mediaInterval));
        mediaSection?.addEventListener('mouseleave', () => resetMediaInterval());
    }
});

document.getElementById('lang-en')?.addEventListener('click', (e) => { e.preventDefault(); setLanguage('en'); });
document.getElementById('lang-hi')?.addEventListener('click', (e) => { e.preventDefault(); setLanguage('hi'); });

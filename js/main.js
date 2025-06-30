// Default students data (will be overridden by JSON file or localStorage)
let students = {
    '20250629': [],
    '20250727': []
};

// Load students data from JSON file or localStorage
async function loadStudentsData() {
    try {
        // First check if there's updated data in localStorage (from admin panel)
        const localData = localStorage.getItem('studentsData');
        if (localData) {
            const parsedData = JSON.parse(localData);
            students = convertDataFormat(parsedData.batches);
            console.log('Loaded students from localStorage:', students);
            return;
        }
        
        // Otherwise load from JSON file
        const response = await fetch('data/students.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        students = convertDataFormat(data.batches);
        console.log('Loaded students from JSON file:', students);
    } catch (error) {
        console.error('Error loading students data:', error);
        // Fallback to hardcoded data if loading fails
        console.log('Using hardcoded students data');
        // Hardcode the students data here for fallback
        students = {
            '20250629': [
                { 
                    name: 'Amy', 
                    image: '學員成果/20250629/Amy.jpg', 
                    description: 'Amy 的作品展現了對色彩的敏銳掌握，創意十足的設計理念令人印象深刻。',
                    skills: ['UI/UX Design', 'Color Theory', 'Creative Design'],
                    projectTitle: '互動式色彩探索應用',
                    details: 'Amy 開發了一個創新的色彩探索應用，讓使用者能夠直觀地理解色彩理論。該應用結合了現代設計美學與實用功能，獲得了導師的高度評價。'
                },
                { 
                    name: 'Brian', 
                    image: '學員成果/20250629/Brian.png', 
                    description: 'Brian 在程式邏輯上展現了卓越的天賦，作品兼具功能性與美觀性。',
                    skills: ['JavaScript', 'React', 'Problem Solving'],
                    projectTitle: '智能任務管理系統',
                    details: 'Brian 創建了一個強大的任務管理系統，具有智能分類和優先級排序功能。系統採用 React 框架，展現了紮實的前端開發能力。'
                },
                { 
                    name: 'GM', 
                    image: '學員成果/20250629/GM.png', 
                    description: 'GM 的作品充滿創新精神，將複雜的概念以簡潔的方式呈現。',
                    skills: ['Innovation', 'Simplicity', 'UX Design'],
                    projectTitle: '極簡主義天氣應用',
                    details: 'GM 設計了一個極簡但功能完整的天氣應用，通過優雅的動畫和直觀的界面，將複雜的氣象數據轉化為易懂的視覺呈現。'
                },
                { 
                    name: 'YU', 
                    image: '學員成果/20250629/YU.png', 
                    description: 'YU 展現了紮實的基礎功力，作品細節處理得相當到位。',
                    skills: ['HTML/CSS', 'Attention to Detail', 'Responsive Design'],
                    projectTitle: '響應式電商網站',
                    details: 'YU 開發了一個完整的電商網站，從商品展示到購物車功能一應俱全。特別注重響應式設計，確保在各種設備上都有完美的體驗。'
                },
                { 
                    name: 'owo', 
                    image: '學員成果/20250629/owo.png', 
                    description: 'owo 的作品充滿童趣與創意，為專案帶來了獨特的風格。',
                    skills: ['Animation', 'Creative Coding', 'Game Design'],
                    projectTitle: '互動式學習遊戲',
                    details: 'owo 創作了一個寓教於樂的互動遊戲，幫助孩子們學習程式邏輯。遊戲充滿趣味性的同時，也巧妙地融入了編程概念。'
                }
            ],
            '20250727': []
        };
    }
}

// Convert data format from JSON structure to the format used in the app
function convertDataFormat(batches) {
    const result = {};
    Object.entries(batches).forEach(([batchId, batch]) => {
        result[batchId] = batch.students || [];
    });
    return result;
}

let journeyPosts = JSON.parse(localStorage.getItem('journeyPosts')) || [];

// Initialize GSAP and ScrollTrigger
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Ensure loader is removed after max 3 seconds
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none';
        console.warn('Loader removed by timeout');
    }
}, 3000);

// Loading animation
window.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load students data first
        await loadStudentsData();
        
        // Ensure GSAP is loaded
        if (typeof gsap !== 'undefined') {
            gsap.to('#loader', {
                opacity: 0,
                duration: 0.5,
                onComplete: function() {
                    document.getElementById('loader').style.display = 'none';
                }
            });
        } else {
            // Fallback if GSAP is not loaded
            document.getElementById('loader').style.display = 'none';
        }

        // Initialize animations only if GSAP is available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            initAnimations();
        }
        
        // Display content
        displayAllStudents();
        displayJourneyPosts();
    } catch (error) {
        console.error('Error during initialization:', error);
        // Hide loader even if there's an error
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
});

function initAnimations() {
    // Hero animations with improved effects
    const heroTl = gsap.timeline({ delay: 0.3 });
    
    heroTl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
    })
    .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-btn', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
    }, '-=0.4');

    // Blob animations
    gsap.to('.animate-blob', {
        y: '15%',
        x: '10%',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
            each: 2,
            from: 'random'
        }
    });

    // Section animations with better scroll triggers
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
                scrub: 1
            },
            y: 80,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out'
        });
    });

    // Batch cards with stagger animation
    ScrollTrigger.batch('.batch-card', {
        onEnter: batch => gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            overwrite: 'auto'
        }),
        onLeave: batch => gsap.to(batch, {
            opacity: 0,
            y: 100,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.in',
            overwrite: 'auto'
        }),
        onEnterBack: batch => gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            overwrite: 'auto'
        }),
        onLeaveBack: batch => gsap.to(batch, {
            opacity: 0,
            y: -100,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.in',
            overwrite: 'auto'
        })
    });

    // Set initial state for batch cards
    gsap.set('.batch-card', { opacity: 0, y: 100, scale: 0.9 });
}

function showBatch(batchId) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) {
        console.error('Gallery grid element not found');
        return;
    }
    
    // Ensure students data is loaded
    if (!students || Object.keys(students).length === 0) {
        console.warn('Students data not loaded, using hardcoded data');
        // Use hardcoded data as fallback
        students = {
            '20250629': [
                { 
                    name: 'Amy', 
                    image: '學員成果/20250629/Amy.jpg', 
                    description: 'Amy 的作品展現了對色彩的敏銳掌握，創意十足的設計理念令人印象深刻。',
                    skills: ['UI/UX Design', 'Color Theory', 'Creative Design'],
                    projectTitle: '互動式色彩探索應用',
                    details: 'Amy 開發了一個創新的色彩探索應用，讓使用者能夠直觀地理解色彩理論。該應用結合了現代設計美學與實用功能，獲得了導師的高度評價。'
                },
                { 
                    name: 'Brian', 
                    image: '學員成果/20250629/Brian.png', 
                    description: 'Brian 在程式邏輯上展現了卓越的天賦，作品兼具功能性與美觀性。',
                    skills: ['JavaScript', 'React', 'Problem Solving'],
                    projectTitle: '智能任務管理系統',
                    details: 'Brian 創建了一個強大的任務管理系統，具有智能分類和優先級排序功能。系統採用 React 框架，展現了紮實的前端開發能力。'
                },
                { 
                    name: 'GM', 
                    image: '學員成果/20250629/GM.png', 
                    description: 'GM 的作品充滿創新精神，將複雜的概念以簡潔的方式呈現。',
                    skills: ['Innovation', 'Simplicity', 'UX Design'],
                    projectTitle: '極簡主義天氣應用',
                    details: 'GM 設計了一個極簡但功能完整的天氣應用，通過優雅的動畫和直觀的界面，將複雜的氣象數據轉化為易懂的視覺呈現。'
                },
                { 
                    name: 'YU', 
                    image: '學員成果/20250629/YU.png', 
                    description: 'YU 展現了紮實的基礎功力，作品細節處理得相當到位。',
                    skills: ['HTML/CSS', 'Attention to Detail', 'Responsive Design'],
                    projectTitle: '響應式電商網站',
                    details: 'YU 開發了一個完整的電商網站，從商品展示到購物車功能一應俱全。特別注重響應式設計，確保在各種設備上都有完美的體驗。'
                },
                { 
                    name: 'owo', 
                    image: '學員成果/20250629/owo.png', 
                    description: 'owo 的作品充滿童趣與創意，為專案帶來了獨特的風格。',
                    skills: ['Animation', 'Creative Coding', 'Game Design'],
                    projectTitle: '互動式學習遊戲',
                    details: 'owo 創作了一個寓教於樂的互動遊戲，幫助孩子們學習程式邏輯。遊戲充滿趣味性的同時，也巧妙地融入了編程概念。'
                }
            ],
            '20250727': []
        };
    }
    
    const studentsData = students[batchId] || [];
    
    galleryGrid.innerHTML = '';
    
    console.log(`Showing batch ${batchId} with ${studentsData.length} students`);
    
    if (studentsData.length === 0) {
        galleryGrid.innerHTML = '<p class="col-span-full text-center text-gray-500">該期別尚無作品展示</p>';
        return;
    }
    
    studentsData.forEach((student, index) => {
        const item = createGalleryItem(student, index);
        galleryGrid.appendChild(item);
    });
    
    // Apply the same animation as displayAllStudents
    setTimeout(() => {
        // Set initial state
        gsap.set('.gallery-item', { opacity: 0, y: 100, scale: 0.95 });
        
        // Batch animation for gallery items
        ScrollTrigger.batch('.gallery-item', {
            onEnter: batch => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    stagger: {
                        each: 0.1,
                        from: 'start'
                    },
                    ease: 'power3.out',
                    overwrite: 'auto'
                });
            },
            onLeave: batch => gsap.set(batch, { opacity: 0, y: 100, scale: 0.95 }),
            onEnterBack: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power2.out',
                overwrite: 'auto'
            }),
            onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: -100, scale: 0.95 }),
            start: 'top 90%',
            end: 'bottom 10%'
        });
        
        // Also add immediate animation for visible items
        gsap.from('.gallery-item', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
    }, 100);
    
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

function createGalleryItem(student, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer';
    
    // Ensure skills array exists
    const skills = student.skills || [];
    
    item.innerHTML = `
        <div class="aspect-w-16 aspect-h-12 relative overflow-hidden" onclick="openLightbox('${student.image}', '${student.name}的作品 - ${student.projectTitle || student.description}')">
            <img src="${student.image}" 
                 alt="${student.name}的作品" 
                 class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                 onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(student.name)}'">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div class="absolute inset-0 flex items-center justify-center">
                    <i class="fas fa-search-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                </div>
            </div>
        </div>
        <div class="p-6 bg-white">
            <h3 class="text-xl font-bold text-gray-800 mb-2">${student.name}</h3>
            <p class="text-gray-600 mb-4">${student.description || '作品描述'}</p>
            ${skills.length > 0 ? `
                <div class="flex flex-wrap gap-2 mb-4">
                    ${skills.map(skill => `<span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">${skill}</span>`).join('')}
                </div>
            ` : ''}
            <button onclick="openModal('${student.name}')" class="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                查看詳情 <i class="fas fa-arrow-right ml-1"></i>
            </button>
        </div>
    `;
    return item;
}

function displayAllStudents() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) {
        console.error('Gallery grid element not found');
        return;
    }
    
    galleryGrid.innerHTML = '';
    
    let allStudents = [];
    Object.keys(students).forEach(batchId => {
        if (students[batchId] && Array.isArray(students[batchId])) {
            students[batchId].forEach(student => {
                allStudents.push({...student, batchId});
            });
        }
    });

    console.log('All students to display:', allStudents);

    if (allStudents.length === 0) {
        galleryGrid.innerHTML = '<p class="col-span-full text-center text-gray-500">暫無學員作品</p>';
        return;
    }
    
    allStudents.forEach((student, index) => {
        const item = createGalleryItem(student, index);
        galleryGrid.appendChild(item);
    });

    // Gallery items animation with improved ScrollTrigger
    setTimeout(() => {
        // Set initial state
        gsap.set('.gallery-item', { opacity: 0, y: 100, scale: 0.95 });
        
        // Batch animation for gallery items
        ScrollTrigger.batch('.gallery-item', {
            onEnter: batch => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    stagger: {
                        each: 0.1,
                        from: 'start'
                    },
                    ease: 'power3.out',
                    overwrite: 'auto'
                });
            },
            onLeave: batch => gsap.set(batch, { opacity: 0, y: 100, scale: 0.95 }),
            onEnterBack: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power2.out',
                overwrite: 'auto'
            }),
            onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: -100, scale: 0.95 }),
            start: 'top 90%',
            end: 'bottom 10%'
        });
    }, 200);
}

function openModal(studentName) {
    const modal = document.getElementById('work-modal');
    const modalContent = document.getElementById('modal-content');
    
    let student = null;
    Object.values(students).forEach(batch => {
        const found = batch.find(s => s.name === studentName);
        if (found) student = found;
    });
    
    if (!student) return;
    
    modalContent.innerHTML = `
        <div class="grid md:grid-cols-2 gap-8">
            <div>
                <img src="${student.image}" 
                     alt="${student.name}的作品" 
                     class="w-full rounded-lg shadow-lg"
                     onerror="this.src='https://via.placeholder.com/600x400?text=${student.name}'">
            </div>
            <div>
                <h3 class="text-3xl font-bold text-gray-800 mb-4">${student.projectTitle}</h3>
                <p class="text-lg text-gray-700 mb-6">${student.details}</p>
                <div class="mb-6">
                    <h4 class="text-xl font-semibold text-gray-800 mb-3">技能標籤</h4>
                    <div class="flex flex-wrap gap-2">
                        ${student.skills.map(skill => `<span class="px-4 py-2 bg-purple-100 text-purple-700 rounded-full">${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="border-t pt-4">
                    <p class="text-gray-600"><strong>創作者：</strong>${student.name}</p>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    gsap.from('#work-modal > div > div', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
    });
}

function closeModal() {
    const modal = document.getElementById('work-modal');
    gsap.to('#work-modal > div > div', {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
            modal.classList.add('hidden');
        }
    });
}

function displayJourneyPosts() {
    const postsContainer = document.getElementById('journey-posts');
    postsContainer.innerHTML = '';
    
    if (journeyPosts.length === 0) {
        postsContainer.innerHTML = '<p class="text-center text-gray-500">尚無學習歷程分享，成為第一個分享者吧！</p>';
        return;
    }
    
    journeyPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    journeyPosts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'journey-post bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow';
        postElement.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h4 class="text-xl font-bold text-gray-800">${post.name}</h4>
                    <span class="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm mt-1">${post.batch}</span>
                </div>
                <div class="text-gray-500 text-sm">
                    <i class="far fa-clock mr-1"></i>
                    ${formatDate(post.timestamp)}
                </div>
            </div>
            <p class="text-gray-700 leading-relaxed">${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });

    // Animate posts
    gsap.from('.journey-post', {
        scrollTrigger: {
            trigger: '#journey',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours === 0) {
            const minutes = Math.floor(diff / (1000 * 60));
            return minutes === 0 ? '剛剛' : `${minutes} 分鐘前`;
        }
        return `${hours} 小時前`;
    } else if (days === 1) {
        return '昨天';
    } else if (days < 7) {
        return `${days} 天前`;
    } else {
        return date.toLocaleDateString('zh-TW');
    }
}

// Form submission with animation
document.getElementById('journey-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('student-name').value;
    const batch = document.getElementById('batch').value;
    const content = document.getElementById('journey-content').value;
    
    const newPost = {
        name,
        batch,
        content,
        timestamp: new Date().toISOString()
    };
    
    journeyPosts.push(newPost);
    localStorage.setItem('journeyPosts', JSON.stringify(journeyPosts));
    
    displayJourneyPosts();
    
    this.reset();
    
    // Success animation
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check mr-2"></i>發布成功！';
    button.classList.add('bg-green-600');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('bg-green-600');
    }, 2000);
});

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = this.querySelector('i');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        mobileMenu.classList.add('hidden');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
        const icon = document.getElementById('mobile-menu-btn').querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Listen for data updates from admin panel
window.addEventListener('studentsDataUpdated', function(e) {
    students = convertDataFormat(e.detail.batches);
    displayAllStudents();
});

// Modal close on outside click
document.getElementById('work-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Lightbox functionality
let currentImages = [];
let currentImageIndex = 0;

function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    // Collect all gallery images
    currentImages = [];
    document.querySelectorAll('.gallery-item img').forEach((img, index) => {
        currentImages.push({
            src: img.src,
            caption: img.alt
        });
        if (img.src === imageSrc || img.src.includes(encodeURIComponent(imageSrc))) {
            currentImageIndex = index;
        }
    });
    
    // Set image and caption
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = caption || '';
    updateLightboxCounter();
    
    // Show lightbox with animation
    lightbox.classList.remove('hidden');
    gsap.from('#lightbox-image', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    gsap.to('#lightbox-image', {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
            lightbox.classList.add('hidden');
        }
    });
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateLightboxImage();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const currentImage = currentImages[currentImageIndex];
    
    gsap.to('#lightbox-image', {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
            lightboxImage.src = currentImage.src;
            lightboxCaption.textContent = currentImage.caption;
            gsap.to('#lightbox-image', {
                opacity: 1,
                duration: 0.2
            });
        }
    });
    
    updateLightboxCounter();
}

function updateLightboxCounter() {
    const counter = document.getElementById('lightbox-counter');
    counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('lightbox').addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextImage(); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
        previousImage(); // Swipe right
    }
}
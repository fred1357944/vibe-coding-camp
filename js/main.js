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
            return;
        }
        
        // Otherwise load from JSON file
        const response = await fetch('data/students.json');
        const data = await response.json();
        students = convertDataFormat(data.batches);
    } catch (error) {
        console.error('Error loading students data:', error);
        // Fallback to default data if loading fails
        console.log('Using default students data');
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
gsap.registerPlugin(ScrollTrigger);

// Loading animation
window.addEventListener('load', async function() {
    // Load students data first
    await loadStudentsData();
    gsap.to('#loader', {
        opacity: 0,
        duration: 0.5,
        onComplete: function() {
            document.getElementById('loader').style.display = 'none';
        }
    });

    // Initialize animations
    initAnimations();
    
    // Display content
    displayAllStudents();
    displayJourneyPosts();
});

function initAnimations() {
    // Hero animations
    gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5
    });
    
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.7
    });
    
    gsap.from('.hero-btn', {
        scale: 0,
        duration: 0.8,
        delay: 1,
        ease: 'back.out(1.7)'
    });

    // Section animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    // Batch cards animation
    gsap.utils.toArray('.batch-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2
        });
    });
}

function showBatch(batchId) {
    const galleryGrid = document.getElementById('gallery-grid');
    const studentsData = students[batchId] || [];
    
    galleryGrid.innerHTML = '';
    
    if (studentsData.length === 0) {
        galleryGrid.innerHTML = '<p class="col-span-full text-center text-gray-500">該期別尚無作品展示</p>';
        return;
    }
    
    studentsData.forEach((student, index) => {
        const item = createGalleryItem(student, index);
        galleryGrid.appendChild(item);
    });
    
    // Animate gallery items
    gsap.from('.gallery-item', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });
    
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

function createGalleryItem(student, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer';
    item.innerHTML = `
        <div class="aspect-w-16 aspect-h-12 relative overflow-hidden">
            <img src="${student.image}" 
                 alt="${student.name}的作品" 
                 class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                 onerror="this.src='https://via.placeholder.com/400x300?text=${student.name}'">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-6 bg-white">
            <h3 class="text-xl font-bold text-gray-800 mb-2">${student.name}</h3>
            <p class="text-gray-600 mb-4">${student.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${student.skills.map(skill => `<span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">${skill}</span>`).join('')}
            </div>
            <button onclick="openModal('${student.name}')" class="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                查看詳情 <i class="fas fa-arrow-right ml-1"></i>
            </button>
        </div>
    `;
    return item;
}

function displayAllStudents() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';
    
    let allStudents = [];
    Object.keys(students).forEach(batchId => {
        students[batchId].forEach(student => {
            allStudents.push({...student, batchId});
        });
    });

    if (allStudents.length === 0) {
        galleryGrid.innerHTML = '<p class="col-span-full text-center text-gray-500">暫無學員作品</p>';
        return;
    }
    
    allStudents.forEach((student, index) => {
        const item = createGalleryItem(student, index);
        galleryGrid.appendChild(item);
    });

    // Delayed animation for gallery items
    setTimeout(() => {
        gsap.from('.gallery-item', {
            scrollTrigger: {
                trigger: '#gallery',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1
        });
    }, 100);
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
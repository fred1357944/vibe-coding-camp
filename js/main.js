const students = {
    '20250629': [
        { name: 'Amy', image: '學員成果/20250629/Amy.jpg', description: 'Amy 的作品展現了對色彩的敏銳掌握，創意十足的設計理念令人印象深刻。' },
        { name: 'Brian', image: '學員成果/20250629/Brian.png', description: 'Brian 在程式邏輯上展現了卓越的天賦，作品兼具功能性與美觀性。' },
        { name: 'GM', image: '學員成果/20250629/GM.png', description: 'GM 的作品充滿創新精神，將複雜的概念以簡潔的方式呈現。' },
        { name: 'YU', image: '學員成果/20250629/YU.png', description: 'YU 展現了紮實的基礎功力，作品細節處理得相當到位。' },
        { name: 'owo', image: '學員成果/20250629/owo.png', description: 'owo 的作品充滿童趣與創意，為專案帶來了獨特的風格。' }
    ],
    '20250727': [
    ]
};

let journeyPosts = JSON.parse(localStorage.getItem('journeyPosts')) || [];

function showBatch(batchId) {
    const galleryGrid = document.getElementById('gallery-grid');
    const studentsData = students[batchId] || [];
    
    galleryGrid.innerHTML = '';
    
    if (studentsData.length === 0) {
        galleryGrid.innerHTML = '<p style="text-align: center; color: #7f8c8d;">該期別尚無作品展示</p>';
        return;
    }
    
    studentsData.forEach(student => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${student.image}" alt="${student.name}的作品" onerror="this.src='https://via.placeholder.com/300x250?text=${student.name}'">
            <div class="gallery-item-info">
                <h3>${student.name}</h3>
                <p>${student.description}</p>
            </div>
        `;
        galleryGrid.appendChild(item);
    });
    
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

function displayAllStudents() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';
    
    Object.keys(students).forEach(batchId => {
        students[batchId].forEach(student => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${student.image}" alt="${student.name}的作品" onerror="this.src='https://via.placeholder.com/300x250?text=${student.name}'">
                <div class="gallery-item-info">
                    <h3>${student.name}</h3>
                    <p>${student.description}</p>
                </div>
            `;
            galleryGrid.appendChild(item);
        });
    });
}

function displayJourneyPosts() {
    const postsContainer = document.getElementById('journey-posts');
    postsContainer.innerHTML = '';
    
    if (journeyPosts.length === 0) {
        postsContainer.innerHTML = '<p style="text-align: center; color: #7f8c8d;">尚無學習歷程分享</p>';
        return;
    }
    
    journeyPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    journeyPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'journey-post';
        postElement.innerHTML = `
            <h4>${post.name}</h4>
            <span class="batch-tag">${post.batch}</span>
            <p>${post.content}</p>
            <div class="timestamp">${new Date(post.timestamp).toLocaleString('zh-TW')}</div>
        `;
        postsContainer.appendChild(postElement);
    });
}

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
    
    alert('學習歷程已成功分享！');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('load', function() {
    displayAllStudents();
    displayJourneyPosts();
});
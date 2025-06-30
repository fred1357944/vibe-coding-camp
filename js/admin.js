// Admin authentication
const ADMIN_PASSWORD = 'admin123'; // In production, this should be handled server-side
let studentsData = null;

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
} else {
    document.getElementById('login-modal').classList.remove('hidden');
}

// Login form handler
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
    } else {
        alert('密碼錯誤！');
        document.getElementById('admin-password').value = '';
    }
});

function showAdminPanel() {
    document.getElementById('login-modal').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    loadData();
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    location.reload();
}

// Load students data
async function loadData() {
    try {
        const response = await fetch('data/students.json');
        studentsData = await response.json();
        
        // Update JSON editor
        document.getElementById('json-editor').value = JSON.stringify(studentsData, null, 4);
        
        // Update overview
        updateOverview();
    } catch (error) {
        console.error('Error loading data:', error);
        alert('載入資料時發生錯誤');
    }
}

// Update students overview
function updateOverview() {
    const overviewContainer = document.getElementById('students-overview');
    overviewContainer.innerHTML = '';
    
    Object.entries(studentsData.batches).forEach(([batchId, batch]) => {
        const batchDiv = document.createElement('div');
        batchDiv.className = 'border-b pb-4';
        batchDiv.innerHTML = `
            <h3 class="font-semibold text-lg mb-2">${batch.name}</h3>
            <p class="text-gray-600 mb-2">${batch.description}</p>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">學員人數：${batch.students.length}</span>
                <button onclick="viewBatchStudents('${batchId}')" class="text-purple-600 hover:text-purple-700 text-sm">
                    查看學員名單
                </button>
            </div>
            <div id="batch-${batchId}-students" class="mt-2 hidden">
                ${batch.students.map(s => `
                    <span class="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm mr-2 mb-2">${s.name}</span>
                `).join('')}
            </div>
        `;
        overviewContainer.appendChild(batchDiv);
    });
}

// View batch students
function viewBatchStudents(batchId) {
    const studentsList = document.getElementById(`batch-${batchId}-students`);
    studentsList.classList.toggle('hidden');
}

// Quick add student form
document.getElementById('quick-add-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newStudent = {
        name: document.getElementById('student-name').value,
        image: document.getElementById('image-path').value,
        description: document.getElementById('description').value,
        skills: document.getElementById('skills').value.split(',').map(s => s.trim()),
        projectTitle: document.getElementById('project-title').value,
        details: document.getElementById('details').value
    };
    
    const batchId = document.getElementById('batch-select').value;
    
    // Add to data
    if (!studentsData.batches[batchId]) {
        alert('選擇的期別不存在');
        return;
    }
    
    studentsData.batches[batchId].students.push(newStudent);
    
    // Update JSON editor
    document.getElementById('json-editor').value = JSON.stringify(studentsData, null, 4);
    
    // Update overview
    updateOverview();
    
    // Reset form
    this.reset();
    
    alert('學員已新增成功！請記得點擊「保存變更」來儲存資料。');
});

// Save data (in a real application, this would save to a server)
function saveData() {
    try {
        // Parse JSON to validate
        const jsonText = document.getElementById('json-editor').value;
        studentsData = JSON.parse(jsonText);
        
        // In a real application, you would send this to a server
        // For now, we'll save it to localStorage and update the main site
        localStorage.setItem('studentsData', jsonText);
        
        // Update the main.js to use this data
        updateMainSiteData();
        
        alert('資料已成功保存！網站將自動更新。');
        updateOverview();
    } catch (error) {
        alert('JSON 格式錯誤！請檢查並修正格式。\n錯誤訊息：' + error.message);
    }
}

// Update main site data
function updateMainSiteData() {
    // This would typically be done server-side
    // For demo purposes, we're using localStorage
    // The main site will check for this data
    const event = new CustomEvent('studentsDataUpdated', { detail: studentsData });
    window.dispatchEvent(event);
}

// Download data as backup
function downloadData() {
    const jsonText = document.getElementById('json-editor').value;
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
            e.preventDefault();
            saveData();
        } else if (e.key === 'r') {
            e.preventDefault();
            loadData();
        }
    }
});
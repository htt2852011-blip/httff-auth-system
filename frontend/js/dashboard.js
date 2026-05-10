// Dashboard page functions

// Load user profile on page load
document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname.includes('dashboard.html')) {
        await loadUserProfile();
        loadSection('dashboard');
    }
});

// Load user profile
async function loadUserProfile() {
    try {
        const data = await getProfile();
        const user = data.user;
        
        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.email;
        
        document.getElementById('profile-username').textContent = user.username;
        document.getElementById('profile-email').textContent = user.email;
        document.getElementById('profile-created').textContent = formatDate(user.created_at);
    } catch (error) {
        console.error('Error loading profile:', error);
        showMessage('Error loading profile', 'error');
    }
}

// Load dashboard data
async function loadDashboardData() {
    try {
        // Load stats
        const statsData = await getLogStats();
        document.getElementById('total-activities').textContent = statsData.total_activities;
        document.getElementById('last-login').textContent = formatDate(statsData.last_login);
        
        // Load API keys count
        const keysData = await listAPIKeys();
        document.getElementById('total-api-keys').textContent = keysData.api_keys.length;
        
        // Load recent logs
        const logsData = await getActivityLogs(1, 5);
        const tbody = document.getElementById('recent-logs-body');
        tbody.innerHTML = '';
        
        logsData.logs.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.action}</td>
                <td>${formatDate(log.created_at)}</td>
                <td>${log.ip_address || '-'}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showMessage('Error loading dashboard data', 'error');
    }
}

// Load API keys
async function loadAPIKeys() {
    try {
        const data = await listAPIKeys();
        const tbody = document.getElementById('api-keys-body');
        tbody.innerHTML = '';
        
        data.api_keys.forEach(key => {
            const row = document.createElement('tr');
            const statusClass = key.is_active ? 'status-active' : 'status-inactive';
            const statusText = key.is_active ? 'Active' : 'Revoked';
            
            row.innerHTML = `
                <td>${key.key_name}</td>
                <td>${formatDate(key.created_at)}</td>
                <td>${formatDate(key.last_used_at)}</td>
                <td>${formatDate(key.expires_at)}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button onclick="revokeKey(${key.id})" class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;">Revoke</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading API keys:', error);
        showMessage('Error loading API keys', 'error');
    }
}

// Open generate key modal
function openGenerateKeyModal() {
    document.getElementById('key-modal').style.display = 'flex';
    document.getElementById('key-name').value = '';
    document.getElementById('generated-key-display').style.display = 'none';
}

// Close generate key modal
function closeGenerateKeyModal() {
    document.getElementById('key-modal').style.display = 'none';
}

// Generate API key
async function generateAPIKey() {
    try {
        const keyName = document.getElementById('key-name').value || `API Key ${new Date().toLocaleString()}`;
        const data = await generateAPIKey(keyName);
        
        document.getElementById('generated-key').value = data.api_key;
        document.getElementById('generated-key-display').style.display = 'block';
        
        showMessage('API Key generated successfully!', 'success');
        
        // Reload keys after a delay
        setTimeout(() => {
            loadAPIKeys();
        }, 1000);
    } catch (error) {
        showMessage('Error generating API key: ' + error.message, 'error');
    }
}

// Revoke API key
async function revokeKey(keyId) {
    if (!confirm('Are you sure you want to revoke this API key?')) {
        return;
    }
    
    try {
        await revokeAPIKey(keyId);
        showMessage('API key revoked successfully', 'success');
        loadAPIKeys();
    } catch (error) {
        showMessage('Error revoking API key: ' + error.message, 'error');
    }
}

// Load activity logs
async function loadActivityLogs() {
    try {
        const data = await getActivityLogs(1, 50);
        const tbody = document.getElementById('logs-body');
        tbody.innerHTML = '';
        
        data.logs.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.action}</td>
                <td>${log.details || '-'}</td>
                <td>${log.ip_address || '-'}</td>
                <td>${formatDate(log.created_at)}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading activity logs:', error);
        showMessage('Error loading activity logs', 'error');
    }
}

// Load profile
async function loadProfile() {
    // Profile is already loaded on page load
}

// Logout
async function handleLogout() {
    if (!confirm('Are you sure you want to logout?')) {
        return;
    }
    
    try {
        await logoutUser();
        removeToken();
        showMessage('Logout successful', 'success');
        setTimeout(() => {
            redirectToLogin();
        }, 1500);
    } catch (error) {
        console.error('Error logging out:', error);
        // Still logout even if API call fails
        removeToken();
        redirectToLogin();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('key-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

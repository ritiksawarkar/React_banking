// DOM Elements
const searchSettings = document.getElementById('searchSettings');
const currentDateElement = document.getElementById('currentDate');
const securityForm = document.getElementById('securityForm');
const notificationForm = document.getElementById('notificationForm');
const languageForm = document.getElementById('languageForm');
const sidebarToggle = document.getElementById('sidebarToggle');

// State Management
let settings = {
    security: {
        twoFactorEnabled: false,
        lastPasswordChange: new Date()
    },
    notifications: {
        email: true,
        sms: true,
        push: true
    },
    language: {
        current: 'en',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY'
    }
};

// Initialize Page
function initPage() {
    setCurrentDate();
    loadSettings();
    setupEventListeners();
}

// Set Current Date
function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Load Settings
function loadSettings() {
    // Load from localStorage if available
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
        updateForms();
    }
}

// Update Forms with Current Settings
function updateForms() {
    // Security Settings
    document.getElementById('enable2FA').checked = settings.security.twoFactorEnabled;

    // Notification Settings
    document.getElementById('emailNotifications').checked = settings.notifications.email;
    document.getElementById('smsNotifications').checked = settings.notifications.sms;
    document.getElementById('pushNotifications').checked = settings.notifications.push;

    // Language Settings
    document.getElementById('language').value = settings.language.current;
    document.getElementById('timezone').value = settings.language.timezone;
    document.getElementById('dateFormat').value = settings.language.dateFormat;
}

// Setup Event Listeners
function setupEventListeners() {
    // Search Functionality
    searchSettings.addEventListener('input', handleSearch);

    // Form Submissions
    securityForm.addEventListener('submit', handleSecuritySubmit);
    notificationForm.addEventListener('submit', handleNotificationSubmit);
    languageForm.addEventListener('submit', handleLanguageSubmit);

    // Cancel Buttons
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', handleCancel);
    });

    // Sidebar Toggle
    sidebarToggle.addEventListener('click', toggleSidebar);
}

// Handle Search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const forms = document.querySelectorAll('.settings-form');
    
    forms.forEach(form => {
        const title = form.querySelector('h2').textContent.toLowerCase();
        const isVisible = title.includes(searchTerm);
        form.style.display = isVisible ? 'block' : 'none';
    });
}

// Handle Security Form Submit
async function handleSecuritySubmit(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const enable2FA = document.getElementById('enable2FA').checked;

    // Validate passwords
    if (newPassword !== confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
    }

    if (newPassword.length < 8) {
        showToast('Password must be at least 8 characters long', 'error');
        return;
    }

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update settings
        settings.security.twoFactorEnabled = enable2FA;
        settings.security.lastPasswordChange = new Date();
        
        // Save to localStorage
        saveSettings();
        
        showToast('Security settings updated successfully', 'success');
        securityForm.reset();
    } catch (error) {
        showToast('Failed to update security settings', 'error');
    }
}

// Handle Notification Form Submit
async function handleNotificationSubmit(e) {
    e.preventDefault();
    
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const smsNotifications = document.getElementById('smsNotifications').checked;
    const pushNotifications = document.getElementById('pushNotifications').checked;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update settings
        settings.notifications = {
            email: emailNotifications,
            sms: smsNotifications,
            push: pushNotifications
        };
        
        // Save to localStorage
        saveSettings();
        
        showToast('Notification preferences updated successfully', 'success');
    } catch (error) {
        showToast('Failed to update notification preferences', 'error');
    }
}

// Handle Language Form Submit
async function handleLanguageSubmit(e) {
    e.preventDefault();
    
    const language = document.getElementById('language').value;
    const timezone = document.getElementById('timezone').value;
    const dateFormat = document.getElementById('dateFormat').value;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update settings
        settings.language = {
            current: language,
            timezone: timezone,
            dateFormat: dateFormat
        };
        
        // Save to localStorage
        saveSettings();
        
        showToast('Language and region settings updated successfully', 'success');
    } catch (error) {
        showToast('Failed to update language and region settings', 'error');
    }
}

// Handle Cancel
function handleCancel(e) {
    const form = e.target.closest('form');
    form.reset();
    updateForms(); // Reset to saved settings
}

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

// Save Settings to LocalStorage
function saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(settings));
}

// Show Toast Notification
function showToast(message, type = 'info') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#2563eb',
        stopOnFocus: true
    }).showToast();
}

// Initialize Page
document.addEventListener('DOMContentLoaded', initPage); 
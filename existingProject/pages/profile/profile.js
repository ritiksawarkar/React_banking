// DOM Elements
const searchProfile = document.getElementById('searchProfile');
const currentDateElement = document.getElementById('currentDate');
const personalInfoForm = document.getElementById('personalInfoForm');
const addressForm = document.getElementById('addressForm');
const securityForm = document.getElementById('securityForm');
const changeAvatarBtn = document.querySelector('.change-avatar-btn');

// State Management
let profileData = {
    personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567'
    },
    address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
    },
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
};

// Initialize Page
function initializePage() {
    setCurrentDate();
    setupEventListeners();
    loadProfileData();
}

// Set Current Date
function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Load Profile Data
function loadProfileData() {
    // Load from localStorage if available
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
        profileData = JSON.parse(savedData);
        updateProfileDisplay();
    }
}

// Update Profile Display
function updateProfileDisplay() {
    // Update avatar
    document.querySelector('.profile-avatar img').src = profileData.avatar;
    document.querySelector('.avatar').src = profileData.avatar;

    // Update personal info
    document.getElementById('firstName').value = profileData.personalInfo.firstName;
    document.getElementById('lastName').value = profileData.personalInfo.lastName;
    document.getElementById('email').value = profileData.personalInfo.email;
    document.getElementById('phone').value = profileData.personalInfo.phone;

    // Update address info
    document.getElementById('street').value = profileData.address.street;
    document.getElementById('city').value = profileData.address.city;
    document.getElementById('state').value = profileData.address.state;
    document.getElementById('zipCode').value = profileData.address.zipCode;

    // Update profile info display
    document.querySelector('.profile-info h2').textContent = 
        `${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}`;
    document.querySelector('.profile-email').textContent = profileData.personalInfo.email;
    document.querySelector('.profile-phone').textContent = profileData.personalInfo.phone;
}

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    searchProfile.addEventListener('input', handleSearch);

    // Form submissions
    personalInfoForm.addEventListener('submit', handlePersonalInfoSubmit);
    addressForm.addEventListener('submit', handleAddressSubmit);
    securityForm.addEventListener('submit', handleSecuritySubmit);

    // Cancel buttons
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', handleCancel);
    });

    // Avatar change
    changeAvatarBtn.addEventListener('click', handleAvatarChange);
}

// Handle Search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const sections = document.querySelectorAll('.profile-section');

    sections.forEach(section => {
        const sectionTitle = section.querySelector('h3').textContent.toLowerCase();
        const formInputs = section.querySelectorAll('input');
        let hasMatch = false;

        formInputs.forEach(input => {
            const inputValue = input.value.toLowerCase();
            if (inputValue.includes(searchTerm)) {
                hasMatch = true;
            }
        });

        if (sectionTitle.includes(searchTerm) || hasMatch) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Handle Personal Info Submit
function handlePersonalInfoSubmit(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim()
    };

    // Validate email
    if (!isValidEmail(formData.email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Validate phone
    if (!isValidPhone(formData.phone)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }

    // Update profile data
    profileData.personalInfo = formData;
    saveProfileData();
    updateProfileDisplay();
    showToast('Personal information updated successfully', 'success');
}

// Handle Address Submit
function handleAddressSubmit(e) {
    e.preventDefault();
    
    const formData = {
        street: document.getElementById('street').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        zipCode: document.getElementById('zipCode').value.trim()
    };

    // Validate ZIP code
    if (!isValidZipCode(formData.zipCode)) {
        showToast('Please enter a valid ZIP code', 'error');
        return;
    }

    // Update profile data
    profileData.address = formData;
    saveProfileData();
    showToast('Address information updated successfully', 'success');
}

// Handle Security Submit
function handleSecuritySubmit(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate current password (mock validation)
    if (currentPassword !== 'currentPassword123') {
        showToast('Current password is incorrect', 'error');
        return;
    }

    // Validate new password
    if (newPassword.length < 8) {
        showToast('New password must be at least 8 characters long', 'error');
        return;
    }

    // Validate password confirmation
    if (newPassword !== confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
    }

    // Clear form
    securityForm.reset();
    showToast('Password updated successfully', 'success');
}

// Handle Cancel
function handleCancel(e) {
    const form = e.target.closest('form');
    form.reset();
    updateProfileDisplay();
}

// Handle Avatar Change
function handleAvatarChange() {
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showToast('Image size should be less than 5MB', 'error');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                showToast('Please select a valid image file', 'error');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                profileData.avatar = e.target.result;
                saveProfileData();
                updateProfileDisplay();
                showToast('Profile picture updated successfully', 'success');
            };
            reader.readAsDataURL(file);
        }
    };

    fileInput.click();
}

// Save Profile Data
function saveProfileData() {
    localStorage.setItem('profileData', JSON.stringify(profileData));
}

// Validation Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidZipCode(zipCode) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
}

// Show Toast Notification
function showToast(message, type = 'info') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: type === 'error' ? '#dc2626' : type === 'success' ? '#16a34a' : '#2563eb',
        stopOnFocus: true
    }).showToast();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', initializePage); 
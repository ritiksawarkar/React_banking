document.addEventListener('DOMContentLoaded', function() {
    // Initialize KYC components
    initializeKYCForms();
    initializeCamera();
    updateCurrentDate();
});

function initializeKYCForms() {
    // Personal Information Form
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validatePersonalInfo()) {
                showNextStep('idVerificationForm');
                updateProgress(1);
            }
        });
    }

    // ID Verification Form
    const idVerificationForm = document.getElementById('idVerificationForm');
    if (idVerificationForm) {
        const idDocument = document.getElementById('idDocument');
        const uploadBtn = idVerificationForm.querySelector('.upload-btn');
        const idPreview = document.getElementById('idPreview');

        uploadBtn.addEventListener('click', () => idDocument.click());

        idDocument.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (validateFile(file)) {
                    previewFile(file, idPreview);
                    uploadBtn.textContent = 'Change File';
                } else {
                    showToast('Please select a valid file (JPG, PNG, PDF) under 5MB', 'error');
                    idDocument.value = '';
                }
            }
        });

        idVerificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateIDVerification()) {
                showNextStep('selfieVerificationForm');
                updateProgress(2);
            }
        });
    }

    // Selfie Verification Form
    const selfieVerificationForm = document.getElementById('selfieVerificationForm');
    if (selfieVerificationForm) {
        const captureBtn = document.getElementById('captureBtn');
        const retakeBtn = document.getElementById('retakeBtn');
        const selfiePreview = document.getElementById('selfiePreview');

        captureBtn.addEventListener('click', captureSelfie);
        retakeBtn.addEventListener('click', retakeSelfie);

        selfieVerificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateSelfie()) {
                showNextStep('verificationComplete');
                updateProgress(3);
                generateReferenceNumber();
            }
        });
    }
}

function initializeCamera() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const selfiePreview = document.getElementById('selfiePreview');
    const captureBtn = document.getElementById('captureBtn');
    const retakeBtn = document.getElementById('retakeBtn');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
                captureBtn.disabled = false;
            })
            .catch(function(error) {
                console.error('Camera access error:', error);
                showToast('Unable to access camera. Please check permissions.', 'error');
            });
    } else {
        showToast('Camera access is not supported in your browser.', 'error');
    }
}

function captureSelfie() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const selfiePreview = document.getElementById('selfiePreview');
    const captureBtn = document.getElementById('captureBtn');
    const retakeBtn = document.getElementById('retakeBtn');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    selfiePreview.src = canvas.toDataURL('image/jpeg');
    selfiePreview.style.display = 'block';
    video.style.display = 'none';
    captureBtn.style.display = 'none';
    retakeBtn.style.display = 'inline-block';
}

function retakeSelfie() {
    const video = document.getElementById('camera');
    const selfiePreview = document.getElementById('selfiePreview');
    const captureBtn = document.getElementById('captureBtn');
    const retakeBtn = document.getElementById('retakeBtn');

    video.style.display = 'block';
    selfiePreview.style.display = 'none';
    captureBtn.style.display = 'inline-block';
    retakeBtn.style.display = 'none';
}

function validatePersonalInfo() {
    const requiredFields = [
        'firstName', 'lastName', 'dateOfBirth', 'nationality',
        'address', 'city', 'state', 'zipCode', 'phone', 'email'
    ];

    for (const field of requiredFields) {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            showToast(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
            input.focus();
            return false;
        }
    }

    // Validate email format
    const email = document.getElementById('email').value;
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }

    // Validate phone format
    const phone = document.getElementById('phone').value;
    if (!isValidPhone(phone)) {
        showToast('Please enter a valid phone number', 'error');
        return false;
    }

    return true;
}

function validateIDVerification() {
    const idDocument = document.getElementById('idDocument');
    if (!idDocument.files.length) {
        showToast('Please upload your ID document', 'error');
        return false;
    }
    return true;
}

function validateSelfie() {
    const selfiePreview = document.getElementById('selfiePreview');
    if (selfiePreview.style.display === 'none') {
        showToast('Please take a selfie photo', 'error');
        return false;
    }
    return true;
}

function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
        return false;
    }

    if (file.size > maxSize) {
        return false;
    }

    return true;
}

function previewFile(file, previewElement) {
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewElement.src = e.target.result;
            previewElement.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        previewElement.style.display = 'none';
    }
}

function showNextStep(formId) {
    const currentForm = document.querySelector('.kyc-form-section:not([style*="display: none"])');
    const nextForm = document.getElementById(formId).parentElement;

    if (currentForm) {
        currentForm.style.display = 'none';
    }
    nextForm.style.display = 'block';
}

function updateProgress(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((s, index) => {
        if (index < step) {
            s.classList.add('completed');
            s.classList.remove('active');
        } else if (index === step) {
            s.classList.add('active');
            s.classList.remove('completed');
        } else {
            s.classList.remove('active', 'completed');
        }
    });
}

function generateReferenceNumber() {
    const referenceNumber = document.getElementById('referenceNumber');
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    referenceNumber.textContent = `KYC-${year}${month}${day}-${random}`;
}

function saveAndExit() {
    if (confirm('Are you sure you want to save and exit? Your progress will be saved.')) {
        // Here you would typically save the form data
        window.location.href = '../dashboard/dashboard.html';
    }
}

function previousStep() {
    const currentForm = document.querySelector('.kyc-form-section:not([style*="display: none"])');
    const previousForm = currentForm.previousElementSibling;
    
    if (previousForm && previousForm.classList.contains('kyc-form-section')) {
        currentForm.style.display = 'none';
        previousForm.style.display = 'block';
        updateProgress(getCurrentStep() - 1);
    }
}

function getCurrentStep() {
    const steps = document.querySelectorAll('.step');
    for (let i = 0; i < steps.length; i++) {
        if (steps[i].classList.contains('active')) {
            return i;
        }
    }
    return 0;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
}

function updateCurrentDate() {
    const submissionDate = document.getElementById('submissionDate');
    if (submissionDate) {
        const date = new Date();
        submissionDate.textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

function showToast(message, type = 'info') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: type === 'error' ? '#ef4444' : '#4f46e5',
        stopOnFocus: true
    }).showToast();
} 
// DOM Elements
const searchInput = document.getElementById('searchTransfers');
const currentDateSpan = document.getElementById('currentDate');
const transferForm = document.getElementById('transferForm');
const cancelTransferBtn = document.getElementById('cancelTransfer');
const transferOptions = document.querySelectorAll('.option-card');
const transfersList = document.querySelector('.transfers-list');

// State Management
let selectedTransferType = null;
let recentTransfers = [];
let html5QrCode = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    loadRecentTransfers();
    setupEventListeners();
    setMinDate();
});

// Set current date
function setCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateSpan.textContent = new Date().toLocaleDateString('en-US', options);
}

// Set minimum date for transfer date input
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('transferDate').min = today;
}

// Setup event listeners
function setupEventListeners() {
    // Transfer option cards
    transferOptions.forEach(option => {
        option.addEventListener('click', () => handleTransferOption(option));
    });

    // Form submission
    transferForm.addEventListener('submit', handleTransferSubmit);

    // Cancel button
    cancelTransferBtn.addEventListener('click', resetForm);

    // Search functionality
    searchInput.addEventListener('input', handleSearch);

    // Account selection validation
    document.getElementById('fromAccount').addEventListener('change', validateAccounts);
    document.getElementById('toAccount').addEventListener('change', validateAccounts);
}

// Handle transfer option selection
function handleTransferOption(option) {
    // Remove active class from all options
    transferOptions.forEach(opt => opt.classList.remove('active'));
    
    // Add active class to selected option
    option.classList.add('active');
    
    // Store selected transfer type
    selectedTransferType = option.id;
    
    // Show/hide relevant form fields based on transfer type
    updateFormFields(selectedTransferType);
    
    // Show the form container
    document.querySelector('.transfer-form-container').style.display = 'block';
}

// Update form fields based on transfer type
function updateFormFields(type) {
    const toAccountGroup = document.querySelector('.form-group:nth-child(2)');
    const descriptionGroup = document.querySelector('.form-group:nth-child(4)');
    const dateGroup = document.querySelector('.form-group:nth-child(5)');

    switch(type) {
        case 'internalTransfer':
            toAccountGroup.style.display = 'flex';
            descriptionGroup.style.display = 'flex';
            dateGroup.style.display = 'flex';
            break;
        case 'externalTransfer':
            toAccountGroup.style.display = 'flex';
            descriptionGroup.style.display = 'flex';
            dateGroup.style.display = 'flex';
            // Update to account options for external transfer
            updateExternalAccountOptions();
            break;
        case 'qrTransfer':
            toAccountGroup.style.display = 'none';
            descriptionGroup.style.display = 'flex';
            dateGroup.style.display = 'flex';
            // Show QR scanner interface
            showQRScanner();
            break;
        case 'scheduledTransfer':
            toAccountGroup.style.display = 'flex';
            descriptionGroup.style.display = 'flex';
            dateGroup.style.display = 'flex';
            // Update date input for scheduling
            updateDateInputForScheduling();
            break;
    }
}

// Update external account options
function updateExternalAccountOptions() {
    const toAccountSelect = document.getElementById('toAccount');
    toAccountSelect.innerHTML = `
        <option value="">Select Account</option>
        <option value="john-doe">John Doe (****4321)</option>
        <option value="jane-smith">Jane Smith (****8765)</option>
        <option value="bob-johnson">Bob Johnson (****2109)</option>
    `;
}

// Show QR scanner interface
function showQRScanner() {
    const modal = document.getElementById('qrScannerModal');
    const closeBtn = modal.querySelector('.close-modal');
    const scanOptions = modal.querySelectorAll('.scan-option');
    const qrReader = document.getElementById('qr-reader');
    const qrUploadSection = document.getElementById('qr-upload-section');
    const qrGenerateSection = document.getElementById('qr-generate-section');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('qrFileInput');
    
    // Show modal with animation
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize QR scanner if not already initialized
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("qr-reader");
    }
    
    // Handle scan options
    scanOptions.forEach(option => {
        option.addEventListener('click', () => {
            scanOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const selectedOption = option.dataset.option;
            
            // Hide all sections first
            qrReader.style.display = 'none';
            qrUploadSection.style.display = 'none';
            qrGenerateSection.style.display = 'none';
            
            // Show selected section
            switch(selectedOption) {
                case 'camera':
                    qrReader.style.display = 'block';
                    if (html5QrCode && html5QrCode.isScanning) {
                        html5QrCode.stop().then(() => {
                            startCameraScan();
                        }).catch(err => {
                            console.error("Error stopping scanner:", err);
                            startCameraScan();
                        });
                    } else {
                        startCameraScan();
                    }
                    break;
                case 'upload':
                    qrUploadSection.style.display = 'block';
                    if (html5QrCode && html5QrCode.isScanning) {
                        html5QrCode.stop().catch(err => {
                            console.error("Error stopping scanner:", err);
                        });
                    }
                    break;
                case 'generate':
                    qrGenerateSection.style.display = 'block';
                    if (html5QrCode && html5QrCode.isScanning) {
                        html5QrCode.stop().catch(err => {
                            console.error("Error stopping scanner:", err);
                        });
                    }
                    break;
            }
        });
    });
    
    // Start camera scan by default
    startCameraScan();
    
    // Handle file upload
    fileInput.addEventListener('change', handleFileUpload);
    
    // Handle drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleQRImage(file);
        } else {
            showQRResult('Please upload an image file', 'error');
        }
    });
    
    // Close button handler
    closeBtn.onclick = () => closeQRScanner();
    
    // Close on outside click
    modal.onclick = (event) => {
        if (event.target === modal) {
            closeQRScanner();
        }
    };
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeQRScanner();
        }
    });
}

// Start camera scan
function startCameraScan() {
    if (!html5QrCode) return;
    
    // If already scanning, don't start again
    if (html5QrCode.isScanning) return;
    
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop().then(() => {
                processQRCode(decodedText);
            }).catch(err => {
                console.error("Error stopping scanner:", err);
                processQRCode(decodedText);
            });
        }
    };
    
    const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
    };
    
    html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        (errorMessage) => {
            // Ignore errors during scanning
            console.debug("QR Scan error:", errorMessage);
        }
    ).catch(err => {
        console.error("Error starting scanner:", err);
        showQRResult('Failed to start camera. Please check camera permissions.', 'error');
    });
}

// Handle file upload
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            showQRResult('File size too large. Please upload a smaller image.', 'error');
            return;
        }
        handleQRImage(file);
    }
}

// Handle QR image
function handleQRImage(file) {
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("qr-reader");
    }
    
    // Show loading state
    showQRResult('Processing image...', 'info');
    
    // Stop camera scan if it's running
    if (html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            startFileScan(file);
        }).catch(err => {
            console.error("Error stopping camera scan:", err);
            startFileScan(file);
        });
    } else {
        startFileScan(file);
    }
}

// Start file scan
function startFileScan(file) {
    html5QrCode.scanFile(file, true)
        .then(decodedText => {
            processQRCode(decodedText);
        })
        .catch(err => {
            console.error("Error scanning file:", err);
            showQRResult('No QR code found in the image or invalid QR code format', 'error');
        });
}

// Process QR code
function processQRCode(decodedText) {
    try {
        // Parse QR code data (assuming JSON format)
        const qrData = JSON.parse(decodedText);
        
        // Validate QR data
        if (!validateQRData(qrData)) {
            showQRResult('Invalid QR code format. Please ensure the QR code contains valid transfer data.', 'error');
            return;
        }
        
        // Fill form with QR data
        fillFormWithQRData(qrData);
        
        // Show success message
        showQRResult('QR code scanned successfully!', 'success');
        
        // Close modal after delay
        setTimeout(() => {
            closeQRScanner();
        }, 1500);
        
    } catch (error) {
        console.error("Error processing QR code:", error);
        showQRResult('Invalid QR code data. Please ensure the QR code contains valid JSON data.', 'error');
    }
}

// Close QR scanner
function closeQRScanner() {
    const modal = document.getElementById('qrScannerModal');
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            cleanupQRScanner();
        }).catch(err => {
            console.error("Error stopping scanner:", err);
            cleanupQRScanner();
        });
    } else {
        cleanupQRScanner();
    }
}

// Cleanup QR scanner
function cleanupQRScanner() {
    const modal = document.getElementById('qrScannerModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('qr-reader-results').style.display = 'none';
    document.getElementById('qrFileInput').value = '';
    
    // Reset scan options
    const scanOptions = modal.querySelectorAll('.scan-option');
    scanOptions.forEach(opt => opt.classList.remove('active'));
    scanOptions[0].classList.add('active');
}

// Show QR result
function showQRResult(message, type) {
    const resultsDiv = document.getElementById('qr-reader-results');
    resultsDiv.textContent = message;
    resultsDiv.className = type;
    resultsDiv.style.display = 'block';
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            resultsDiv.style.display = 'none';
        }, 3000);
    }
}

function validateQRData(data) {
    // Check if data has required fields
    return data && 
           typeof data === 'object' && 
           'accountNumber' in data && 
           'accountName' in data && 
           'amount' in data;
}

function fillFormWithQRData(data) {
    // Fill the form with QR data
    document.getElementById('toAccount').value = `${data.accountName} (${data.accountNumber})`;
    document.getElementById('amount').value = data.amount;
    document.getElementById('description').value = data.description || 'QR Transfer';
    
    // Show the form container if it's hidden
    document.querySelector('.transfer-form-container').style.display = 'block';
}

// Update date input for scheduling
function updateDateInputForScheduling() {
    const dateInput = document.getElementById('transferDate');
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 3); // Allow scheduling up to 3 months ahead
    
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];
}

// Validate accounts
function validateAccounts() {
    const fromAccount = document.getElementById('fromAccount').value;
    const toAccount = document.getElementById('toAccount').value;
    
    if (fromAccount && toAccount && fromAccount === toAccount) {
        Toastify({
            text: "Cannot transfer to the same account",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#dc2626",
        }).showToast();
        
        document.getElementById('toAccount').value = '';
    }
}

// Handle transfer submission
function handleTransferSubmit(e) {
    e.preventDefault();
    
    if (!selectedTransferType) {
        Toastify({
            text: "Please select a transfer type first",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#dc2626",
        }).showToast();
        return;
    }

    const formData = {
        type: selectedTransferType,
        fromAccount: document.getElementById('fromAccount').value,
        toAccount: document.getElementById('toAccount').value,
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
        date: document.getElementById('transferDate').value
    };

    // Validate form data
    if (!validateFormData(formData)) return;

    // Process transfer
    processTransfer(formData);
}

// Validate form data
function validateFormData(data) {
    if (!data.fromAccount) {
        showError("Please select a source account");
        return false;
    }
    
    if (selectedTransferType !== 'qrTransfer' && !data.toAccount) {
        showError("Please select a destination account");
        return false;
    }
    
    if (!data.amount || data.amount <= 0) {
        showError("Please enter a valid amount");
        return false;
    }
    
    if (!data.date) {
        showError("Please select a transfer date");
        return false;
    }
    
    return true;
}

// Process transfer
function processTransfer(data) {
    // This would typically be an API call
    const transfer = {
        id: generateTransferId(),
        type: data.type,
        fromAccount: data.fromAccount,
        toAccount: data.toAccount,
        amount: parseFloat(data.amount),
        description: data.description,
        date: new Date(data.date),
        status: data.date === new Date().toISOString().split('T')[0] ? 'completed' : 'pending'
    };

    // Add to recent transfers
    recentTransfers.unshift(transfer);
    updateRecentTransfers();

    // Show success message
    Toastify({
        text: "Transfer processed successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#16a34a",
    }).showToast();

    // Reset form
    resetForm();
}

// Load recent transfers (mock data)
function loadRecentTransfers() {
    recentTransfers = [
        {
            id: 'TRF001',
            type: 'internalTransfer',
            fromAccount: 'Main Account',
            toAccount: 'Savings Account',
            amount: 500.00,
            description: 'Monthly savings transfer',
            date: new Date(),
            status: 'completed'
        },
        {
            id: 'TRF002',
            type: 'externalTransfer',
            fromAccount: 'Main Account',
            toAccount: 'John Doe',
            amount: 250.00,
            description: 'Rent payment',
            date: new Date(Date.now() - 86400000),
            status: 'completed'
        },
        {
            id: 'TRF003',
            type: 'scheduledTransfer',
            fromAccount: 'Savings Account',
            toAccount: 'Investment Account',
            amount: 1000.00,
            description: 'Investment contribution',
            date: new Date('2024-03-15'),
            status: 'pending'
        }
    ];

    updateRecentTransfers();
}

// Update recent transfers display
function updateRecentTransfers() {
    transfersList.innerHTML = recentTransfers.map(transfer => `
        <div class="transfer-item">
            <div class="transfer-icon">
                <i class="fas ${getTransferIcon(transfer.type)}"></i>
            </div>
            <div class="transfer-details">
                <h4>${getTransferTypeLabel(transfer.type)}</h4>
                <p>${formatTransferDetails(transfer)}</p>
                <span class="transfer-date">${formatTransferDate(transfer.date)}</span>
            </div>
            <div class="transfer-amount">
                <span class="amount">-${formatAmount(transfer.amount)}</span>
                <span class="status ${transfer.status}">${capitalizeFirst(transfer.status)}</span>
            </div>
        </div>
    `).join('');
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTransfers = recentTransfers.filter(transfer => 
        transfer.description.toLowerCase().includes(searchTerm) ||
        transfer.fromAccount.toLowerCase().includes(searchTerm) ||
        transfer.toAccount.toLowerCase().includes(searchTerm) ||
        transfer.id.toLowerCase().includes(searchTerm)
    );
    
    updateRecentTransfersDisplay(filteredTransfers);
}

// Update recent transfers display with filtered data
function updateRecentTransfersDisplay(transfers) {
    transfersList.innerHTML = transfers.map(transfer => `
        <div class="transfer-item">
            <div class="transfer-icon">
                <i class="fas ${getTransferIcon(transfer.type)}"></i>
            </div>
            <div class="transfer-details">
                <h4>${getTransferTypeLabel(transfer.type)}</h4>
                <p>${formatTransferDetails(transfer)}</p>
                <span class="transfer-date">${formatTransferDate(transfer.date)}</span>
            </div>
            <div class="transfer-amount">
                <span class="amount">-${formatAmount(transfer.amount)}</span>
                <span class="status ${transfer.status}">${capitalizeFirst(transfer.status)}</span>
            </div>
        </div>
    `).join('');
}

// Reset form
function resetForm() {
    transferForm.reset();
    selectedTransferType = null;
    transferOptions.forEach(opt => opt.classList.remove('active'));
    document.querySelector('.transfer-form-container').style.display = 'none';
}

// Utility functions
function generateTransferId() {
    return 'TRF' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function getTransferIcon(type) {
    const icons = {
        internalTransfer: 'fa-exchange-alt',
        externalTransfer: 'fa-user-friends',
        qrTransfer: 'fa-qrcode',
        scheduledTransfer: 'fa-calendar-alt'
    };
    return icons[type] || 'fa-money-bill-transfer';
}

function getTransferTypeLabel(type) {
    const labels = {
        internalTransfer: 'Internal Transfer',
        externalTransfer: 'External Transfer',
        qrTransfer: 'QR Transfer',
        scheduledTransfer: 'Scheduled Transfer'
    };
    return labels[type] || 'Transfer';
}

function formatTransferDetails(transfer) {
    if (transfer.type === 'externalTransfer') {
        return `To: ${transfer.toAccount}`;
    }
    return `${transfer.fromAccount} → ${transfer.toAccount}`;
}

function formatTransferDate(date) {
    const now = new Date();
    const transferDate = new Date(date);
    
    if (transferDate.toDateString() === now.toDateString()) {
        return `Today, ${transferDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (transferDate.toDateString() === yesterday.toDateString()) {
        return `Yesterday, ${transferDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    }
    
    return transferDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function formatAmount(amount) {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showError(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#dc2626",
    }).showToast();
}

// Generate QR Code for transfer
function generateTransferQR() {
    const accountNumber = document.getElementById('qrAccountNumber').value.trim();
    const accountName = document.getElementById('qrAccountName').value.trim();
    const amount = document.getElementById('qrAmount').value.trim();
    const description = document.getElementById('qrDescription').value.trim();
    
    // Validate inputs
    if (!accountNumber || !accountName || !amount) {
        showQRResult('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate amount
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
        showQRResult('Please enter a valid amount', 'error');
        return;
    }
    
    // Create QR code data
    const qrData = {
        accountNumber: accountNumber,
        accountName: accountName,
        amount: amountValue,
        description: description || 'QR Transfer'
    };
    
    try {
        // Clear previous QR code
        const qrContainer = document.getElementById('generated-qr');
        const qrCodeContainer = qrContainer.querySelector('.qr-code-container');
        const qrActions = qrContainer.querySelector('.qr-actions');
        
        qrCodeContainer.innerHTML = '';
        qrActions.innerHTML = '';
        
        // Generate QR code
        new QRCode(qrCodeContainer, {
            text: JSON.stringify(qrData),
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Add action buttons
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn download-btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download QR Code';
        downloadBtn.onclick = () => {
            const canvas = qrCodeContainer.querySelector('canvas');
            if (canvas) {
                const link = document.createElement('a');
                link.download = `transfer-qr-${accountNumber}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        };
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Data';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(JSON.stringify(qrData, null, 2))
                .then(() => {
                    showQRResult('QR data copied to clipboard!', 'success');
                })
                .catch(() => {
                    showQRResult('Failed to copy QR data', 'error');
                });
        };
        
        qrActions.appendChild(downloadBtn);
        qrActions.appendChild(copyBtn);
        
        // Show success message
        showQRResult('QR code generated successfully!', 'success');
        
    } catch (error) {
        console.error('Error generating QR code:', error);
        showQRResult('Failed to generate QR code', 'error');
    }
} 
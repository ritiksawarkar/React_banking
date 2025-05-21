document.addEventListener('DOMContentLoaded', () => {
    initializeLoanTypes();
    initializeLoanForm();
    initializeLoanFilters();
    updateCurrentDate();
});

function initializeLoanTypes() {
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const typeCard = button.closest('.type-card');
            const loanType = typeCard.getAttribute('data-type');
            showLoanForm(loanType);
        });
    });
}

function initializeLoanForm() {
    const loanForm = document.getElementById('loanForm');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelLoan');

    // Close form handlers
    [closeBtn, cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            hideLoanForm();
        });
    });

    // Form submission
    loanForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateLoanForm()) {
            processLoanApplication();
        }
    });

    // Dynamic loan term options based on loan type
    const loanTypeSelect = document.getElementById('loanType');
    const loanTermSelect = document.getElementById('loanTerm');

    loanTypeSelect.addEventListener('change', () => {
        updateLoanTermOptions(loanTypeSelect.value);
    });
}

function initializeLoanFilters() {
    const statusFilter = document.getElementById('loanStatus');
    statusFilter.addEventListener('change', () => {
        applyFilters();
    });
}

function showLoanForm(loanType) {
    const formContainer = document.querySelector('.loan-form-container');
    const loanTypeSelect = document.getElementById('loanType');
    
    // Set the selected loan type
    loanTypeSelect.value = loanType;
    updateLoanTermOptions(loanType);
    
    // Show the form
    formContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideLoanForm() {
    const formContainer = document.querySelector('.loan-form-container');
    const loanForm = document.getElementById('loanForm');
    
    // Hide the form
    formContainer.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset the form
    loanForm.reset();
}

function updateLoanTermOptions(loanType) {
    const loanTermSelect = document.getElementById('loanTerm');
    loanTermSelect.innerHTML = '<option value="">Select Term</option>';

    const terms = {
        'personal': [3, 5, 7],
        'home': [15, 20, 30],
        'car': [3, 5, 7],
        'business': [5, 7, 10]
    };

    const availableTerms = terms[loanType] || [];
    availableTerms.forEach(term => {
        const option = document.createElement('option');
        option.value = term;
        option.textContent = `${term} years`;
        loanTermSelect.appendChild(option);
    });
}

function validateLoanForm() {
    const form = document.getElementById('loanForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showToast('Please fill in all required fields', 'error');
            field.focus();
            return;
        }
    });

    // Validate loan amount
    const amount = parseFloat(document.getElementById('loanAmount').value);
    const loanType = document.getElementById('loanType').value;
    
    const minAmounts = {
        'personal': 1000,
        'home': 50000,
        'car': 5000,
        'business': 10000
    };

    const maxAmounts = {
        'personal': 50000,
        'home': 500000,
        'car': 100000,
        'business': 1000000
    };

    if (isNaN(amount) || amount < minAmounts[loanType] || amount > maxAmounts[loanType]) {
        isValid = false;
        showToast(`Loan amount must be between $${minAmounts[loanType].toLocaleString()} and $${maxAmounts[loanType].toLocaleString()}`, 'error');
        return;
    }

    // Validate monthly income
    const income = parseFloat(document.getElementById('income').value);
    if (isNaN(income) || income <= 0) {
        isValid = false;
        showToast('Please enter a valid monthly income', 'error');
        return;
    }

    return isValid;
}

function processLoanApplication() {
    const form = document.getElementById('loanForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    // Simulate API call
    setTimeout(() => {
        // Add new loan to the list
        addNewLoan({
            type: document.getElementById('loanType').value,
            amount: document.getElementById('loanAmount').value,
            term: document.getElementById('loanTerm').value,
            purpose: document.getElementById('purpose').value,
            status: 'pending'
        });

        // Reset form and show success message
        form.reset();
        hideLoanForm();
        showToast('Loan application submitted successfully', 'success');

        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
}

function addNewLoan(loan) {
    const loansList = document.querySelector('.loans-list');
    const loanItem = document.createElement('div');
    loanItem.className = 'loan-item';
    
    // Get loan icon
    const loanIcon = getLoanIcon(loan.type);
    
    loanItem.innerHTML = `
        <div class="loan-icon">
            <i class="fas ${loanIcon}"></i>
        </div>
        <div class="loan-details">
            <h4>${formatLoanType(loan.type)}</h4>
            <p>Loan ID: ${generateLoanId(loan.type)}</p>
            <div class="loan-progress">
                <div class="progress-bar">
                    <div class="progress" style="width: 0%"></div>
                </div>
                <span class="progress-text">0% Paid</span>
            </div>
        </div>
        <div class="loan-amount">
            <span class="amount">$${formatCurrency(loan.amount)}</span>
            <span class="status ${loan.status}">${loan.status}</span>
        </div>
    `;
    
    // Add to the beginning of the list
    loansList.insertBefore(loanItem, loansList.firstChild);
}

function applyFilters() {
    const statusFilter = document.getElementById('loanStatus').value;
    const loanItems = document.querySelectorAll('.loan-item');

    loanItems.forEach(item => {
        const status = item.querySelector('.status').textContent.toLowerCase();
        item.style.display = statusFilter === 'all' || status === statusFilter ? 'flex' : 'none';
    });
}

function getLoanIcon(type) {
    const icons = {
        'personal': 'fa-user',
        'home': 'fa-home',
        'car': 'fa-car',
        'business': 'fa-briefcase'
    };
    
    return icons[type] || 'fa-money-bill';
}

function formatLoanType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1) + ' Loan';
}

function generateLoanId(type) {
    const prefix = {
        'personal': 'PL',
        'home': 'HL',
        'car': 'AL',
        'business': 'BL'
    }[type] || 'LO';
    
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `${prefix}-${year}-${random}`;
}

function formatCurrency(amount) {
    return parseFloat(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function updateCurrentDate() {
    const dateElement = document.querySelector('.current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);
}

function showToast(message, type = 'info') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6',
    }).showToast();
} 
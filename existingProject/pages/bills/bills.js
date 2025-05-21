// DOM Elements
const searchInput = document.getElementById('searchBills');
const billForm = document.getElementById('billForm');
const cancelBillBtn = document.getElementById('cancelBill');
const billCategorySelect = document.getElementById('billCategory');
const billNameInput = document.getElementById('billName');
const amountInput = document.getElementById('amount');
const dueDateInput = document.getElementById('dueDate');
const paymentAccountSelect = document.getElementById('paymentAccount');
const billsList = document.querySelector('.bills-list');
const categoryCards = document.querySelectorAll('.category-card');
const currentDateElement = document.getElementById('currentDate');

// State
let bills = [];
let filteredBills = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    setMinDueDate();
    loadBills();
    setupEventListeners();
});

// Set current date
function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Set minimum due date to today
function setMinDueDate() {
    const today = new Date().toISOString().split('T')[0];
    dueDateInput.min = today;
}

// Event Listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);

    // Form submission
    billForm.addEventListener('submit', handleBillSubmit);

    // Cancel button
    cancelBillBtn.addEventListener('click', resetForm);

    // Category card selection
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.id;
            billCategorySelect.value = category;
            billCategorySelect.dispatchEvent(new Event('change'));
        });
    });

    // Category change
    billCategorySelect.addEventListener('change', handleCategoryChange);
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredBills = bills.filter(bill => 
        bill.name.toLowerCase().includes(searchTerm) ||
        bill.category.toLowerCase().includes(searchTerm)
    );
    updateBillsList();
}

// Handle bill submission
function handleBillSubmit(e) {
    e.preventDefault();

    // Form validation
    if (!validateForm()) {
        return;
    }

    const newBill = {
        id: generateBillId(),
        name: billNameInput.value,
        category: billCategorySelect.value,
        amount: parseFloat(amountInput.value),
        dueDate: dueDateInput.value,
        paymentAccount: paymentAccountSelect.value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    // Add to bills array
    bills.unshift(newBill);
    filteredBills = [...bills];

    // Update UI
    updateBillsList();
    resetForm();
    showToast('Bill added successfully!', 'success');
}

// Form validation
function validateForm() {
    if (!billCategorySelect.value) {
        showToast('Please select a category', 'error');
        return false;
    }
    if (!billNameInput.value.trim()) {
        showToast('Please enter a bill name', 'error');
        return false;
    }
    if (!amountInput.value || parseFloat(amountInput.value) <= 0) {
        showToast('Please enter a valid amount', 'error');
        return false;
    }
    if (!dueDateInput.value) {
        showToast('Please select a due date', 'error');
        return false;
    }
    if (!paymentAccountSelect.value) {
        showToast('Please select a payment account', 'error');
        return false;
    }
    return true;
}

// Handle category change
function handleCategoryChange(e) {
    const category = e.target.value;
    if (category) {
        // Update form fields based on category
        updateFormForCategory(category);
    }
}

// Update form fields based on category
function updateFormForCategory(category) {
    // Reset form
    billNameInput.value = '';
    amountInput.value = '';

    // Set default values based on category
    switch (category) {
        case 'utilities':
            billNameInput.placeholder = 'Enter utility provider name';
            break;
        case 'subscriptions':
            billNameInput.placeholder = 'Enter subscription service name';
            break;
        case 'rent':
            billNameInput.placeholder = 'Enter property name/address';
            break;
        case 'insurance':
            billNameInput.placeholder = 'Enter insurance provider name';
            break;
    }
}

// Reset form
function resetForm() {
    billForm.reset();
    billNameInput.placeholder = 'Enter bill name';
}

// Update bills list
function updateBillsList() {
    billsList.innerHTML = filteredBills.map(bill => createBillElement(bill)).join('');
}

// Create bill element
function createBillElement(bill) {
    const dueDate = new Date(bill.dueDate);
    const today = new Date();
    const isOverdue = dueDate < today && bill.status === 'pending';
    
    return `
        <div class="bill-item">
            <div class="bill-icon">
                <i class="fas ${getCategoryIcon(bill.category)}"></i>
            </div>
            <div class="bill-details">
                <h4>${bill.name}</h4>
                <p>${capitalizeFirstLetter(bill.category)}</p>
                <span class="bill-date">Due: ${formatDate(bill.dueDate)}</span>
            </div>
            <div class="bill-amount">
                <span class="amount">$${formatAmount(bill.amount)}</span>
                <span class="status ${isOverdue ? 'overdue' : bill.status}">
                    ${isOverdue ? 'Overdue' : capitalizeFirstLetter(bill.status)}
                </span>
            </div>
        </div>
    `;
}

// Load mock bills data
function loadBills() {
    // Mock data
    bills = [
        {
            id: '1',
            name: 'Electricity Bill',
            category: 'utilities',
            amount: 120.00,
            dueDate: new Date().toISOString().split('T')[0],
            paymentAccount: 'main',
            status: 'pending',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            name: 'Netflix Subscription',
            category: 'subscriptions',
            amount: 15.99,
            dueDate: '2024-03-15',
            paymentAccount: 'main',
            status: 'scheduled',
            createdAt: new Date().toISOString()
        },
        {
            id: '3',
            name: 'Rent Payment',
            category: 'rent',
            amount: 1200.00,
            dueDate: '2024-03-01',
            paymentAccount: 'main',
            status: 'completed',
            createdAt: new Date().toISOString()
        }
    ];
    
    filteredBills = [...bills];
    updateBillsList();
}

// Utility Functions
function generateBillId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
}

function formatAmount(amount) {
    return amount.toFixed(2);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCategoryIcon(category) {
    const icons = {
        utilities: 'fa-bolt',
        subscriptions: 'fa-tv',
        rent: 'fa-home',
        insurance: 'fa-shield-alt'
    };
    return icons[category] || 'fa-file-invoice-dollar';
}

function showToast(message, type = 'info') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#2563eb',
    }).showToast();
} 
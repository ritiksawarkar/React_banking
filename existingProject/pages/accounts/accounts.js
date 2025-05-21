// Accounts Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeAccounts();
    initializeModals();
    updateCurrentDate();
});

function initializeAccounts() {
    // Initialize account filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterAccounts(button.dataset.filter);
        });
    });

    // Initialize account actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const accountId = button.closest('.account-card').dataset.accountId;
            handleAccountAction(action, accountId);
        });
    });

    // Initialize new account form
    const newAccountForm = document.getElementById('newAccountForm');
    if (newAccountForm) {
        newAccountForm.addEventListener('submit', handleNewAccount);
    }

    // Initialize View All button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            window.location.href = '../transactions/transactions.html';
        });
    }
}

function filterAccounts(filter) {
    const accountCards = document.querySelectorAll('.account-card');
    accountCards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleAccountAction(action, accountId) {
    const accountCard = document.querySelector(`[data-account-id="${accountId}"]`);
    switch (action) {
        case 'view':
            viewAccountDetails(accountId);
            break;
        case 'transfer':
            initiateTransfer(accountId);
            break;
        case 'statement':
            generateStatement(accountId, accountCard.dataset.type);
            break;
    }
}

function viewAccountDetails(accountId) {
    try {
        // Get account card
        const accountCard = document.querySelector(`[data-account-id="${accountId}"]`);
        if (!accountCard) {
            throw new Error('Account not found');
        }

        // Get account details
        const accountType = accountCard.dataset.type;
        const accountNumber = accountCard.querySelector('.account-number').textContent;
        const balance = accountCard.querySelector('.balance .amount').textContent;
        const interestRate = accountCard.querySelector('.interest-rate .rate').textContent;

        // Update modal with account details
        document.getElementById('detailAccountType').textContent = accountType.charAt(0).toUpperCase() + accountType.slice(1);
        document.getElementById('detailAccountNumber').textContent = accountNumber;
        document.getElementById('detailBalance').textContent = balance;
        document.getElementById('detailInterestRate').textContent = interestRate;

        // Get additional account details (mock data for now)
        const accountDetails = getAccountDetails(accountId);
        
        // Update summary section
        document.getElementById('detailOpeningDate').textContent = accountDetails.openingDate;
        document.getElementById('detailLastTransaction').textContent = accountDetails.lastTransaction;
        document.getElementById('detailMonthlyInterest').textContent = accountDetails.monthlyInterest;
        document.getElementById('detailStatus').textContent = accountDetails.status;

        // Update recent activity
        updateRecentActivity(accountDetails.recentActivity);

        // Set up download statement button
        const downloadBtn = document.getElementById('downloadStatementBtn');
        downloadBtn.onclick = () => generateStatement(accountId, accountType);

        // Show the modal
        showModal('accountDetailsModal');
    } catch (error) {
        console.error('Error viewing account details:', error);
        showToast('Error loading account details', 'error');
    }
}

// Get account details (mock data for now)
function getAccountDetails(accountId) {
    // TODO: Replace with actual API call
    return {
        openingDate: 'January 15, 2024',
        lastTransaction: 'March 15, 2024',
        monthlyInterest: '$45.25',
        status: 'Active',
        recentActivity: [
            {
                icon: 'fa-briefcase',
                title: 'Salary Deposit',
                date: 'Mar 15, 2024',
                amount: '+$4,500.00',
                type: 'positive'
            },
            {
                icon: 'fa-shopping-cart',
                title: 'Grocery Store',
                date: 'Mar 10, 2024',
                amount: '-$120.50',
                type: 'negative'
            },
            {
                icon: 'fa-money-bill-transfer',
                title: 'Transfer to Savings',
                date: 'Mar 5, 2024',
                amount: '-$500.00',
                type: 'negative'
            },
            {
                icon: 'fa-percentage',
                title: 'Interest Earned',
                date: 'Mar 1, 2024',
                amount: '+$45.25',
                type: 'positive'
            }
        ]
    };
}

// Update recent activity list
function updateRecentActivity(activities) {
    const activityList = document.getElementById('detailRecentActivity');
    activityList.innerHTML = '';

    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-details">
                <h4>${activity.title}</h4>
                <p>${activity.date}</p>
            </div>
            <div class="activity-amount ${activity.type}">
                ${activity.amount}
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

function initiateTransfer(accountId) {
    // Navigate to transfer page with pre-selected account
    window.location.href = `../transfers/transfers.html?from=${accountId}`;
}

function handleNewAccount(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Validate form data
    if (!validateNewAccountForm(formData)) {
        return;
    }

    // Simulate API call to create new account
    showToast('Creating new account...', 'info');
    setTimeout(() => {
        // In a real application, this would send data to the server
        showToast('Account created successfully', 'success');
        hideModal('newAccountModal');
        form.reset();
        // Refresh account list
        refreshAccounts();
    }, 2000);
}

function validateNewAccountForm(formData) {
    const accountType = formData.get('accountType');
    const initialDeposit = formData.get('initialDeposit');
    const fundingAccount = formData.get('fundingAccount');

    if (!accountType) {
        showToast('Please select an account type', 'error');
        return false;
    }

    if (!initialDeposit || initialDeposit <= 0) {
        showToast('Please enter a valid initial deposit amount', 'error');
        return false;
    }

    if (!fundingAccount) {
        showToast('Please select a funding account', 'error');
        return false;
    }

    return true;
}

function refreshAccounts() {
    // Simulate API call to refresh account list
    showToast('Refreshing accounts...', 'info');
    setTimeout(() => {
        // In a real application, this would fetch updated data from the server
        showToast('Accounts refreshed successfully', 'success');
    }, 1000);
}

function initializeModals() {
    // Initialize new account modal
    const newAccountBtn = document.getElementById('openNewAccountBtn');
    const newAccountModal = document.getElementById('newAccountModal');
    const closeBtn = newAccountModal.querySelector('.close-btn');
    const cancelBtn = newAccountModal.querySelector('.btn-secondary');

    newAccountBtn.addEventListener('click', () => showModal('newAccountModal'));
    closeBtn.addEventListener('click', () => hideModal('newAccountModal'));
    cancelBtn.addEventListener('click', () => hideModal('newAccountModal'));

    // Initialize account details modal
    const accountDetailsModal = document.getElementById('accountDetailsModal');
    const detailsCloseBtn = accountDetailsModal.querySelector('.close-btn');
    const detailsCancelBtn = accountDetailsModal.querySelector('.btn-secondary');

    detailsCloseBtn.addEventListener('click', () => hideModal('accountDetailsModal'));
    detailsCancelBtn.addEventListener('click', () => hideModal('accountDetailsModal'));

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            hideModal(event.target.id);
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                hideModal(activeModal.id);
            }
        }
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // If it's the account details modal, clear the content
        if (modalId === 'accountDetailsModal') {
            clearAccountDetails();
        }
    }
}

function clearAccountDetails() {
    // Clear all detail fields
    const detailFields = [
        'detailAccountType',
        'detailAccountNumber',
        'detailBalance',
        'detailInterestRate',
        'detailOpeningDate',
        'detailLastTransaction',
        'detailMonthlyInterest',
        'detailStatus'
    ];

    detailFields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.textContent = '';
        }
    });

    // Clear recent activity
    const activityList = document.getElementById('detailRecentActivity');
    if (activityList) {
        activityList.innerHTML = '';
    }

    // Remove download statement button event listener
    const downloadBtn = document.getElementById('downloadStatementBtn');
    if (downloadBtn) {
        downloadBtn.onclick = null;
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateCurrentDate() {
    const currentDate = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('currentDate').textContent = formattedDate;
}

// Generate PDF Statement
async function generateStatement(accountId, accountType) {
    try {
        // Show loading toast
        showToast('Generating statement...', 'info');
        
        // Get account details
        const accountCard = document.querySelector(`[data-account-id="${accountId}"]`);
        const accountNumber = accountCard.querySelector('.account-number').textContent;
        const balance = accountCard.querySelector('.balance .amount').textContent;
        const interestRate = accountCard.querySelector('.interest-rate .rate').textContent;
        
        // Create PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add header
        doc.setFontSize(20);
        doc.text('FinVerse Bank Statement', 105, 20, { align: 'center' });
        
        // Add account details
        doc.setFontSize(12);
        doc.text('Account Details:', 20, 40);
        doc.setFontSize(10);
        doc.text(`Account Type: ${accountType.charAt(0).toUpperCase() + accountType.slice(1)}`, 20, 50);
        doc.text(`Account Number: ${accountNumber}`, 20, 60);
        doc.text(`Current Balance: ${balance}`, 20, 70);
        doc.text(`Interest Rate: ${interestRate}`, 20, 80);
        
        // Add statement period
        const today = new Date();
        const month = today.toLocaleString('default', { month: 'long' });
        const year = today.getFullYear();
        doc.text(`Statement Period: ${month} ${year}`, 20, 90);
        
        // Add transactions table
        const transactions = await getAccountTransactions(accountId);
        
        doc.autoTable({
            startY: 100,
            head: [['Date', 'Description', 'Type', 'Amount', 'Balance']],
            body: transactions.map(t => [
                t.date,
                t.description,
                t.type,
                t.amount,
                t.balance
            ]),
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] },
            styles: { fontSize: 8 }
        });
        
        // Add footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(
                'This is a computer-generated statement. No signature is required.',
                105,
                doc.internal.pageSize.height - 10,
                { align: 'center' }
            );
        }
        
        // Save the PDF
        doc.save(`statement_${accountId}_${month}_${year}.pdf`);
        
        showToast('Statement downloaded successfully!', 'success');
    } catch (error) {
        console.error('Error generating statement:', error);
        showToast('Error generating statement', 'error');
    }
}

// Get account transactions (mock data for now)
async function getAccountTransactions(accountId) {
    // TODO: Replace with actual API call
    return [
        {
            date: '2024-03-01',
            description: 'Salary Deposit',
            type: 'Credit',
            amount: '+$4,500.00',
            balance: '$15,500.00'
        },
        {
            date: '2024-03-05',
            description: 'Grocery Store',
            type: 'Debit',
            amount: '-$120.50',
            balance: '$15,379.50'
        },
        {
            date: '2024-03-10',
            description: 'Utility Bill',
            type: 'Debit',
            amount: '-$85.00',
            balance: '$15,294.50'
        },
        {
            date: '2024-03-15',
            description: 'Interest Earned',
            type: 'Credit',
            amount: '+$45.25',
            balance: '$15,339.75'
        }
    ];
} 
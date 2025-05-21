// DOM Elements
const searchInput = document.getElementById('searchTransactions');
const accountFilter = document.getElementById('accountFilter');
const typeFilter = document.getElementById('typeFilter');
const dateFilter = document.getElementById('dateFilter');
const exportBtn = document.getElementById('exportTransactions');
const transactionItems = document.querySelector('.transaction-items');
const pagination = document.querySelector('.pagination');
const currentDateSpan = document.getElementById('currentDate');

// Toast notification function
function showToast(message, type = 'info') {
    const toast = Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: type === 'error' ? '#dc2626' : 
                       type === 'success' ? '#059669' : 
                       type === 'warning' ? '#d97706' : '#3b82f6',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        }
    });
    toast.showToast();
}

// State Management
let currentPage = 1;
const itemsPerPage = 5;
let filteredTransactions = [];
let allTransactions = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    loadTransactions();
    setupEventListeners();
    initializeExportButton();
});

// Set current date
function setCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateSpan.textContent = new Date().toLocaleDateString('en-US', options);
}

// Load transactions (mock data for now)
function loadTransactions() {
    // This would typically be an API call
    allTransactions = [
        {
            id: '123456789',
            date: new Date(),
            description: 'Grocery Store',
            category: 'Shopping',
            account: 'Main Account',
            amount: -85.50,
            status: 'completed',
            icon: 'shopping-cart'
        },
        {
            id: '987654321',
            date: new Date(Date.now() - 86400000), // Yesterday
            description: 'Salary Deposit',
            category: 'Income',
            account: 'Main Account',
            amount: 3500.00,
            status: 'completed',
            icon: 'money-bill-wave'
        },
        {
            id: '456789123',
            date: new Date(Date.now() - 86400000), // Yesterday
            description: 'Restaurant',
            category: 'Food & Dining',
            account: 'Main Account',
            amount: -45.00,
            status: 'completed',
            icon: 'utensils'
        },
        {
            id: '789123456',
            date: new Date(Date.now() - 172800000), // 2 days ago
            description: 'Electricity Bill',
            category: 'Bills & Utilities',
            account: 'Main Account',
            amount: -120.00,
            status: 'completed',
            icon: 'bolt'
        },
        {
            id: '321654987',
            date: new Date(Date.now() - 259200000), // 3 days ago
            description: 'Course Payment',
            category: 'Education',
            account: 'Savings Account',
            amount: -299.99,
            status: 'completed',
            icon: 'graduation-cap'
        }
    ];

    filteredTransactions = [...allTransactions];
    updateTransactionList();
    updatePagination();
    updateSummary();
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    accountFilter.addEventListener('change', handleFilters);
    typeFilter.addEventListener('change', handleFilters);
    dateFilter.addEventListener('change', handleFilters);
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredTransactions = allTransactions.filter(transaction => 
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.category.toLowerCase().includes(searchTerm) ||
        transaction.account.toLowerCase().includes(searchTerm) ||
        transaction.id.includes(searchTerm)
    );
    currentPage = 1;
    updateTransactionList();
    updatePagination();
}

// Handle filters
function handleFilters() {
    const account = accountFilter.value;
    const type = typeFilter.value;
    const dateRange = dateFilter.value;

    filteredTransactions = allTransactions.filter(transaction => {
        const accountMatch = !account || transaction.account.toLowerCase().includes(account.toLowerCase());
        const typeMatch = !type || 
            (type === 'credit' && transaction.amount > 0) || 
            (type === 'debit' && transaction.amount < 0);
        const dateMatch = filterByDate(transaction.date, dateRange);
        
        return accountMatch && typeMatch && dateMatch;
    });

    currentPage = 1;
    updateTransactionList();
    updatePagination();
}

// Filter by date
function filterByDate(date, range) {
    if (!range) return true;
    
    const now = new Date();
    const transactionDate = new Date(date);
    
    switch(range) {
        case 'today':
            return transactionDate.toDateString() === now.toDateString();
        case 'week':
            const weekAgo = new Date(now.setDate(now.getDate() - 7));
            return transactionDate >= weekAgo;
        case 'month':
            const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
            return transactionDate >= monthAgo;
        case 'year':
            const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
            return transactionDate >= yearAgo;
        default:
            return true;
    }
}

// Update transaction list
function updateTransactionList() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(start, end);

    transactionItems.innerHTML = paginatedTransactions.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-date">
                <span class="date">${formatDate(transaction.date)}</span>
                <span class="time">${formatTime(transaction.date)}</span>
            </div>
            <div class="transaction-description">
                <div class="description-icon">
                    <i class="fas fa-${transaction.icon}"></i>
                </div>
                <div class="description-text">
                    <h4>${transaction.description}</h4>
                    <p>Transaction ID: #${transaction.id}</p>
                </div>
            </div>
            <div class="transaction-category">
                <span class="category-badge ${transaction.category.toLowerCase().replace(/\s+/g, '-')}">${transaction.category}</span>
            </div>
            <div class="transaction-account">
                ${transaction.account}
            </div>
            <div class="transaction-amount ${transaction.amount > 0 ? 'credit' : 'debit'}">
                ${formatAmount(transaction.amount)}
            </div>
            <div class="transaction-status">
                <span class="status-badge ${transaction.status}">${capitalizeFirst(transaction.status)}</span>
            </div>
        </div>
    `).join('');
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const maxVisiblePages = 3;
    
    let paginationHTML = `
        <button class="btn-page" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            paginationHTML += `
                <button class="btn-page ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (
            i === currentPage - 2 || 
            i === currentPage + 2
        ) {
            paginationHTML += `<span class="btn-page disabled">...</span>`;
        }
    }

    paginationHTML += `
        <button class="btn-page" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    if (page < 1 || page > Math.ceil(filteredTransactions.length / itemsPerPage)) return;
    currentPage = page;
    updateTransactionList();
    updatePagination();
}

// Update summary
function updateSummary() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const monthlyTransactions = allTransactions.filter(t => new Date(t.date) >= monthStart);
    
    const totalCredits = monthlyTransactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalDebits = monthlyTransactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const netBalance = totalCredits - totalDebits;

    document.querySelector('.summary-card:nth-child(1) .amount').textContent = formatAmount(totalCredits);
    document.querySelector('.summary-card:nth-child(2) .amount').textContent = formatAmount(-totalDebits);
    document.querySelector('.summary-card:nth-child(3) .amount').textContent = formatAmount(netBalance);
}

// Initialize export button
function initializeExportButton() {
    const exportBtn = document.getElementById('exportTransactions');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportTransactionsToPDF);
    }
}

// Export transactions to PDF
async function exportTransactionsToPDF() {
    try {
        showToast('Generating PDF...', 'info');
        
        // Get current filter values
        const accountFilter = document.getElementById('accountFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        const dateFilter = document.getElementById('dateFilter').value;
        
        // Create PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add header
        doc.setFontSize(20);
        doc.text('FinVerse Transaction Report', 105, 20, { align: 'center' });
        
        // Add filter information
        doc.setFontSize(12);
        doc.text('Report Filters:', 20, 35);
        doc.setFontSize(10);
        doc.text(`Account: ${accountFilter || 'All Accounts'}`, 20, 45);
        doc.text(`Type: ${typeFilter || 'All Types'}`, 20, 55);
        doc.text(`Date Range: ${dateFilter || 'All Time'}`, 20, 65);
        
        // Add summary information
        const summaryCards = document.querySelectorAll('.summary-card');
        const summaryData = Array.from(summaryCards).map(card => ({
            title: card.querySelector('h3').textContent,
            amount: card.querySelector('.amount').textContent,
            period: card.querySelector('.period').textContent
        }));
        
        doc.text('Summary:', 20, 80);
        summaryData.forEach((summary, index) => {
            doc.text(`${summary.title}: ${summary.amount} (${summary.period})`, 20, 90 + (index * 10));
        });
        
        // Get transactions data from the current filtered transactions
        const transactions = filteredTransactions.map(t => ({
            date: `${formatDate(t.date)} ${formatTime(t.date)}`,
            description: t.description,
            category: t.category,
            account: t.account,
            amount: formatAmount(t.amount),
            status: capitalizeFirst(t.status)
        }));
        
        // Add transactions table
        doc.autoTable({
            startY: 130,
            head: [['Date', 'Description', 'Category', 'Account', 'Amount', 'Status']],
            body: transactions.map(t => [
                t.date,
                t.description,
                t.category,
                t.account,
                t.amount,
                t.status
            ]),
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] },
            styles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 25 }, // Date
                1: { cellWidth: 40 }, // Description
                2: { cellWidth: 25 }, // Category
                3: { cellWidth: 25 }, // Account
                4: { cellWidth: 25 }, // Amount
                5: { cellWidth: 25 }  // Status
            }
        });
        
        // Add footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(
                'This is a computer-generated report. No signature is required.',
                105,
                doc.internal.pageSize.height - 10,
                { align: 'center' }
            );
        }
        
        // Generate filename
        const date = new Date();
        const filename = `transactions_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}.pdf`;
        
        // Save the PDF
        doc.save(filename);
        
        showToast('Transaction report downloaded successfully!', 'success');
    } catch (error) {
        console.error('Error exporting transactions:', error);
        showToast('Error generating transaction report', 'error');
    }
}

// Utility functions
function formatDate(date) {
    const now = new Date();
    const transactionDate = new Date(date);
    
    if (transactionDate.toDateString() === now.toDateString()) {
        return 'Today';
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (transactionDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }
    
    const diffDays = Math.floor((now - transactionDate) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
        return `${diffDays} days ago`;
    }
    
    return transactionDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function formatAmount(amount) {
    return (amount > 0 ? '+' : '') + amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Make functions available globally
window.changePage = changePage; 
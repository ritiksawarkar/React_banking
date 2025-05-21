// DOM Elements
const searchInput = document.getElementById('searchCreditScore');
const reportPeriod = document.getElementById('reportPeriod');
const currentDateElement = document.getElementById('currentDate');
const lastUpdatedElement = document.getElementById('lastUpdated');

// State
let creditScore = 750;
let creditFactors = [
    { name: 'Payment History', score: 95, icon: 'history' },
    { name: 'Credit Utilization', score: 75, icon: 'percentage' },
    { name: 'Credit History', score: 85, icon: 'clock' }
];

let creditReports = [
    {
        id: 1,
        type: 'Loan Payment',
        description: 'Home Loan - March 2024',
        date: '2024-03-15',
        status: 'On Time',
        icon: 'check-circle'
    },
    {
        id: 2,
        type: 'Credit Card Payment',
        description: 'Visa Card - March 2024',
        date: '2024-03-10',
        status: 'On Time',
        icon: 'check-circle'
    },
    {
        id: 3,
        type: 'Credit Limit Increase',
        description: 'Visa Card - March 2024',
        date: '2024-03-05',
        status: 'Approved',
        icon: 'arrow-up'
    }
];

let creditTips = [
    {
        title: 'Pay on Time',
        description: 'Always pay your bills and loans on time to maintain a good payment history.',
        icon: 'clock'
    },
    {
        title: 'Keep Utilization Low',
        description: 'Try to keep your credit utilization below 30% of your available credit.',
        icon: 'percentage'
    },
    {
        title: 'Maintain Old Accounts',
        description: 'Keep old credit accounts open to maintain a longer credit history.',
        icon: 'history'
    }
];

// Initialize the page
function initializePage() {
    setCurrentDate();
    updateCreditScore();
    updateCreditFactors();
    updateCreditReports();
    updateCreditTips();
    setupEventListeners();
}

// Set current date
function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    lastUpdatedElement.textContent = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Update credit score display
function updateCreditScore() {
    const scoreElement = document.querySelector('.score');
    const scoreLabel = document.querySelector('.score-label');
    
    scoreElement.textContent = creditScore;
    
    // Update score label based on score range
    if (creditScore >= 800) {
        scoreLabel.textContent = 'Excellent';
    } else if (creditScore >= 750) {
        scoreLabel.textContent = 'Very Good';
    } else if (creditScore >= 700) {
        scoreLabel.textContent = 'Good';
    } else if (creditScore >= 650) {
        scoreLabel.textContent = 'Fair';
    } else {
        scoreLabel.textContent = 'Poor';
    }
}

// Update credit factors
function updateCreditFactors() {
    const factorsContainer = document.querySelector('.score-factors');
    factorsContainer.innerHTML = '';

    creditFactors.forEach(factor => {
        const factorElement = document.createElement('div');
        factorElement.className = 'factor';
        factorElement.innerHTML = `
            <i class="fas fa-${factor.icon}"></i>
            <div class="factor-details">
                <h4>${factor.name}</h4>
                <div class="progress-bar">
                    <div class="progress" style="width: ${factor.score}%"></div>
                </div>
                <span class="factor-score">${factor.score}%</span>
            </div>
        `;
        factorsContainer.appendChild(factorElement);
    });
}

// Update credit reports
function updateCreditReports() {
    const reportsContainer = document.querySelector('.report-items');
    reportsContainer.innerHTML = '';

    creditReports.forEach(report => {
        const reportElement = document.createElement('div');
        reportElement.className = 'report-item';
        reportElement.innerHTML = `
            <div class="item-icon">
                <i class="fas fa-${report.icon}"></i>
            </div>
            <div class="item-details">
                <h4>${report.type}</h4>
                <p>${report.description}</p>
                <span class="item-date">${formatDate(report.date)}</span>
            </div>
            <div class="item-status positive">
                <span>${report.status}</span>
            </div>
        `;
        reportsContainer.appendChild(reportElement);
    });
}

// Update credit tips
function updateCreditTips() {
    const tipsContainer = document.querySelector('.tips-grid');
    tipsContainer.innerHTML = '';

    creditTips.forEach(tip => {
        const tipElement = document.createElement('div');
        tipElement.className = 'tip-card';
        tipElement.innerHTML = `
            <i class="fas fa-${tip.icon}"></i>
            <h4>${tip.title}</h4>
            <p>${tip.description}</p>
        `;
        tipsContainer.appendChild(tipElement);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);

    // Report period filter
    reportPeriod.addEventListener('change', handleReportPeriodChange);
}

// Handle search
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredReports = creditReports.filter(report => 
        report.type.toLowerCase().includes(searchTerm) ||
        report.description.toLowerCase().includes(searchTerm)
    );

    const reportsContainer = document.querySelector('.report-items');
    reportsContainer.innerHTML = '';

    if (filteredReports.length === 0) {
        reportsContainer.innerHTML = `
            <div class="no-results">
                <p>No reports found matching "${searchTerm}"</p>
            </div>
        `;
        return;
    }

    filteredReports.forEach(report => {
        const reportElement = document.createElement('div');
        reportElement.className = 'report-item';
        reportElement.innerHTML = `
            <div class="item-icon">
                <i class="fas fa-${report.icon}"></i>
            </div>
            <div class="item-details">
                <h4>${report.type}</h4>
                <p>${report.description}</p>
                <span class="item-date">${formatDate(report.date)}</span>
            </div>
            <div class="item-status positive">
                <span>${report.status}</span>
            </div>
        `;
        reportsContainer.appendChild(reportElement);
    });
}

// Handle report period change
function handleReportPeriodChange(event) {
    const days = parseInt(event.target.value);
    const now = new Date();
    const filteredReports = creditReports.filter(report => {
        const reportDate = new Date(report.date);
        const diffTime = Math.abs(now - reportDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
    });

    const reportsContainer = document.querySelector('.report-items');
    reportsContainer.innerHTML = '';

    if (filteredReports.length === 0) {
        reportsContainer.innerHTML = `
            <div class="no-results">
                <p>No reports found for the selected period</p>
            </div>
        `;
        return;
    }

    filteredReports.forEach(report => {
        const reportElement = document.createElement('div');
        reportElement.className = 'report-item';
        reportElement.innerHTML = `
            <div class="item-icon">
                <i class="fas fa-${report.icon}"></i>
            </div>
            <div class="item-details">
                <h4>${report.type}</h4>
                <p>${report.description}</p>
                <span class="item-date">${formatDate(report.date)}</span>
            </div>
            <div class="item-status positive">
                <span>${report.status}</span>
            </div>
        `;
        reportsContainer.appendChild(reportElement);
    });
}

// Utility function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Show toast notification
function showToast(message, type = 'success') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: type === 'success' ? '#16a34a' : '#dc2626',
    }).showToast();
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage); 
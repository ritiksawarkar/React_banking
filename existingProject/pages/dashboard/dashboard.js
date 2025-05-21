// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize auth state observer
    auth.initializeAuthStateObserver();
    initializeDashboard();
});

async function initializeDashboard() {
    try {
        // Initialize sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                document.querySelector('.dashboard-container').classList.toggle('sidebar-collapsed');
            });
        }

        // Set current date and update every minute
        updateCurrentDate();
        setInterval(updateCurrentDate, 60000);

        // Initialize notification button
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                window.location.href = '/pages/notifications/notifications.html';
            });
        }

        // Initialize user menu
        initializeUserMenu();

        // Initialize quick actions
        initializeQuickActions();

        // Initialize search functionality
        initializeSearch();

        // Initialize navigation links
        initializeNavigation();

        // Initialize notification badge
        updateNotificationCount();

        // Initialize charts
        initializeCharts();
    } catch (error) {
        console.error('Dashboard initialization error:', error);
        showToast('Error initializing dashboard', 'error');
    }
}

function showToast(message, type = 'info') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: type === 'success' ? '#10b981' : 
                        type === 'error' ? '#ef4444' : 
                        type === 'warning' ? '#f59e0b' : '#3b82f6',
    }).showToast();
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Spending Chart
function initializeSpendingChart() {
    const ctx = document.getElementById('spendingChart').getContext('2d');
    
    const spendingData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Spending',
            data: [150, 230, 180, 290, 200, 250, 300],
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: spendingData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Weekly Spending',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize Income Chart
function initializeIncomeChart() {
    const ctx = document.getElementById('incomeChart').getContext('2d');
    
    const incomeData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Income',
            data: [3000, 3500, 3200, 3800, 3600, 4000],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: incomeData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Income',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize Period Selector
function initializePeriodSelector() {
    const periodButtons = document.querySelectorAll('.period-selector button');
    
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            periodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update charts based on selected period
            updateCharts(this.textContent.toLowerCase());
        });
    });
}

// Update Charts based on selected period
function updateCharts(period) {
    // This function would typically fetch new data from the server
    // For now, we'll just show a toast notification
    Toastify({
        text: `Updating charts for ${period}ly view...`,
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "var(--primary-color)"
    }).showToast();
}

// Initialize Quick Actions
function initializeQuickActions() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            
            switch(action) {
                case 'Transfer':
                    window.location.href = '../transfers/transfers.html';
                    break;
                case 'Pay Bills':
                    window.location.href = '../bills/bills.html';
                    break;
                case 'Scan QR':
                    // Implement QR scanner functionality
                    Toastify({
                        text: "QR Scanner coming soon!",
                        duration: 2000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "var(--info-color)"
                    }).showToast();
                    break;
                case 'More':
                    // Show more actions menu
                    Toastify({
                        text: "More actions menu coming soon!",
                        duration: 2000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "var(--info-color)"
                    }).showToast();
                    break;
            }
        });
    });
}

// Initialize Notifications
function initializeNotifications() {
    const notificationBell = document.querySelector('.notifications');
    
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            // Show notifications panel
            Toastify({
                text: "Notifications panel coming soon!",
                duration: 2000,
                gravity: "top",
                position: "right",
                backgroundColor: "var(--info-color)"
            }).showToast();
        });
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Update current date
function updateCurrentDate() {
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        dateElement.textContent = formatDate(new Date());
    }
}

// Call updateCurrentDate on page load
updateCurrentDate(); 

async function updateNotificationCount() {
    try {
        // TODO: Replace with actual API call
        const count = 3; // Placeholder
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    } catch (error) {
        console.error('Error updating notification count:', error);
    }
}

function initializeCharts() {
    if (document.getElementById('spendingChart')) {
        initializeSpendingChart();
    }
    if (document.getElementById('incomeChart')) {
        initializeIncomeChart();
    }
}

// Initialize User Menu
function initializeUserMenu() {
    // Add sign out functionality
    const logoutLinks = document.querySelectorAll('.logout-link, .logout-btn');
    logoutLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await auth.signOut();
            } catch (error) {
                console.error('Sign out error:', error);
            }
        });
    });

    // Toggle user dropdown
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = userMenu.querySelector('.user-dropdown');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (userMenu && !userMenu.contains(e.target)) {
            const dropdown = userMenu.querySelector('.user-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        }
    });
}

// Initialize Search
function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            if (e.key === 'Enter' && searchTerm) {
                window.location.href = `../transactions/transactions.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
}

// Initialize Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
} 
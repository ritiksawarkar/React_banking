// DOM Elements
const searchNotifications = document.getElementById('searchNotifications');
const currentDateElement = document.getElementById('currentDate');
const filterButtons = document.querySelectorAll('.filter-btn');
const notificationsList = document.querySelector('.notifications-list');
const loadMoreBtn = document.querySelector('.load-more-btn');
const refreshBtn = document.querySelector('.refresh-btn');
const userMenu = document.getElementById('userMenu');
const sidebarToggle = document.getElementById('sidebarToggle');

// State Management
let notifications = [
    {
        id: 1,
        type: 'transactions',
        title: 'Transfer Successful',
        message: 'Your transfer of $500 to Jane Smith has been completed successfully.',
        time: '2 hours ago',
        isRead: false,
        icon: 'fa-money-bill-transfer',
        actions: ['mark-read', 'view-details']
    },
    {
        id: 2,
        type: 'security',
        title: 'Security Alert',
        message: 'New login detected from a new device. Please verify if this was you.',
        time: '5 hours ago',
        isRead: true,
        icon: 'fa-shield-alt',
        actions: ['verify', 'report']
    },
    {
        id: 3,
        type: 'system',
        title: 'System Update',
        message: 'New features have been added to your FinVerse account. Check them out!',
        time: '1 day ago',
        isRead: true,
        icon: 'fa-cog',
        actions: ['learn-more']
    },
    {
        id: 4,
        type: 'transactions',
        title: 'Payment Received',
        message: 'You have received a payment of $1,200 from ABC Company.',
        time: '2 days ago',
        isRead: true,
        icon: 'fa-credit-card',
        actions: ['view-details']
    }
];

let currentFilter = 'all';
let displayedNotifications = [...notifications];
let isLoading = false;

// Initialize Page
function initializePage() {
    setCurrentDate();
    setupEventListeners();
    updateNotificationBadge();
    loadNotificationsFromStorage();
}

// Set Current Date
function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    searchNotifications.addEventListener('input', handleSearch);

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => handleFilter(btn.dataset.filter));
    });

    // Load more button
    loadMoreBtn.addEventListener('click', handleLoadMore);

    // Refresh button
    refreshBtn.addEventListener('click', handleRefresh);

    // Action buttons
    notificationsList.addEventListener('click', handleNotificationAction);

    // User menu
    document.addEventListener('click', handleUserMenuClick);

    // Sidebar toggle
    sidebarToggle.addEventListener('click', toggleSidebar);

    // Window resize
    window.addEventListener('resize', handleWindowResize);
}

// Handle Search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredNotifications = notifications.filter(notification => {
        const matchesFilter = currentFilter === 'all' || 
            (currentFilter === 'unread' && !notification.isRead) ||
            notification.type === currentFilter;

        const matchesSearch = notification.title.toLowerCase().includes(searchTerm) ||
            notification.message.toLowerCase().includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    updateNotificationsList(filteredNotifications);
}

// Handle Filter
function handleFilter(filter) {
    currentFilter = filter;
    
    // Update active filter button
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    // Filter notifications
    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !notification.isRead;
        return notification.type === filter;
    });

    updateNotificationsList(filteredNotifications);
}

// Handle Load More
async function handleLoadMore() {
    if (isLoading) return;
    
    isLoading = true;
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newNotifications = [
            {
                id: notifications.length + 1,
                type: 'transactions',
                title: 'Monthly Statement',
                message: 'Your monthly statement for March 2024 is now available.',
                time: '3 days ago',
                isRead: true,
                icon: 'fa-file-invoice',
                actions: ['view-details']
            },
            {
                id: notifications.length + 2,
                type: 'system',
                title: 'Maintenance Notice',
                message: 'Scheduled maintenance will occur on April 1st, 2024 from 2 AM to 4 AM EST.',
                time: '4 days ago',
                isRead: true,
                icon: 'fa-tools',
                actions: ['learn-more']
            }
        ];

        notifications = [...notifications, ...newNotifications];
        displayedNotifications = [...displayedNotifications, ...newNotifications];
        updateNotificationsList(displayedNotifications);
        saveNotificationsToStorage();
        showToast('More notifications loaded', 'success');
    } catch (error) {
        showToast('Failed to load more notifications', 'error');
    } finally {
        isLoading = false;
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Load More Notifications';
    }
}

// Handle Refresh
async function handleRefresh() {
    if (isLoading) return;
    
    isLoading = true;
    refreshBtn.disabled = true;
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update notification times
        notifications = notifications.map(notification => ({
            ...notification,
            time: updateNotificationTime(notification.time)
        }));

        updateNotificationsList(displayedNotifications);
        saveNotificationsToStorage();
        showToast('Notifications refreshed', 'success');
    } catch (error) {
        showToast('Failed to refresh notifications', 'error');
    } finally {
        isLoading = false;
        refreshBtn.disabled = false;
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
    }
}

// Handle Notification Action
function handleNotificationAction(e) {
    const actionBtn = e.target.closest('.action-btn');
    if (!actionBtn) return;

    const notificationItem = actionBtn.closest('.notification-item');
    const notificationId = parseInt(notificationItem.dataset.id);

    switch (actionBtn.classList[1]) {
        case 'mark-read':
            markAsRead(notificationId);
            break;
        case 'view-details':
            viewDetails(notificationId);
            break;
        case 'verify':
            verifyLogin(notificationId);
            break;
        case 'report':
            reportIssue(notificationId);
            break;
        case 'learn-more':
            learnMore(notificationId);
            break;
    }
}

// Notification Actions
function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.isRead = true;
        updateNotificationsList(displayedNotifications);
        updateNotificationBadge();
        saveNotificationsToStorage();
        showToast('Notification marked as read', 'success');
    }
}

function viewDetails(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        showToast('Viewing notification details...', 'info');
        // Implement view details functionality
        // For example, open a modal with more details
    }
}

function verifyLogin(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        showToast('Verifying login attempt...', 'info');
        // Implement login verification
        // For example, show a verification modal
    }
}

function reportIssue(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        showToast('Reporting suspicious activity...', 'info');
        // Implement issue reporting
        // For example, open a report form
    }
}

function learnMore(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        showToast('Loading more information...', 'info');
        // Implement learn more functionality
        // For example, redirect to a feature page
    }
}

// Update Notifications List
function updateNotificationsList(notificationsToShow) {
    notificationsList.innerHTML = notificationsToShow.map(notification => `
        <div class="notification-item ${notification.isRead ? '' : 'unread'}" data-id="${notification.id}" data-type="${notification.type}">
            <div class="notification-icon">
                <i class="fas ${notification.icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-header">
                    <h3>${notification.title}</h3>
                    <span class="notification-time">${notification.time}</span>
                </div>
                <p>${notification.message}</p>
                <div class="notification-actions">
                    ${notification.actions.map(action => `
                        <button class="action-btn ${action}">${formatActionText(action)}</button>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Update Notification Badge
function updateNotificationBadge() {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const badge = document.querySelector('.notification-badge');
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}

// Handle User Menu Click
function handleUserMenuClick(e) {
    if (!userMenu.contains(e.target)) {
        userMenu.classList.remove('active');
    }
}

// Toggle Sidebar
function toggleSidebar() {
    document.body.classList.toggle('sidebar-collapsed');
}

// Handle Window Resize
function handleWindowResize() {
    if (window.innerWidth <= 1024) {
        document.body.classList.add('sidebar-collapsed');
    } else {
        document.body.classList.remove('sidebar-collapsed');
    }
}

// Storage Functions
function saveNotificationsToStorage() {
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

function loadNotificationsFromStorage() {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
        notifications = JSON.parse(storedNotifications);
        displayedNotifications = [...notifications];
        updateNotificationsList(displayedNotifications);
    }
}

// Utility Functions
function formatActionText(action) {
    return action.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function updateNotificationTime(time) {
    // This is a simple implementation. In a real app, you'd want to update
    // the relative time (e.g., "2 hours ago") based on the actual timestamp
    return time;
}

function showToast(message, type = 'info') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: type === 'error' ? '#dc2626' : 
                        type === 'success' ? '#16a34a' : '#2563eb',
        stopOnFocus: true
    }).showToast();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', initializePage);

// Handle notification actions
function handleNotificationAction(action, notificationId) {
    switch (action) {
        case 'view-details':
            // Navigate to the appropriate page based on notification type
            const notification = notifications.find(n => n.id === notificationId);
            if (notification) {
                switch (notification.type) {
                    case 'dashboard':
                        window.location.href = '/pages/dashboard/dashboard.html';
                        break;
                    case 'account':
                        window.location.href = '/pages/account/account.html';
                        break;
                    case 'transaction':
                        window.location.href = '/pages/transaction/transaction.html';
                        break;
                    case 'transfer':
                        window.location.href = '/pages/transfer/transfer.html';
                        break;
                    default:
                        showToast('Page not found', 'error');
                }
            }
            break;
        case 'verify':
            showToast('Verification process initiated', 'success');
            break;
        case 'learn-more':
            showToast('More information will be displayed', 'info');
            break;
        case 'report':
            showToast('Issue reported successfully', 'success');
            break;
    }
}

// Update notification item HTML to include proper links
function createNotificationItem(notification) {
    const timeAgo = getTimeAgo(notification.time);
    const actionText = getActionText(notification.action);
    
    return `
        <div class="notification-item ${notification.unread ? 'unread' : ''}" data-id="${notification.id}">
            <div class="notification-icon">
                <i class="fas ${getNotificationIcon(notification.type)}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-header">
                    <h3>${notification.title}</h3>
                    <span class="notification-time">${timeAgo}</span>
                </div>
                <p>${notification.message}</p>
                <div class="notification-actions">
                    ${notification.unread ? `
                        <button class="action-btn mark-read" onclick="markAsRead(${notification.id})">
                            <i class="fas fa-check"></i> Mark as Read
                        </button>
                    ` : ''}
                    <button class="action-btn view-details" onclick="handleNotificationAction('view-details', ${notification.id})">
                        <i class="fas fa-external-link-alt"></i> View Details
                    </button>
                    ${notification.action === 'verify' ? `
                        <button class="action-btn verify" onclick="handleNotificationAction('verify', ${notification.id})">
                            <i class="fas fa-shield-alt"></i> Verify Login
                        </button>
                    ` : ''}
                    ${notification.action === 'report' ? `
                        <button class="action-btn report" onclick="handleNotificationAction('report', ${notification.id})">
                            <i class="fas fa-flag"></i> Report Issue
                        </button>
                    ` : ''}
                    ${notification.action === 'learn' ? `
                        <button class="action-btn learn-more" onclick="handleNotificationAction('learn-more', ${notification.id})">
                            <i class="fas fa-info-circle"></i> Learn More
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Add navigation links to sidebar
document.addEventListener('DOMContentLoaded', function() {
    // Add navigation links
    const navLinks = [
        { href: '/pages/dashboard/dashboard.html', icon: 'fas fa-home', text: 'Dashboard' },
        { href: '/pages/account/account.html', icon: 'fas fa-wallet', text: 'Account' },
        { href: '/pages/transaction/transaction.html', icon: 'fas fa-exchange-alt', text: 'Transactions' },
        { href: '/pages/transfer/transfer.html', icon: 'fas fa-money-bill-wave', text: 'Transfer' },
        { href: '/pages/notifications/notifications.html', icon: 'fas fa-bell', text: 'Notifications', active: true }
    ];

    const navList = document.querySelector('.sidebar-nav ul');
    navList.innerHTML = navLinks.map(link => `
        <li class="${link.active ? 'active' : ''}">
            <a href="${link.href}">
                <i class="${link.icon}"></i>
                <span>${link.text}</span>
            </a>
        </li>
    `).join('');

    // ... rest of the existing code ...
}); 
# FinVerse - All-in-One Digital Banking Platform

FinVerse is a comprehensive digital banking platform built with HTML, CSS, and JavaScript. It provides users with a seamless banking experience, featuring account management, transaction tracking, fund transfers, bill payments, and more.

## Features

- **User Dashboard**: Interactive dashboard with account overview and financial insights
- **Account Management**: View and manage multiple accounts
- **Transaction History**: Detailed history with filtering and search capabilities
- **Fund Transfers**: Transfer funds between accounts or to other users
- **Bill Payments**: Pay bills and schedule recurring payments
- **Credit Score Monitoring**: Track and improve credit score
- **KYC Verification**: Upload and verify identity documents with OCR technology
- **Loan & EMI Calculator**: Calculate loan amounts and EMI payments
- **Notifications**: Real-time alerts for account activities

## Technologies Used

- **HTML5/CSS3/JavaScript**: Core technologies for UI, validation, and logic
- **Chart.js**: Data visualization for financial insights
- **Toastify**: Notification system
- **Tesseract.js**: OCR for document verification
- **Luxon.js**: Date and time formatting
- **FontAwesome**: Icons
- **FileReader API**: File preview for KYC uploads
- **Fetch API**: Backend service communication

## Project Structure

Each page has its own separate HTML, CSS, and JS files for better organization and maintainability.

```
FinVerse_banking/
├── index.html                # Landing page
├── assets/
│   ├── css/                 # CSS files
│   ├── js/                  # JavaScript files
│   ├── images/              # Images
│   └── icons/               # Icons
├── pages/                   # Individual pages
│   ├── dashboard/
│   ├── accounts/
│   ├── transactions/
│   ├── transfers/
│   ├── bills/
│   ├── loans/
│   ├── credit-score/
│   ├── kyc/
│   ├── settings/
│   └── profile/
└── libs/                    # External libraries
```

## Setup and Usage

1. Clone the repository
2. Open `index.html` in your browser
3. Navigate through the platform using the sidebar menu

## Responsive Design

FinVerse is fully responsive and works seamlessly across desktop, tablet, and mobile devices.

## Animations

The platform includes smooth animations for enhanced user experience, including transitions between pages, hover effects, and loading animations.
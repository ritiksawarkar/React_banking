import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Cards from './pages/Cards';
import Loans from './pages/Loans';
import About from './pages/About';
import Services from './pages/Services';
import Investments from './pages/Investments';
import Login from './pages/Login';
import Register from './pages/Register';
import HelpCenter from './pages/HelpCenter';
import FAQs from './pages/FAQs';
import Security from './pages/Security';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AccountSecurity from './pages/AccountSecurity';
import HelpSupport from './pages/HelpSupport';
import AllAccounts from './pages/AllAccounts';
import AllTransactions from './pages/AllTransactions';
import BillsAndPayments from './pages/BillsAndPayments';
import ScrollToTop from './components/ScrollToTop';
import YourCard from './pages/YourCard';
import DebitCards from './pages/DebitCards';
import CreditCards from './pages/CreditCards';
import PersonalLoan from './pages/PersonalLoan';
import HomeLoan from './pages/HomeLoan';
import CarLoan from './pages/CarLoan';
import EducationLoan from './pages/EducationLoan';
import BusinessLoan from './pages/BusinessLoan';
import PortfolioOverview from './pages/PortfolioOverview';
import MutualFunds from './pages/MutualFunds';
import Transfer from './pages/Transfer';
import Analytics from './pages/Analytics';
import FixedDeposits from './pages/FixedDeposits';
import RecurringDeposits from './pages/RecurringDeposits';
import Stocks from './pages/Stocks';
import GoldBonds from './pages/GoldBonds';
import Crypto from './pages/Crypto';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/accounts" element={<AllAccounts />} />
          <Route path="/dashboard/transactions" element={<AllTransactions />} />
          <Route path="/dashboard/bills" element={<BillsAndPayments />} />
          <Route path="/dashboard/cards/your-card" element={<YourCard />} />
          <Route path="/dashboard/cards/debit-cards" element={<DebitCards />} />
          <Route path="/dashboard/cards/credit-cards" element={<CreditCards />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/dashboard/loans/personal" element={<PersonalLoan />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/security" element={<Security />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account-security" element={<AccountSecurity />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/dashboard/loans/home" element={<HomeLoan />} />
          <Route path="/dashboard/loans/vehicle" element={<CarLoan />} />
          <Route path="/dashboard/loans/education" element={<EducationLoan />} />
          <Route path="/dashboard/loans/business" element={<BusinessLoan />} />
          <Route path="/dashboard/investments/overview" element={<PortfolioOverview />} />
          <Route path="/dashboard/investments/mutual-funds" element={<MutualFunds />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/dashboard/investments/fixed-deposits" element={<FixedDeposits />} />
          <Route path="/dashboard/investments/recurring-deposits" element={<RecurringDeposits />} />
          <Route path="/dashboard/investments/stocks" element={<Stocks />} />
          <Route path="/dashboard/investments/gold-bonds" element={<GoldBonds />} />
          <Route path="/dashboard/investments/crypto" element={<Crypto />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

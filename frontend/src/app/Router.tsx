import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SkeletonCard } from '../components/ui/Skeleton';
import PageWrapper from '../components/layout/PageWrapper';

// Lazy load all pages for performance
const WelcomePage       = lazy(() => import('../features/welcome/WelcomePage'));
const HomePage          = lazy(() => import('../features/home/HomePage'));
const PricesPage        = lazy(() => import('../features/prices/PricesPage'));
const AddProducePage    = lazy(() => import('../features/sell/AddProducePage'));
const SellingOptionsPage = lazy(() => import('../features/sell/SellingOptionsPage'));
const ComparisonPage    = lazy(() => import('../features/sell/ComparisonPage'));
const PredictionPage    = lazy(() => import('../features/sell/PredictionPage'));
const SellWaitStorePage = lazy(() => import('../features/sell/SellWaitStorePage'));
const RecommendationPage = lazy(() => import('../features/sell/RecommendationPage'));
const BuyersPage        = lazy(() => import('../features/buyers/BuyersPage'));
const DigitalOfferPage  = lazy(() => import('../features/buyers/DigitalOfferPage'));
const DecisionsPage     = lazy(() => import('../features/decisions/DecisionsPage'));
const NotificationsPage = lazy(() => import('../features/notifications/NotificationsPage'));
const ProfilePage       = lazy(() => import('../features/profile/ProfilePage'));
const AddTraderPage     = lazy(() => import('../features/profile/AddTraderPage'));

function LoadingFallback() {
  return (
    <PageWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem' }}>
        <SkeletonCard lines={3} />
        <SkeletonCard lines={4} />
        <SkeletonCard lines={2} />
      </div>
    </PageWrapper>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/"                     element={<WelcomePage />} />
          <Route path="/home"                 element={<HomePage />} />
          <Route path="/prices"               element={<PricesPage />} />
          <Route path="/sell"                 element={<AddProducePage />} />
          <Route path="/sell/options"         element={<SellingOptionsPage />} />
          <Route path="/sell/compare"         element={<ComparisonPage />} />
          <Route path="/sell/prediction"      element={<PredictionPage />} />
          <Route path="/sell/decision"        element={<SellWaitStorePage />} />
          <Route path="/sell/recommendation"  element={<RecommendationPage />} />
          <Route path="/buyers"               element={<BuyersPage />} />
          <Route path="/buyers/offer/:id"     element={<DigitalOfferPage />} />
          <Route path="/my-decisions"         element={<DecisionsPage />} />
          <Route path="/notifications"        element={<NotificationsPage />} />
          <Route path="/profile"              element={<ProfilePage />} />
          <Route path="/profile/add-trader"   element={<AddTraderPage />} />
          {/* Fallback */}
          <Route path="*"                     element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

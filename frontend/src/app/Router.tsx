import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SkeletonCard } from '../components/ui/Skeleton';
import PageWrapper from '../components/layout/PageWrapper';

// ─── Eagerly loaded (entry point — must not flash a Suspense fallback) ─────────
import WelcomePage from '../features/welcome/WelcomePage';

// ─── Lazily loaded (all inner pages) ─────────────────────────────────────────
const HomePage           = lazy(() => import('../features/home/HomePage'));
const PricesPage         = lazy(() => import('../features/prices/PricesPage'));
const AddProducePage     = lazy(() => import('../features/sell/AddProducePage'));
const SellingOptionsPage = lazy(() => import('../features/sell/SellingOptionsPage'));
const ComparisonPage     = lazy(() => import('../features/sell/ComparisonPage'));
const PredictionPage     = lazy(() => import('../features/sell/PredictionPage'));
const SellWaitStorePage  = lazy(() => import('../features/sell/SellWaitStorePage'));
const RecommendationPage = lazy(() => import('../features/sell/RecommendationPage'));
const BuyersPage         = lazy(() => import('../features/buyers/BuyersPage'));
const DigitalOfferPage   = lazy(() => import('../features/buyers/DigitalOfferPage'));
const DecisionsPage      = lazy(() => import('../features/decisions/DecisionsPage'));
const NotificationsPage  = lazy(() => import('../features/notifications/NotificationsPage'));
const ProfilePage        = lazy(() => import('../features/profile/ProfilePage'));
const AddTraderPage      = lazy(() => import('../features/profile/AddTraderPage'));

// ─── Fallback shown while lazy chunks load (only for inner pages) ─────────────
function PageLoadingFallback() {
  return (
    <PageWrapper>
      <div className="page-content stack stack-16" style={{ paddingTop: 24 }}>
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
      <Routes>
        {/*
          / — WelcomePage is eagerly imported above so it renders
          instantly on hard reload, with no Suspense flash.
        */}
        <Route path="/" element={<WelcomePage />} />

        {/* All inner routes are lazy — wrap in Suspense */}
        <Route
          path="/*"
          element={
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                <Route path="/home"                element={<HomePage />} />
                <Route path="/prices"              element={<PricesPage />} />
                <Route path="/sell"                element={<AddProducePage />} />
                <Route path="/sell/options"        element={<SellingOptionsPage />} />
                <Route path="/sell/compare"        element={<ComparisonPage />} />
                <Route path="/sell/prediction"     element={<PredictionPage />} />
                <Route path="/sell/decision"       element={<SellWaitStorePage />} />
                <Route path="/sell/recommendation" element={<RecommendationPage />} />
                <Route path="/buyers"              element={<BuyersPage />} />
                <Route path="/buyers/offer/:id"    element={<DigitalOfferPage />} />
                <Route path="/my-decisions"        element={<DecisionsPage />} />
                <Route path="/notifications"       element={<NotificationsPage />} />
                <Route path="/profile"             element={<ProfilePage />} />
                <Route path="/profile/add-trader"  element={<AddTraderPage />} />
                {/* Unknown inner paths → back to root */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

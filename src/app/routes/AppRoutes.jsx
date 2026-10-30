// Purpose: Define all public website routes in one maintainable location.
import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage/HomePage.jsx';
import PlaceholderPage from '../pages/PlaceholderPage/PlaceholderPage.jsx';

const WEBSITE_ROUTES = [
  { path: '/about-us', pageTitle: 'About Us' },
  { path: '/products', pageTitle: 'Products' },
  { path: '/services', pageTitle: 'Services' },
  { path: '/solutions', pageTitle: 'Solutions' },
  { path: '/industries', pageTitle: 'Industries' },
  { path: '/contact-us', pageTitle: 'Contact Us' },
  { path: '/privacy-policy', pageTitle: 'Privacy Policy' },
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {WEBSITE_ROUTES.map(({ path, pageTitle }) => (
        <Route
          key={path}
          path={path}
          element={<PlaceholderPage pageTitle={pageTitle} />}
        />
      ))}
      <Route path="*" element={<PlaceholderPage pageTitle="Page Not Found" />} />
    </Routes>
  );
}

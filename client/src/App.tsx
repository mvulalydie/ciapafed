import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DomainesPage from './pages/DomainesPage';
import ProjetsPage from './pages/ProjetsPage';
import ProjetDetailPage from './pages/ProjetDetailPage';
import RealisationsPage from './pages/RealisationsPage';
import RessourcesPage from './pages/RessourcesPage';
import ActualitesPage from './pages/ActualitesPage';
import ActualiteDetailPage from './pages/ActualiteDetailPage';
import GaleriePage from './pages/GaleriePage';
import PartenairesPage from './pages/PartenairesPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AdminProjetsPage from './pages/admin/AdminProjetsPage';
import AdminActualitesPage from './pages/admin/AdminActualitesPage';
import AdminDocumentsPage from './pages/admin/AdminDocumentsPage';
import AdminGaleriePage from './pages/admin/AdminGaleriePage';
import AdminPartenairesPage from './pages/admin/AdminPartenairesPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminUtilisateursPage from './pages/admin/AdminUtilisateursPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='a-propos' element={<AboutPage />} />
        <Route path='domaines' element={<DomainesPage />} />
        <Route path='projets' element={<ProjetsPage />} />
        <Route path='projets/:slug' element={<ProjetDetailPage />} />
        <Route path='realisations' element={<RealisationsPage />} />
        <Route path='ressources' element={<RessourcesPage />} />
        <Route path='actualites' element={<ActualitesPage />} />
        <Route path='actualites/:slug' element={<ActualiteDetailPage />} />
        <Route path='galerie' element={<GaleriePage />} />
        <Route path='partenaires' element={<PartenairesPage />} />
        <Route path='contact' element={<ContactPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route path='/admin/login' element={<AdminLoginPage />} />
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path='projets' element={<AdminProjetsPage />} />
        <Route path='actualites' element={<AdminActualitesPage />} />
        <Route path='documents' element={<AdminDocumentsPage />} />
        <Route path='galerie' element={<AdminGaleriePage />} />
        <Route path='partenaires' element={<AdminPartenairesPage />} />
        <Route path='messages' element={<AdminMessagesPage />} />
        <Route path='utilisateurs' element={<AdminUtilisateursPage />} />
      </Route>
    </Routes>
  );
}

export default App;

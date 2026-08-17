import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

function Layout() {
  return (
    <div className='min-h-screen bg-soft text-slate-900'>
      <SEO />
      <Navbar />
      <main className='mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

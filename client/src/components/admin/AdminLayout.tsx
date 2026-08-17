import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentUser, logoutAdmin } from '../../services/api';

const adminNav = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Projets', to: '/admin/projets' },
  { label: 'Actualites', to: '/admin/actualites' },
  { label: 'Documents', to: '/admin/documents' },
  { label: 'Galerie', to: '/admin/galerie' },
  { label: 'Partenaires', to: '/admin/partenaires' },
  { label: 'Messages', to: '/admin/messages' },
  { label: 'Utilisateurs', to: '/admin/utilisateurs' }
];

function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCurrentUser()
      .then(() => {
        if (mounted) setLoading(false);
      })
      .catch(() => {
        if (mounted) navigate('/admin/login');
      });
    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (loading) {
    return <div className='min-h-screen bg-slate-50 p-10 text-slate-600'>Chargement du back-office...</div>;
  }

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      <header className='border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-7xl items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <img src='/logo.png' alt='Logo CIAPAFED' className='h-11 w-11 rounded-2xl object-contain shadow-soft' />
            <div>
              <p className='text-sm uppercase tracking-[0.3em] text-forest'>CIAPAFED</p>
              <h1 className='text-xl font-semibold text-slate-900'>Back-office</h1>
            </div>
          </div>
          <button
            type='button'
            onClick={async () => {
              try {
                await logoutAdmin();
              } finally {
                navigate('/admin/login');
              }
            }}
            className='rounded-full border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100'
          >
            Deconnexion
          </button>
        </div>
      </header>
      <div className='mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8'>
        <aside className='hidden w-72 shrink-0 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:block'>
          <nav className='space-y-2'>
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? 'bg-forest text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <section className='min-w-0 flex-1'>
          <div className='mb-6 flex gap-2 overflow-x-auto lg:hidden'>
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                    isActive ? 'bg-forest text-white' : 'bg-white text-slate-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default AdminLayout;

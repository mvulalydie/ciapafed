import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Mail } from 'lucide-react';

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: '\u00c0 propos', to: '/a-propos' },
  { label: 'Domaines', to: '/domaines' },
  { label: 'Projets', to: '/projets' },
  { label: 'R\u00e9alisations', to: '/realisations' },
  { label: 'Ressources', to: '/ressources' },
  { label: 'Actualit\u00e9s', to: '/actualites' },
  { label: 'Galerie', to: '/galerie' },
  { label: 'Partenaires', to: '/partenaires' },
  { label: 'Contact', to: '/contact' }
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6 lg:px-8'>
        <Link to='/' className='flex min-w-0 items-center gap-3'>
          <img
            src='/logo.png'
            alt='Logo CIAPAFED'
            className='h-10 w-10 shrink-0 rounded-2xl object-contain shadow-soft sm:h-12 sm:w-12'
          />
          <div className='min-w-0'>
            <p className='text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:text-xs'>CIAPAFED</p>
            <p className='truncate text-sm font-semibold text-slate-900 sm:text-base'>ONG Agriculture & Environnement</p>
          </div>
        </Link>

        <div className='hidden items-center gap-4 lg:flex xl:gap-8'>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-forest' : 'text-slate-700 hover:text-forest'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className='hidden items-center gap-3 lg:flex'>
          <Link
            to='/contact'
            className='inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-[#163c2b] xl:px-5 xl:py-3'
          >
            <Mail size={16} /> Nous contacter
          </Link>
        </div>

        <button
          type='button'
          className='inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Menu mobile'
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className='border-t border-slate-200 bg-white/98 pb-6 md:hidden'>
          <div className='mx-auto flex max-w-7xl flex-col gap-4 px-4 pt-4 sm:px-6'>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-base font-medium transition ${
                    isActive ? 'bg-sand text-forest' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to='/contact'
              onClick={() => setIsOpen(false)}
              className='inline-flex items-center justify-center rounded-2xl bg-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'
            >
              Nous contacter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

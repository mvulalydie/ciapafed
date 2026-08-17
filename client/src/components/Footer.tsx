import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='border-t border-slate-200 bg-white/95 text-slate-700'>
      <div className='mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8'>
        <div>
          <div className='flex items-center gap-3'>
            <img src='/logo.png' alt='Logo CIAPAFED' className='h-12 w-12 rounded-2xl object-contain shadow-soft' />
            <p className='text-xs uppercase tracking-[0.3em] text-forest'>CIAPAFED</p>
          </div>
          <h3 className='mt-4 text-lg font-semibold text-slate-900'>Centre d\u2019Initiative et d\u2019Appui Participatif</h3>
          <p className='mt-4 max-w-sm text-sm leading-7 text-slate-600'>ONG d\u00e9di\u00e9e \u00e0 l\u2019agriculture familiale, l\u2019agroforesterie et la protection de l\u2019environnement en RDC.</p>
        </div>

        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-900'>Navigation</p>
          <ul className='mt-4 space-y-3 text-sm text-slate-600'>
            <li><Link to='/' className='hover:text-forest'>Accueil</Link></li>
            <li><Link to='/a-propos' className='hover:text-forest'>\u00c0 propos</Link></li>
            <li><Link to='/domaines' className='hover:text-forest'>Domaines</Link></li>
            <li><Link to='/contact' className='hover:text-forest'>Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-900'>Domaines d\u2019intervention</p>
          <ul className='mt-4 space-y-3 text-sm text-slate-600'>
            <li>Agroforesterie</li>
            <li>Conservation, REDD+ et climat</li>
            <li>Am\u00e9nagement durable du territoire</li>
            <li>\u00c9ducation et formation</li>
          </ul>
        </div>

        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-900'>Contact</p>
          <p className='mt-4 text-sm text-slate-600'>ongdciapafed@gmail.com</p>
          <p className='mt-2 text-sm text-slate-600'>+243 813 393 919</p>
          <p className='mt-2 text-sm text-slate-600'>+243 896 577 258</p>
        </div>
      </div>
      <div className='border-t border-slate-200 bg-sand px-4 py-6 text-center text-sm text-slate-600 sm:px-6 lg:px-8'>
        \u00a9 2026 CIAPAFED \u2014 Tous droits r\u00e9serv\u00e9s.
      </div>
    </footer>
  );
}

export default Footer;

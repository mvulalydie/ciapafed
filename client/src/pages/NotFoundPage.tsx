import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className='rounded-[2rem] bg-white p-8 text-center shadow-soft sm:p-12 lg:p-16'>
      <p className='text-xs uppercase tracking-[0.25em] text-forest sm:text-sm'>404</p>
      <h1 className='mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl'>Page non trouvee</h1>
      <p className='mt-4 text-sm leading-7 text-slate-600'>La page que vous recherchez est introuvable ou a ete deplacee.</p>
      <Link to='/' className='mt-8 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'>Retour a l’accueil</Link>
    </div>
  );
}

export default NotFoundPage;

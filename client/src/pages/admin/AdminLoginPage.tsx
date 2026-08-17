import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/api';

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className='mx-auto flex min-h-[calc(100vh-120px)] max-w-2xl items-center justify-center px-4 py-12 sm:px-6'>
      <div className='w-full rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft'>
        <div className='flex items-center gap-3'>
          <img src='/logo.png' alt='Logo CIAPAFED' className='h-12 w-12 rounded-2xl object-contain shadow-soft' />
          <div>
            <p className='text-xs uppercase tracking-[0.3em] text-forest'>CIAPAFED</p>
            <h1 className='text-3xl font-semibold text-slate-900'>Connexion administrateur</h1>
          </div>
        </div>
        <p className='mt-3 text-sm leading-7 text-slate-600'>Accedez au back-office CIAPAFED avec vos identifiants.</p>
        <form
          className='mt-8 space-y-6'
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            try {
              await loginAdmin(email, password);
              navigate('/admin');
            } catch (err: any) {
              setError(err.message || 'Erreur de connexion');
            }
          }}
        >
          {error && <div className='rounded-md bg-rose-50 p-3 text-rose-700'>{error}</div>}
          <div>
            <label className='block text-sm font-semibold text-slate-900' htmlFor='admin-email'>Email</label>
            <input id='admin-email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} className='mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10' />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-900' htmlFor='admin-password'>Mot de passe</label>
            <input id='admin-password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} className='mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10' />
          </div>
          <button type='submit' className='inline-flex w-full items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;

import { FormEvent, useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { createAdminUser, deleteAdminUser, getAdminUsers } from '../../services/api';
import type { AdminUser } from '../../services/api';

function AdminUtilisateursPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getAdminUsers().then(setUsers).catch((err) => setError(err.message)).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createAdminUser({ name, email, password, role });
      setName('');
      setEmail('');
      setPassword('');
      setRole('admin');
      load();
    } catch (err: any) {
      setError(err.message || 'Erreur utilisateur.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    await deleteAdminUser(id);
    load();
  };

  return (
    <div className='space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft'>
      <SectionTitle eyebrow='Admin' title='Gestion des utilisateurs' description='Administration des comptes et des acces au back-office.' />

      <form onSubmit={submit} className='grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 md:grid-cols-2'>
        <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='Nom' value={name} onChange={(e) => setName(e.target.value)} />
        <input className='rounded-3xl border px-4 py-3 text-sm' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className='rounded-3xl border px-4 py-3 text-sm' type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select className='rounded-3xl border px-4 py-3 text-sm' value={role} onChange={(e) => setRole(e.target.value)}>
          <option value='admin'>admin</option>
          <option value='editor'>editor</option>
        </select>
        <button disabled={saving} className='rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white md:col-span-2'>{saving ? 'Creation...' : 'Creer un utilisateur'}</button>
      </form>

      {error && <div className='rounded-[1.25rem] bg-rose-50 p-4 text-rose-700'>{error}</div>}
      {loading ? <div className='p-10 text-center text-slate-600'>Chargement...</div> : (
        <div className='grid gap-4'>
          {users.map((user) => (
            <div key={user.id} className='rounded-3xl border border-slate-200 bg-slate-50 p-6'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h3 className='text-lg font-semibold text-slate-900'>{user.name || user.email}</h3>
                  <p className='mt-1 text-sm text-slate-600'>{user.email} - {user.role}</p>
                </div>
                <button onClick={() => remove(user.id)} className='rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700'>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminUtilisateursPage;

import SectionTitle from '../../components/SectionTitle';
import { useEffect, useState } from 'react';
import { getAdminContacts, updateContactStatus } from '../../services/api';

function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAdminContacts();
      setMessages(res || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Erreur chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id: number, status: string) => {
    try {
      await updateContactStatus(id, status);
      await load();
    } catch (err: any) {
      setError(err.message || 'Erreur');
    }
  };

  return (
    <div className='space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft'>
      <SectionTitle eyebrow='Admin' title='Gestion des messages' description='Messages recus via le formulaire de contact.' />

      {error && <div className='rounded-md bg-rose-50 p-3 text-rose-700'>{error}</div>}

      {loading ? (
        <div className='rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600'>Chargement...</div>
      ) : (
        <div className='grid gap-4'>
          {messages.length === 0 && <div className='rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600'>Aucun message pour le moment.</div>}

          {messages.map((message) => (
            <article key={message.id} className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
              <div className='flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between'>
                <div>
                  <h3 className='text-lg font-semibold text-slate-900'>{message.subject}</h3>
                  <p className='text-sm text-slate-600'>Par {message.name} - {message.email} - {message.organisation || 'Sans organisation'}</p>
                  <p className='mt-3 whitespace-pre-wrap text-sm text-slate-700'>{message.message}</p>
                  <div className='mt-3 text-xs text-slate-500'>Categorie: {message.category} - Recu: {new Date(message.received_at).toLocaleString('fr-FR')}</div>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold text-slate-700'>Statut</span>
                  <select value={message.status} onChange={(e) => changeStatus(message.id, e.target.value)} className='rounded-full border px-3 py-2 text-sm'>
                    <option>Nouveau</option>
                    <option>En cours</option>
                    <option>Traite</option>
                  </select>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessagesPage;

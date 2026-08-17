import { BarChart3, FileText, Globe2, MessageSquare, Users, Image } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAdminStats } from '../../services/api';

function DashboardPage() {
  const [stats, setStats] = useState<{ projets: number; actualites: number; documents: number; photos: number; partenaires: number; messages: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAdminStats()
      .then((data) => {
        setStats(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const items = [
    { label: 'Projets', value: stats?.projets ?? 0, icon: BarChart3 },
    { label: 'Actualités', value: stats?.actualites ?? 0, icon: FileText },
    { label: 'Documents', value: stats?.documents ?? 0, icon: Globe2 },
    { label: 'Photos', value: stats?.photos ?? 0, icon: Image },
    { label: 'Partenaires', value: stats?.partenaires ?? 0, icon: Users },
    { label: 'Messages', value: stats?.messages ?? 0, icon: MessageSquare }
  ];

  return (
    <div className='space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft'>
      <div>
        <p className='text-sm uppercase tracking-[0.3em] text-forest'>Tableau de bord</p>
        <h2 className='mt-4 text-3xl font-semibold text-slate-900'>Indicateurs clés</h2>
      </div>

      {loading ? (
        <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Chargement...</div>
      ) : error ? (
        <div className='rounded-[1.75rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700'>Erreur : {error}</div>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm'>
                <div className='inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-forest text-white'>
                  <Icon size={20} />
                </div>
                <p className='mt-5 text-3xl font-semibold text-slate-900'>{item.value}</p>
                <p className='mt-2 text-sm text-slate-600'>{item.label}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;

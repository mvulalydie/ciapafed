import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import PartnerCard from '../components/PartnerCard';
import { getPartners } from '../services/api';

function PartenairesPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPartners()
      .then((data) => {
        setPartners(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='space-y-14'>
      <section className='rounded-[2rem] bg-white px-4 py-8 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        <SectionTitle eyebrow='Partenaires' title='Nos partenaires & bailleurs' description='Organismes ayant soutenu ou collaboré avec CIAPAFED.' />
      </section>

      <section className='rounded-[2rem] bg-white px-4 py-6 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        {loading ? (
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Chargement des partenaires...</div>
        ) : error ? (
          <div className='rounded-[1.75rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700'>Erreur : {error}</div>
        ) : (
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {partners.map((partner) => (
              <PartnerCard key={partner.slug} partner={partner} />
            ))}
          </div>
        )}
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-12 shadow-soft sm:px-10'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold text-slate-900'>Construisons de nouveaux partenariats</h2>
          <p className='mt-4 text-sm leading-7 text-slate-600'>Vous représentez une institution, une ONG, une entreprise ou un organisme de financement et souhaitez collaborer avec CIAPAFED ?</p>
          <div className='mt-6'>
            <a href='/contact' className='inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'>Prendre contact</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PartenairesPage;

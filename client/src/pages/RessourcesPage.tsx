import { useEffect, useMemo, useState } from 'react';
import { Search, Download } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { getDocuments } from '../services/api';
import type { Document } from '../services/api';

const categories = ['Tous', 'Documents institutionnels', 'Documents juridiques', 'Attestations', 'Rapports', 'Publications'] as const;

type CategoryFilter = (typeof categories)[number];

function DocumentRow({ document }: { document: Document }) {
  return (
    <div className='grid gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-[2fr_1fr_auto] sm:items-center'>
      <div className='flex items-start gap-4'>
        <div className='mt-1 flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-forest'>
          <Download size={24} />
        </div>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.28em] text-slate-500'>{document.category}</p>
          <h3 className='mt-2 text-lg font-semibold text-slate-900'>{document.title}</h3>
          <p className='mt-2 text-sm leading-7 text-slate-600'>{document.summary}</p>
        </div>
      </div>

      <div className='space-y-2 text-sm text-slate-600'>
        <p className='font-semibold text-slate-900'>Date</p>
        <p>{document.date}</p>
        {document.size && (
          <>
            <p className='font-semibold text-slate-900'>Taille</p>
            <p>{document.size}</p>
          </>
        )}
      </div>

      <div className='flex flex-col gap-3 sm:items-end'>
        <a href={document.url} target='_blank' rel='noreferrer' className='inline-flex w-full items-center justify-center rounded-full border border-forest bg-forest/10 px-4 py-3 text-sm font-semibold text-forest transition hover:bg-forest/15'>
          Consulter
        </a>
        <a href={document.url} download className='inline-flex w-full items-center justify-center rounded-full bg-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'>
          Télécharger
        </a>
      </div>
    </div>
  );
}

function RessourcesPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filter, setFilter] = useState<CategoryFilter>('Tous');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDocuments()
      .then((data) => {
        setDocuments(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesCategory = filter === 'Tous' || document.category === filter;
      const matchesQuery = [document.title, document.summary, document.category].some((field) =>
        field.toLowerCase().includes(query.toLowerCase())
      );
      return matchesCategory && matchesQuery;
    });
  }, [documents, filter, query]);

  return (
    <div className='space-y-14'>
      <section className='rounded-[2rem] bg-white px-4 py-8 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        <SectionTitle
          eyebrow='Ressources'
          title='Bibliothèque documentaire institutionnelle'
          description='Accédez aux documents officiels de CIAPAFED, aux attestations et aux publications essentielles.'
        />
        <p className='max-w-3xl text-sm leading-7 text-slate-600'>Recherchez rapidement un document, filtrez par catégorie et téléchargez les fichiers officiels.</p>
      </section>

      <section className='rounded-[2rem] bg-white px-4 py-6 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        <div className='grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center'>
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4'>
            <label className='flex items-center gap-3 rounded-[1.75rem] border border-slate-200 bg-white px-4 py-3'>
              <Search size={18} className='text-slate-400' />
              <input
                type='search'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder='Rechercher un document, une catégorie ou un mot-clé'
                className='w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400'
              />
            </label>
          </div>

          <div className='flex flex-wrap gap-3'>
            {categories.map((categoryOption) => (
              <button
                key={categoryOption}
                type='button'
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${filter === categoryOption ? 'border-forest bg-forest text-white' : 'border-slate-300 bg-slate-100 text-slate-700 hover:border-slate-400 hover:bg-slate-200'}`}
                onClick={() => setFilter(categoryOption)}
              >
                {categoryOption}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-10 shadow-soft sm:px-10'>
        {loading ? (
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Chargement des documents...</div>
        ) : error ? (
          <div className='rounded-[1.75rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700'>Erreur : {error}</div>
        ) : filteredDocuments.length === 0 ? (
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Aucun document ne correspond à cette recherche.</div>
        ) : (
          <div className='space-y-4'>
            {filteredDocuments.map((document) => (
              <DocumentRow key={document.slug} document={document} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default RessourcesPage;

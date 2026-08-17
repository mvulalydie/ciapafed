import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import GalleryCard from '../components/GalleryCard';
import Lightbox from '../components/Lightbox';
import { getGallery } from '../services/api';
import type { GalleryItem } from '../services/api';

const categories = ['Tous', 'Agriculture', 'Agroforesterie', 'Forêts', 'Communautés', 'Formation', 'Projets'] as const;

type CategoryFilter = (typeof categories)[number];

function GaleriePage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<CategoryFilter>('Tous');
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getGallery()
      .then((data) => {
        setGallery(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const matchesCategory = filter === 'Tous' || item.category === filter;
      const matchesQuery = [item.title, item.description, item.category].some((field) =>
        field.toLowerCase().includes(query.toLowerCase())
      );
      return matchesCategory && matchesQuery;
    });
  }, [gallery, filter, query]);

  const selectedItem = selectedIndex !== null ? filteredGallery[selectedIndex] : null;

  const handleSelect = (item: GalleryItem) => {
    const index = filteredGallery.findIndex((entry) => entry.slug === item.slug);
    setSelectedIndex(index >= 0 ? index : null);
  };

  const handleClose = () => setSelectedIndex(null);

  const handlePrev = () => {
    if (selectedIndex === null || filteredGallery.length === 0) return;
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + filteredGallery.length) % filteredGallery.length));
  };

  const handleNext = () => {
    if (selectedIndex === null || filteredGallery.length === 0) return;
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % filteredGallery.length));
  };

  return (
    <div className='space-y-14'>
      <section className='rounded-[2rem] bg-white px-4 py-8 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        <SectionTitle eyebrow='Galerie' title='Images de terrain' description='Visuels représentatifs de l’ambition environnementale et communautaire de CIAPAFED.' />
        <p className='max-w-3xl text-sm leading-7 text-slate-600'>Parcourez les photographies et les visuels-souvenirs capturés lors des actions de terrain et des projets.</p>
      </section>

      <section className='rounded-[2rem] bg-white px-4 py-6 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        <div className='grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end'>
          <div>
            <p className='text-sm uppercase tracking-[0.28em] text-forest'>Filtrer la galerie</p>
            <h2 className='mt-3 text-3xl font-semibold text-slate-900'>Trouvez les images par thème</h2>
          </div>
          <div className='space-y-4'>
            <label className='flex items-center gap-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3'>
              <Search size={18} className='text-slate-400' />
              <input
                type='search'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder='Rechercher un sujet ou une action'
                className='w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400'
              />
            </label>
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
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-10 shadow-soft sm:px-10'>
        {loading ? (
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Chargement de la galerie...</div>
        ) : error ? (
          <div className='rounded-[1.75rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700'>Erreur : {error}</div>
        ) : filteredGallery.length === 0 ? (
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Aucune image ne correspond à cette recherche.</div>
        ) : (
          <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
            {filteredGallery.map((item) => (
              <GalleryCard key={item.slug} item={item} onSelect={handleSelect} />
            ))}
          </div>
        )}
      </section>

      {selectedItem && (
        <Lightbox item={selectedItem} onClose={handleClose} onPrev={handlePrev} onNext={handleNext} />
      )}
    </div>
  );
}

export default GaleriePage;

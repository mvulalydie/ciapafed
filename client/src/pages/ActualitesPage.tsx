import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import NewsCard from '../components/NewsCard';
import { getNews } from '../services/api';
import type { NewsArticle } from '../services/api';

const categories = ['Tous', 'Agriculture', 'Environnement', 'Forêts', 'Climat', 'Communautés', 'Projets', 'Formation'] as const;

type CategoryFilter = (typeof categories)[number];

function ActualitesPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filter, setFilter] = useState<CategoryFilter>('Tous');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getNews()
      .then((data) => {
        setNews(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter((article) => {
      const matchesCategory = filter === 'Tous' || article.category === filter;
      const matchesQuery = [article.title, article.excerpt, article.category].some((field) =>
        field.toLowerCase().includes(query.toLowerCase())
      );
      return matchesCategory && matchesQuery;
    });
  }, [news, filter, query]);

  const featuredArticles = filteredNews.filter((article) => article.featured);
  const recentArticles = filteredNews.filter((article) => !article.featured);

  return (
    <div className='space-y-14'>
      <section className='relative overflow-hidden rounded-[2rem] bg-[url("https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1600&q=80")] bg-cover bg-center text-white shadow-soft'>
        <div className='absolute inset-0 bg-black/40' />
        <div className='relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24'>
          <div className='max-w-3xl space-y-5 sm:space-y-6'>
            <p className='text-[10px] uppercase tracking-[0.28em] text-slate-200 sm:text-xs lg:text-sm'>Actualités</p>
            <h1 className='text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl'>Actualités & activités de terrain</h1>
            <p className='text-sm leading-7 text-slate-200 sm:text-base sm:leading-8 lg:text-lg'>Suivez les publications et les retours de terrain de CIAPAFED, présentés dans un format éditorial moderne.</p>
          </div>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-4 py-6 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        <div className='grid gap-6 lg:grid-cols-[1.8fr_1fr] lg:items-end'>
          <div>
            <SectionTitle eyebrow='Espace éditorial' title='Filtrer les actualités' description='Recherchez rapidement par mot-clé et parcourez les catégories d’actualité.' />
          </div>
          <div className='space-y-4'>
            <label className='flex items-center gap-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3'>
              <Search size={18} className='text-slate-400' />
              <input
                type='search'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder='Rechercher une actualité'
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
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Chargement des actualités...</div>
        ) : error ? (
          <div className='rounded-[1.75rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700'>Erreur : {error}</div>
        ) : (
          <div className='space-y-10'>
            <div>
              <div className='mb-8 flex items-center justify-between gap-4'>
                <div>
                  <p className='text-sm uppercase tracking-[0.3em] text-forest'>Articles mis en avant</p>
                  <h2 className='mt-3 text-3xl font-semibold text-slate-900'>À la une</h2>
                </div>
              </div>
              <div className='grid gap-6 lg:grid-cols-2'>
                {featuredArticles.map((article) => (
                  <NewsCard key={article.slug} title={article.title} date={article.date} excerpt={article.excerpt} slug={article.slug} category={article.category} />
                ))}
              </div>
            </div>

            <div>
              <div className='mb-8'>
                <p className='text-sm uppercase tracking-[0.3em] text-forest'>Articles récents</p>
                <h2 className='mt-3 text-3xl font-semibold text-slate-900'>Dernières publications</h2>
              </div>
              <div className='grid gap-6 md:grid-cols-2'>
                {recentArticles.map((article) => (
                  <NewsCard key={article.slug} title={article.title} date={article.date} excerpt={article.excerpt} slug={article.slug} category={article.category} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ActualitesPage;

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { getNewsArticle, getNews } from '../services/api';
import type { NewsArticle } from '../services/api';

function ActualiteDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [similar, setSimilar] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Article introuvable');
      setLoading(false);
      return;
    }

    setLoading(true);
    getNewsArticle(slug)
      .then((data) => {
        setArticle(data);
        return getNews().then((allNews) => {
          const related = allNews.filter((item) => item.slug !== data.slug && item.category === data.category).slice(0, 3);
          setSimilar(related);
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className='rounded-[2rem] bg-white p-10 shadow-soft'>Chargement de l’article...</div>;
  }

  if (error || !article) {
    return <div className='rounded-[2rem] bg-white p-10 shadow-soft'>Article non trouvé.</div>;
  }

  return (
    <div className='space-y-12'>
      <section className='relative overflow-hidden rounded-[2rem] bg-slate-900 text-white shadow-soft'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 to-black/80' />
        <div className='h-96 bg-cover bg-center' style={{ backgroundImage: `url(${article.image})` }} />
        <div className='relative mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10'>
          <div className='max-w-3xl space-y-6'>
            <p className='text-sm uppercase tracking-[0.3em] text-slate-200'>{article.category}</p>
            <h1 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl'>{article.title}</h1>
            <p className='text-sm uppercase tracking-[0.3em] text-slate-200'>{article.date}</p>
            <p className='text-base leading-8 text-slate-200'>{article.excerpt}</p>
          </div>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-10 shadow-soft sm:px-10'>
        <div className='grid gap-10 lg:grid-cols-[2fr_1fr]'>
          <div className='space-y-8'>
            <SectionTitle eyebrow='Article' title={article.title} description={article.excerpt} />
            <div className='space-y-6 text-sm leading-7 text-slate-700'>
              <p>{article.content}</p>
              <p>Cette publication s’inscrit dans le suivi des activités de CIAPAFED auprès des communautés rurales, avec une attention portée aux résultats de terrain, aux partenariats et aux perspectives de développement durable.</p>
            </div>

            {article.gallery.length > 0 && (
              <div>
                <h2 className='text-xl font-semibold text-slate-900'>Galerie</h2>
                <div className='mt-6 grid gap-4 sm:grid-cols-2'>
                  {article.gallery.map((image) => (
                    <div key={image} className='overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100'>
                      <img src={image} alt={article.title} className='h-56 w-full object-cover' />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className='space-y-8'>
            <div className='rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm'>
              <p className='text-sm uppercase tracking-[0.3em] text-slate-500'>Informations</p>
              <div className='mt-6 space-y-4 text-sm text-slate-700'>
                <div>
                  <p className='font-semibold text-slate-900'>Catégorie</p>
                  <p>{article.category}</p>
                </div>
                <div>
                  <p className='font-semibold text-slate-900'>Date</p>
                  <p>{article.date}</p>
                </div>
              </div>
            </div>
            <Link to='/actualites' className='inline-flex w-full items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'>
              Retour aux actualités
            </Link>
          </aside>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-10 shadow-soft sm:px-10'>
        <SectionTitle eyebrow='Similaires' title='Articles similaires' description='D’autres contenus proches de cette thématique.' />
        {similar.length === 0 ? (
          <p className='text-sm leading-7 text-slate-600'>Aucun article similaire disponible pour le moment.</p>
        ) : (
          <div className='grid gap-6 lg:grid-cols-3'>
            {similar.map((item) => (
              <div key={item.slug} className='overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm'>
                <div className='h-44 bg-cover bg-center' style={{ backgroundImage: `url(${item.image})` }} />
                <div className='p-6'>
                  <p className='text-sm uppercase tracking-[0.28em] text-forest'>{item.category}</p>
                  <h3 className='mt-3 text-lg font-semibold text-slate-900'>{item.title}</h3>
                  <p className='mt-3 text-sm leading-7 text-slate-600'>{item.excerpt}</p>
                  <Link to={`/actualites/${item.slug}`} className='mt-5 inline-flex text-sm font-semibold text-forest'>Lire l’article →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ActualiteDetailPage;

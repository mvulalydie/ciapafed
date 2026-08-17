import { Link } from 'react-router-dom';

type NewsCardProps = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  category?: string;
};

function NewsCard({ title, date, excerpt, slug, category }: NewsCardProps) {
  return (
    <article className='group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-xl'>
      <div className='space-y-5 p-6'>
        {category && <p className='text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500'>{category}</p>}
        <p className='text-[11px] font-semibold uppercase tracking-[0.25em] text-forest'>{date}</p>
        <h3 className='text-xl font-semibold text-slate-900'>{title}</h3>
        <p className='text-sm leading-7 text-slate-600'>{excerpt}</p>
        <Link to={`/actualites/${slug}`} className='inline-flex items-center gap-2 text-sm font-semibold text-forest transition group-hover:translate-x-1'>
          Lire l’article <span aria-hidden='true'>→</span>
        </Link>
      </div>
    </article>
  );
}

export default NewsCard;

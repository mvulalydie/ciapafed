import { Link } from 'react-router-dom';

type ProjectCardProps = {
  title: string;
  summary: string;
  slug: string;
  location: string;
  period: string;
  funder: string;
  status: string;
  image: string;
  keyResults: string[];
};

function ProjectCard({ title, summary, slug, location, period, funder, status, image, keyResults }: ProjectCardProps) {
  return (
    <article className='group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-xl'>
      <div className='relative h-72 overflow-hidden bg-slate-100'>
        <img src={image} alt={title} className='h-full w-full object-cover transition duration-500 group-hover:scale-105' />
        <div className='absolute inset-x-0 top-0 flex items-center justify-between gap-4 bg-gradient-to-b from-black/60 to-transparent px-5 py-4 text-sm text-white'>
          <span className='rounded-full bg-forest/90 px-3 py-1 font-medium'>{status}</span>
          <span className='rounded-full bg-black/40 px-3 py-1'>{period}</span>
        </div>
      </div>
      <div className='space-y-5 p-6'>
        <div>
          <h3 className='text-xl font-semibold text-slate-900'>{title}</h3>
          <p className='mt-2 text-sm font-semibold text-slate-600'>{location}</p>
        </div>
        <p className='text-sm leading-7 text-slate-600'>{summary}</p>
        <div className='grid gap-2 text-sm text-slate-600'>
          <div className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3'>
            <span className='font-semibold text-slate-700'>Bailleur</span>
            <span>{funder}</span>
          </div>
          <div className='rounded-2xl bg-slate-50 px-4 py-3'>
            <p className='text-sm font-semibold text-slate-700'>Résultats clés</p>
            <ul className='mt-2 list-disc space-y-1 pl-4 text-slate-600'>
              {keyResults.slice(0, 2).map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex flex-wrap gap-2'>
          {keyResults.slice(0, 2).map((result) => (
            <span key={result} className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-700'>
              {result}
            </span>
          ))}
        </div>
        <Link
          to={`/projets/${slug}`}
          className='inline-flex w-full items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'
        >
          Voir le projet
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;

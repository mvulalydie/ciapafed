import { Download } from 'lucide-react';

type DocumentCardProps = {
  title: string;
  fileType: string;
  category?: string;
  date?: string;
  size?: string;
  summary: string;
  url?: string;
};

function DocumentCard({ title, fileType, category, date, size, summary, url }: DocumentCardProps) {
  return (
    <article className='rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.28em] text-forest'>{category || fileType}</p>
          <h3 className='mt-2 text-xl font-semibold text-slate-900'>{title}</h3>
        </div>
        <button className='inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#d7c3a5]' type='button'>
          <Download size={16} /> Télécharger
        </button>
      </div>
      <div className='mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-3'>
        {date && <p>Date: {date}</p>}
        {size && <p>Taille: {size}</p>}
        {fileType && <p>Type: {fileType}</p>}
      </div>
      <p className='mt-4 text-sm leading-7 text-slate-600'>{summary}</p>
    </article>
  );
}

export default DocumentCard;

import { type GalleryItem } from '../services/api';

type GalleryCardProps = {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
};

function GalleryCard({ item, onSelect }: GalleryCardProps) {
  return (
    <article
      className='group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-xl'
      onClick={() => onSelect(item)}
      role='button'
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(item);
        }
      }}
    >
      <div className='relative h-72 overflow-hidden bg-slate-100'>
        <img src={item.image} alt={item.title} className='h-full w-full object-cover transition duration-500 group-hover:scale-105' />
        <div className='absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-4 py-3 text-white'>
          <span className='text-[10px] font-semibold uppercase tracking-[0.28em]'>{item.category}</span>
          <span className='rounded-full border border-white/30 bg-white/10 px-2 py-1 text-[10px] font-medium'>Voir</span>
        </div>
      </div>
      <div className='space-y-3 p-6'>
        <h3 className='text-xl font-semibold text-slate-900'>{item.title}</h3>
        <p className='text-sm leading-6 text-slate-600'>{item.description}</p>
      </div>
    </article>
  );
}

export default GalleryCard;

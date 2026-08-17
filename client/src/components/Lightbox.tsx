import { type GalleryItem } from '../services/api';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

type LightboxProps = {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'>
      <div className='relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl ring-1 ring-white/10'>
        <button
          type='button'
          onClick={onClose}
          className='absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80'
        >
          <X size={20} />
        </button>

        <div className='relative h-[calc(100vh-5rem)] overflow-hidden sm:h-[calc(80vh-5rem)]'>
          <img src={item.image} alt={item.title} className='h-full w-full object-cover' />
          <button
            type='button'
            onClick={onPrev}
            className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/70'
          >
            <ArrowLeft size={24} />
          </button>
          <button
            type='button'
            onClick={onNext}
            className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/70'
          >
            <ArrowRight size={24} />
          </button>
        </div>

        <div className='space-y-4 border-t border-white/10 bg-slate-950 p-6 text-white sm:p-8'>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-[10px] uppercase tracking-[0.34em] text-slate-400'>{item.category}</p>
              <h2 className='mt-2 text-2xl font-semibold sm:text-3xl'>{item.title}</h2>
            </div>
            <button type='button' onClick={onClose} className='rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/15'>Fermer</button>
          </div>
          <p className='text-sm leading-7 text-slate-300'>{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;

import { FormEvent, useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { getGallery, createGalleryItem, deleteGalleryItem } from '../../services/api';
import type { GalleryItem } from '../../services/api';

function AdminGaleriePage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Agriculture');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = () => {
    setLoading(true);
    getGallery()
      .then((data) => {
        setGallery(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleAddItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await createGalleryItem({ title, category, description, image: image || '' });
      setTitle('');
      setCategory('Agriculture');
      setDescription('');
      setImage('');
      fetchGallery();
    } catch (err: any) {
      setError(err.message ?? 'Erreur lors de l’ajout de l’image');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm('Supprimer cette image de la galerie ?')) {
      return;
    }

    try {
      setSubmitting(true);
      await deleteGalleryItem(slug);
      setGallery((current) => current.filter((item) => item.slug !== slug));
      setError(null);
    } catch (err: any) {
      setError(err.message ?? 'Erreur lors de la suppression');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft'>
      <SectionTitle eyebrow='Admin' title='Gestion de la galerie' description='Images et visuels représentatifs des actions sur le terrain.' />

      <form onSubmit={handleAddItem} className='grid gap-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <label className='space-y-2'>
            <span className='text-sm font-semibold text-slate-900'>Titre de l’image</span>
            <input
              type='text'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className='w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10'
              required
            />
          </label>

          <label className='space-y-2'>
            <span className='text-sm font-semibold text-slate-900'>Catégorie</span>
            <input
              type='text'
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className='w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10'
              required
            />
          </label>
        </div>

        <label className='space-y-2'>
          <span className='text-sm font-semibold text-slate-900'>Description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className='min-h-[140px] w-full rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10'
            required
          />
        </label>

        <label className='space-y-2'>
          <span className='text-sm font-semibold text-slate-900'>URL de l’image</span>
          <input
            type='url'
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder='https://...'
            className='w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-forest focus:ring-2 focus:ring-forest/10'
          />
        </label>

        <button
          type='submit'
          disabled={submitting}
          className='inline-flex w-full items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b] disabled:cursor-not-allowed disabled:bg-slate-300'
        >
          {submitting ? 'Ajout en cours…' : 'Ajouter une image'}
        </button>
      </form>

      {loading ? (
        <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Chargement des images...</div>
      ) : error ? (
        <div className='rounded-[1.75rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700'>Erreur : {error}</div>
      ) : (
        <div className='grid gap-4'>
          {gallery.map((item) => (
            <div key={item.slug} className='grid gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-[3fr_1fr] sm:items-center'>
              <div className='space-y-3'>
                <p className='text-sm uppercase tracking-[0.35em] text-forest'>{item.category}</p>
                <h3 className='text-xl font-semibold text-slate-900'>{item.title}</h3>
                <p className='text-sm leading-7 text-slate-600'>{item.description}</p>
                <p className='text-sm text-slate-500'>Slug : {item.slug}</p>
              </div>
              <div className='flex items-center justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => handleDelete(item.slug)}
                  className='rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100'
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminGaleriePage;

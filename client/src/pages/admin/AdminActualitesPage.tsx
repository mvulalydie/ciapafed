import { FormEvent, useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { createAdminNews, deleteAdminNews, getNews, updateAdminNews } from '../../services/api';
import type { NewsArticle } from '../../services/api';

const emptyForm = {
  title: '',
  category: 'Actualite',
  date: '',
  excerpt: '',
  content: '',
  image: '',
  featured: false
};

function AdminActualitesPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getNews()
      .then((data) => {
        setNews(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateField = (key: keyof typeof emptyForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (editingSlug) {
        await updateAdminNews(editingSlug, form);
      } else {
        await createAdminNews(form);
      }
      setForm(emptyForm);
      setEditingSlug(null);
      load();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l’enregistrement.');
    } finally {
      setSaving(false);
    }
  };

  const edit = (item: NewsArticle) => {
    setEditingSlug(item.slug);
    setForm({
      title: item.title,
      category: item.category,
      date: item.date,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
      featured: item.featured
    });
  };

  const remove = async (slug: string) => {
    if (!window.confirm('Supprimer cette actualite ?')) return;
    await deleteAdminNews(slug);
    load();
  };

  return (
    <div className='space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft'>
      <SectionTitle eyebrow='Admin' title='Gestion des actualites' description='Publier et mettre a jour les actualites de CIAPAFED.' />

      <form onSubmit={submit} className='grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6'>
        <div className='grid gap-4 md:grid-cols-2'>
          <input className='rounded-3xl border border-slate-200 px-4 py-3 text-sm' placeholder='Titre' value={form.title} onChange={(e) => updateField('title', e.target.value)} required />
          <input className='rounded-3xl border border-slate-200 px-4 py-3 text-sm' placeholder='Categorie' value={form.category} onChange={(e) => updateField('category', e.target.value)} required />
          <input className='rounded-3xl border border-slate-200 px-4 py-3 text-sm' placeholder='Date' value={form.date} onChange={(e) => updateField('date', e.target.value)} />
          <input className='rounded-3xl border border-slate-200 px-4 py-3 text-sm' placeholder='URL image' value={form.image} onChange={(e) => updateField('image', e.target.value)} />
        </div>
        <textarea className='min-h-[90px] rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm' placeholder='Resume' value={form.excerpt} onChange={(e) => updateField('excerpt', e.target.value)} required />
        <textarea className='min-h-[140px] rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm' placeholder='Contenu' value={form.content} onChange={(e) => updateField('content', e.target.value)} />
        <label className='flex items-center gap-3 text-sm font-semibold text-slate-700'>
          <input type='checkbox' checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)} />
          Mettre a la une
        </label>
        <div className='flex flex-wrap gap-3'>
          <button disabled={saving} className='rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white disabled:opacity-60'>{saving ? 'Enregistrement...' : editingSlug ? 'Mettre a jour' : 'Publier'}</button>
          {editingSlug && <button type='button' onClick={() => { setEditingSlug(null); setForm(emptyForm); }} className='rounded-full border px-5 py-3 text-sm font-semibold'>Annuler</button>}
        </div>
      </form>

      {error && <div className='rounded-[1.25rem] bg-rose-50 p-4 text-rose-700'>{error}</div>}

      {loading ? (
        <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Chargement...</div>
      ) : (
        <div className='grid gap-4'>
          {news.map((item) => (
            <div key={item.slug} className='rounded-3xl border border-slate-200 bg-slate-50 p-6'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h3 className='text-xl font-semibold text-slate-900'>{item.title}</h3>
                  <p className='mt-1 text-sm text-slate-600'>{item.category} - {item.date} - {item.slug}</p>
                </div>
                <div className='flex gap-2'>
                  <button onClick={() => edit(item)} className='rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white'>Modifier</button>
                  <button onClick={() => remove(item.slug)} className='rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700'>Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminActualitesPage;

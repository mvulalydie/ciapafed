import { FormEvent, useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { createAdminDocument, deleteAdminDocument, getDocuments, updateAdminDocument } from '../../services/api';
import type { Document } from '../../services/api';

const emptyForm = { title: '', category: '', date: '', size: '', fileType: 'PDF', summary: '', url: '' };

function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getDocuments().then(setDocuments).catch((err) => setError(err.message)).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const setField = (key: keyof typeof emptyForm, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editingSlug) await updateAdminDocument(editingSlug, form);
      else await createAdminDocument(form);
      setForm(emptyForm);
      setEditingSlug(null);
      load();
    } catch (err: any) {
      setError(err.message || 'Erreur document.');
    } finally {
      setSaving(false);
    }
  };

  const edit = (document: Document) => {
    setEditingSlug(document.slug);
    setForm({
      title: document.title,
      category: document.category,
      date: document.date,
      size: document.size || '',
      fileType: document.fileType,
      summary: document.summary,
      url: document.url
    });
  };

  const remove = async (slug: string) => {
    if (!window.confirm('Supprimer ce document ?')) return;
    await deleteAdminDocument(slug);
    load();
  };

  return (
    <div className='space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft'>
      <SectionTitle eyebrow='Admin' title='Gestion des documents' description='Documents et ressources a mettre a disposition du public.' />

      <form onSubmit={submit} className='grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6'>
        <div className='grid gap-4 md:grid-cols-2'>
          <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='Titre' value={form.title} onChange={(e) => setField('title', e.target.value)} required />
          <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='Categorie' value={form.category} onChange={(e) => setField('category', e.target.value)} required />
          <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='Date' value={form.date} onChange={(e) => setField('date', e.target.value)} />
          <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='Taille' value={form.size} onChange={(e) => setField('size', e.target.value)} />
          <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='Type' value={form.fileType} onChange={(e) => setField('fileType', e.target.value)} />
          <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='URL du fichier' value={form.url} onChange={(e) => setField('url', e.target.value)} required />
        </div>
        <textarea className='min-h-[100px] rounded-[1.5rem] border px-4 py-3 text-sm' placeholder='Resume' value={form.summary} onChange={(e) => setField('summary', e.target.value)} required />
        <div className='flex flex-wrap gap-3'>
          <button disabled={saving} className='rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white'>{saving ? 'Enregistrement...' : editingSlug ? 'Mettre a jour' : 'Ajouter'}</button>
          {editingSlug && <button type='button' onClick={() => { setEditingSlug(null); setForm(emptyForm); }} className='rounded-full border px-5 py-3 text-sm font-semibold'>Annuler</button>}
        </div>
      </form>

      {error && <div className='rounded-[1.25rem] bg-rose-50 p-4 text-rose-700'>{error}</div>}
      {loading ? <div className='p-10 text-center text-slate-600'>Chargement...</div> : (
        <div className='grid gap-4'>
          {documents.map((document) => (
            <div key={document.slug} className='rounded-3xl border border-slate-200 bg-slate-50 p-6'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h3 className='text-xl font-semibold text-slate-900'>{document.title}</h3>
                  <p className='mt-1 text-sm text-slate-600'>{document.category} - {document.date} - {document.url}</p>
                </div>
                <div className='flex gap-2'>
                  <button onClick={() => edit(document)} className='rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white'>Modifier</button>
                  <button onClick={() => remove(document.slug)} className='rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700'>Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDocumentsPage;

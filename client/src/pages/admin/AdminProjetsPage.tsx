import { FormEvent, useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { createAdminProject, deleteAdminProject, getAdminProjects, publishAdminProject, updateAdminProject } from '../../services/api';

type AdminProject = { slug: string; title: string; status: string; created_at: string };

const emptyForm = { slug: '', title: '', excerpt: '', content: '' };

function AdminProjetsPage() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAdminProjects();
      setProjects(res || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Erreur chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setField = (key: keyof typeof emptyForm, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (editingSlug) {
        await updateAdminProject(editingSlug, { title: form.title, excerpt: form.excerpt, content: form.content });
      } else {
        await createAdminProject(form);
      }
      setForm(emptyForm);
      setEditingSlug(null);
      await load();
    } catch (err: any) {
      setError(err.message || 'Erreur enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const edit = (project: AdminProject) => {
    setEditingSlug(project.slug);
    setForm({ slug: project.slug, title: project.title, excerpt: '', content: '' });
  };

  const remove = async (slug: string) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    await deleteAdminProject(slug);
    await load();
  };

  const publish = async (slug: string) => {
    await publishAdminProject(slug);
    await load();
  };

  return (
    <div className='space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft'>
      <SectionTitle eyebrow='Admin' title='Gestion des projets' description='Creer, mettre a jour, publier et supprimer les projets documentes par CIAPAFED.' />

      <form className='grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6' onSubmit={submit}>
        <div className='grid gap-4 md:grid-cols-2'>
          <input disabled={Boolean(editingSlug)} className='rounded-3xl border px-4 py-3 text-sm disabled:bg-slate-100' placeholder='slug' value={form.slug} onChange={(e) => setField('slug', e.target.value)} required />
          <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='Titre' value={form.title} onChange={(e) => setField('title', e.target.value)} required />
        </div>
        <textarea className='min-h-[90px] rounded-[1.5rem] border px-4 py-3 text-sm' placeholder='Resume court' value={form.excerpt} onChange={(e) => setField('excerpt', e.target.value)} />
        <textarea className='min-h-[130px] rounded-[1.5rem] border px-4 py-3 text-sm' placeholder='Contenu detaille' value={form.content} onChange={(e) => setField('content', e.target.value)} />
        <div className='flex flex-wrap gap-3'>
          <button disabled={saving} className='rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white'>{saving ? 'Enregistrement...' : editingSlug ? 'Mettre a jour' : 'Creer'}</button>
          {editingSlug && <button type='button' onClick={() => { setEditingSlug(null); setForm(emptyForm); }} className='rounded-full border px-5 py-3 text-sm font-semibold'>Annuler</button>}
        </div>
      </form>

      {error && <div className='rounded-md bg-rose-50 p-3 text-rose-700'>{error}</div>}

      {loading ? (
        <div className='rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600'>Chargement...</div>
      ) : (
        <div className='grid gap-4'>
          {projects.length === 0 && <div className='rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600'>Aucun projet admin pour le moment.</div>}
          {projects.map((project) => (
            <div key={project.slug} className='rounded-3xl border border-slate-200 bg-slate-50 p-6'>
              <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h3 className='text-xl font-semibold text-slate-900'>{project.title}</h3>
                  <p className='text-sm text-slate-600'>slug: {project.slug} - statut: {project.status}</p>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                  <button onClick={() => edit(project)} className='rounded-full border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white'>Modifier</button>
                  <button onClick={() => publish(project.slug)} className='rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white hover:bg-[#163c2b]'>Publier</button>
                  <button onClick={() => remove(project.slug)} className='rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700'>Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProjetsPage;

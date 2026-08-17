import { FormEvent, useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { createAdminPartner, deleteAdminPartner, getPartners, updateAdminPartner } from '../../services/api';
import type { Partner } from '../../services/api';

const emptyForm = { name: '', logo: '', description: '', projects: '' };

function AdminPartenairesPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getPartners().then(setPartners).catch((err) => setError(err.message)).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const setField = (key: keyof typeof emptyForm, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      logo: form.logo || null,
      description: form.description,
      projects: form.projects.split(',').map((item) => item.trim()).filter(Boolean)
    };

    try {
      if (editingSlug) await updateAdminPartner(editingSlug, payload);
      else await createAdminPartner(payload);
      setForm(emptyForm);
      setEditingSlug(null);
      load();
    } catch (err: any) {
      setError(err.message || 'Erreur partenaire.');
    } finally {
      setSaving(false);
    }
  };

  const edit = (partner: Partner) => {
    setEditingSlug(partner.slug);
    setForm({
      name: partner.name,
      logo: partner.logo || '',
      description: partner.description || '',
      projects: partner.projects?.join(', ') || ''
    });
  };

  const remove = async (slug: string) => {
    if (!window.confirm('Supprimer ce partenaire ?')) return;
    await deleteAdminPartner(slug);
    load();
  };

  return (
    <div className='space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft'>
      <SectionTitle eyebrow='Admin' title='Gestion des partenaires' description='Partenaires documentes dans les actions de CIAPAFED.' />

      <form onSubmit={submit} className='grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6'>
        <div className='grid gap-4 md:grid-cols-2'>
          <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='Nom' value={form.name} onChange={(e) => setField('name', e.target.value)} required />
          <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='Logo URL' value={form.logo} onChange={(e) => setField('logo', e.target.value)} />
        </div>
        <textarea className='min-h-[90px] rounded-[1.5rem] border px-4 py-3 text-sm' placeholder='Description' value={form.description} onChange={(e) => setField('description', e.target.value)} />
        <input className='rounded-3xl border px-4 py-3 text-sm' placeholder='Projets associes, separes par des virgules' value={form.projects} onChange={(e) => setField('projects', e.target.value)} />
        <div className='flex flex-wrap gap-3'>
          <button disabled={saving} className='rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white'>{saving ? 'Enregistrement...' : editingSlug ? 'Mettre a jour' : 'Ajouter'}</button>
          {editingSlug && <button type='button' onClick={() => { setEditingSlug(null); setForm(emptyForm); }} className='rounded-full border px-5 py-3 text-sm font-semibold'>Annuler</button>}
        </div>
      </form>

      {error && <div className='rounded-[1.25rem] bg-rose-50 p-4 text-rose-700'>{error}</div>}
      {loading ? <div className='p-10 text-center text-slate-600'>Chargement...</div> : (
        <div className='grid gap-4 md:grid-cols-2'>
          {partners.map((partner) => (
            <div key={partner.slug} className='rounded-3xl border border-slate-200 bg-slate-50 p-6'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-lg font-semibold text-slate-900'>{partner.name}</p>
                  <p className='mt-2 text-sm text-slate-600'>{partner.description || 'Aucune description'}</p>
                  <p className='mt-2 text-xs uppercase tracking-[0.25em] text-slate-500'>{partner.slug}</p>
                </div>
                {partner.logo && <img src={partner.logo} alt='' className='h-12 w-12 rounded-xl object-contain' />}
              </div>
              <div className='mt-5 flex gap-2'>
                <button onClick={() => edit(partner)} className='rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white'>Modifier</button>
                <button onClick={() => remove(partner.slug)} className='rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700'>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPartenairesPage;

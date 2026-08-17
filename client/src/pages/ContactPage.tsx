import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { postContact } from '../services/api';

type FormState = {
  name: string;
  email: string;
  organisation: string;
  subject: string;
  message: string;
  category: 'Partenariat' | 'Projet' | 'Information' | 'Financement' | 'Autre';
};

const initialState: FormState = {
  name: '',
  email: '',
  organisation: '',
  subject: '',
  message: '',
  category: 'Information'
};

function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function validate() {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setError('Veuillez renseigner tous les champs obligatoires.');
      return false;
    }

    // simple email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("L'adresse e-mail n'est pas valide.");
      return false;
    }

    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await postContact(form);
      setSuccess(res.message || 'Votre message a bien été envoyé.');
      setForm(initialState);
    } catch (err: any) {
      setError(err?.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-14'>
      <section className='rounded-[2rem] bg-white px-4 py-10 shadow-soft sm:px-8 sm:py-16 lg:px-10'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.25em] text-forest sm:text-sm'>Contact</p>
          <h1 className='mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl'>Parlons de votre projet</h1>
          <p className='mt-4 text-sm leading-7 text-slate-600 sm:text-base'>Une question, une proposition de partenariat ou une demande d'information ? Contactez CIAPAFED.</p>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-4 py-6 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        <div className='grid gap-8 lg:grid-cols-[1fr_1fr]'>
          <div className='space-y-6'>
            <SectionTitle eyebrow='Coordonnées' title='CIAPAFED' description='Centre d’Initiative et d’Appui Participatif à l’Agriculture Familiale et l’Environnement Durable' />

            <div className='text-sm text-slate-700'>
              <p className='font-semibold'>Email</p>
              <p className='mt-1'><a href='mailto:ongdciapafed@gmail.com' className='text-forest'>ongdciapafed@gmail.com</a></p>

              <div className='mt-4'>
                <p className='font-semibold'>Téléphone</p>
                <p className='mt-1'>+243 813 393 919</p>
                <p>+243 896 577 258</p>
              </div>

              <div className='mt-4'>
                <p className='font-semibold'>Coordination</p>
                <p className='mt-1'>UMBA PHAKA Bénédicte — Coordonnatrice Nationale ai</p>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className='grid gap-4'>
              {success && <div className='rounded-lg bg-forest/10 p-4 text-forest'>{success}</div>}
              {error && <div className='rounded-lg bg-rose-50 p-4 text-rose-700'>{error}</div>}

              <div className='grid gap-3 sm:grid-cols-2'>
                <label className='space-y-2'>
                  <span className='text-sm font-semibold text-slate-900'>Nom complet</span>
                  <input value={form.name} onChange={(e) => update('name', e.target.value)} type='text' className='w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none' placeholder='Votre nom' required />
                </label>

                <label className='space-y-2'>
                  <span className='text-sm font-semibold text-slate-900'>Email</span>
                  <input value={form.email} onChange={(e) => update('email', e.target.value)} type='email' className='w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none' placeholder='votre@email.com' required />
                </label>
              </div>

              <label className='space-y-2'>
                <span className='text-sm font-semibold text-slate-900'>Organisation</span>
                <input value={form.organisation} onChange={(e) => update('organisation', e.target.value)} type='text' className='w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none' placeholder='Votre organisation (optionnel)' />
              </label>

              <label className='space-y-2'>
                <span className='text-sm font-semibold text-slate-900'>Sujet</span>
                <input value={form.subject} onChange={(e) => update('subject', e.target.value)} type='text' className='w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none' placeholder='Sujet de votre message' required />
              </label>

              <label className='space-y-2'>
                <span className='text-sm font-semibold text-slate-900'>Catégorie</span>
                <select value={form.category} onChange={(e) => update('category', e.target.value as FormState['category'])} className='w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none'>
                  <option>Partenariat</option>
                  <option>Projet</option>
                  <option>Information</option>
                  <option>Financement</option>
                  <option>Autre</option>
                </select>
              </label>

              <label className='space-y-2'>
                <span className='text-sm font-semibold text-slate-900'>Message</span>
                <textarea value={form.message} onChange={(e) => update('message', e.target.value)} className='min-h-[140px] w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm outline-none' required />
              </label>

              <button type='submit' disabled={loading} className='inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b] disabled:opacity-60'>
                {loading ? 'Envoi…' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;

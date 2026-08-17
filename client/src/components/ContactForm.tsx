function ContactForm() {
  return (
    <form className='space-y-6 rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-soft'>
      <div>
        <label className='text-sm font-semibold text-slate-900' htmlFor='name'>Nom</label>
        <input
          id='name'
          name='name'
          type='text'
          placeholder='Votre nom'
          className='mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10'
        />
      </div>
      <div>
        <label className='text-sm font-semibold text-slate-900' htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='votre.email@example.com'
          className='mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10'
        />
      </div>
      <div>
        <label className='text-sm font-semibold text-slate-900' htmlFor='message'>Message</label>
        <textarea
          id='message'
          name='message'
          rows={5}
          placeholder='Votre demande ou message'
          className='mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10'
        />
      </div>
      <button type='submit' className='inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'>
        Envoyer la demande
      </button>
    </form>
  );
}

export default ContactForm;

import SectionTitle from '../components/SectionTitle';

const domaines = [
  { title: 'Agroforesterie', description: 'Soutien à des systèmes agricoles durables intégrant arbres et cultures.' },
  { title: 'Conservation, REDD+ et climat', description: 'Actions pour la protection des forêts et l’adaptation climatique.' },
  { title: 'Aménagement durable du territoire', description: 'Planification locale respectueuse des ressources naturelles.' },
  { title: 'Éducation et formation', description: 'Renforcement des capacités des communautés rurales.' }
];

const timeline = [
  { year: '2014', label: 'Création de CIAPAFED', description: 'Naissance du Centre d’Initiative et d’Appui Participatif à l’Agriculture Familiale et l’Environnement Durable.' },
  { year: 'Depuis 2014', label: 'Actions documentées', description: 'Interventions en agroforesterie, conservation, aménagement durable et formation.' },
  { year: 'Zones', label: 'Maï-Ndombe & Kwilu', description: 'Présence documentée dans ces provinces en RDC.' }
];

const valeursProposees = ['Participation', 'Durabilité', 'Inclusion', 'Responsabilité', 'Protection de l’environnement'];

function AboutPage() {
  return (
    <div className='space-y-16'>
      <section className='relative overflow-hidden rounded-[2rem] bg-[url("https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80")] bg-cover bg-center text-white shadow-soft'>
        <div className='absolute inset-0 bg-forest/70' />
        <div className='relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24'>
          <div className='max-w-3xl space-y-5 sm:space-y-6'>
            <p className='text-[10px] uppercase tracking-[0.28em] text-slate-200 sm:text-xs lg:text-sm'>À propos de CIAPAFED</p>
            <h1 className='text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl'>À propos de CIAPAFED</h1>
            <p className='text-sm leading-7 text-slate-200 sm:text-base sm:leading-8 lg:text-lg'>Une organisation congolaise qui accompagne les communautés rurales dans l’agriculture familiale, la conservation des ressources naturelles et le développement durable.</p>
          </div>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
        <div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
          <div className='space-y-6'>
            <SectionTitle eyebrow='Présentation' title='Une ONG dédiée à l’agriculture familiale et à l’environnement durable' description='CIAPAFED est une organisation institutionnelle engagée pour soutenir les communautés rurales avec professionnalisme et transparence.' />
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6'>
                <p className='text-sm uppercase tracking-[0.28em] text-slate-500'>Nom complet</p>
                <p className='mt-3 text-lg font-semibold text-slate-900'>Centre d’Initiative et d’Appui Participatif à l’Agriculture Familiale et l’Environnement Durable</p>
              </div>
              <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6'>
                <p className='text-sm uppercase tracking-[0.28em] text-slate-500'>Statut</p>
                <p className='mt-3 text-lg font-semibold text-slate-900'>ONG</p>
              </div>
              <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6'>
                <p className='text-sm uppercase tracking-[0.28em] text-slate-500'>Création</p>
                <p className='mt-3 text-lg font-semibold text-slate-900'>2014</p>
              </div>
              <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6'>
                <p className='text-sm uppercase tracking-[0.28em] text-slate-500'>Zones de représentation</p>
                <p className='mt-3 text-lg font-semibold text-slate-900'>Maï-Ndombe, Kwilu</p>
              </div>
            </div>
          </div>
          <div className='rounded-[2rem] overflow-hidden bg-slate-100'>
            <div className='h-96 bg-[url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80")] bg-cover bg-center' />
          </div>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
        <div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
          <div className='order-2 lg:order-1'>
            <div className='rounded-[2rem] overflow-hidden bg-slate-100'>
              <div className='h-96 bg-[url("https://images.unsplash.com/photo-1519923043171-13d04c4c8f9a?auto=format&fit=crop&w=1200&q=80")] bg-cover bg-center' />
            </div>
          </div>
          <div className='order-1 space-y-6 lg:order-2'>
            <SectionTitle eyebrow='Notre histoire' title='Une histoire construite autour d’expériences documentées' description='Depuis 2014, CIAPAFED développe des actions en lien avec les communautés et les territoires, en s’appuyant sur des interventions concrètes et une présence active en RDC.' />
            <div className='space-y-8'>
              {timeline.map((item) => (
                <div key={item.year} className='flex gap-6'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-3xl bg-forest text-white text-lg font-semibold'>{item.year}</div>
                  <div>
                    <p className='text-lg font-semibold text-slate-900'>{item.label}</p>
                    <p className='mt-2 text-sm leading-7 text-slate-600'>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
        <SectionTitle eyebrow='Nos domaines' title='Nos domaines d’intervention' description='Quatre domaines prioritaires qui structurent les actions de CIAPAFED.' />
        <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-4'>
          {domaines.map((item) => (
            <article key={item.title} className='group rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl'>
              <p className='text-sm uppercase tracking-[0.3em] text-forest'>Domaine</p>
              <h3 className='mt-4 text-xl font-semibold text-slate-900'>{item.title}</h3>
              <p className='mt-4 text-sm leading-7 text-slate-600'>{item.description}</p>
              <a href='/domaines' className='mt-6 inline-flex rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'>Découvrir</a>
            </article>
          ))}
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
        <div className='grid gap-10 lg:grid-cols-2'>
          <div className='space-y-6'>
            <SectionTitle eyebrow='Coordination' title='Une coordination nationale assurée' description='CIAPAFED est pilotée par une coordination nationale dédiée au suivi des activités et aux relations partenaires.' />
            <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8'>
              <p className='text-sm uppercase tracking-[0.3em] text-forest'>Coordonnatrice</p>
              <h3 className='mt-4 text-2xl font-semibold text-slate-900'>UMBA PHAKA Bénédicte</h3>
              <p className='mt-3 text-sm leading-7 text-slate-600'>Coordinatrice Nationale ai</p>
              <div className='mt-6 space-y-4'>
                <div>
                  <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>Email</p>
                  <p className='text-sm text-slate-700'>ongdciapafed@gmail.com</p>
                </div>
                <div>
                  <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>Téléphone</p>
                  <p className='text-sm text-slate-700'>+243 813 393 919</p>
                </div>
              </div>
            </div>
          </div>
          <div className='rounded-[2rem] overflow-hidden bg-slate-100'>
            <div className='h-96 bg-[url("https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80")] bg-cover bg-center' />
          </div>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
        <div className='grid gap-10 lg:grid-cols-3'>
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8'>
            <p className='text-sm uppercase tracking-[0.3em] text-forest'>Mission</p>
            <p className='mt-4 text-base leading-7 text-slate-600'>Accompagner les communautés rurales dans des initiatives participatives qui renforcent l’agriculture familiale, protègent les ressources naturelles et soutiennent un développement local durable.</p>
          </div>
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8'>
            <p className='text-sm uppercase tracking-[0.3em] text-forest'>Vision</p>
            <p className='mt-4 text-base leading-7 text-slate-600'>Contribuer à des territoires résilients où les communautés disposent de moyens durables pour préserver leur environnement, améliorer leurs conditions de vie et valoriser leurs savoirs locaux.</p>
          </div>
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8'>
            <p className='text-sm uppercase tracking-[0.3em] text-forest'>Valeurs proposées</p>
            <ul className='mt-4 space-y-3 text-sm leading-7 text-slate-600'>
              {valeursProposees.map((value) => (
                <li key={value}>• {value}</li>
              ))}
            </ul>
            <p className='mt-4 text-xs uppercase tracking-[0.3em] text-slate-500'>À confirmer</p>
          </div>
        </div>
      </section>

      <section className='rounded-[2rem] bg-forest px-8 py-12 text-white shadow-soft'>
        <div className='mx-auto max-w-5xl text-center'>
          <p className='text-sm uppercase tracking-[0.35em] text-slate-200'>En savoir plus</p>
          <h2 className='mt-4 text-3xl font-semibold sm:text-4xl'>Découvrez nos projets</h2>
          <p className='mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200'>Explorez les actions documentées et les projets menés par CIAPAFED au service des communautés et de l’environnement.</p>
          <a href='/projets' className='mt-8 inline-flex rounded-full bg-sand px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-[#d7c3a5]'>Découvrez nos projets</a>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;

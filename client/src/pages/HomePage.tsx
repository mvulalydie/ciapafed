import { ArrowDown, ArrowRight, Layers, Sparkles, TreeDeciduous } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import NewsCard from '../components/NewsCard';

const domaines = [
  {
    number: '01',
    title: 'Agroforesterie',
    description: 'Soutien à des systèmes agricoles durables intégrant arbres et cultures.'
  },
  {
    number: '02',
    title: 'Conservation, REDD+ et climat',
    description: 'Actions pour la protection des forêts et l’adaptation climatique.'
  },
  {
    number: '03',
    title: 'Aménagement durable du territoire',
    description: 'Planification locale respectueuse des ressources naturelles.'
  },
  {
    number: '04',
    title: 'Éducation et formation',
    description: 'Renforcement des capacités des communautés rurales.'
  }
];

const projets = [
  {
    title: 'Programme d’Investissement pour la Forêt et la Restauration des Savanes',
    location: 'Masimanimba',
    status: 'En cours',
    slug: 'programme-foret-restauration'
  },
  {
    title: 'PIREDD Plateaux 2',
    location: 'Bolobo & Yumbi',
    status: 'En cours',
    slug: 'piredd-plateaux-2'
  },
  {
    title: 'Microprojets en faveur des peuples autochtones',
    location: 'Kiri & Oshwe',
    status: 'En structuration',
    slug: 'microprojets-autochtone'
  }
];

const actualites = [
  {
    title: 'Session de formation pour des jeunes agriculteurs',
    date: 'Mai 2026',
    excerpt: 'Appui à des formations pratiques pour des techniques agricoles durables.',
    slug: 'formation-jeunes-agriculteurs'
  },
  {
    title: 'Rencontre de suivi avec des partenaires locaux',
    date: 'Avril 2026',
    excerpt: 'Échange sur le déploiement des initiatives en Kwilu et Maï-Ndombe.',
    slug: 'rencontre-suivi-partenaires'
  },
  {
    title: 'Actualité à publier',
    date: '',
    excerpt: 'Aucune actualité n’est disponible pour le moment.',
    slug: 'actualite-a-publier'
  }
];

const partenaires = ['Banque mondiale', 'WWF', 'FAO', 'FA-FEM', 'JICA', 'UC-PIF'];

function HomePage() {
  return (
    <>
      <section className='relative overflow-hidden rounded-[2rem] bg-[url("https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80")] bg-cover bg-center text-white shadow-soft'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50' />
        <div className='relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24'>
          <div className='max-w-3xl space-y-6 sm:space-y-8'>
            <p className='text-[10px] uppercase tracking-[0.28em] text-slate-200 sm:text-xs lg:text-sm'>ONG • Agriculture familiale • Environnement durable</p>
            <h1 className='max-w-[12ch] text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.2rem]'>Agir avec les communautés pour un avenir durable</h1>
            <p className='max-w-2xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8 lg:text-lg'>CIAPAFED accompagne les communautés dans la promotion de l’agriculture familiale, la conservation des ressources naturelles et le développement durable.</p>
            <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
              <a href='#introduction' className='inline-flex w-full items-center justify-center rounded-full bg-sand px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#d7c3a5] sm:w-auto'>Découvrir CIAPAFED</a>
              <a href='#projets' className='inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 sm:w-auto'>Nos projets</a>
            </div>
          </div>
          <div className='mt-8 flex items-center gap-3 text-sm text-slate-200 opacity-90 sm:mt-12'>
            <ArrowDown size={18} />
            <span>Faites défiler pour découvrir</span>
          </div>
        </div>
      </section>

      <section id='introduction' className='mt-16 rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid gap-10 lg:grid-cols-2 lg:items-center'>
            <div className='space-y-6'>
              <p className='text-sm uppercase tracking-[0.3em] text-forest'>Construire un développement durable avec les communautés</p>
              <h2 className='text-3xl font-semibold text-slate-900 sm:text-4xl'>CIAPAFED est une ONG congolaise engagée depuis 2014</h2>
              <p className='max-w-2xl text-base leading-8 text-slate-600'>Le Centre d’Initiative et d’Appui Participatif à l’Agriculture Familiale et l’Environnement Durable agit avec professionnalisme, transparence et proximité dans les provinces de Maï-Ndombe et Kwilu.</p>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              {[
                { label: 'Créée en', value: '2014' },
                { label: 'Statut', value: 'ONG' },
                { label: 'Zones', value: 'Maï-Ndombe' },
                { label: 'Zones', value: 'Kwilu' }
              ].map((item) => (
                <div key={`${item.label}-${item.value}`} className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-center shadow-sm'>
                  <p className='text-sm uppercase tracking-[0.2em] text-slate-500'>{item.label}</p>
                  <p className='mt-4 text-3xl font-semibold text-forest'>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id='domaines' className='mt-20'>
        <SectionTitle eyebrow='Domaines' title='Nos domaines d’intervention' description='Des actions au service des communautés, des territoires et de l’environnement.' />
        <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-4'>
          {domaines.map((item) => (
            <article key={item.number} className='group rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-xl'>
              <div className='flex items-center gap-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-3xl bg-forest text-white'>{item.number}</div>
                <h3 className='text-xl font-semibold text-slate-900'>{item.title}</h3>
              </div>
              <p className='mt-5 text-sm leading-7 text-slate-600'>{item.description}</p>
              <a href='/domaines' className='mt-6 inline-flex rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'>Découvrir</a>
            </article>
          ))}
        </div>
      </section>

      <section id='projets' className='mt-20 rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
            <div className='max-w-2xl'>
              <p className='text-sm uppercase tracking-[0.3em] text-forest'>Nos projets</p>
              <h2 className='mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl'>Projets à la une</h2>
            </div>
            <a href='/projets' className='inline-flex rounded-full border border-forest px-6 py-3 text-sm font-semibold text-forest transition hover:bg-forest hover:text-white'>Voir tous nos projets</a>
          </div>
          <div className='grid gap-6 lg:grid-cols-3'>
            {projets.map((project) => (
              <article key={project.slug} className='group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-soft transition hover:-translate-y-1 hover:shadow-xl'>
                <div className='h-64 bg-[url("https://images.unsplash.com/photo-1455763916899-e8b50eca9967?auto=format&fit=crop&w=1200&q=80")] bg-cover bg-center' />
                <div className='space-y-4 p-6'>
                  <p className='text-xs uppercase tracking-[0.3em] text-forest'>{project.status}</p>
                  <h3 className='text-xl font-semibold text-slate-900'>{project.title}</h3>
                  <p className='text-sm font-semibold text-slate-600'>{project.location}</p>
                  <a href='/projets' className='inline-flex rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'>Découvrir</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='mt-20 rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid gap-10 lg:grid-cols-2 lg:items-center'>
            <div className='space-y-6'>
              <p className='text-sm uppercase tracking-[0.3em] text-forest'>Expérience</p>
              <h2 className='text-3xl font-semibold text-slate-900 sm:text-4xl'>Notre expérience sur le terrain</h2>
              <p className='text-base leading-8 text-slate-600'>CIAPAFED dispose d’expériences documentées dans plusieurs territoires et à travers différents programmes, en agriculture, en conservation, en accompagnement des communautés, en biodiversité et en formation.</p>
              <a href='/realisations' className='inline-flex rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'>Découvrir nos réalisations</a>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              {['Agriculture', 'Forêts', 'Communautés', 'Biodiversité', 'Sensibilisation', 'Formation'].map((item) => (
                <div key={item} className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-center text-slate-700 shadow-sm'>
                  <p className='text-lg font-semibold text-slate-900'>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='mt-20 rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-10'>
            <SectionTitle eyebrow='Partenaires' title='Nos partenaires et bailleurs' description='Acteurs qui accompagnent les actions de CIAPAFED en RDC.' />
          </div>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {partenaires.map((name) => (
              <div key={name} className='flex h-28 items-center justify-center rounded-[1.75rem] border border-slate-200 bg-slate-50 text-center text-slate-700 shadow-sm'>
                <span className='text-sm font-semibold'>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='mt-20 rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
        <SectionTitle eyebrow='Actualités' title='Actualités & activités' description='Informations récentes sur les actions et les initiatives de CIAPAFED.' />
        <div className='grid gap-6 lg:grid-cols-3'>
          {actualites.map((item) => (
            <NewsCard key={item.slug} {...item} />
          ))}
        </div>
      </section>

      <section className='mt-20 rounded-[2rem] bg-forest px-10 py-16 text-white shadow-soft'>
        <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center'>
          <div className='space-y-6'>
            <p className='text-sm uppercase tracking-[0.3em] text-slate-200'>Construisons ensemble</p>
            <h2 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl'>Construisons ensemble un avenir durable</h2>
            <p className='max-w-2xl text-base leading-8 text-slate-200'>Vous souhaitez collaborer avec CIAPAFED ? Notre équipe est à votre écoute.</p>
          </div>
          <div>
            <a href='/contact' className='inline-flex rounded-full bg-sand px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-[#d7c3a5]'>Nous contacter</a>
          </div>
        </div>
      </section>

      <div className='mt-20 h-10 border-t border-slate-200' />
    </>
  );
}

export default HomePage;

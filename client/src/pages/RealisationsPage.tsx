import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';

const timeline = [
  {
    year: '2014',
    title: 'Création de CIAPAFED',
    description: 'Fondation du Centre d’Initiative et d’Appui Participatif à l’Agriculture Familiale et l’Environnement Durable.'
  },
  {
    year: '2018',
    title: 'Partenariat FAO',
    description: 'Déploiement d’appuis techniques pour renforcer l’agriculture familiale et les initiatives communautaires.'
  },
  {
    year: '2019',
    title: 'Programme avec WWF',
    description: 'Renforcement des actions de conservation et de protection des forêts au service des communautés locales.'
  },
  {
    year: '2021',
    title: 'Appui Banque mondiale',
    description: 'Renforcement des capacités locales autour de la restauration des paysages forestiers et des savanes.'
  },
  {
    year: '2023',
    title: 'Soutien FA-FEM',
    description: 'Renforcement de filières durables et appui aux initiatives locales de valorisation des ressources.'
  },
  {
    year: '2024',
    title: 'Accompagnement JICA',
    description: 'Consolidation des services de formation et des actions communautaires en RDC.'
  }
];

const sectors = [
  'Agriculture',
  'Forêt',
  'Biodiversité',
  'Communautés',
  'Pêche',
  'Formation',
  'Cartographie participative'
];

const keyResults = [
  '9 personnes formées aux techniques d’élevage porcin',
  'Une porcherie de 4 loges construite',
  '9 reproducteurs remis aux CLD'
];

function RealisationsPage() {
  return (
    <div className='space-y-16'>
      <section className='relative overflow-hidden rounded-[2rem] bg-[url("https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80")] bg-cover bg-center text-white shadow-soft'>
        <div className='absolute inset-0 bg-black/40' />
        <div className='relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24'>
          <div className='max-w-3xl space-y-5 sm:space-y-6'>
            <p className='text-[10px] uppercase tracking-[0.28em] text-slate-200 sm:text-xs lg:text-sm'>Réalisations</p>
            <h1 className='text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl'>L’expérience CIAPAFED mise en œuvre sur le terrain</h1>
            <p className='text-sm leading-7 text-slate-200 sm:text-base sm:leading-8 lg:text-lg'>Une trajectoire construite autour de projets concrets, de partenaires institutionnels reconnus et de résultats visibles pour les communautés rurales.</p>
            <div className='flex flex-wrap gap-4'>
              <Link to='/projets' className='inline-flex w-full items-center justify-center rounded-full bg-sand px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#d7c3a5] sm:w-auto'>Découvrir nos projets</Link>
            </div>
          </div>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-12 shadow-soft sm:px-10'>
        <SectionTitle eyebrow='Crédibilité' title='Une expérience validée par des partenariats solides' description='CIAPAFED travaille avec des bailleurs historiques pour structurer des interventions durables en RDC.' />

        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-5'>
          {['FAO', 'WWF', 'Banque mondiale', 'FA-FEM', 'JICA'].map((partner) => (
            <div key={partner} className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-center shadow-sm'>
              <p className='text-sm uppercase tracking-[0.3em] text-slate-500'>{partner}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-12 shadow-soft sm:px-10'>
        <SectionTitle eyebrow='Timeline' title='Nos expériences documentées dans le temps' description='Une progression chronologique qui illustre le savoir-faire et l’appui territorial de CIAPAFED.' />
        <div className='relative border-l border-slate-200 pl-8'>
          {timeline.map((item, index) => (
            <div key={item.year} className='relative mb-12 last:mb-0'>
              <span className='absolute -left-5 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-forest text-sm font-semibold text-white'>{item.year}</span>
              <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm'>
                <h3 className='text-xl font-semibold text-slate-900'>{item.title}</h3>
                <p className='mt-3 text-sm leading-7 text-slate-600'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-12 shadow-soft sm:px-10'>
        <SectionTitle eyebrow='Résultats clés' title='Des résultats concrets, mesurés et documentés' description='Les réalisations montrent un impact tangible et vérifiable sur les communautés accompagnées.' />
        <div className='grid gap-6 md:grid-cols-3'>
          {keyResults.map((result) => (
            <div key={result} className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 shadow-sm'>
              <p className='text-sm uppercase tracking-[0.28em] text-forest'>Chiffre clé</p>
              <p className='mt-5 text-xl font-semibold leading-8 text-slate-900'>{result}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-12 shadow-soft sm:px-10'>
        <SectionTitle eyebrow='Secteurs' title='Une expérience construite au fil des projets' description='Des compétences étendues sur des secteurs complémentaires qui renforcent l’impact du terrain.' />
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {sectors.map((sector) => (
            <div key={sector} className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-center shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.28em] text-slate-700'>{sector}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='rounded-[2rem] bg-forest px-8 py-12 text-white shadow-soft sm:px-10'>
        <div className='grid gap-10 lg:grid-cols-2 lg:items-center'>
          <div className='space-y-6'>
            <p className='text-sm uppercase tracking-[0.3em] text-slate-200'>Action terrain</p>
            <h2 className='text-3xl font-semibold text-white sm:text-4xl'>Découvrir nos projets</h2>
            <p className='max-w-2xl text-base leading-8 text-slate-100'>Explorez des projets documentés, structurés par CIAPAFED et portés par des bailleurs reconnus.</p>
          </div>
          <div>
            <Link to='/projets' className='inline-flex rounded-full bg-sand px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-[#d7c3a5]'>Découvrir nos projets</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RealisationsPage;

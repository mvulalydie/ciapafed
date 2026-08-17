import { BookOpen, MapPin, ShieldCheck, TreeDeciduous } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const domaines = [
  {
    number: '01',
    title: 'Agroforesterie',
    description: 'Accompagnement de l’agriculture familiale par des systèmes agroforestiers, des pépinières et la restauration des paysages.',
    activities: ['Agriculture familiale', 'Agroforesterie', 'Pépinières', 'Plantations', 'Restauration des paysages'],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    icon: TreeDeciduous
  },
  {
    number: '02',
    title: 'Conservation, REDD+ et climat',
    description: 'Actions de protection des forêts et de la biodiversité avec une approche REDD+ adaptée au climat et aux communautés rurales.',
    activities: ['Conservation forestière', 'Protection des forêts', 'Biodiversité', 'REDD+', 'Climat'],
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
    icon: ShieldCheck
  },
  {
    number: '03',
    title: 'Aménagement durable du territoire',
    description: 'Planification et gestion durable du territoire fondées sur la participation locale et la préservation des ressources naturelles.',
    activities: ['Gestion durable', 'Planification', 'Ressources naturelles', 'Approche participative'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    icon: MapPin
  },
  {
    number: '04',
    title: 'Éducation et formation',
    description: 'Renforcement des capacités par la sensibilisation, la formation et l’accompagnement des communautés vers des pratiques durables.',
    activities: ['Sensibilisation', 'Formation', 'Renforcement des capacités', 'Accompagnement communautaire'],
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
    icon: BookOpen
  }
];

function DomainesPage() {
  return (
    <div className='space-y-20'>
      <section className='rounded-[2rem] bg-white px-4 py-8 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        <SectionTitle
          eyebrow='Domaines'
          title='Nos domaines d’intervention'
          description='Nous intervenons au croisement de l’agriculture familiale, de la conservation de l’environnement et du développement durable.'
        />
      </section>

      {domaines.map((domaine, index) => {
        const Icon = domaine.icon;
        const isEven = index % 2 === 1;

        return (
          <section key={domaine.number} className='rounded-[2rem] bg-white px-6 py-12 shadow-soft sm:px-8 lg:px-10'>
            <div className={`grid gap-10 lg:grid-cols-[1fr_1.05fr] ${isEven ? 'lg:flex-row-reverse lg:grid-cols-[1.05fr_1fr]' : ''}`}>
              <div className='relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent' />
                <div className='h-96 bg-cover bg-center' style={{ backgroundImage: `url(${domaine.image})` }} />
              </div>

              <div className='flex flex-col justify-center gap-6'>
                <div className='inline-flex items-center gap-3 rounded-full border border-forest/20 bg-forest/5 px-4 py-2 text-sm font-semibold text-forest'>
                  <span>{domaine.number}</span>
                </div>
                <div className='inline-flex items-center gap-3'>
                  <span className='flex h-12 w-12 items-center justify-center rounded-3xl bg-forest text-white'>
                    <Icon size={24} />
                  </span>
                  <h2 className='text-3xl font-semibold text-slate-900'>{domaine.title}</h2>
                </div>
                <p className='max-w-2xl text-base leading-8 text-slate-600'>{domaine.description}</p>
                <div className='grid gap-3 sm:grid-cols-2'>
                  {domaine.activities.map((activity) => (
                    <div key={activity} className='rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 shadow-sm'>
                      {activity}
                    </div>
                  ))}
                </div>
                <a
                  href='/projets'
                  className='inline-flex w-fit items-center justify-center rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#163c2b]'
                >
                  Voir nos projets
                </a>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default DomainesPage;

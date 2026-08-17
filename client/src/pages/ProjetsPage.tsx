import { useEffect, useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/api';
import type { Project } from '../services/api';

const filters = ['Tous', 'En cours', 'Terminés', 'Agroforesterie', 'Forêts', 'Climat', 'Communautés'] as const;

type FilterOption = (typeof filters)[number];

function ProjetsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Tous');

  useEffect(() => {
    setLoading(true);
    getProjects()
      .then((data) => {
        setProjects(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Tous') {
      return projects;
    }

    if (activeFilter === 'En cours' || activeFilter === 'Terminés') {
      return projects.filter((project) => project.status === activeFilter);
    }

    return projects.filter((project) => project.categories.includes(activeFilter));
  }, [activeFilter, projects]);

  return (
    <div className='space-y-14'>
      <section className='rounded-[2rem] bg-white px-4 py-8 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        <SectionTitle
          eyebrow='Projets'
          title='Portfolio de projets documentés'
          description='Découvrez l’expertise de CIAPAFED à travers des projets concrets, de la restauration forestière aux initiatives communautaires.'
        />
        <p className='max-w-3xl text-sm leading-7 text-slate-600'>Chaque projet est présenté avec son statut, sa localisation, son bailleur et ses résultats clés. Filtrez les projets par état ou domaine d’intervention.</p>
      </section>

      <section className='rounded-[2rem] bg-white px-4 py-6 shadow-soft sm:px-8 sm:py-10 lg:px-10'>
        <div className='flex flex-wrap gap-3'>
          {filters.map((filter) => (
            <button
              key={filter}
              type='button'
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${activeFilter === filter ? 'border-forest bg-forest text-white' : 'border-slate-300 bg-slate-100 text-slate-700 hover:border-slate-400 hover:bg-slate-200'}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-10 shadow-soft sm:px-10'>
        {loading ? (
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Chargement des projets...</div>
        ) : error ? (
          <div className='rounded-[1.75rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700'>Erreur : {error}</div>
        ) : filteredProjects.length === 0 ? (
          <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600'>Aucun projet ne correspond à ce filtre pour le moment.</div>
        ) : (
          <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjetsPage;

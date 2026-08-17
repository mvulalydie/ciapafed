import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { getProject, getProjects } from '../services/api';
import type { Project } from '../services/api';

function ProjetDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Projet introuvable');
      setLoading(false);
      return;
    }

    setLoading(true);
    getProject(slug)
      .then((data) => {
        setProject(data);
        return getProjects().then((allProjects) => {
          const similar = allProjects
            .filter((item) => item.slug !== data.slug && item.categories.some((cat) => data.categories.includes(cat)))
            .slice(0, 3);
          setRelatedProjects(similar);
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className='rounded-[2rem] bg-white p-10 shadow-soft'>Chargement du projet...</div>;
  }

  if (error || !project) {
    return <div className='rounded-[2rem] bg-white p-10 shadow-soft'>Projet non trouvé.</div>;
  }

  return (
    <div className='space-y-12'>
      <section className='relative overflow-hidden rounded-[2rem] bg-slate-900 text-white shadow-soft'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80' />
        <div className='h-96 bg-cover bg-center' style={{ backgroundImage: `url(${project.image})` }} />
        <div className='relative mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10'>
          <div className='max-w-3xl space-y-6'>
            <p className='text-sm uppercase tracking-[0.3em] text-slate-200'>Projet</p>
            <h1 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl'>{project.title}</h1>
            <p className='text-base leading-8 text-slate-200'>{project.summary}</p>
            <div className='flex flex-wrap gap-3'>
              <span className='rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white'>{project.status}</span>
              <span className='rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white'>{project.period}</span>
              <span className='rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white'>{project.location}</span>
            </div>
          </div>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-10 shadow-soft sm:px-10'>
        <div className='grid gap-10 lg:grid-cols-[2fr_1fr]'>
          <div className='space-y-10'>
            <SectionTitle eyebrow='Détail du projet' title={project.title} description={project.description} />

            <div className='space-y-8'>
              <div>
                <h3 className='text-xl font-semibold text-slate-900'>Objectifs</h3>
                <ul className='mt-5 grid gap-3 sm:grid-cols-2'>
                  {project.goals.map((goal) => (
                    <li key={goal} className='rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700'>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-semibold text-slate-900'>Activités</h3>
                <ul className='mt-5 grid gap-3 sm:grid-cols-2'>
                  {project.activities.map((activity) => (
                    <li key={activity} className='rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700'>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-semibold text-slate-900'>Résultats clés</h3>
                <ul className='mt-5 space-y-3 text-sm text-slate-700'>
                  {project.keyResults.map((result) => (
                    <li key={result} className='flex gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4'>
                      <span className='mt-1 h-2.5 w-2.5 rounded-full bg-forest' />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className='space-y-8'>
            <div className='rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm'>
              <p className='text-sm uppercase tracking-[0.3em] text-slate-500'>Informations</p>
              <div className='mt-6 space-y-5 text-sm text-slate-700'>
                <div>
                  <p className='font-semibold text-slate-900'>Bailleur</p>
                  <p>{project.funder}</p>
                </div>
                <div>
                  <p className='font-semibold text-slate-900'>Localisation</p>
                  <p>{project.location}</p>
                </div>
                <div>
                  <p className='font-semibold text-slate-900'>Période</p>
                  <p>{project.period}</p>
                </div>
                <div>
                  <p className='font-semibold text-slate-900'>Statut</p>
                  <p>{project.status}</p>
                </div>
                <div>
                  <p className='font-semibold text-slate-900'>Domaines</p>
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {project.categories.map((category) => (
                      <span key={category} className='rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-xl font-semibold text-slate-900'>Galerie</h3>
              <div className='grid gap-4 sm:grid-cols-2'>
                {project.gallery.map((image) => (
                  <div key={image} className='overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100'>
                    <img src={image} alt={project.title} className='h-48 w-full object-cover' />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className='rounded-[2rem] bg-white px-8 py-10 shadow-soft sm:px-10'>
        <SectionTitle eyebrow='Projets similaires' title='Autres projets documentés' description='Projets qui partagent des objectifs ou des territoires proches.' />
        {relatedProjects.length === 0 ? (
          <p className='text-sm leading-7 text-slate-600'>Aucun projet similaire disponible pour le moment.</p>
        ) : (
          <div className='grid gap-6 lg:grid-cols-3'>
            {relatedProjects.map((related) => (
              <Link key={related.slug} to={`/projets/${related.slug}`} className='group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-soft transition hover:-translate-y-1 hover:shadow-xl'>
                <div className='h-48 bg-cover bg-center' style={{ backgroundImage: `url(${related.image})` }} />
                <div className='space-y-4 p-6'>
                  <p className='text-xs uppercase tracking-[0.3em] text-forest'>{related.status}</p>
                  <h3 className='text-xl font-semibold text-slate-900'>{related.title}</h3>
                  <p className='text-sm leading-6 text-slate-600'>{related.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjetDetailPage;

type Partner = {
  slug: string;
  name: string;
  logo?: string | null;
  description?: string;
  projects?: string[];
};

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article className='group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-xl'>
      <div className='flex items-center gap-4'>
        <div className='flex h-16 w-40 items-center justify-center overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200'>
          {partner.logo ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={partner.logo} alt={`${partner.name} logo`} className='h-full w-full object-contain p-2' />
          ) : (
            <div className='flex h-full w-full items-center justify-center px-2 text-center text-sm font-semibold text-slate-700'>
              {partner.name}
            </div>
          )}
        </div>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-slate-900'>{partner.name}</h3>
          {partner.description ? <p className='mt-2 text-sm leading-6 text-slate-600'>{partner.description}</p> : <p className='mt-2 text-sm text-slate-500'>Description institutionnelle non fournie.</p>}
          {partner.projects && partner.projects.length > 0 && (
            <p className='mt-3 text-sm leading-6 text-slate-600'>Projets associés : {partner.projects.join(', ')}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default PartnerCard;

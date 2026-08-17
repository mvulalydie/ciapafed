type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className='mb-8 max-w-3xl sm:mb-10'>
      {eyebrow && <p className='text-xs font-semibold uppercase tracking-[0.25em] text-forest sm:text-sm'>{eyebrow}</p>}
      <h2 className='mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl'>{title}</h2>
      {description && <p className='mt-3 text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base sm:leading-8'>{description}</p>}
    </div>
  );
}

export default SectionTitle;

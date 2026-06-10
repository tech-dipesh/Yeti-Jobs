import { Helmet  } from 'react-helmet-async';
export default function useSEO({title="Yeti Jobs", description="Job Portal"}) {
  return (
  <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}/>
  </Helmet>
  );
}

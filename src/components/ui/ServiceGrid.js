import ServiceCard from './ServiceCard';
import { services } from '@/content/site';
import s from './ui.module.css';

export default function ServiceGrid({ descriptions = {} }) {
  return (
    <div className={s.grid}>
      {services.map((svc) => <ServiceCard key={svc.slug} service={svc} description={descriptions[svc.slug]} />)}
    </div>
  );
}

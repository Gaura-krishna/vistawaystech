import { revalidatePath } from 'next/cache';

/** Refresh cached public pages after an admin change. */
export function revalidateCareers(slug) {
  revalidatePath('/careers');
  if (slug) revalidatePath(`/careers/${slug}`);
  revalidatePath('/sitemap.xml');
}

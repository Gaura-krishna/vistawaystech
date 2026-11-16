import AdminLogin from '@/components/careers/AdminLogin';
import AdminJobs from '@/components/careers/AdminJobs';
import { adminConfigured, isAdmin } from '@/lib/auth';
import { listAll } from '@/lib/jobs';
import { storageKind } from '@/lib/jobs/store';

export const metadata = { title: 'Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  let body;
  if (!adminConfigured()) {
    body = (
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--fs-h3)' }}>Admin is not configured</h1>
        <p>Set <code>ADMIN_PASSWORD</code> and <code>ADMIN_SECRET</code> (16+ random characters) in the environment, restart the server, then reload this page.</p>
      </div>
    );
  } else if (!(await isAdmin())) {
    body = <AdminLogin />;
  } else {
    body = <AdminJobs initialJobs={await listAll()} storage={storageKind()} />;
  }
  return <section className="section"><div className="container">{body}</div></section>;
}

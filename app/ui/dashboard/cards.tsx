import { DocumentTextIcon, CheckCircleIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';
import { fetchDashboardStats } from '@/app/lib/data';

const iconMap = {
  reported: DocumentTextIcon,
  users: UsersIcon,
  pending: ClockIcon,
  confirmed: CheckCircleIcon,
};

export default async function CardWrapper() {
  const { reportedCount, confirmedCount, pendingCount, userCount } = await fetchDashboardStats();
  return (
    <>
      <Card title="Reported Violations" value={reportedCount} type="reported" />
      <Card title="Pending Violations" value={pendingCount} type="pending" />
      <Card title="Confirmed Violations" value={confirmedCount} type="confirmed" />
      <Card title="Total Users" value={userCount} type="users" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'users' | 'pending' | 'confirmed' | 'reported';
}) {
  const Icon = iconMap[type];
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
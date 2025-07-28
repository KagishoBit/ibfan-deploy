import { fetchDashboardStats } from '@/app/lib/data';
import {
  DocumentPlusIcon,
  ClockIcon,
  CheckBadgeIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import React from 'react';

// --- Typed Props for our StatCard Component ---
interface StatCardProps {
  title: string;
  value: number;
  total: number;
  Icon: React.ElementType; // Type for passing a component like an icon
}

// --- Reusable StatCard Component ---
// Using React.FC (Functional Component) provides type-checking for props and return value
const StatCard: React.FC<StatCardProps> = ({ title, value, total, Icon }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center gap-2 transform transition-transform hover:scale-105">
      <div className="flex flex-col items-center">
        <Icon className="h-8 w-8 text-blue-600 mb-2" />
        <h2 className="text-md font-medium text-gray-500">{title}</h2>
      </div>
      <div className="relative flex items-center justify-center w-40 h-40">
        <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} stroke="#e6e6e6" strokeWidth="10" fill="transparent" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />
        </svg>
        <span className="absolute text-4xl font-bold text-gray-800">{value}</span>
      </div>
    </div>
  );
};

// --- Main Dashboard Page (Async Server Component) ---
export default async function DashboardPage() {
  // 1. Fetch data on the server. The `stats` constant is automatically typed as DashboardStats.
  const stats = await fetchDashboardStats();

  // 2. Render the page with the type-safe data
  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Violations Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="New violations" value={stats.newCount} total={stats.reportedCount} Icon={DocumentPlusIcon} />
        <StatCard title="Pending violations" value={stats.pendingCount} total={stats.reportedCount} Icon={ClockIcon} />
        <StatCard title="Confirmed violations" value={stats.confirmedCount} total={stats.reportedCount} Icon={CheckBadgeIcon} />
        <StatCard title="Reported violations" value={stats.reportedCount} total={stats.reportedCount} Icon={ClipboardDocumentListIcon} />
      </div>
    </main>
  );
}
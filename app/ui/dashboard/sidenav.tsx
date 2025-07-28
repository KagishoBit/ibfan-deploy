import Link from 'next/link';
// You can find icons from libraries like Heroicons
import { DocumentTextIcon, UserPlusIcon } from '@heroicons/react/24/outline';

// A map of links to display in the side navigation.
const links = [
  { name: 'Reports', href: '/dashboard/reports', icon: DocumentTextIcon },
  { name: 'Resolve an issue', href: '/dashboard/resolve', icon: DocumentTextIcon },
  { name: 'Examples of violations', href: '/dashboard/examples', icon: DocumentTextIcon },
  { name: 'Register user', href: '/dashboard/register', icon: UserPlusIcon },
  { name: 'Remove user', href: '/dashboard/remove', icon: UserPlusIcon },
];

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2" style={{ backgroundColor: '#2E5090' }}>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* We can map over the links array here */}
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-white hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start"
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
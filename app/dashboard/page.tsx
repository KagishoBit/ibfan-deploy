'use client';

import React, { useState, useEffect } from 'react';

interface Violation {
  id: number;
  employeeId: string;
  location: string;
  violationType: string;
  description: string;
  date: string;
  resolved: boolean;
}

const ViolationDashboard: React.FC = () => {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [resolvedCount, setResolvedCount] = useState<number>(0);
  const [openCount, setOpenCount] = useState<number>(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const mockViolations: Violation[] = [
          { id: 1, employeeId: 'E123', location: 'New York', violationType: 'Safety', description: 'No PPE', date: '2023-10-26', resolved: true },
          { id: 2, employeeId: 'E456', location: 'Los Angeles', violationType: 'Attendance', description: 'Late arrival', date: '2023-10-27', resolved: false },
          { id: 3, employeeId: 'E789', location: 'Chicago', violationType: 'Policy', description: 'Unauthorized access', date: '2023-10-28', resolved: false },
          { id: 4, employeeId: 'E100', location: 'Miami', violationType: 'Safety', description: 'Unsafe equipment', date: '2023-10-29', resolved: true },
          { id: 5, employeeId: 'E101', location: 'Seattle', violationType: 'Attendance', description: 'Left early', date: '2023-10-30', resolved: false },
        ];
        setViolations(mockViolations);

        const mockUserCount = 10;
        setUserCount(mockUserCount);

        const resolved = mockViolations.filter((v) => v.resolved).length;
        setResolvedCount(resolved);

        const open = mockViolations.filter((v) => !v.resolved).length;
        setOpenCount(open);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Violations Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* User Count Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Users</h2>
          <p className="text-4xl font-bold text-blue-600">{userCount}</p>
        </div>

        {/* Total Violations Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Total Violations</h2>
          <p className="text-4xl font-bold text-red-600">{violations.length}</p>
        </div>

        {/* Resolved Violations Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Resolved</h2>
          <p className="text-4xl font-bold text-green-600">{resolvedCount}</p>
        </div>

        {/* Open Violations Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Open Violations</h2>
          <p className="text-4xl font-bold text-yellow-600">{openCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ViolationDashboard;
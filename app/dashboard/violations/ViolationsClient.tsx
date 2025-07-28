'use client';

import React, { useState } from 'react';
import { DocumentPlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ViolationFormModal } from './ViolationsFormModal';
import type { Violation } from '@/app/lib/types';

interface ViolationsClientProps {
  initialViolations: Violation[];
  addViolationAction: (formData: FormData) => Promise<void>;
  updateViolationAction: (formData: FormData) => Promise<void>;
  deleteViolationAction: (id: number) => Promise<void>;
}

export function ViolationsClient({
  initialViolations,
  addViolationAction,
  updateViolationAction,
  deleteViolationAction,
}: ViolationsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingViolation, setEditingViolation] = useState<Violation | null>(null);

  const handleAddNew = () => {
    setEditingViolation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (violation: Violation) => {
    setEditingViolation(violation);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this violation?')) {
      try {
        await deleteViolationAction(id);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete violation.');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Violation Management</h1>
        <button onClick={handleAddNew} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          <DocumentPlusIcon className="h-5 w-5" />
          Add Violation
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {['Description', 'Type', 'Location', 'Date', 'Status', 'Actions'].map((h) => (
                <th key={h} className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {initialViolations.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-800 truncate max-w-xs">{v.description}</td>
                <td className="py-3 px-4 text-gray-600">{v.violation_type}</td>
                <td className="py-3 px-4 text-gray-600">{v.location}</td>
                <td className="py-3 px-4 text-gray-600">{new Date(v.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${v.resolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {v.resolved ? 'Resolved' : 'Pending'}
                  </span>
                </td>
                <td className="py-3 px-4 flex items-center gap-4">
                  <button onClick={() => handleEdit(v)}><PencilSquareIcon className="h-5 w-5 text-gray-500 hover:text-blue-600" /></button>
                  <button onClick={() => handleDelete(v.id)}><TrashIcon className="h-5 w-5 text-gray-500 hover:text-red-600" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ViolationFormModal
          violation={editingViolation}
          onClose={() => setIsModalOpen(false)}
          addViolationAction={addViolationAction}
          updateViolationAction={updateViolationAction}
        />
      )}
    </div>
  );
}
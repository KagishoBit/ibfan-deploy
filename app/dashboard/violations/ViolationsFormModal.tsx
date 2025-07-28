'use client';

import React from 'react';
import type { Violation } from '@/app/lib/types';

interface ViolationFormModalProps {
  violation: Violation | null;
  onClose: () => void;
  addAction: (formData: FormData) => Promise<void>;
  updateAction: (formData: FormData) => Promise<void>;
}

export function ViolationFormModal({ violation, onClose, addAction, updateAction }: ViolationFormModalProps) {
  
  const formAction = async (formData: FormData) => {
    try {
      if (violation) {
        await updateAction(formData);
      } else {
        await addAction(formData);
      }
      onClose(); // Close the modal on success
    } catch (err) {
      // In a real app, you would show an error message inside the modal
      alert(err instanceof Error ? err.message : "An error occurred.");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">{violation ? 'Edit Violation Record' : 'Log New Violation'}</h2>
        <form action={formAction} className="space-y-4">
            {/* Hidden input to pass the ID when updating */}
            {violation && <input type="hidden" name="id" value={violation.id} />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="employeeId" placeholder="Employee ID" defaultValue={violation?.employeeId ?? ''} className="w-full border rounded p-2" required />
                <input type="text" name="location" placeholder="Location" defaultValue={violation?.location ?? ''} className="w-full border rounded p-2" required />
            </div>
            <input type="text" name="violationType" placeholder="Violation Type" defaultValue={violation?.violationType ?? ''} className="w-full border rounded p-2" required />
            <textarea name="description" placeholder="Description of violation..." defaultValue={violation?.description ?? ''} className="w-full border rounded p-2 h-28" required />
            <input type="date" name="date" defaultValue={violation ? violation.date.split('T')[0] : new Date().toISOString().split('T')[0]} className="w-full border rounded p-2" required />
            
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Cancel</button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">Save Record</button>
            </div>
        </form>
      </div>
    </div>
  );
};
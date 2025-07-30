'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PlusIcon, PencilSquareIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'; // Added import
import ArrowLeftIcon from '@heroicons/react/20/solid/ArrowLeftIcon';

// --- API Service Layer (for ibfanDB) ---
const api = {
  getViolations: async (): Promise<Violation[]> => {
    console.log("API: Fetching violations...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return [
      { id: 'vio_1', employeeId: 'E123', location: 'Johannesburg', violationType: 'Milk Safety', description: 'On shelf past expiration date.', date: '2025-07-10', reportedByUserId: 'usr_1' },
      { id: 'vio_2', employeeId: 'E456', location: 'Pretoria', violationType: 'Illegal Substance', description: 'Unapproved substance found on shelf.', date: '2025-07-11', reportedByUserId: 'usr_4' },
    ];
  },
  addViolation: async (data: Omit<Violation, 'id'>): Promise<Violation> => {
    console.log("API: Adding violation...", data);
    const newViolation = { ...data, id: `vio_${Date.now()}` }; // DB will generate a real ID
    await new Promise(resolve => setTimeout(resolve, 500));
    return newViolation;
  },
  updateViolation: async (id: string, data: Partial<Omit<Violation, 'id'>>): Promise<Violation> => {
    console.log(`API: Updating violation ${id}...`, data);
    const updatedViolation = { id, ...data } as Violation;
    await new Promise(resolve => setTimeout(resolve, 500));
    return updatedViolation;
  },
  deleteViolation: async (id: string): Promise<void> => {
    console.log(`API: Deleting violation ${id}...`);
    await new Promise(resolve => setTimeout(resolve, 500));
  },
};

// --- Type Definition for 'violations' table ---
interface Violation {
  id: string;
  employeeId: string;
  location: string;
  violationType: string;
  description: string;
  date: string;
  reportedByUserId: string; // Foreign key to the 'users' table
}

// --- Main Manager Component ---
const ViolationManager: React.FC = () => {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingViolation, setEditingViolation] = useState<Violation | null>(null);

  const fetchViolations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getViolations();
      setViolations(data);
    } catch (err) {
      setError("Failed to fetch violation records.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchViolations();
  }, [fetchViolations]);

  const handleAddNew = () => {
    setEditingViolation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (violation: Violation) => {
    setEditingViolation(violation);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this violation record?")) {
      await api.deleteViolation(id).then(() => {
        setViolations(prev => prev.filter(v => v.id !== id));
      }).catch(() => alert("Failed to delete record."));
    }
  };

  const handleSave = async (violationData: Omit<Violation, 'id' | 'reportedByUserId'> & { id?: string }) => {
    // In a real app, this ID would come from your authentication context
    const currentUserId = 'usr_1'; 
    const dataToSave = { ...violationData, reportedByUserId: currentUserId };

    try {
      if (dataToSave.id) {
        const updated = await api.updateViolation(dataToSave.id, dataToSave);
        setViolations(prev => prev.map(v => v.id === updated.id ? updated : v));
      } else {
        const added = await api.addViolation(dataToSave as Omit<Violation, 'id'>);
        setViolations(prev => [...prev, added]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to save violation record.");
    }
  };

  if (isLoading) return <div className="p-6 text-center">Loading Records...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* --- BACK NAVIGATION LINK ADDED HERE --- */}
      <Link
        href="/"
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Home
      </Link>
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Violation Log</h1>
        <button onClick={handleAddNew} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          <PlusIcon className="h-5 w-5" />
          Log Violation
        </button>
      </div>
    
    

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              {['Employee ID', 'Location', 'Violation Type', 'Date', 'Actions'].map(h => <th key={h} className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y">
            {violations.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{v.employeeId}</td>
                <td className="py-3 px-4">{v.location}</td>
                <td className="py-3 px-4">{v.violationType}</td>
                <td className="py-3 px-4">{v.date}</td>
                <td className="py-3 px-4 flex items-center gap-4">
                  <button onClick={() => handleEdit(v)} className="text-gray-500 hover:text-blue-600"><PencilSquareIcon className="h-5 w-5" /></button>
                  <button onClick={() => handleDelete(v.id)} className="text-gray-500 hover:text-red-600"><TrashIcon className="h-5 w-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <ViolationFormModal violation={editingViolation} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

// --- Reusable Modal Form Component ---
interface ViolationFormModalProps {
  violation: Violation | null;
  onSave: (data: Omit<Violation, 'id' | 'reportedByUserId'> & { id?: string }) => void;
  onClose: () => void;
}

const ViolationFormModal: React.FC<ViolationFormModalProps> = ({ violation, onSave, onClose }) => {
  const initialState = useMemo(() => ({
    employeeId: '', location: '', violationType: '', description: '', date: new Date().toISOString().split('T')[0]
  }), []);

  const [formData, setFormData] = useState(violation || initialState);

  useEffect(() => {
    setFormData(violation || initialState);
  }, [violation, initialState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.location || !formData.violationType) {
      alert("Please fill out all required fields.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">{violation ? 'Edit Violation Record' : 'Log New Violation'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="employeeId" placeholder="Employee ID" value={formData.employeeId} onChange={handleChange} className="w-full border rounded p-2" />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <input type="text" name="violationType" placeholder="Violation Type" value={formData.violationType} onChange={handleChange} className="w-full border rounded p-2" />
          <textarea name="description" placeholder="Description of violation..." value={formData.description} onChange={handleChange} className="w-full border rounded p-2 h-28" />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border rounded p-2" />
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Cancel</button>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">Save Record</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViolationManager;
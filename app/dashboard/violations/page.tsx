'use client';

import React, { useState, useEffect } from 'react';

interface Violation {
  id: number;
  employeeId: string;
  location: string;
  violationType: string;
  description: string;
  date: string;
}

const ViolationTable: React.FC = () => {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [newViolation, setNewViolation] = useState<Omit<Violation, 'id'>>({
    employeeId: '',
    location: '',
    violationType: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [editingViolationId, setEditingViolationId] = useState<number | null>(null);

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const mockData: Violation[] = [
          { id: 1, employeeId: 'E123', location: 'Johannesburg', violationType: 'Milk Safety', description: 'On shelf', date: '2023-10-26' },
          { id: 2, employeeId: 'E456', location: 'Pretoria', violationType: 'Illegal substance', description: 'On shelf illegally', date: '2023-10-27' },
          { id: 3, employeeId: 'E789', location: 'Cape town', violationType: 'Food Policy', description: 'Unauthorized access', date: '2023-10-28' },
        ];
        setViolations(mockData);
      } catch (error) {
        console.error('Error fetching violations:', error);
      }
    };

    fetchViolations();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewViolation({ ...newViolation, [name]: value });
  };

  const handleCreateViolation = () => {
    const newId = violations.length + 1;
    const newViolationWithId: Violation = { ...newViolation, id: newId };
    setViolations([...violations, newViolationWithId]);
    setNewViolation({
      employeeId: '',
      location: '',
      violationType: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleEditViolation = (id: number) => {
    const violationToEdit = violations.find((violation) => violation.id === id);
    if (violationToEdit) {
      setNewViolation(violationToEdit);
      setEditingViolationId(id);
    }
  };

  const handleUpdateViolation = () => {
    const updatedViolations = violations.map((violation) =>
      violation.id === editingViolationId ? { ...newViolation, id: editingViolationId } : violation
    );
    setViolations(updatedViolations);
    setNewViolation({
      employeeId: '',
      location: '',
      violationType: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setEditingViolationId(null);
  };

  const handleDeleteViolation = (id: number) => {
    const filteredViolations = violations.filter((violation) => violation.id !== id);
    setViolations(filteredViolations);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Violations</h2>
      <table className="min-w-full border border-gray-300 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Employee ID</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Violation Type</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {violations.map((violation) => (
            <tr key={violation.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{violation.id}</td>
              <td className="py-2 px-4">{violation.employeeId}</td>
              <td className="py-2 px-4">{violation.location}</td>
              <td className="py-2 px-4">{violation.violationType}</td>
              <td className="py-2 px-4">{violation.description}</td>
              <td className="py-2 px-4">{violation.date}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEditViolation(violation.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteViolation(violation.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mt-6 mb-2">
        {editingViolationId ? 'Edit Violation' : 'Create Violation'}
      </h3>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={newViolation.employeeId}
          onChange={handleInputChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newViolation.location}
          onChange={handleInputChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="violationType"
          placeholder="Violation Type"
          value={newViolation.violationType}
          onChange={handleInputChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newViolation.description}
          onChange={handleInputChange}
          className="border rounded p-2"
        />
        <input
          type="date"
          name="date"
          value={newViolation.date}
          onChange={handleInputChange}
          className="border rounded p-2"
        />
        <button
          onClick={editingViolationId ? handleUpdateViolation : handleCreateViolation}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {editingViolationId ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default ViolationTable;
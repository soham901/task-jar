import React, { useState, useEffect } from 'react';
import { Ticket } from '../types/ticket';
import { PRIORITIES, PHASES } from '../types/ticket';

interface TicketFormProps {
  ticket?: Ticket;
  onSubmit: (ticket: Ticket) => void;
  onCancel: () => void;
}

const defaultTicket: Ticket = {
  id: '',
  title: '',
  description: '',
  priority: 'P0',
  points: 0,
  phase: PHASES[0],
  status: 'To Do'
};

export function TicketForm({ ticket, onSubmit, onCancel }: TicketFormProps) {
  const [formData, setFormData] = useState<Ticket>(ticket || defaultTicket);

  useEffect(() => {
    if (ticket) {
      setFormData(ticket);
    }
  }, [ticket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: formData.id || `TICKET-${Date.now()}`
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {ticket ? 'Edit Ticket' : 'Add New Ticket'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              required
              className="w-full p-2 border rounded"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                className="w-full p-2 border rounded"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                {PRIORITIES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phase</label>
              <select
                className="w-full p-2 border rounded"
                value={formData.phase}
                onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
              >
                {PHASES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {ticket ? 'Update' : 'Add'} Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
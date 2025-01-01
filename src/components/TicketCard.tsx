import { Ticket } from '../types/ticket';
import { STATUSES } from '../types/ticket';

interface TicketCardProps {
  ticket: Ticket;
  onStatusChange: (id: string, status: string) => void;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

export function TicketCard({ ticket, onStatusChange, onEdit, onDelete }: TicketCardProps) {
  const getPriorityColor = (priority: string) => {
    const colors = {
      'P0': 'bg-red-100 text-red-800',
      'P1': 'bg-orange-100 text-orange-800',
      'P2': 'bg-yellow-100 text-yellow-800',
      'P3': 'bg-green-100 text-green-800',
      'P4': 'bg-blue-100 text-blue-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="font-mono text-sm text-gray-500">{ticket.id}</span>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
          {ticket.priority}
        </span>
      </div>
      <h3 className="font-semibold mb-2">{ticket.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{ticket.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{ticket.phase}</span>
        <div className="flex gap-2 items-center">
          <select
            value={ticket.status}
            onChange={(e) => onStatusChange(ticket.id, e.target.value)}
            className="text-sm p-1 border rounded"
          >
            {STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button
            onClick={() => onEdit(ticket)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(ticket.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
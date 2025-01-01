import { Search } from 'lucide-react';
import { TicketFilters } from '../types/ticket';
import { PRIORITIES, PHASES, STATUSES } from '../types/ticket';

interface TicketFiltersProps {
  filters: TicketFilters;
  search: string;
  onFilterChange: (filters: TicketFilters) => void;
  onSearchChange: (search: string) => void;
}

export function TicketFiltersComponent({ filters, search, onFilterChange, onSearchChange }: TicketFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex items-center gap-2 flex-1">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search tickets..."
          className="w-full p-2 border rounded-lg"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <select
        className="p-2 border rounded-lg"
        value={filters.priority}
        onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
      >
        <option value="">All Priorities</option>
        {PRIORITIES.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <select
        className="p-2 border rounded-lg"
        value={filters.phase}
        onChange={(e) => onFilterChange({ ...filters, phase: e.target.value })}
      >
        <option value="">All Phases</option>
        {PHASES.map(p => (
          <option key={p} value={p}>{p.split(':')[0]}</option>
        ))}
      </select>
      <select
        className="p-2 border rounded-lg"
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
      >
        <option value="">All Statuses</option>
        {STATUSES.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
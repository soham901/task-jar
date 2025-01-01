import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TicketFilters } from '@/types/ticket';
import { PRIORITIES, PHASES, STATUSES } from '@/types/ticket';

interface TicketFiltersProps {
  filters: TicketFilters;
  search: string;
  onFilterChange: (filters: TicketFilters) => void;
  onSearchChange: (search: string) => void;
}

export function TicketFiltersComponent({ filters, search, onFilterChange, onSearchChange }: TicketFiltersProps) {
  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <div className="flex-1 relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select
        value={filters.priority}
        onValueChange={(value) => onFilterChange({ ...filters, priority: value !== "all" ? value : "" })}
      >
        <SelectTrigger className="w-[150px] max-sm:w-full">
          <SelectValue placeholder="All Priorities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          {PRIORITIES.map(p => (
            <SelectItem key={p} value={p}>{p}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.phase}
        onValueChange={(value) => onFilterChange({ ...filters, phase: value !== "all" ? value : "" })}
      >
        <SelectTrigger className="w-[150px] max-sm:w-[47.8%]">
          <SelectValue placeholder="All Phases" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Phases</SelectItem>
          {PHASES.map(p => (
            <SelectItem key={p} value={p}>{p.split(':')[0]}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.status}
        onValueChange={(value) => onFilterChange({ ...filters, status: value !== "all" ? value : "" })}
      >
        <SelectTrigger className="w-[150px] max-sm:w-[47.8%]">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {STATUSES.map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
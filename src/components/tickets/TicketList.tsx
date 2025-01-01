import { TicketCard } from '@/components/tickets/ticket-card';
import { TicketFiltersComponent } from '@/components/tickets/ticket-filters';
import { Ticket, TicketFilters } from '@/types/ticket';

interface TicketListProps {
    tickets: Ticket[];
    filters: TicketFilters;
    search: string;
    onFilterChange: (filters: TicketFilters) => void;
    onSearchChange: (search: string) => void;
    onStatusChange: (id: string, status: string) => void;
    onEdit: (ticket: Ticket) => void;
    onDelete: (id: string) => void;
}

export function TicketList({
    tickets,
    filters,
    search,
    onFilterChange,
    onSearchChange,
    onStatusChange,
    onEdit,
    onDelete
}: TicketListProps) {
    return (
        <>
            <TicketFiltersComponent
                filters={filters}
                search={search}
                onFilterChange={onFilterChange}
                onSearchChange={onSearchChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickets.map(ticket => (
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        onStatusChange={onStatusChange}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    );
}

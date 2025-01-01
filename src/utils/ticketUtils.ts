import { Ticket } from '@/types/ticket';

const priorityOrder = {
    'P0': 0,
    'P1': 1,
    'P2': 2,
    'P3': 3
};

export function sortTickets(tickets: Ticket[]): Ticket[] {
    return [...tickets].sort((a, b) => {
        // Sort by priority first
        const priorityDiff = priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
        if (priorityDiff !== 0) return priorityDiff;

        // Then by status (To Do first)
        if (a.status === 'To Do' && b.status !== 'To Do') return -1;
        if (a.status !== 'To Do' && b.status === 'To Do') return 1;

        // Then by phase
        return a.phase.localeCompare(b.phase);
    });
}
export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: string;
  points: number;
  phase: string;
  status: string;
}

export interface TicketFilters {
  priority: string;
  phase: string;
  status: string;
}

export const PRIORITIES = ['P0', 'P1', 'P2', 'P3', 'P4'];
export const PHASES = [
  'Phase 1: Foundation',
  'Phase 2: Core Features',
  'Phase 3: Enhanced Features',
  'Phase 4: Advanced Features',
  'Phase 5: Optimization'
];
export const STATUSES = ['To Do', 'In Progress', 'Done'];
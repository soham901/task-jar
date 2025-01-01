import { MoreHorizontal } from 'lucide-react';
import { Ticket } from '@/types/ticket';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { STATUSES } from '@/types/ticket';

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(ticket)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => onDelete(ticket.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{ticket.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{ticket.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{ticket.phase}</span>
          <Select
            value={ticket.status}
            onValueChange={(value) => onStatusChange(ticket.id, value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
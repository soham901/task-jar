import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '../mode-toggle';
import { SettingsDrawer } from '../settings';

interface TicketHeaderProps {
    totalCount: number;
    filteredCount: number;
    onExport: () => void;
    onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAddClick: () => void;
}

export function TicketHeader({
    totalCount,
    filteredCount,
    onAddClick
}: TicketHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-8 flex-wrap max-sm:gap-4">
            <h1 className="text-3xl font-bold">
                Tickets ({filteredCount} / {totalCount})
            </h1>
            <div className="flex gap-4">

                <Button onClick={onAddClick}>
                    <Plus className="h-4 w-4" />
                    Add Ticket
                </Button>
                <SettingsDrawer />
                <ModeToggle />
            </div>
        </div>
    );
}
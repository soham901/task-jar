import React from 'react';
import { Plus, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '../mode-toggle';

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
    onExport,
    onImport,
    onAddClick
}: TicketHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-8 flex-wrap max-sm:gap-4">
            <h1 className="text-3xl font-bold">
                Tickets ({filteredCount} / {totalCount})
            </h1>
            <div className="flex gap-4">
                <input
                    type="file"
                    id="import"
                    className="hidden"
                    accept=".json"
                    onChange={onImport}
                />
                <label htmlFor="import">
                    <Button variant="outline" className="cursor-pointer" asChild>
                        <span>
                            <Upload className="h-4 w-4" />
                            Import
                        </span>
                    </Button>
                </label>
                <Button variant="outline" onClick={onExport}>
                    <Download className="h-4 w-4" />
                    Export
                </Button>
                <Button onClick={onAddClick}>
                    <Plus className="h-4 w-4" />
                    Add Ticket
                </Button>
                <ModeToggle />
            </div>
        </div>
    );
}
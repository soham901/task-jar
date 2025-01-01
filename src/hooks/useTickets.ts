import { useState, useEffect } from 'react';
import { TicketDB } from '@/lib/db';
import { Ticket, TicketFilters } from '@/types/ticket';
import { sortTickets } from '@/utils/ticketUtils';

const db = new TicketDB();

export function useTickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);
    const [editingTicket, setEditingTicket] = useState<Ticket | undefined>();
    const [filters, setFilters] = useState<TicketFilters>({ priority: '', phase: '', status: '' });
    const [search, setSearch] = useState('');

    useEffect(() => {
        const loadTickets = async () => {
            await db.init();
            const loadedTickets = await db.getAllTickets();
            setTickets(sortTickets(loadedTickets));
        };
        loadTickets();
    }, []);

    const filteredTickets = tickets.filter(ticket => {
        const matchesFilter = (!filters.priority || ticket.priority === filters.priority) &&
            (!filters.phase || ticket.phase === filters.phase) &&
            (!filters.status || ticket.status === filters.status);
        const matchesSearch = ticket.title.toLowerCase().includes(search.toLowerCase()) ||
            ticket.description.toLowerCase().includes(search.toLowerCase()) ||
            ticket.id.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleAddOrUpdateTicket = async (ticket: Ticket) => {
        if (editingTicket) {
            await db.updateTicket(ticket);
            setTickets(sortTickets(tickets.map(t => t.id === ticket.id ? ticket : t)));
        } else {
            await db.addTicket(ticket);
            setTickets(sortTickets([...tickets, ticket]));
        }
        setShowForm(false);
        setEditingTicket(undefined);
    };

    const handleStatusChange = async (ticketId: string, newStatus: string) => {
        const ticket = tickets.find(t => t.id === ticketId);
        if (ticket) {
            const updatedTicket = { ...ticket, status: newStatus };
            await db.updateTicket(updatedTicket);
            setTickets(sortTickets(tickets.map(t => t.id === ticketId ? updatedTicket : t)));
        }
    };

    const handleDeleteClick = (id: string) => {
        setTicketToDelete(id);
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = async () => {
        if (ticketToDelete) {
            await db.deleteTicket(ticketToDelete);
            setTickets(sortTickets(tickets.filter(t => t.id !== ticketToDelete)));
            setShowDeleteDialog(false);
            setTicketToDelete(null);
        }
    };

    const handleEdit = (ticket: Ticket) => {
        setEditingTicket(ticket);
        setShowForm(true);
    };

    const handleAddNewTicket = () => {
        // Clear any existing editing ticket
        setEditingTicket(undefined);
        setShowForm(true)
    };


    const handleExport = () => {
        const dataStr = JSON.stringify(tickets, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', 'tickets.json');
        linkElement.click();
    };

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const importedTickets = JSON.parse(e.target?.result as string);
                    await db.importTickets(importedTickets);
                    setTickets(sortTickets(importedTickets));
                } catch (error) {
                    console.error('Error importing tickets:', error);
                    alert('Error importing tickets. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleLoadDemoData = async () => {
        const response = await fetch('/demo-data.json');
        const demoData = await response.json();
        await db.importTickets(demoData);
        setTickets(sortTickets(demoData));
    };

    return {
        tickets,
        filteredTickets,
        filters,
        search,
        showForm,
        showDeleteDialog,
        editingTicket,
        handleAddOrUpdateTicket,
        handleStatusChange,
        handleDeleteClick,
        handleDeleteConfirm,
        handleAddNewTicket,
        handleLoadDemoData,
        handleEdit,
        handleExport,
        handleImport,
        setShowForm,
        setShowDeleteDialog,
        setFilters,
        setSearch,
    };
}
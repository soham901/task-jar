import { TicketHeader } from '@/components/tickets/TicketHeader';
import { TicketList } from '@/components/tickets/TicketList';
import { useTickets } from '@/hooks/useTickets';
import { ConfirmDeleteDialog } from '@/components/tickets/confirm-delete-dialog';
import { TicketFormDrawer } from './components/tickets/ticket-form-drawer';
import { Button } from './components/ui/button';

export default function TicketTracker() {
  const {
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
    handleEdit,
    handleExport,
    handleImport,
    setShowForm,
    setShowDeleteDialog,
    setFilters,
    setSearch,
    handleAddNewTicket,
    handleLoadDemoData
  } = useTickets();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <TicketHeader
          totalCount={tickets.length}
          filteredCount={filteredTickets.length}
          onExport={handleExport}
          onImport={handleImport}
          onAddClick={() => {
            handleAddNewTicket();
            setShowForm(true);
          }}
        />

        {tickets.length > 0 ? (
          <TicketList
            tickets={filteredTickets}
            filters={filters}
            search={search}
            onFilterChange={setFilters}
            onSearchChange={setSearch}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh] space-y-6">
            <div className="text-lg text-gray-500">
              No tickets found. Click the button below to add a the demo data.
            </div>
            <div className="flex items-center gap-8">
              <Button onClick={handleLoadDemoData}>
                Add demo data
              </Button>
              <div className="text-sm text-gray-400">
                OR
              </div>
              <Button onClick={() => {
                handleAddNewTicket();
                setShowForm(true);
              }}>
                Add a ticket
              </Button>
            </div>
          </div>
        )}

        <TicketFormDrawer
          ticket={editingTicket}
          open={showForm}
          onOpenChange={setShowForm}
          onSubmit={handleAddOrUpdateTicket}
        />

        <ConfirmDeleteDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
}
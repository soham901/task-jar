import { TicketFilters } from '@/types/ticket'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
  filters: TicketFilters
  setFilters: (filters: TicketFilters) => void
}

export const useConfig = create<Store>()(
  persist(
    (set) => ({
      filters: {
        priority: '',
        phase: '',
        status: '',
      },
      setFilters: (filters) => set({ filters: filters }),
    }),
    {
      name: 'config-storage',
    }),
)
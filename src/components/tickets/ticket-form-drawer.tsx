'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Ticket, PRIORITIES, PHASES } from '@/types/ticket'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const ticketSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.string(),
  points: z.number(),
  phase: z.string(),
})

interface TicketFormDrawerProps {
  ticket?: Ticket
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (ticket: Ticket) => void
}

export function TicketFormDrawer({ ticket, open, onOpenChange, onSubmit }: TicketFormDrawerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<Ticket>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      id: '',
      title: '',
      description: '',
      priority: 'P0',
      points: 0,
      phase: PHASES[0],
      status: 'To Do'
    }
  })

  const currentPriority = watch('priority')
  const currentPhase = watch('phase')
  const currentPoints = watch('points')

  useEffect(() => {
    if (open) {
      if (ticket) {
        reset({
          id: ticket.id,
          title: ticket.title,
          description: ticket.description,
          priority: ticket.priority,
          phase: ticket.phase,
          points: ticket.points,
          status: ticket.status
        })
      } else {
        reset({
          id: '',
          title: '',
          description: '',
          priority: 'P0',
          points: 0,
          phase: PHASES[0],
          status: 'To Do'
        })
      }
    }
  }, [ticket, open, reset])

  const onSubmitForm = (data: Ticket) => {
    onSubmit({
      ...data,
      id: ticket?.id || `TICKET-${Date.now()}`,
      status: ticket?.status || 'To Do',
      points: ticket?.points || 0
    })
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>{ticket ? 'Edit Ticket' : 'Create Ticket'}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title')}
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              className={errors.description ? 'border-destructive' : ''}
              rows={8}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={currentPriority}
                onValueChange={(value) => setValue('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Phase</Label>
              <Select
                value={currentPhase}
                onValueChange={(value) => setValue('phase', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  {PHASES.map(phase => (
                    <SelectItem key={phase} value={phase}>
                      {phase.split(':')[0]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Points</Label>
            <Input
              type="number"
              value={currentPoints}
              onChange={(e) => setValue('points', Number(e.target.value))}
            />
            <p className="text-sm text-gray-500">
              used to estimate the effort required to complete a task.
            </p>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button className="w-full" type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="w-full" type="submit">
              {ticket ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}


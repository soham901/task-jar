'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Download, Settings2, Upload, Trash2 } from 'lucide-react'
import { useTickets } from "@/hooks/useTickets"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SettingsDrawer() {
    const { handleExport, handleImport, handleDeleteAll } = useTickets()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Settings2 className="h-4 w-4" />
                    <span className="sr-only">Open settings</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>
                        Configure your settings as per your preference.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Data Management</h3>
                        <p className="text-sm text-muted-foreground">
                            Import, export, or delete your data.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="file"
                                id="import"
                                className="hidden"
                                accept=".json"
                                onChange={handleImport}
                            />
                            <label htmlFor="import">
                                <Button variant="outline" className="cursor-pointer w-full" asChild>
                                    <span>
                                        <Upload className="h-4 w-4" />
                                        Import
                                    </span>
                                </Button>
                            </label>
                            <Button variant="outline" onClick={handleExport} className="w-full">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>
                        <Separator />
                        <Alert variant="destructive">
                            <Trash2 className="h-4 w-4" />
                            <AlertTitle>Delete All Data</AlertTitle>
                            <AlertDescription>
                                This action cannot be undone. This will permanently delete all your local data.
                            </AlertDescription>
                        </Alert>
                        <Button onClick={handleDeleteAll} variant="destructive" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete All Data
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

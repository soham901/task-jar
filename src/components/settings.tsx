'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Download, Settings2, Upload, Trash2 } from 'lucide-react';
import { useTickets } from "@/hooks/useTickets";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SettingsDrawer() {
    const { handleExport, handleImport, handleDeleteAll } = useTickets();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative group">
                    <Settings2 className="h-4 w-4" />
                    <span className="sr-only">Open settings</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="text-xl font-bold">Settings</SheetTitle>
                    <SheetDescription className="text-sm text-muted-foreground">
                        Manage your data and configurations.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-8">
                    {/* Data Management Section */}
                    <section>
                        <h3 className="text-lg font-medium">Data Management</h3>
                        <p className="text-sm text-muted-foreground">
                            Import, export, or delete your data below.
                        </p>
                        <div className="mt-4 grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <label htmlFor="import" className="w-full">
                                    <input
                                        type="file"
                                        id="import"
                                        className="hidden"
                                        accept=".json"
                                        onChange={handleImport}
                                    />
                                    <Button
                                        variant="outline"
                                        className="w-full flex items-center justify-center space-x-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        <span>Import</span>
                                    </Button>
                                </label>
                                <Button
                                    variant="outline"
                                    onClick={handleExport}
                                    className="w-full flex items-center justify-center space-x-2"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Export</span>
                                </Button>
                            </div>
                        </div>
                    </section>

                    <Separator />

                    {/* Delete Data Section */}
                    <section>
                        <Alert variant="destructive">
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <div>
                                <AlertTitle className="text-base font-semibold text-red-500">
                                    Delete All Data
                                </AlertTitle>
                                <AlertDescription className="text-sm text-muted-foreground">
                                    This action cannot be undone. All local data will be permanently
                                    deleted.
                                </AlertDescription>
                            </div>
                        </Alert>
                        <Button
                            onClick={handleDeleteAll}
                            variant="destructive"
                            className="w-full flex items-center justify-center space-x-2 mt-4"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete All Data</span>
                        </Button>
                    </section>
                </div>
            </SheetContent>
        </Sheet>
    );
}

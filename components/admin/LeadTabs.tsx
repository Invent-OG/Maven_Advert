// @ts-nocheck
"use client";

import { leadSchema } from "@/lib/schemas/lead";
import { z } from "zod";

type Lead = z.infer<typeof leadSchema>;

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Calendar } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { useLeads, useDeleteLead } from "@/lib/queries/leads";
import { toast } from "sonner";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";

export default function LeadTabs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading, error } = useLeads(
    currentPage,
    itemsPerPage,
    debouncedSearch,
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined
  );

  const deleteMutation = useDeleteLead();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(localSearchTerm);
      setSearchTerm(localSearchTerm);
    }, 500);
    return () => clearTimeout(timeout);
  }, [localSearchTerm]);

  const handleDelete = async (id: Lead["id"]) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Lead deleted", {
        description: "The lead has been successfully deleted.",
      });
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    } catch (error) {
      toast.error("Failed to delete lead", {
        description: "Please try again.",
      });
    }
  };

  const handleSelectAll = (leads: Lead[]) => {
    const allIds = leads.map((lead) => lead.id);
    setSelectedIds((prev) => (prev.length === leads.length ? [] : allIds));
  };

  const handleSelectOne = (id: Lead["id"]) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) => deleteMutation.mutateAsync(id))
      );
      toast.success("Selected leads deleted");
      setSelectedIds([]);
    } catch {
      toast.error("Failed to delete selected leads");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds([]);
  };

  const handleDateReset = () => {
    setSelectedDate(null);
  };

  const handleExport = (): void => {
    const leadsToExport = data?.leads || [];

    const headers = ["Name", "WhatsApp Number", "email", "message"];

    const csv = [
      headers,
      ...leadsToExport.map((lead) => [
        lead.name,
        lead.whatsappNumber,
        lead.email,
        lead.message,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success(`Leads exported successfully!`);
  };

  if (isLoading) {
    return (
      <div className="rounded-md border overflow-hidden">
        <div className="p-4 border-b bg-muted">
          <Skeleton className="h-6 w-1/3" />
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                <Skeleton className="h-4 w-4" />
              </th>
              <th className="p-4 text-left">
                <Skeleton className="h-4 w-24" />
              </th>
              <th className="p-4 text-left">
                <Skeleton className="h-4 w-32" />
              </th>
              <th className="p-4 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
              <th className="p-4 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
              <th className="p-4 text-left">
                <Skeleton className="h-4 w-24" />
              </th>
              <th className="p-4 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
              <th className="p-4 text-right">
                <Skeleton className="h-4 w-16" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, idx) => (
              <tr key={idx} className="border-b">
                {[...Array(8)].map((__, tdIdx) => (
                  <td
                    key={tdIdx}
                    className={`p-4 ${tdIdx === 7 ? "text-right" : ""}`}
                  >
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading leads: {(error as Error).message}
      </div>
    );
  }

  const leads: Lead[] = data?.leads ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalCount = data?.totalCount ?? 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-4 w-4" />
          <Input
            placeholder="Search leads..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="p-2 flex justify-between items-center border-b">
                <span className="text-sm font-medium">Select date</span>
                {selectedDate && (
                  <Button variant="ghost" size="sm" onClick={handleDateReset}>
                    Reset
                  </Button>
                )}
              </div>
              <CalendarComponent
                mode="single"
                required={true}
                selected={selectedDate!}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {selectedIds.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete Selected ({selectedIds.length})
            </Button>
          )}

          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    selectedIds.length === leads.length && leads.length > 0
                  }
                  onCheckedChange={() => handleSelectAll(leads)}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead: Lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(lead.id)}
                      onCheckedChange={() => handleSelectOne(lead.id)}
                    />
                  </TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.whatsappNumber}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.message}</TableCell>
                  {/* <TableCell>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell> */}
                  {/* <TableCell>{lead.type}</TableCell> */}
                  <TableCell className="text-right">
                    <DeleteConfirmation
                      onDelete={() => handleDelete(lead.id)}
                      title="Delete Lead"
                      description="Are you sure you want to delete this lead? This action cannot be undone."
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {leads.length > 0 && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {leads.length} of {totalCount} leads
          </div>
          <div className="flex items-center gap-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[120px]">
                {itemsPerPage} / page
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}

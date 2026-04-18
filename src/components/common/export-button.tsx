"use client";

import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import { toast } from "sonner";

interface ExportButtonProps {
  data: any[];
  filename: string;
  label?: string;
}

export function ExportButton({ data, filename, label = "Exportar Relatório" }: ExportButtonProps) {
  const exportToCSV = () => {
    if (!data || data.length === 0) {
      return toast.error("Não há dados para exportar.");
    }

    try {
      // 1. Get headers from first object keys
      const headers = Object.keys(data[0]);
      
      // 2. Map data to rows
      const csvRows = [
        headers.join(","), // header row
        ...data.map(row => 
          headers.map(fieldName => {
            const value = row[fieldName];
            // Handle values that might contain commas or quotes
            const stringValue = value !== null && value !== undefined ? String(value) : "";
            const escaped = stringValue.replace(/"/g, '""');
            return `"${escaped}"`;
          }).join(",")
        )
      ];

      const csvString = csvRows.join("\n");
      
      // 3. Create blob and download
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Relatório exportado com sucesso!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Erro ao gerar o relatório.");
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={exportToCSV}
      className="border-secondary text-secondary hover:bg-secondary/10 w-full sm:w-auto h-10"
    >
      <Receipt className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}

"use client";
import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../..//ui/dropdown-menu";
import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import StatusBadge from "../StatusBadge";

export type UserServiceDocs = {
  fileIcon: string;
  names: string;
  dateAdded: string;
  actions: string;
  status: string;
};

export const columns: ColumnDef<UserServiceDocs>[] = [
  {
    accessorKey: "fileIcon",
    header: "",
    cell: ({ row }) => {
      return (
        <Image src={row.original.fileIcon} height={24} width={24} alt="" />
      );
    },
  },
  {
    accessorKey: "names",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NAMES
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p>{row.original.names}</p>;
    },
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DATE ADDED
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS ",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status as Status} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText("payment.id")}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

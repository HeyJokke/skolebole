"use client"

import type {SVGProps} from "react";
import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip
} from "@heroui/react";
import {useMaterials} from "@/lib/context/MaterialsProvider"
import { removeRowFromDatabase } from "../database/db";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const DeleteIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default function TableMaterials() {
    const {materials} = useMaterials()

    if (materials) {
        const rows = materials.map(m => {
                return {
                    id: m.id,
                    created: m.created_at.toString().split('.')[0].split('T').join(' '),
                    name: m.name,
                    image_path: m.image_path,
                    categories: m.categories_array.join(' ')
                }
            })
    
        const columns = [
            {name: "Materiale", uid: "materiale"},
            {name: "Categories", uid: "categories"},
            {name: "ACTIONS", uid: "actions"}
        ]

        type MaterialRow = (typeof rows)[0];

        const renderCell = React.useCallback((material: MaterialRow, columnKey: React.Key) => {
            const cellValue = material[columnKey as keyof MaterialRow];

            switch (columnKey) {
            case "materiale":
                return (
                <User className="flex justify-start"
                    avatarProps={{className: "w-24 h-24 border-1 rounded", src: material.image_path}}
                    description={material.created}
                    name={material.name + ' |  '}
                >
                </User>
                );
            case "categories":
                return (
                <Chip className="capitalize text-center" size="sm" variant="flat">
                    {cellValue}
                </Chip>
                );
            case "actions":
                return (
                <div className="relative flex justify-center items-center gap-2">
                    <Tooltip className="bg-blue-500 rounded-md text-white font-bold pl-1 pr-1 text-sm" content="Edit">
                    <span className="hidden text-lg hover:text-blue-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                    </span>
                    </Tooltip>
                    <Tooltip className="bg-red-500 rounded-md text-white font-bold pl-1 pr-1 text-sm" content="Delete">
                    <span onClick={() => removeRowFromDatabase('materialer', material.id)} className="text-lg hover:text-red-500 cursor-pointer active:opacity-50">
                        <DeleteIcon />
                    </span>
                    </Tooltip>
                </div>
                );
            default:
                return cellValue;
            }
        }, []);

        return (
            <Table aria-label="Table of materials">
            <TableHeader columns={columns}>
                {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                    {column.name}
                </TableColumn>
                )}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                <TableRow className="border-b-1" key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
            </Table>
        );
    } 
}
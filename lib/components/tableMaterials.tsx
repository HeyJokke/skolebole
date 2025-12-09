"use client"

import type {SVGProps} from "react";
import React, {FormEvent} from 'react'
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
import { removeFileFromBucket, removeRowFromDatabase, updateMaterial } from "../database/db";
import type {Material} from '@/lib/types'
import Image from 'next/image'

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
    const {materials, refreshMaterials} = useMaterials()
    const [open, setOpen] = React.useState<boolean>(false)
    const [selectedId, setSelectedId] = React.useState<number>(0)
    const [selectedMaterial, setSelectedMaterial] = React.useState<Material | null>(null)

    function selectMaterial(id:number) {
      setSelectedId(id)

      if (materials) {
        const found = materials.find(m => m.id === id) ?? null
        setSelectedMaterial(found)
      }
      
      setOpen(true)
    }

    if (materials) {
        const rows = materials.map(m => {
                return {
                    id: m.id,
                    created: m.created_at.toString().split('.')[0].split('T').join(' '),
                    name: m.name,
                    image_path: m.image_path,
                    categories: m.categories_array,
                    image_name: m.image_name,
                    pdf_name: m.pdf_name,
                    nDownloads: m.nDownloads
                }
            })

        const categoryClasses = {
            dansk: "bg-blue-100 text-blue-700",
            matematik: "bg-green-100 text-green-700",
            engelsk: "bg-purple-100 text-purple-700",
            naturteknik: "bg-yellow-100 text-yellow-700",
            historie: "bg-red-100 text-red-700"
        }  
    
        const columns = [
            {name: "Materialer", uid: "materials"},
            {name: "Kategorier", uid: "categories"},
            {name: "Aktioner", uid: "actions"}
        ]

        type MaterialRow = (typeof rows)[0];

        const renderCell = (material: MaterialRow, columnKey: React.Key) => {
            const cellValue = material[columnKey as keyof MaterialRow];

            async function handleDelete(m:MaterialRow):Promise<void> {
              await removeFileFromBucket('materials-images', m.image_name)
              await removeFileFromBucket('materials-pdfs', m.pdf_name)
              await removeRowFromDatabase('materialer', m.id)
              refreshMaterials()
            }

            

            switch (columnKey) {
            case "materials":
                return (
                  <div className="flex justify-start items-center">
                    <User
                        avatarProps={{className: "w-24 h-24 border-3 border-gray-400 rounded", src: material.image_path}}
                        description={""}
                        name={""}
                    >
                    </User>
                      {<div className="flex-col ml-5">
                        <p className="font-bold">{material.name}</p>
                        <p className="text-gray-500 text-xs">{material.created}</p>
                        <p className="text-gray-500 text-xs">Downloads: {material.nDownloads}</p>
                      </div>}
                  </div>
                );
            case "categories":
                return (
                  <div className="flex flex-wrap gap-1 justify-center">
                    {material.categories.map(cat => (
                      <Chip className={`w-fit capitalize text-center h-fit px-2 py-1 text-xs font-medium rounded-full mr-2 ${categoryClasses[cat.toLowerCase() as keyof typeof categoryClasses] ?? 'bg-orange-100 text-orange-700'}`} size="sm" variant="flat" key={cat}>
                        {cat}
                      </Chip>
                    ))}
                  </div>
                );
            case "actions":
                return (
                <div className="relative flex justify-center items-center gap-5">
                    <Tooltip className="bg-blue-500 rounded-md text-white font-bold pl-1 pr-1 text-sm" content="Edit">
                    <span onClick={() => selectMaterial(material.id)} 
                      className="text-lg hover:text-blue-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                    </span>
                    </Tooltip>
                    <span className="border-1 h-5 border-gray-400"></span>
                    <Tooltip className="bg-red-500 rounded-md text-white font-bold pl-1 pr-1 text-sm" content="Delete">
                    <span onClick={() => handleDelete(material)} className="text-lg hover:text-red-500 cursor-pointer active:opacity-50">
                        <DeleteIcon />
                    </span>
                    </Tooltip>
                </div>
                );
            default:
                return cellValue;
            }
        }

        async function uploadMaterial(e:FormEvent<HTMLFormElement>) {
            e.preventDefault()
            const form = e.currentTarget
            const formData = new FormData(e.currentTarget)
            const name = formData.get('input-name') as FormDataEntryValue
            const shortDesc = formData.get('input-shortdesc') as FormDataEntryValue
            const categories = formData.get('input-cats') as FormDataEntryValue
            const tags = formData.get('input-tags') as FormDataEntryValue
            const longDesc = formData.get('input-longdesc') as FormDataEntryValue

            const error = await updateMaterial(selectedId, name, shortDesc, categories, tags, longDesc)
    
            if (!error) {
                refreshMaterials()
                setOpen(false)
                form.reset()
            }
        }

        async function pdfRedirect(m:Material) {
            window.open(m.pdf_path, '_blank', 'noopener,noreferrer')
        }
        
        return (
          <>
            <Table aria-label="Table of materials">
            <TableHeader columns={columns}>
                {(column) => (
                <TableColumn className="bg-blue-300 text-blue-900 p-2" key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                    {column.name.toUpperCase()}
                </TableColumn>
                )}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                <TableRow className="border-b-1 border-gray-400" key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
            </Table>

            {open && (
              <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
                <div className="flex bg-white rounded-lg p-6 w-200">
                  
                  <form className="w1/2" onSubmit={uploadMaterial}>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Navn" name="input-name" defaultValue={selectedMaterial?.name}  required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Kort beskrivelse (65)" name="input-shortdesc" defaultValue={selectedMaterial?.short_description} maxLength={65} required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Kategorier" name="input-cats" defaultValue={selectedMaterial?.categories_array.join(' ')}  required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Skjulte tags" name="input-tags" defaultValue={selectedMaterial?.meta_tags?.join(' ')} /><br/>
                    <textarea className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 resize-none w-100 h-100" placeholder="Lang beskrivelse (1800)" name="input-longdesc" defaultValue={selectedMaterial?.long_description} maxLength={1800} required></textarea><br/>
                    
                    <div className="flex justify-between w-full pr-5">
                        <button 
                          onClick={() => setOpen(false)}
                          className="bg-blue-300 text-blue-800 px-4 py-2 rounded-md font-semibold hover:bg-blue-400 hover:cursor-pointer"
                        >
                          Close
                        </button>
                        <button className="bg-green-200 text-green-800 px-4 py-2 rounded-md font-semibold hover:bg-green-300 hover:cursor-pointer" type="submit">Update</button>
                    </div>
                  </form>

                  <div className="w1/2 m-auto">
                    {selectedMaterial && <Image alt="Billede af materiale" width={300} height={300} src={selectedMaterial.image_path} />}
                  </div>
 
                </div>
              </div>
            )}
          </>
        );
    } 
}
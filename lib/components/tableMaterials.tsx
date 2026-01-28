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
import { removeRowFromDatabase, updateMaterial, updateImage, updatePDF } from "../database/server";
import { removeFileFromBucket } from "../database/client";
import type {Material} from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useAdminMaterials } from "../context/MaterialsProviderAdmin";
import { useMaterials } from "../context/MaterialsProvider";

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
    const [open, setOpen] = React.useState<boolean>(false)
    const [selectedMaterial, setSelectedMaterial] = React.useState<Material>()
    const [selectedMaterialImage, setSelectedMaterialImage] = React.useState<string | null>(null)
    const [selectedMaterialPDF, setSelectedMaterialPDF] = React.useState<string | null>(null)
    const [imageError, setImageError] = React.useState<string | null>(null)
    const [pdfError, setPdfError] = React.useState<string | null>(null)
    const [materialError, setMaterialError] = React.useState<string | null>(null)
    const [imageSuccess, setImageSuccess] = React.useState<string | null>(null)
    const [pdfSuccess, setPdfSuccess] = React.useState<string | null>(null)
    const [materialSuccess, setMaterialSuccess] = React.useState<string | null>(null)
    const [promptDelete, setPromptDelete] = React.useState<boolean>(false)
    const {materials, error, loading, refreshAdminMaterials} = useAdminMaterials()
    const {refreshMaterials} = useMaterials()

    function setMaterial(id:number) {
      if (materials) {
        const found = materials.find(m => m.id === id)
        if (found) {
          setSelectedMaterial(found)
          setSelectedMaterialImage(found.image_path)
          setSelectedMaterialPDF(found.pdf_path)
        }
      }
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
                    nDownloads: m.nDownloads,
                    showOnPage: m.showOnPage
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

            switch (columnKey) {
            case "materials":
                return (
                  <div className="flex justify-start items-center">
                    <Link className="hover:scale-105" href={`materialer/search/${material.id}`}>
                      <User
                          avatarProps={{className: "w-24 h-24 border-3 border-gray-400 rounded", src: material.image_path}}
                          description={""}
                          name={""}
                          >
                      </User>
                    </Link>
                      {<div className="flex-col ml-5">
                        <p className="font-bold">{material.name}</p>
                        <p className="text-gray-500 text-xs">{material.created}</p>
                        <p className="text-gray-500 text-xs">Downloads: {material.nDownloads}</p>
                      </div>}
                  </div>
                );
            case "categories":
                return (
                  <div className="flex flex-wrap gap-1 justify-center ">
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
                    <span onClick={() => {
                        setOpen(true)
                        setMaterial(material.id)
                      }} 
                      className="text-lg hover:text-blue-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                    </span>
                    </Tooltip>
                    <span className="border-1 h-5 border-gray-400"></span>
                    <Tooltip className="bg-red-500 rounded-md text-white font-bold pl-1 pr-1 text-sm" content="Delete">
                    <span onClick={() => {
                      setPromptDelete(true)
                      setMaterial(material.id)
                      }} className="text-lg hover:text-red-500 cursor-pointer active:opacity-50">
                        <DeleteIcon />
                    </span>
                    </Tooltip>
                </div>
                );
            default:
                return cellValue;
            }
        }

        async function uploadMaterial(e:FormEvent<HTMLFormElement>):Promise<void> {
            e.preventDefault()
            const form = e.currentTarget
            const formData = new FormData(e.currentTarget)
            const imageFile = formData.get('input-img') as File
            const pdfFile = formData.get('input-pdf') as File
            const name = formData.get('input-name') as FormDataEntryValue
            const shortDesc = formData.get('input-shortdesc') as FormDataEntryValue
            const categories = formData.get('input-cats') as FormDataEntryValue
            const tags = formData.get('input-tags') as FormDataEntryValue
            const longDesc = formData.get('input-longdesc') as FormDataEntryValue
            const showOnPage = formData.get('checkbox-show') !== null

            if (selectedMaterial) {
              if (
                name != selectedMaterial.name ||
                shortDesc != selectedMaterial.short_description ||
                categories != selectedMaterial.categories_array.join(' ') ||
                tags != (selectedMaterial.meta_tags?.join(' ') ?? "") ||
                longDesc != selectedMaterial.long_description ||
                showOnPage != !showOnPage
              ) {
                const {data, error} = await updateMaterial(formData, selectedMaterial)
                setMaterialError(null)

                if (error) {
                  setMaterialError(`Materialet fejlede ved opdatering - ${error}`)
                }
                if (data){
                  setMaterialSuccess(`🎉 Materialet er blevet opdateret!`)
                  setSelectedMaterial(data[0])
                }
              }
            }

            if (imageFile.name && selectedMaterial) {
              const {data, error} = await updateImage(formData, selectedMaterial)
              setImageError(null)
              setImageSuccess(null)

              if (error) {
                setImageError(`⚠️ Billedet fejlede ved upload - ${error}`)
                form.reset()
              } else {
                setImageSuccess(`🎉 Billedet blev uploadet!`)
                setSelectedMaterialImage(data)
              }
            }

            if (pdfFile.name && selectedMaterial) {
              const {data, error} = await updatePDF(formData, selectedMaterial)
              setPdfError(null)

              if (error) {
                setPdfError(`⚠️ PDF'en fejlede ved upload - ${error}`)
                form.reset()
              } else {
                setPdfSuccess(`🎉 PDF'en blev uploadet!`)
                setSelectedMaterialPDF(data)
              }
            }

            refreshAdminMaterials()
            refreshMaterials()
          }
      
        function pdfRedirect(pdf_path:string) {
            window.open(pdf_path, '_blank', 'noopener,noreferrer')
        }

        async function handleDelete(m:Material):Promise<void> {
          await removeFileFromBucket('materials-images', m.image_name)
          await removeFileFromBucket('materials-pdfs', m.pdf_name)
          await removeRowFromDatabase('materialer', m.id)
          refreshAdminMaterials()
          refreshMaterials()
        }
        
        return (
          <>
            <Table className="overflow-scroll" aria-label="Table of materials">
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
              <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50 p-12">
                <div className="flex flex-col lg:flex-row bg-white rounded-lg p-6 w-full lg:w-fit">
                  <form className="w-full mr-0 lg:w-1/2 lg:mr-10" onSubmit={uploadMaterial}>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 w-full lg:w-100" type="text" placeholder="Navn" name="input-name" defaultValue={selectedMaterial?.name} required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 w-full lg:w-100" type="text" placeholder="Kort beskrivelse (65)" name="input-shortdesc" defaultValue={selectedMaterial?.short_description} maxLength={65} required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 w-full lg:w-100" type="text" placeholder="Kategorier" name="input-cats" defaultValue={selectedMaterial?.categories_array.join(' ')}  required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 w-full lg:w-100" type="text" placeholder="Skjulte tags" name="input-tags" defaultValue={selectedMaterial?.meta_tags?.join(' ')} /><br/>
                    <textarea className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 resize-none w-full lg:w-100 h-50 md:h-100" placeholder="Lang beskrivelse (1800)" name="input-longdesc" defaultValue={selectedMaterial?.long_description} maxLength={1800} required></textarea><br/>
                    <div className="flex mb-3">
                        <label htmlFor="checkbox-show" className="font-semibold mr-2">Vis på siden</label>
                        <input name="checkbox-show" id="checkbox-show" defaultChecked={selectedMaterial?.showOnPage} className="rounded-md bg-slate-200 font-semibold" type="checkbox" />
                    </div>
                    <label className="font-semibold" htmlFor="input-pdf">Upload ny PDF: </label>
                    <input 
                        className="  
                        block w-auto text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4 file:rounded-md
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-pink-100 file:text-pink-700
                        hover:file:bg-pink-200 hover:file:cursor-pointer hover:cursor-pointer" 
                        type="file" multiple={false} name="input-pdf" id="input-pdf" accept=".pdf" /><br/>
                    <label className="font-semibold" htmlFor="input-img">Upload nyt billede: </label>
                    <input 
                        className="  
                        block w-auto text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4 file:rounded-md
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-100 file:text-blue-700
                        hover:file:bg-blue-200 hover:file:cursor-pointer hover:cursor-pointer" 
                        type="file" multiple={false} name="input-img" id="input-img" accept="image/*" /><br/>
                    
                    <div className="flex justify-between w-full">
                        <button 
                          onClick={() => {
                            setOpen(false)
                            setImageError(null)
                            setImageSuccess(null)
                            setPdfError(null)
                            setPdfSuccess(null)
                            setMaterialError(null)
                            setMaterialSuccess(null)
                          }}
                          className="bg-blue-300 text-blue-800 px-4 py-2 rounded-md font-semibold hover:bg-blue-400 hover:cursor-pointer mb-5 lg:mb-0"
                        >
                          Close
                        </button>
                        <button
                          className="disabled:bg-gray-300 disabled:text-gray-800 disabled:cursor-not-allowed bg-green-200 text-green-800 px-4 py-2 rounded-md font-semibold hover:bg-green-300 hover:cursor-pointer mb-5 lg:mb-0"
                          type="submit">Update</button>
                    </div>
                  </form>

                  <div className="flex flex-col w-full lg:w-1/2 m-auto items-center">
                  {imageError && <p className="bg-red-500 mb-3 rounded-lg text-center text-white font-bold p-3">{imageError}</p>}
                  {pdfError && <p className="bg-red-500 mb-3 rounded-lg text-center text-white font-bold p-3">{pdfError}</p>}
                  {materialError && <p className="bg-red-500 mb-3 rounded-lg text-center text-white font-bold p-3">{materialError}</p>}
                  {imageSuccess && <p className="bg-green-500 mb-3 rounded-lg text-center text-white font-bold p-3">{imageSuccess}</p>}
                  {pdfSuccess && <p className="bg-green-500 mb-3 rounded-lg text-center text-white font-bold p-3">{pdfSuccess}</p>}
                  {materialSuccess && <p className="bg-green-500 mb-3 rounded-lg text-center text-white font-bold p-3">{materialSuccess}</p>}
                  
                  <div className="w-full flex lg:block">
                    {selectedMaterial &&
                    <>
                      {selectedMaterialImage && <Image alt="Billede af materiale" className="w-100 hidden lg:block" width={300} height={300} src={selectedMaterialImage} />}
                      {selectedMaterialImage && <button 
                        onClick={() => window.open(selectedMaterialImage, '_blank', 'noopener,noreferrer')} 
                        className="w-full mr-5 rounded-md lg:rounded-bl-lg rounded-br-lg h-15 bg-green-300 text-green-900 font-bold hover:cursor-pointer hover:text-white hover:bg-green-500 block lg:hidden">Se billede</button>}
                        {selectedMaterialPDF && <button 
                        onClick={() => pdfRedirect(selectedMaterialPDF)} 
                        className="w-full rounded-md lg:rounded-bl-lg rounded-br-lg h-15 bg-green-300 text-green-900 font-bold hover:cursor-pointer hover:text-white hover:bg-green-500">Se PDF</button>}
                    </>
                    }
                  </div>
                  </div>
                </div>
              </div>
            )}

            {(promptDelete && selectedMaterial) && (
              <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
                <div className="flex-col items-center text-center bg-white rounded-lg p-6 w-90">
                  <p>Are you sure you want to delete 
                    <span className="font-bold"> {selectedMaterial.name}</span>
                    ?
                  </p>
                  <div className="flex mt-3 m-auto justify-between w-40">
                    <button onClick={() => setPromptDelete(false)} className="bg-red-300 text-red-800 pl-3 pr-3 pt-1 pb-1 rounded hover:cursor-pointer hover:bg-red-200">No</button>
                    <button onClick={() => {
                      handleDelete(selectedMaterial)
                      setPromptDelete(false)
                    }} className="bg-green-300 text-green-800 pl-3 pr-3 pt-1 pb-1 rounded hover:cursor-pointer hover:bg-green-200">Yes</button>
                </div>
                </div>
              </div>
            )}
          </>
        );
    } 
}
"use server"

import { incrementDownload } from '@/lib/database/db'
import type {Material} from '@/lib/types'

export async function IncrementDownload(m:Material):Promise<void> {
    await incrementDownload(m)
}
"use server"

import { incrementDownload } from '@/lib/database/server'
import type {Material} from '@/lib/types'

export async function IncrementDownload(m:Material):Promise<void> {
    await incrementDownload(m)
}
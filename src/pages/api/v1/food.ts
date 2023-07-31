import fs, { readFileSync } from 'fs'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log('migrating data...')
  await migrateData()
  console.log('data successfully migrated!')
  res.status(200)
}

async function migrateData() {
  const filePath = '/home/stephen/portfolio/a2a/src/pages/api/data.json'

  const data = readFileSync(filePath, { encoding: 'utf-8' })
  const res = JSON.parse(data)

  const imageNames: Record<string, string[]> = {}
  const images = fs.readdirSync('/home/stephen/portfolio/a2a/public/images', { encoding: 'utf-8' })

  images.map((image) => {
    const id = image.split('-')[0]
    if (imageNames[id]) {
      imageNames[id].push(image)
    } else {
      imageNames[id] = [image]
    }
  })

  const combined = res.map((old: any) => {
    const image = imageNames[old.id]
    return {
      ...old,
      images: [...image],
    }
  })

  prisma.food
    .createMany({
      data: combined,
    })
    .then(() => console.log('success!'))
    .catch((err) => console.error(err))

  return
}

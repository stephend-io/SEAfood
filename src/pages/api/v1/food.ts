import fs, { readFileSync } from 'fs'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const keys = Migrate()
  res.status(200).json(keys)
}

export function Migrate() {
  const dir = __dirname
  const filePath = '/home/stephen/portfolio/a2a/src/pages/api/data.json'

  const data = readFileSync(filePath, { encoding: 'utf-8' })
  // console.log(JSON.parse(data)[0])

  return JSON.parse(data)
}

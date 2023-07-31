import fs, { readFileSync } from 'fs'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  Migrate()
  res.status(200)
}

export function Migrate() {
  const dir = __dirname
  const filePath = '/home/stephen/portfolio/a2a/src/pages/api/data.json'

  const data = readFileSync(filePath)
  console.log(JSON.parse(data))
  // console.log('migrate route hit')
}

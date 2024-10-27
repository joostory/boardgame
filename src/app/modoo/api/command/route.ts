import fs from 'fs'

export const dynamic = "force-static"

export async function GET() {
  try {
    const data = fs.readFileSync('src/data/modoo/command.json', 'utf8')
    return Response.json(JSON.parse(data))
  } catch (e) {
    console.error("File read error", e)
    return Response.json([])
  }
}

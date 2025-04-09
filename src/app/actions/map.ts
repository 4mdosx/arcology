'use server'

export async function getMaptilerKey(): Promise<{
  api_key: string
  style_key: string
}> {
  return {
    api_key: process.env.MAPTILER_API_KEY ?? '',
    style_key: process.env.MAPTILER_STYLE_KEY ?? '',
  }
}

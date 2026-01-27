import { createClient } from '@/lib/supabase/server'

/** Fetches one random featured_image from published projects. Returns null on error or if none. */
export async function getRandomBannerImage(): Promise<string | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('projects')
      .select('featured_image')
      .eq('is_published', true)
      .not('featured_image', 'is', null)
      .limit(20)
    const rows = (data ?? []) as Array<{ featured_image: string | null }>
    const withImage = rows.filter((r) => r.featured_image && r.featured_image.trim())
    if (withImage.length === 0) return null
    const i = Math.floor(Math.random() * withImage.length)
    return withImage[i]!.featured_image
  } catch {
    return null
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getAllFAQs, getAllCategories, searchFAQs, getFAQsByCategory } from '@/lib/faq-utils'

// GET /api/faq - Get all FAQs with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') // search query
    const category = searchParams.get('category') // filter by category
    const limit = searchParams.get('limit') // limit results

    let results

    if (query) {
      // Search FAQs
      results = searchFAQs(query)
    } else if (category) {
      // Get FAQs by category
      results = getFAQsByCategory(category)
    } else {
      // Get all FAQs
      results = getAllFAQs()
    }

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit, 10)
      if (!isNaN(limitNum)) {
        results = results.slice(0, limitNum)
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
      query: query || null,
      category: category || null
    })
  } catch (error) {
    console.error('FAQ API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch FAQ data' },
      { status: 500 }
    )
  }
}

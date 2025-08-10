import { NextResponse } from 'next/server'
import { getAllCategories } from '@/lib/faq-utils'

// GET /api/faq/categories - Get all FAQ categories
export async function GET() {
  try {
    const categories = getAllCategories()
    
    return NextResponse.json({
      success: true,
      data: categories,
      total: categories.length
    })
  } catch (error) {
    console.error('FAQ Categories API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch FAQ categories' },
      { status: 500 }
    )
  }
}

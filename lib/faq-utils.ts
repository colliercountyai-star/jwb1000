import faqData from './faq-data.json'

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

export interface Category {
  id: string
  name: string
  description: string
}

export interface FAQData {
  faqs: FAQ[]
  categories: Category[]
}

// Get all FAQs
export function getAllFAQs(): FAQ[] {
  return faqData.faqs
}

// Get all categories
export function getAllCategories(): Category[] {
  return faqData.categories
}

// Get FAQs by category
export function getFAQsByCategory(categoryId: string): FAQ[] {
  return faqData.faqs.filter(faq => faq.category === categoryId)
}

// Search FAQs by keyword
export function searchFAQs(query: string): FAQ[] {
  const lowercaseQuery = query.toLowerCase()
  return faqData.faqs.filter(faq => 
    faq.question.toLowerCase().includes(lowercaseQuery) ||
    faq.answer.toLowerCase().includes(lowercaseQuery) ||
    faq.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Get FAQ by ID
export function getFAQById(id: string): FAQ | undefined {
  return faqData.faqs.find(faq => faq.id === id)
}

// Get random FAQ
export function getRandomFAQ(): FAQ {
  const randomIndex = Math.floor(Math.random() * faqData.faqs.length)
  return faqData.faqs[randomIndex]
}

// Get FAQs by tag
export function getFAQsByTag(tag: string): FAQ[] {
  const lowercaseTag = tag.toLowerCase()
  return faqData.faqs.filter(faq => 
    faq.tags.some(t => t.toLowerCase().includes(lowercaseTag))
  )
}

// Get category by ID
export function getCategoryById(id: string): Category | undefined {
  return faqData.categories.find(category => category.id === id)
}

// Get category name for a FAQ
export function getCategoryName(faq: FAQ): string {
  const category = getCategoryById(faq.category)
  return category?.name || 'Unknown Category'
}

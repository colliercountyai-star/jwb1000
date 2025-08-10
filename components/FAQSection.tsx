'use client'

import { useState, useEffect } from 'react'
import { FAQ, Category, getAllFAQs, getAllCategories, searchFAQs } from '@/lib/faq-utils'
import { Search, ChevronDown, ChevronRight } from 'lucide-react'

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedFaqs, setExpandedFaqs] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Load FAQ data
    setFaqs(getAllFAQs())
    setCategories(getAllCategories())
  }, [])

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const toggleFaq = (faqId: string) => {
    const newExpanded = new Set(expandedFaqs)
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId)
    } else {
      newExpanded.add(faqId)
    }
    setExpandedFaqs(newExpanded)
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.name || 'Unknown Category'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-white/80">Find answers to common questions about JWB Grill</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-white/20 text-white border-2 border-white/60'
                : 'bg-white/10 text-white/80 border-2 border-white/30 hover:bg-white/15'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white border-2 border-white/60'
                  : 'bg-white/10 text-white/80 border-2 border-white/30 hover:bg-white/15'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white/60">No FAQs found matching your search.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white/10 backdrop-blur-md border border-white/30 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-white font-medium text-lg">{faq.question}</h3>
                  <p className="text-white/60 text-sm mt-1">
                    {getCategoryName(faq.category)}
                  </p>
                </div>
                {expandedFaqs.has(faq.id) ? (
                  <ChevronDown className="w-5 h-5 text-white/60" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-white/60" />
                )}
              </button>
              
              {expandedFaqs.has(faq.id) && (
                <div className="px-6 pb-4 border-t border-white/20">
                  <p className="text-white/90 leading-relaxed">{faq.answer}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {faq.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/20 text-white/80 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Results Count */}
      <div className="text-center mt-8 text-white/60">
        Showing {filteredFaqs.length} of {faqs.length} FAQs
      </div>
    </div>
  )
}

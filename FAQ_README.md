# JWB Grill FAQ System

This project now includes a comprehensive FAQ system that stores and displays frequently asked questions about JWB Grill restaurant policies and information.

## What's Been Added

### 1. FAQ Data Storage
- **`lib/faq-data.json`** - Contains all FAQ entries with questions, answers, categories, and tags
- **`lib/faq-utils.ts`** - Utility functions for searching, filtering, and managing FAQ data

### 2. API Endpoints
- **`/api/faq`** - Get all FAQs with optional search and category filtering
- **`/api/faq/categories`** - Get all FAQ categories

### 3. UI Components
- **`components/FAQSection.tsx`** - Interactive FAQ display component with search and filtering
- **`components/Navigation.tsx`** - Navigation bar with links to Chat and FAQ pages

### 4. Pages
- **`/faq`** - Dedicated FAQ page showcasing all questions and answers

## Current FAQ Entries

The system includes these restaurant policies:

- **Corkage Policy** - $25 for bottles not on the list, 2 bottle maximum
- **Cancellation Policy** - 24 hour notice required, $25 fee per head within 24 hours
- **Window Requests** - Taken but never guaranteed
- **Table Availability** - One round table seating up to 6 guests
- **Dress Code** - No swimwear, no tank tops for men
- **Walk-in Policy** - Accepted but reservations recommended for main dining room

## How to Use

### View FAQs
1. Navigate to `/faq` in your browser
2. Use the search bar to find specific questions
3. Filter by category (Restaurant Policies, Seating & Tables)
4. Click on questions to expand and see answers

### Add New FAQs
1. Edit `lib/faq-data.json`
2. Add new entries following the existing format:
```json
{
  "id": "unique-id",
  "question": "What is the question?",
  "answer": "What is the answer?",
  "category": "category-id",
  "tags": ["tag1", "tag2"]
}
```

### Update System Prompt
The FAQ answers are also included in your environment variables (`env.example`) so the AI chatbot always has access to this information.

## Features

- **Search Functionality** - Search through questions, answers, and tags
- **Category Filtering** - Filter FAQs by category
- **Responsive Design** - Works on all device sizes
- **Glass Morphism UI** - Matches your existing design aesthetic
- **Expandable Questions** - Click to expand/collapse answers
- **Tag System** - Each FAQ has relevant tags for better organization

## API Usage Examples

```bash
# Get all FAQs
GET /api/faq

# Search FAQs
GET /api/faq?q=corkage

# Filter by category
GET /api/faq?category=policies

# Limit results
GET /api/faq?limit=5

# Get categories
GET /api/faq/categories
```

## Integration with Chatbot

The FAQ system works alongside your existing chatbot:
- FAQ answers are included in the system prompt
- Users can access structured FAQ information via the `/faq` page
- The chatbot can reference these policies when answering questions

## Future Enhancements

Potential improvements you could add:
- Admin panel for managing FAQs
- FAQ analytics and popular questions
- Integration with your reservation system
- Customer feedback on FAQ helpfulness
- FAQ suggestions based on chat interactions

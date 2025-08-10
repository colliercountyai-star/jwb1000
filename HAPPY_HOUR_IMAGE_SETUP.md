# Happy Hour Image Setup

## What I've Added

1. **Updated the drink menu** in `lib/chat/config.ts` with detailed happy hour information
2. **Added image support** to the chat interface so images can be displayed
3. **Added a Happy Hour button** to the landing page for easy access
4. **Created a placeholder file** at `public/images/happy-hour-menu.png`

## Next Steps

### 1. Replace the Placeholder Image
- **Delete** the file `public/images/happy-hour-menu.png` (it's just a placeholder)
- **Save your actual happy hour poster image** as `happy-hour-menu.png` in the `public/images/` folder
- **Recommended image specs:**
  - Format: PNG or JPG
  - Dimensions: 800x1200px or similar aspect ratio
  - File size: Under 2MB for fast loading

### 2. Test the Feature
- Start your server (`npm run dev`)
- Click the "Happy Hour" button on the landing page
- The AI should now display both the happy hour details AND the image

## How It Works

- When someone asks about happy hour, the AI will:
  1. Provide detailed happy hour information
  2. Display the visual menu image using: `![JWB Grill Happy Hour Menu](/images/happy-hour-menu.png)`
  3. Give guests both text and visual information

## Current Happy Hour Details in AI Knowledge

The AI now knows:
- **Schedule:** Sunday - Thursday, Open to Close (Bar & Bar Seating Only)
- **Small Plates:** $14 each (Ceviche, Calamari, Meatball Sliders, Mussels, Carpaccio, Tuna Wontons)
- **Drink Specials:** $5 Draft Beer, $4 Off Featured Cocktails & Well Drinks, $4 Off Wine by the Glass
- **Terms:** Not valid on holidays, no other discounts apply

Once you replace the image, guests will see the complete happy hour experience! 🍹

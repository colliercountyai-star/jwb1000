import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Utensils, Wine, ChefHat, MapPin, Clock, Phone, Star, Users, Calendar } from "lucide-react"
import ChatPanel from "@/components/chat/ChatPanel"
import { useState } from "react"

export default function Home() {
  const [showChat, setShowChat] = useState(false)

  if (showChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={() => setShowChat(false)}
            variant="outline"
            className="mb-6 text-white border-white/20 hover:bg-white/10"
          >
            ← Back to Restaurant Info
          </Button>
          <ChatPanel />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="flex items-center justify-center mb-6">
            <Utensils className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              JWB Grill
            </h1>
          </div>
          <p className="text-2xl text-blue-100 mb-8">
            Jimmy Buffett's Beach Resort - Experience Coastal Cuisine at Fort Myers Beach
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
              <ChefHat className="w-4 h-4 mr-2" />
              World-Class Chefs
            </Badge>
            <Badge variant="secondary" className="bg-green-400/20 text-green-300 border-green-400/30">
              <Utensils className="w-4 h-4 mr-2" />
              Fresh Local Ingredients
            </Badge>
            <Badge variant="secondary" className="bg-purple-400/20 text-purple-300 border-purple-400/30">
              <Wine className="w-4 h-4 mr-2" />
              Extensive Wine Program
            </Badge>
          </div>
          <Button 
            onClick={() => setShowChat(true)}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 text-lg"
          >
            🍹 Ask Jimmy About Our Menu & Wine
          </Button>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400">
                <MapPin className="w-5 h-5 mr-2" />
                Location & Atmosphere
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-blue-100">
                Located at Jimmy Buffett's Beach Resort in Fort Myers Beach, FL, JWB Grill combines 
                Gulf Coast fine dining with the laid-back island lifestyle that Jimmy Buffett made famous.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <p className="text-sm text-blue-200">Open Daily</p>
                  <p className="text-xs text-blue-300">5:00 PM - 10:00 PM</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <p className="text-sm text-blue-200">Perfect For</p>
                  <p className="text-xs text-blue-300">Any Occasion</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400">
                <ChefHat className="w-5 h-5 mr-2" />
                Meet Our Chefs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-yellow-300">Chef Hafid</h4>
                  <p className="text-sm text-blue-200">From Morocco, bringing authentic Mediterranean flavors</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-yellow-300">Chef Jimmy</h4>
                  <p className="text-sm text-blue-200">Le Cordon Bleu graduate, Italian & BBQ expert</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Highlights */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">
            🍽️ Our Signature Dishes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
              <CardHeader>
                <CardTitle className="text-yellow-300">Ocean to Table</CardTitle>
                <CardDescription className="text-blue-200">
                  Fresh Gulf seafood and local catches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li>• Local Spear Fish (Market Price)</li>
                  <li>• Coconut Curry Shrimp ($34)</li>
                  <li>• Seafood Stew ($36)</li>
                  <li>• Paella ($38)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
              <CardHeader>
                <CardTitle className="text-yellow-300">Prime & Vine</CardTitle>
                <CardDescription className="text-blue-200">
                  Premium steaks and extensive wine selection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li>• Filet Mignon ($56)</li>
                  <li>• Ribeye ($59)</li>
                  <li>• 100+ Wines from around the world</li>
                  <li>• Expert wine pairing guidance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
              <CardHeader>
                <CardTitle className="text-yellow-300">Garden Fresh</CardTitle>
                <CardDescription className="text-blue-200">
                  Vegetarian options and fresh produce
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li>• Roasted Cauliflower Cutlet ($32)</li>
                  <li>• Fresh Salads with local ingredients</li>
                  <li>• Dairy-free modifications available</li>
                  <li>• Seasonal vegetable sides</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Special Features */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">
            🌟 What Makes Us Special
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm border-white/20 rounded-lg">
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">Romantic Dinners</h3>
              <p className="text-blue-200 text-sm">Ocean views perfect for special occasions</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm border-white/20 rounded-lg">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">Happy Hour</h3>
              <p className="text-blue-200 text-sm">Live music and drink specials</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm border-white/20 rounded-lg">
              <Utensils className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">Dietary Accommodations</h3>
              <p className="text-blue-200 text-sm">We can modify most dishes for your needs</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm border-white/20 rounded-lg">
              <Wine className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">Wine Expertise</h3>
              <p className="text-blue-200 text-sm">Carefully curated selection with expert guidance</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">
            Ready to Experience the Margaritaville Lifestyle?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Chat with our AI assistant to explore our full menu, wine list, and get personalized recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowChat(true)}
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3"
            >
              🍹 Start Chatting with Jimmy
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 px-8 py-3"
            >
              📞 Make a Reservation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

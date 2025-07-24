import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Brush, Palette, Share2, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { state: authState } = useAuth();

  const features = [
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'Work together with artists from around the world in real-time on the same canvas.',
    },
    {
      icon: Brush,
      title: 'Professional Tools',
      description: 'Access a complete set of drawing tools, brushes, shapes, and layers for your artwork.',
    },
    {
      icon: Share2,
      title: 'Share & Discover',
      description: 'Share your collaborative masterpieces and discover amazing art from the community.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Artists' },
    { number: '25,000+', label: 'Artworks' },
    { number: '150+', label: 'Countries' },
    { number: '1M+', label: 'Collaborations' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Create Art{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Join the world's first real-time collaborative painting platform. 
              Connect with artists, share ideas, and create masterpieces together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {authState.user ? (
                <>
                  <Link to="/canvas">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3">
                      <Brush className="mr-2 h-5 w-5" />
                      Start Creating
                    </Button>
                  </Link>
                  <Link to="/gallery">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                      Explore Gallery
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3">
                      <Palette className="mr-2 h-5 w-5" />
                      Join Now - Free
                    </Button>
                  </Link>
                  <Link to="/gallery">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                      View Gallery
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ArtCollab?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of collaborative art creation with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Artworks Preview */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Collaborations
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing artworks created by our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
                title: 'Sunset Dreams',
                artists: ['Alice', 'Bob'],
                likes: 42,
              },
              {
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                title: 'Abstract Harmony',
                artists: ['Mia', 'Dave', 'Sarah'],
                likes: 67,
              },
              {
                image: ' https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
                title: 'Ocean Waves',
                artists: ['Chris', 'Emma'],
                likes: 38,
              },
            ].map((artwork, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="text-sm">{artwork.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{artwork.title}</h3>
                  <p className="text-gray-600 text-sm">
                    by {artwork.artists.join(', ')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View All Artworks
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!authState.user && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Artistic Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of artists creating amazing collaborative art every day
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                <Palette className="mr-2 h-5 w-5" />
                Sign Up for Free
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

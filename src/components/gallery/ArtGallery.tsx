import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Artwork } from '@/types/Index';
import { Filter, Grid, Heart, List, MessageCircle, Search, Share2 } from 'lucide-react';
import { useState } from 'react';

const mockArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Sunset Dreams',
    description: 'A collaborative piece exploring warm colors and nature',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    createdBy: {
      id: '1',
      username: 'Umesh Chavhan',
      email: 'alice@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8c4?w=50&h=50&fit=crop&crop=face',
      createdAt: new Date().toISOString(),
    },
    collaborators: [
      {
        id: '2',
        username: 'Harshal Mehre',
        email: 'bob@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        createdAt: new Date().toISOString(),
      }
    ],
    likes: 42,
    createdAt: new Date().toISOString(),
    isPublic: true,
  },
  {
    id: '2',
    title: 'Harshal Mehre',
    description: 'Three artists came together to create this vibrant abstract piece',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    createdBy: {
      id: '3',
      username: 'Nitesh Kumar',
      email: 'nitesh123@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      createdAt: new Date().toISOString(),
    },
    collaborators: [
      {
        id: '1',
        username: 'Umesh Chavhan',
        email: 'umesh123@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8c4?w=50&h=50&fit=crop&crop=face',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        username: 'Nishant Patil',
        email: 'nishant123@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        createdAt: new Date().toISOString(),
      }
    ],
    likes: 67,
    createdAt: new Date().toISOString(),
    isPublic: true,
  },
];

export const ArtGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set());

  const handleLike = (artworkId: string) => {
    const newLikedArtworks = new Set(likedArtworks);
    if (newLikedArtworks.has(artworkId)) {
      newLikedArtworks.delete(artworkId);
    } else {
      newLikedArtworks.add(artworkId);
    }
    setLikedArtworks(newLikedArtworks);
  };

  const filteredArtworks = mockArtworks.filter(artwork =>
    artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.createdBy.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Art Gallery</h1>
          <p className="text-gray-600">Discover amazing collaborative artworks from our community</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search artworks, artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Artworks Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {artwork.collaborators.length + 1} artists
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                    {artwork.title}
                  </h3>
                </div>
                
                {artwork.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {artwork.description}
                  </p>
                )}

                {/* Creator and Collaborators */}
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={artwork.createdBy.avatar} alt={artwork.createdBy.username} />
                    <AvatarFallback>{artwork.createdBy.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">by {artwork.createdBy.username}</span>
                  
                  {artwork.collaborators.length > 0 && (
                    <>
                      <span className="text-gray-400">•</span>
                      <div className="flex -space-x-1">
                        {artwork.collaborators.slice(0, 3).map((collaborator) => (
                          <Avatar key={collaborator.id} className="h-5 w-5 border-2 border-white">
                            <AvatarImage src={collaborator.avatar} alt={collaborator.username} />
                            <AvatarFallback className="text-xs">
                              {collaborator.username.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {artwork.collaborators.length > 3 && (
                          <div className="h-5 w-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{artwork.collaborators.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-gray-600 hover:text-red-600 ${
                        likedArtworks.has(artwork.id) ? 'text-red-600' : ''
                      }`}
                      onClick={() => handleLike(artwork.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 mr-1 ${
                          likedArtworks.has(artwork.id) ? 'fill-current' : ''
                        }`} 
                      />
                      {artwork.likes + (likedArtworks.has(artwork.id) ? 1 : 0)}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      12
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No artworks found</h3>
            <p className="text-gray-600">Try adjusting your search terms or explore different categories.</p>
          </div>
        )}
      </div>
    </div>
  );
};

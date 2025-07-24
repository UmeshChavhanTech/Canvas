import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User } from '@/types/Index';
import { Users, Crown, UserPlus } from 'lucide-react';

interface CollaboratorsListProps {
  collaborators: User[];
  currentUser: User | null;
}

export const CollaboratorsList: React.FC<CollaboratorsListProps> = ({
  collaborators,
  currentUser,
}) => {
  const allUsers = currentUser ? [currentUser, ...collaborators] : collaborators;

  return (
    <Card className="h-full bg-white/90 backdrop-blur-sm shadow-lg border-0">
      <CardHeader className="pb-2 md:pb-3">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Users className="h-4 md:h-5 w-4 md:w-5 text-purple-600" />
          Collaborators ({allUsers.length})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 md:space-y-4">
        {/* Add Collaborator Button */}
        <Button
          variant="outline"
          className="w-full justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-50 border-dashed text-sm"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Artist
        </Button>

        {/* Current Collaborators */}
        <div className="space-y-2 md:space-y-3 max-h-60 md:max-h-96 overflow-y-auto">
          {allUsers.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg border bg-gray-50/80 hover:bg-gray-100/80 transition-colors"
            >
              <Avatar className="h-8 w-8 md:h-10 md:w-10">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="bg-purple-100 text-purple-700 text-xs md:text-sm">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-xs md:text-sm truncate">
                    {user.username}
                  </p>
                  {user.id === currentUser?.id && (
                    <Badge variant="secondary" className="text-xs">
                      You
                    </Badge>
                  )}
                  {index === 0 && user.id !== currentUser?.id && (
                    <Crown className="h-3 w-3 text-yellow-600" />
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>

              {/* Online Status Indicator */}
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 border-2 border-white shadow-sm" />
            </div>
          ))}
        </div>

        {/* Real-time Activity Feed */}
        <div className="pt-3 md:pt-4 border-t">
          <h4 className="text-xs md:text-sm font-medium text-gray-700 mb-2">Recent Activity</h4>
          <div className="space-y-1 md:space-y-2 max-h-20 md:max-h-32 overflow-y-auto">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
              <span className="truncate">ArtistAlice added a rectangle</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
              <span className="truncate">CreativeBob started drawing</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
              <span className="truncate">You changed brush color</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

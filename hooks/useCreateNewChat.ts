import streamClient from '@/lib/stream';

export const useCreateNewChat = () => {
  const createNewChat = async ({
    members,
    createdBy,
    groupName,
  }: {
    members: string[];
    createdBy: string;
    groupName?: string;
  }) => {
    try {
      const isGroupChat = members.length > 2;

      // Only check for existing chats for 1-1 conversations
      if (!isGroupChat) {
        // For 1-1 chats, check if chat already exists
        const existingChannels = await streamClient.queryChannels(
          {
            type: 'messaging',
            members: { $eq: members },
          },
          { created_at: -1 },
          { limit: 1 }
        );

        // If chat exists, return the existing channel
        if (existingChannels.length > 0) {
          const channel = existingChannels[0];
          const channelMembers = Object.keys(channel.state.members);
          
          // Check if it's exactly the same 2 members
          if (
            channelMembers.length === 2 && 
            members.every(member => channelMembers.includes(member))
          ) {
            console.log("Existing 1-1 chat found");
            return channel;
          }
        }
      }

      // Create new channel
      const channelId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

      const channelData: {
        members: string[];
        created_by_id: string;
        name?: string;
      } = {
        members: members,
        created_by_id: createdBy,
      };

      if (isGroupChat) {
        channelData.name = groupName || `Group Chat (${members.length} members)`;
      }

      const channel = streamClient.channel(
        isGroupChat ? 'Team' : 'messaging',
        channelId,
        channelData
      );
      await channel.watch({
        presence: true,
      });
      
      return channel;
      
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  };

  return  createNewChat ;
};
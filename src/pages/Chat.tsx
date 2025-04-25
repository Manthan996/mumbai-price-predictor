
import { useState } from 'react';
import { Header } from "@/components/Header";
import { ExpertsList } from "@/components/chat/ExpertsList";
import { ChatRoom } from "@/components/chat/ChatRoom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Chat = () => {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleExpertSelect = async (expertId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to chat with experts",
        variant: "destructive",
      });
      return;
    }

    // Create a new chat room
    const { data, error } = await supabase
      .from('chat_rooms')
      .insert({
        user_id: user.id,
        expert_id: expertId,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create chat room",
        variant: "destructive",
      });
      return;
    }

    setCurrentRoomId(data.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Chat with Property Experts</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Experts</h2>
            <ExpertsList onSelectExpert={handleExpertSelect} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Chat Room</h2>
            {currentRoomId ? (
              <ChatRoom roomId={currentRoomId} />
            ) : (
              <div className="h-[400px] border rounded-md flex items-center justify-center text-muted-foreground">
                Select an expert to start chatting
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;

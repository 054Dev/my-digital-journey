import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Mail, Trash2, Eye, EyeOff } from "lucide-react";

const SetupMessages = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: messages, isLoading } = useQuery({
    queryKey: ["contact_submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markRead = async (id: string) => {
    await supabase.from("contact_submissions").update({ status: "read" }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["contact_submissions"] });
  };

  const deleteMsg = async (id: string) => {
    await supabase.from("contact_submissions").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["contact_submissions"] });
    toast({ title: "Message deleted" });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  const unread = messages?.filter((m) => m.status === "unread").length || 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Mail className="text-primary" size={24} />
        <h2 className="font-display text-2xl font-semibold">Contact Messages</h2>
        {unread > 0 && <Badge variant="destructive">{unread} new</Badge>}
      </div>
      <p className="text-muted-foreground">Messages submitted through your contact form.</p>

      {messages?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="text-muted-foreground mx-auto mb-4" size={40} />
            <p className="text-muted-foreground">No messages yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {messages?.map((msg) => (
            <Card key={msg.id} className={msg.status === "unread" ? "border-primary/50 bg-primary/5" : ""}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-body font-semibold text-foreground">{msg.name}</p>
                      {msg.status === "unread" && <Badge className="text-xs">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{msg.email}</p>
                    <p className="font-body font-medium text-foreground mb-2">{msg.subject}</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {msg.status === "unread" ? (
                      <Button variant="outline" size="sm" onClick={() => markRead(msg.id)}>
                        <Eye size={14} />
                      </Button>
                    ) : (
                      <EyeOff size={14} className="text-muted-foreground mt-2" />
                    )}
                    <Button variant="outline" size="sm" className="text-destructive" onClick={() => deleteMsg(msg.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SetupMessages;

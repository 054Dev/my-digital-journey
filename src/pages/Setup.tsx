import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Settings, Undo2, Redo2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SetupProfile from "@/components/setup/SetupProfile";
import SetupSocialLinks from "@/components/setup/SetupSocialLinks";
import SetupProjects from "@/components/setup/SetupProjects";
import SetupSkills from "@/components/setup/SetupSkills";
import SetupEducation from "@/components/setup/SetupEducation";
import SetupChildhood from "@/components/setup/SetupChildhood";
import SetupAspirations from "@/components/setup/SetupAspirations";
import SetupContact from "@/components/setup/SetupContact";
import SetupResume from "@/components/setup/SetupResume";
import SetupImages from "@/components/setup/SetupImages";
import SetupTheme from "@/components/setup/SetupTheme";
import SetupMessages from "@/components/setup/SetupMessages";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LoginForm = ({ onLogin }: { onLogin: (email: string, password: string) => Promise<{ error: any }> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await onLogin(email, password);
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Settings className="mx-auto text-primary mb-4" size={48} />
          <h1 className="font-display text-3xl font-bold text-foreground">Admin Setup</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your portfolio</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-6 text-center">
          Create your admin account first via Lovable Cloud → Users
        </p>
      </div>
    </div>
  );
};

const Setup = () => {
  const { user, loading, signIn, signOut } = useAuth();
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [pendingLeave, setPendingLeave] = useState<(() => void) | null>(null);

  // Track unsaved changes via beforeunload
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  // Undo/Redo with keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        if (e.shiftKey) {
          toast({ title: "Redo", description: "Redo is handled per-section via your browser." });
        } else {
          toast({ title: "Undo", description: "Undo is handled per-section via your browser." });
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toast]);

  const handleSignOut = () => {
    if (hasUnsavedChanges) {
      setPendingLeave(() => signOut);
      setShowLeaveDialog(true);
    } else {
      signOut();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={signIn} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Settings className="text-primary" size={24} />
            <h1 className="font-display text-xl font-semibold text-foreground">Portfolio Setup</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut size={16} /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="childhood">Childhood</TabsTrigger>
            <TabsTrigger value="aspirations">Aspirations</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="resume">Resume/CV</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="profile"><SetupProfile /></TabsContent>
          <TabsContent value="social"><SetupSocialLinks /></TabsContent>
          <TabsContent value="projects"><SetupProjects /></TabsContent>
          <TabsContent value="skills"><SetupSkills /></TabsContent>
          <TabsContent value="education"><SetupEducation /></TabsContent>
          <TabsContent value="childhood"><SetupChildhood /></TabsContent>
          <TabsContent value="aspirations"><SetupAspirations /></TabsContent>
          <TabsContent value="contact"><SetupContact /></TabsContent>
          <TabsContent value="resume"><SetupResume /></TabsContent>
          <TabsContent value="images"><SetupImages /></TabsContent>
          <TabsContent value="theme"><SetupTheme /></TabsContent>
          <TabsContent value="messages"><SetupMessages /></TabsContent>
        </Tabs>
      </main>

      {/* Unsaved changes dialog */}
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingLeave) pendingLeave();
                setHasUnsavedChanges(false);
              }}
            >
              Leave anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Setup;

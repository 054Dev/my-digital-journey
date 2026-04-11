import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LogOut, Settings } from "lucide-react";
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
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
            <Button variant="outline" size="sm" onClick={signOut}>
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
        </Tabs>
      </main>
    </div>
  );
};

export default Setup;

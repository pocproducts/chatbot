"use client";

import { Users, Plus, Key, Pencil, Trash2, ShieldCheck, ShieldAlert, Globe, Server, Check } from "lucide-react";
import React, { useState } from "react";
import { useProfiles, Profile } from "@/hooks/use-profiles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ProfilesSettingsPage() {
  const {
    profiles,
    addProfile,
    updateProfileName,
    deleteProfile,
    setProfileAuth,
  } = useProfiles();

  // Create Profile Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>(["arca.gob.ar"]);

  // Edit Profile Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingName, setEditingName] = useState("");

  // Setup Auth Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authProfile, setAuthProfile] = useState<Profile | null>(null);
  const [cuitInput, setCuitInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error("Por favor, ingrese un nombre válido");
      return;
    }
    const added = addProfile(newName.trim(), selectedDomains);
    toast.success(`Perfil "${added.name}" creado con éxito`);
    setNewName("");
    setSelectedDomains(["arca.gob.ar"]);
    setIsCreateOpen(false);
  };

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingName.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }
    updateProfileName(editingId, editingName.trim());
    toast.success("Nombre de perfil actualizado");
    setIsEditOpen(false);
  };

  const handleSetupAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cuitInput.trim() || cuitInput.length !== 11) {
      toast.error("Ingrese un CUIT válido de 11 dígitos");
      return;
    }
    if (!passwordInput.trim()) {
      toast.error("Ingrese la clave fiscal");
      return;
    }

    setIsAuthenticating(true);
    setTimeout(() => {
      if (authProfile) {
        setProfileAuth(authProfile.id, true);
        toast.success(`Autenticación exitosa para ${authProfile.name}`);
      }
      setIsAuthenticating(false);
      setIsAuthOpen(false);
      setCuitInput("");
      setPasswordInput("");
    }, 1500);
  };

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  return (
    <div className="flex flex-1 flex-col h-full bg-background/50">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border/40 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">Profiles</h1>
            <p className="text-sm text-muted-foreground">Manage execution profiles and cookies for your agents.</p>
          </div>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-1.5 rounded-xl">
          <Plus className="h-4 w-4" />
          <span>New Profile</span>
        </Button>
      </div>

      {/* Main content table */}
      <div className="flex-1 p-6">
        <div className="rounded-xl border border-border/50 bg-background/50 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/30 text-muted-foreground">
              <tr>
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Profile ID</th>
                <th className="px-5 py-3.5 font-medium">Cookies / Domains Stored</th>
                <th className="px-5 py-3.5 font-medium">Auth Status</th>
                <th className="px-5 py-3.5 font-medium">Created Day</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {profiles.map((p) => (
                <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-foreground flex items-center gap-2">
                      {p.name}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          setEditingId(p.id);
                          setEditingName(p.name);
                          setIsEditOpen(true);
                        }}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {p.cookiesDomains.length > 0 ? (
                        p.cookiesDomains.map((dom) => (
                          <Badge key={dom} variant="outline" className="flex items-center gap-1 py-0.5 px-2 font-mono text-[10px]">
                            <Globe className="h-2.5 w-2.5" />
                            {dom}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground/60 italic">No domains stored</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {p.isAuthenticated ? (
                      <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 py-0.5 px-2 flex items-center gap-1.5 w-fit font-medium text-xs">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Authenticated
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 py-0.5 px-2 flex items-center gap-1.5 w-fit font-medium text-xs">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        Required Setup
                      </Badge>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">{p.createdAt}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-lg text-xs flex items-center gap-1"
                        onClick={() => {
                          setAuthProfile(p);
                          setIsAuthOpen(true);
                        }}
                      >
                        <Key className="h-3 w-3" />
                        <span>Setup Auth</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          deleteProfile(p.id);
                          toast.success(`Perfil eliminado`);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {profiles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground/60 italic">
                    Sin perfiles de ejecución creados. Agregue uno nuevo para comenzar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE PROFILE DIALOG */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleCreateProfile}>
            <DialogHeader>
              <DialogTitle>Create Execution Profile</DialogTitle>
              <DialogDescription>
                Configure credentials and stored cookies for ARCA and provincial systems.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Profile Name</label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Principal Taxpayer S.A."
                  className="rounded-xl border-border/60"
                  autoFocus
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Pre-loaded Cookie Domains</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {["arca.gob.ar", "rentascordoba.gob.ar", "afip.gob.ar", "muni-cba.gov.ar"].map((domain) => {
                    const selected = selectedDomains.includes(domain);
                    return (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => toggleDomain(domain)}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition-all ${
                          selected
                            ? "border-primary/50 bg-primary/5 text-primary font-medium"
                            : "border-border/60 hover:bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        <span>{domain}</span>
                        {selected && <Check className="h-3.5 w-3.5 stroke-[3px]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <DialogFooter className="mt-3">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT PROFILE NAME DIALOG */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-sm">
          <form onSubmit={handleEditProfile}>
            <DialogHeader>
              <DialogTitle>Edit Profile Name</DialogTitle>
              <DialogDescription>Change the visual label representing this profile.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                placeholder="Profile Name"
                className="rounded-xl"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* SETUP AUTH DIALOG */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleSetupAuth}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Setup Authentication
              </DialogTitle>
              <DialogDescription>
                Simulate credential storage to automatically handle ARCA and Rentas login.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Taxpayer CUIT (11 digits)</label>
                <Input
                  value={cuitInput}
                  onChange={(e) => setCuitInput(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="20389727785"
                  className="rounded-xl font-mono"
                  disabled={isAuthenticating}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Clave Fiscal / Password</label>
                <Input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="rounded-xl"
                  disabled={isAuthenticating}
                />
              </div>
            </div>
            <DialogFooter className="mt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAuthOpen(false);
                  setCuitInput("");
                  setPasswordInput("");
                }}
                className="rounded-xl"
                disabled={isAuthenticating}
              >
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl" disabled={isAuthenticating}>
                {isAuthenticating ? "Simulating Login..." : "Authenticate"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import MotorcycleIdentifier from "./motorcycle-identifier";
import Image from "next/image";
import fotoamigos from '../../../public/amigosclub.jpg';

export default function MembersPage() {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="container max-w-4xl py-16 md:py-24 text-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container max-w-4xl py-16 md:py-24">
        <div className="text-center">
            <Image src={fotoamigos} width={800} height={400} alt="Motos estacionadas" className="mx-auto rounded-lg mb-8" data-ai-hint="motorcycles parked" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            Área Exclusiva para Membros
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Por favor, faça login para acessar os recursos exclusivos para membros.
          </p>
          <Button onClick={signInWithGoogle} className="mt-8" size="lg">
            <LogIn className="mr-2 h-5 w-5" />
            Fazer Login com Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Bem-vindo, {user.displayName}!
        </h1>
        <p className="mt-3 text-muted-foreground">
          Estamos felizes em tê-lo aqui. Use a ferramenta abaixo para identificar sua motocicleta.
        </p>
      </div>
      <MotorcycleIdentifier />
    </div>
  );
}

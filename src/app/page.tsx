import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';
import BlogPostCard from '@/components/blog-post-card';
import { ArrowRight, Bike, Users, Wrench } from 'lucide-react';
import fotoamigos from '../../public/amigosclub.jpg';
import motoclubheader from '../../public/fotoheader.jpg';

export default function Home() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Seção Hero */}
      <section className="relative h-[70vh] min-h-[500px] w-full">
        <Image
          src={motoclubheader}
          alt="Um grupo de motocicletas em uma estrada cênica"
          data-ai-hint="motorcycles scenic road"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl font-headline">
          MotoClube RO
          </h1>
          <p className="mt-4 max-w-[800px] text-lg md:text-xl text-neutral-200">
            A comunidade definitiva para entusiastas de motocicletas. Compartilhe suas aventuras, conecte-se com outros pilotos e mergulhe no mundo das duas rodas.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/blog">
              Explore o Blog <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Seção de Funcionalidades */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Bike className="h-12 w-12 text-primary mb-4"/>
              <h3 className="text-2xl font-bold font-headline mb-2">Identifique sua Moto</h3>
              <p className="text-muted-foreground">Faça upload de uma foto e nossa IA identificará o modelo, marca e ano da sua motocicleta.</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-primary mb-4"/>
              <h3 className="text-2xl font-bold font-headline mb-2">Comunidade de Membros</h3>
              <p className="text-muted-foreground">Junte-se ao nosso clube para ter acesso a conteúdos exclusivos e eventos.</p>
            </div>
            <div className="flex flex-col items-center">
              <Wrench className="h-12 w-12 text-primary mb-4"/>
              <h3 className="text-2xl font-bold font-headline mb-2">Dicas e Notícias</h3>
              <p className="text-muted-foreground">Fique por dentro das últimas notícias, guias de manutenção e histórias de viagens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Postagens Recentes */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-center">
            Aventuras Recentes
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-center text-muted-foreground md:text-lg">
            Acompanhe nossos últimos passeios, eventos e histórias da estrada.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Seção Sobre Nós */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Mais que um Clube, Somos uma Família
            </h2>
            <p className="text-muted-foreground md:text-lg">
             O MotoClube RO não é apenas sobre motocicletas; é sobre o vínculo que compartilhamos. Somos um grupo diversificado de pilotos unidos pelo amor pela estrada aberta, aventura e o rugido inconfundível de um motor. De passeios de fim de semana a eventos de caridade, pilotamos juntos e nos apoiamos.
            </p>
            <Button asChild variant="link" className="text-accent p-0 h-auto">
              <Link href="#">
                Saiba Mais Sobre Nós <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl">
             <Image
                src={fotoamigos}
                alt="Membros do motoclube juntos"
                data-ai-hint="motorcycle club"
                fill
                className="object-cover"
             />
          </div>
        </div>
      </section>
    </div>
  );
}

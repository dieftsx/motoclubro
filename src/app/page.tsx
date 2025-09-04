import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';
import BlogPostCard from '@/components/blog-post-card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="A group of motorcycles on a scenic road"
          data-ai-hint="motorcycles scenic road"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Ride with Passion. Share the Journey.
          </h1>
          <p className="mt-4 max-w-[700px] text-lg md:text-xl text-neutral-200">
            Welcome to MotoBlog Central, the heart of our motorcycle community. Discover epic rides, event news, and connect with fellow enthusiasts.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/blog">
              Explore Blog Posts <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-center">
            Recent Adventures
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-center text-muted-foreground md:text-lg">
            Catch up on our latest rides, events, and stories from the road.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              More Than a Club, We're Family
            </h2>
            <p className="text-muted-foreground md:text-lg">
              MotoBlog Central isn't just about motorcycles; it's about the bond we share. We're a diverse group of riders united by our love for the open road, adventure, and the unmistakable roar of an engine. From weekend tours to charity events, we ride together and support each other.
            </p>
            <Button asChild variant="link" className="text-accent p-0 h-auto">
              <Link href="#">
                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl">
             <Image
                src="https://picsum.photos/800/600"
                alt="Motorcycle club members together"
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

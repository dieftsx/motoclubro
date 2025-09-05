import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts, getPostBySlug } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SocialShare from '@/components/social-share';
import { CalendarDays, UserCircle } from 'lucide-react';
import { formatAsUTCDate } from '@/lib/utils';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="relative h-[50vh] min-h-[300px] w-full">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
          data-ai-hint={post.category === 'Touring' ? 'motorcycle journey' : post.category === 'Events' ? 'motorcycle event' : post.category === 'News' ? 'motorcycle gear' : 'motorcycle workshop'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end p-4 md:p-8 lg:p-12 text-center">
            <div className="container">
                <Badge variant="secondary" className="bg-accent text-accent-foreground mb-2">
                    {post.category}
                </Badge>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl font-headline text-foreground">
                    {post.title}
                </h1>
            </div>
        </div>
      </header>
      
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                        <AvatarFallback><UserCircle /></AvatarFallback>
                    </Avatar>
                    <span>{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <time dateTime={post.date}>
                        {formatAsUTCDate(post.date)}
                    </time>
                </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none prose-h1:font-headline prose-h1:text-accent prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
                <p className="lead text-xl !text-muted-foreground mb-8 text-center">{post.description}</p>
                {post.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                </div>
            </div>
            
            <div className="mt-12 border-t pt-8 text-center">
                <h3 className="text-lg font-semibold mb-4">Compartilhe esta postagem</h3>
                <div className="flex justify-center">
                  <SocialShare post={{ title: post.title, slug: post.slug }} />
                </div>
            </div>
        </div>
      </div>
    </article>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={post.category === 'Touring' ? 'motorcycle journey' : post.category === 'Events' ? 'motorcycle event' : post.category === 'News' ? 'motorcycle gear' : 'motorcycle workshop'}
            />
            <Badge variant="secondary" className="absolute top-3 right-3 bg-accent text-accent-foreground">
              {post.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-4">
          <CardTitle className="text-xl font-bold font-headline leading-tight tracking-tight mb-2">
            {post.title}
          </CardTitle>
          <p className="flex-1 text-sm text-muted-foreground">{post.description}</p>
        </CardContent>
        <CardFooter className="flex items-center gap-3 p-4 pt-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-xs">
            <p className="font-semibold text-foreground">{post.author.name}</p>
            <p className="text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { Twitter, Facebook, Linkedin, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  post: {
    title: string;
    slug: string;
  };
}

export default function SocialShare({ post }: SocialShareProps) {
  const { toast } = useToast();
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.origin + `/blog/${post.slug}`);
  }, [post.slug]);

  const copyToClipboard = () => {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "You can now share the link.",
      });
    });
  };

  if (!url) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-md bg-muted animate-pulse"></div>
        <div className="h-10 w-10 rounded-md bg-muted animate-pulse"></div>
        <div className="h-10 w-10 rounded-md bg-muted animate-pulse"></div>
        <div className="h-10 w-10 rounded-md bg-muted animate-pulse"></div>
      </div>
    );
  }
  
  const text = `Check out this post: ${post.title}`;

  const socialLinks = [
    {
      name: 'Twitter',
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    },
    {
      name: 'Facebook',
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      Icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}`,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map(({ name, Icon, href }) => (
        <Button key={name} variant="outline" size="icon" asChild>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${name}`}>
            <Icon className="h-5 w-5" />
          </a>
        </Button>
      ))}
      <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy link">
        <Copy className="h-5 w-5" />
      </Button>
    </div>
  );
}

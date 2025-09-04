"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  generateBlogPostTitleAndDescription
} from "@/ai/flows/generate-blog-post-title-and-description";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, LoaderCircle } from "lucide-react";
import { getCategories } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  content: z.string().min(50, "Content must be at least 50 characters long."),
  category: z.string({ required_error: "Please select a category." }),
  tags: z.string().min(3, "Please add at least one tag."),
  imageUrl: z.string().url("Please enter a valid image URL."),
});

const aiFormSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters long."),
  keywords: z.string().min(3, "Please provide some keywords."),
});

const categories = getCategories().filter(c => c !== 'All');

export default function CreatePostForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: "",
      imageUrl: "",
    },
  });
  
  const aiForm = useForm<z.infer<typeof aiFormSchema>>({
    resolver: zodResolver(aiFormSchema),
    defaultValues: {
      topic: "",
      keywords: "",
    },
  });

  async function handleAiGenerate(values: z.infer<typeof aiFormSchema>) {
    setIsGenerating(true);
    try {
      const result = await generateBlogPostTitleAndDescription(values);
      form.setValue("title", result.title, { shouldValidate: true });
      form.setValue("description", result.description, { shouldValidate: true });
      toast({
        title: "Content Generated!",
        description: "The title and description have been filled in for you.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating content. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values);
    toast({
      title: "Post Created (Simulated)",
      description: "Check the console for the submitted data.",
    });
    form.reset();
    aiForm.reset();
  }

  return (
    <div className="space-y-8">
      <Card className="border-accent/50 border-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-accent" />
            <div>
              <CardTitle className="text-2xl font-headline">AI Content Generator</CardTitle>
              <CardDescription>Don't know what to write? Let AI help you.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...aiForm}>
            <form onSubmit={aiForm.handleSubmit(handleAiGenerate)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={aiForm.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Post Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., A ride through the Alps" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={aiForm.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., adventure, mountains, touring" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isGenerating} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isGenerating ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Title & Description
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Your amazing blog post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="A short, catchy description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Content</FormLabel>
                <FormControl>
                  <Textarea rows={10} placeholder="Write your full blog post here... " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="adventure, road trip, lifestyle" {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated tags.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://picsum.photos/1200/800" {...field} />
                </FormControl>
                <FormDescription>
                    This simulates an image upload. Please provide a URL to an image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90">Create Post</Button>
        </form>
      </Form>
    </div>
  );
}

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
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres."),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres."),
  content: z.string().min(50, "O conteúdo deve ter pelo menos 50 caracteres."),
  category: z.string({ required_error: "Por favor, selecione uma categoria." }),
  tags: z.string().min(3, "Por favor, adicione pelo menos uma tag."),
  imageUrl: z.string().url("Por favor, insira um URL de imagem válido."),
});

const aiFormSchema = z.object({
  topic: z.string().min(3, "O tópico deve ter pelo menos 3 caracteres."),
  keywords: z.string().min(3, "Por favor, forneça algumas palavras-chave."),
});

const categories = getCategories().filter(c => c !== 'Todos');

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
        title: "Conteúdo Gerado!",
        description: "O título e a descrição foram preenchidos para você.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Falha na Geração",
        description: "Houve um erro ao gerar o conteúdo. Por favor, tente novamente.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Formulário Enviado:", values);
    toast({
      title: "Post Criado (Simulado)",
      description: "Verifique o console para os dados enviados.",
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
              <CardTitle className="text-2xl font-headline">Gerador de Conteúdo com IA</CardTitle>
              <CardDescription>Não sabe o que escrever? Deixe a IA te ajudar.</CardDescription>
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
                      <FormLabel>Tópico da Postagem</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Um passeio pelos Alpes" {...field} />
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
                      <FormLabel>Palavras-chave</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: aventura, montanhas, turismo" {...field} />
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
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar Título e Descrição
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
                <FormLabel className="text-lg">Título</FormLabel>
                <FormControl>
                  <Input placeholder="O título incrível da sua postagem" {...field} />
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
                <FormLabel className="text-lg">Descrição</FormLabel>
                <FormControl>
                  <Textarea placeholder="Uma descrição curta e cativante" {...field} />
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
                <FormLabel className="text-lg">Conteúdo</FormLabel>
                <FormControl>
                  <Textarea rows={10} placeholder="Escreva sua postagem completa aqui..." {...field} />
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
                  <FormLabel className="text-lg">Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
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
                    <Input placeholder="aventura, viagem, estilo de vida" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tags separadas por vírgula.
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
                <FormLabel className="text-lg">URL da Imagem</FormLabel>
                <FormControl>
                  <Input placeholder="https://picsum.photos/1200/800" {...field} />
                </FormControl>
                <FormDescription>
                    Isso simula um upload de imagem. Por favor, forneça a URL de uma imagem.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90">Criar Postagem</Button>
        </form>
      </Form>
    </div>
  );
}

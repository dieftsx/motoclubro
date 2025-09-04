"use client";

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, Bike, Upload, X } from 'lucide-react';
import { identifyMotorcycle, IdentifyMotorcycleOutput } from '@/ai/flows/identify-motorcycle';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MotorcycleIdentifier() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [identification, setIdentification] = useState<IdentifyMotorcycleOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload an image smaller than 4MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        setImageData(dataUrl);
        setIdentification(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentifyClick = async () => {
    if (!imageData) {
      toast({
        variant: 'destructive',
        title: 'No image selected',
        description: 'Please upload an image of your motorcycle.',
      });
      return;
    }

    setIsIdentifying(true);
    setError(null);
    setIdentification(null);

    try {
      const result = await identifyMotorcycle({ photoDataUri: imageData });
      setIdentification(result);
    } catch (err) {
      console.error(err);
      setError('Failed to identify motorcycle. The AI model might be unavailable. Please try again later.');
      toast({
        variant: 'destructive',
        title: 'Identification Failed',
        description: 'There was an error identifying the motorcycle.',
      });
    } finally {
      setIsIdentifying(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageData(null);
    setIdentification(null);
    setError(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2">
          <Bike className="h-6 w-6" />
          Identificador de Motocicleta por IA
        </CardTitle>
        <CardDescription>
          Faça o upload de uma foto da sua moto e nossa IA tentará identificar a marca, o modelo e o ano.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            id="motorcycle-upload"
          />
          <label
            htmlFor="motorcycle-upload"
            className="cursor-pointer"
          >
            {!imagePreview && (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center hover:bg-muted/50 transition-colors">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <span className="font-semibold text-foreground">Clique para fazer upload de uma imagem</span>
                    <span className="text-sm text-muted-foreground">PNG, JPG, ou WEBP (Max 4MB)</span>
                </div>
            )}
          </label>
        </div>

        {imagePreview && (
          <div className="relative w-full max-w-lg mx-auto">
            <Image
              src={imagePreview}
              alt="Pré-visualização da motocicleta"
              width={800}
              height={600}
              className="rounded-lg object-contain"
            />
            <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 rounded-full"
                onClick={handleRemoveImage}
            >
                <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex justify-center">
            <Button
                onClick={handleIdentifyClick}
                disabled={!imageData || isIdentifying}
                size="lg"
            >
                {isIdentifying ? (
                <>
                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                    Identificando...
                </>
                ) : (
                'Identificar Motocicleta'
                )}
            </Button>
        </div>

        {error && (
            <Alert variant="destructive">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {identification && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Resultados da Identificação</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col space-y-1.5">
                <p className="text-sm font-medium text-muted-foreground">Marca</p>
                <p className="text-lg font-semibold">{identification.make}</p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <p className="text-sm font-medium text-muted-foreground">Modelo</p>
                <p className="text-lg font-semibold">{identification.model}</p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <p className="text-sm font-medium text-muted-foreground">Ano</p>
                <p className="text-lg font-semibold">{identification.year}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

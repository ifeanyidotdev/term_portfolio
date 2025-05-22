
"use client";

import type React from 'react';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { rewriteBio, type RewriteBioInput } from '@/ai/flows/bio-rewriter';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  text: z.string().min(50, { message: "Bio text must be at least 50 characters." }).max(2000),
  tone: z.string().optional(),
  industryStandards: z.string().optional(),
});

type BioRewriterFormValues = z.infer<typeof formSchema>;

const tones = ["Professional", "Casual", "Formal", "Friendly", "Technical", "Creative"];

const BioRewriterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rewrittenText, setRewrittenText] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, control, formState: { errors } } = useForm<BioRewriterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "Experienced software engineer with a passion for developing innovative solutions. Proficient in full-stack development, with a focus on creating scalable and user-friendly applications. Proven ability to lead projects and collaborate effectively within agile teams to deliver high-quality software.",
      tone: "Professional",
      industryStandards: "Standard tech industry practices",
    }
  });

  const onSubmit: SubmitHandler<BioRewriterFormValues> = async (data) => {
    setIsLoading(true);
    setRewrittenText(null);
    try {
      const inputData: RewriteBioInput = {
        text: data.text,
        tone: data.tone || undefined,
        industryStandards: data.industryStandards || undefined,
      };
      const result = await rewriteBio(inputData);
      setRewrittenText(result.rewrittenText);
      toast({
        title: "Bio Rewritten!",
        description: "Your bio has been successfully rewritten by AI.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error rewriting bio:", error);
      setRewrittenText("Error: Could not rewrite bio. Please try again.");
      toast({
        title: "Error",
        description: "Failed to rewrite bio. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-primary">
          <Wand2 size={24} className="mr-2" />
          AI Bio/Cover Letter Rewriter
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Input your current bio or cover letter, select a tone and specify industry standards (optional), then let AI enhance it for you.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="bioText" className="block text-sm font-medium text-foreground mb-1">Your Text (Bio/Cover Letter)</Label>
            <Textarea
              id="bioText"
              {...register("text")}
              rows={6}
              className="bg-input border-border focus:ring-accent"
              placeholder="Paste your bio or cover letter here..."
            />
            {errors.text && <p className="text-sm text-destructive mt-1">{errors.text.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tone" className="block text-sm font-medium text-foreground mb-1">Desired Tone</Label>
               <Select defaultValue="Professional" onValueChange={(value) => control._fields.tone = { name: 'tone', value } as any}>
                <SelectTrigger id="tone" className="w-full bg-input border-border focus:ring-accent">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industryStandards" className="block text-sm font-medium text-foreground mb-1">Industry Standards (Optional)</Label>
              <Input
                id="industryStandards"
                {...register("industryStandards")}
                className="bg-input border-border focus:ring-accent"
                placeholder="e.g., Tech, Marketing, Academia"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rewriting...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Rewrite with AI
              </>
            )}
          </Button>
        </CardFooter>
      </form>

      {rewrittenText && (
        <CardContent>
          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Rewritten Text:</h3>
          <div className="p-4 bg-input rounded-md whitespace-pre-wrap text-muted-foreground">
            {rewrittenText}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default BioRewriterForm;


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
import { CardContent, CardFooter } from '@/components/ui/card'; // Only need CardContent and CardFooter for structure
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
    <div className="mt-2 p-1 bg-card/30 rounded-md"> {/* Removed Card, added slight background and rounding */}
      <div className="px-4 pt-3"> {/* Mimic CardHeader padding */}
        <h2 className="flex items-center text-lg md:text-xl text-primary font-semibold"> {/* Adjusted title size */}
          <Wand2 size={20} className="mr-2" /> {/* Adjusted icon size */}
          AI Bio/Cover Letter Rewriter
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground mt-1 mb-3"> {/* Adjusted description size */}
          Input your current bio or cover letter, select a tone and specify industry standards (optional), then let AI enhance it for you.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4 !pt-0"> {/* Adjusted spacing and removed CardContent default top padding */}
          <div>
            <Label htmlFor="bioText" className="block text-xs font-medium text-foreground mb-1">Your Text (Bio/Cover Letter)</Label>
            <Textarea
              id="bioText"
              {...register("text")}
              rows={5} /* Reduced rows */
              className="bg-input border-border focus:ring-accent text-sm" /* Ensured text-sm for consistency */
              placeholder="Paste your bio or cover letter here..."
            />
            {errors.text && <p className="text-xs text-destructive mt-1">{errors.text.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3"> {/* Reduced gap */}
            <div>
              <Label htmlFor="tone" className="block text-xs font-medium text-foreground mb-1">Desired Tone</Label>
               <Select defaultValue="Professional" onValueChange={(value) => control._fields.tone = { name: 'tone', value } as any}>
                <SelectTrigger id="tone" className="w-full bg-input border-border focus:ring-accent text-xs h-9"> {/* Adjusted size */}
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent className="text-xs"> {/* Ensure dropdown items are also small */}
                  {tones.map(t => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industryStandards" className="block text-xs font-medium text-foreground mb-1">Industry Standards (Optional)</Label>
              <Input
                id="industryStandards"
                {...register("industryStandards")}
                className="bg-input border-border focus:ring-accent text-xs h-9" /* Adjusted size */
                placeholder="e.g., Tech, Marketing, Academia"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end !pt-0"> {/* Removed CardFooter default top padding */}
          <Button type="submit" disabled={isLoading} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs"> {/* Adjusted size */}
            {isLoading ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> {/* Adjusted icon size */}
                Rewriting...
              </>
            ) : (
              <>
                <Wand2 className="mr-1.5 h-3.5 w-3.5" /> {/* Adjusted icon size */}
                Rewrite with AI
              </>
            )}
          </Button>
        </CardFooter>
      </form>

      {rewrittenText && (
        <CardContent className="!pt-2"> {/* Adjusted padding */}
          <h3 className="text-sm md:text-base font-semibold text-foreground mt-3 mb-1.5">Rewritten Text:</h3> {/* Adjusted sizes */}
          <div className="p-3 bg-input rounded-md whitespace-pre-wrap text-muted-foreground text-xs md:text-sm max-h-60 overflow-y-auto"> {/* Added max-height and scroll */}
            {rewrittenText}
          </div>
        </CardContent>
      )}
    </div>
  );
};

export default BioRewriterForm;

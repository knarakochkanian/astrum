"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2 } from 'lucide-react';
import { suggestDestinations, type SuggestDestinationsInput, type SuggestDestinationsOutput } from '@/ai/flows/travel-suggestions';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  preferences: z.string().min(10, { message: "Please describe your travel preferences in at least 10 characters." }).max(500),
});

type FormData = z.infer<typeof formSchema>;

export function AiTravelForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestDestinationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferences: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setSuggestions(null);
    setError(null);
    try {
      const result = await suggestDestinations(data as SuggestDestinationsInput);
      setSuggestions(result);
      toast({
        title: "Suggestions Ready!",
        description: "We've found some travel ideas for you.",
      });
    } catch (e) {
      console.error("AI suggestion error:", e);
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(`Failed to get suggestions: ${errorMessage}`);
      toast({
        title: "Error",
        description: `Could not fetch suggestions. ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Wand2 className="mr-2 h-6 w-6 text-accent" />
          AI Travel Planner
        </CardTitle>
        <CardDescription>
          Describe your ideal trip, and let our AI find the perfect destinations for you!
          Try things like "sunny beach vacation for a family with young kids" or " adventurous solo trip in the mountains".
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="preferences" className="text-lg">Your Travel Preferences</FormLabel>
                  <FormControl>
                    <Textarea
                      id="preferences"
                      placeholder="e.g., Relaxing beach vacation, cultural city exploration, adventurous mountain hiking..."
                      rows={4}
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full" variant="accent">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Suggestions...
                </>
              ) : (
                "Find My Dream Trip"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive" className="m-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions && suggestions.destinations.length > 0 && (
        <div className="p-6 border-t">
          <h3 className="font-headline text-xl mb-4">Here are some ideas for you:</h3>
          <ul className="list-disc list-inside space-y-2">
            {suggestions.destinations.map((dest, index) => (
              <li key={index} className="text-foreground hover:text-primary transition-colors">{dest}</li>
            ))}
          </ul>
        </div>
      )}
      {suggestions && suggestions.destinations.length === 0 && (
         <div className="p-6 border-t">
            <p>No specific suggestions found for your criteria. Try being more general or specific!</p>
         </div>
      )}
    </Card>
  );
}

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  label?: string;
}

interface SuggestedTag {
  tag: string;
}

export function TagsInput({ value = [], onChange, label }: TagsInputProps) {
  const [input, setInput] = useState("");
  
  const { data: suggestedTags } = useQuery<SuggestedTag[]>({
    queryKey: ['suggested-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_suggested_tags');
      if (error) throw error;
      return data || [];
    }
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault();
      if (!value.includes(input.toLowerCase())) {
        onChange([...value, input.toLowerCase()]);
      }
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const addSuggestedTag = (tag: string) => {
    if (!value.includes(tag)) {
      onChange([...value, tag]);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map(tag => (
          <Badge key={tag} variant="secondary" className="gap-1">
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <Input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter to add tags"
      />
      {suggestedTags && suggestedTags.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-muted-foreground mb-1">Suggested tags:</p>
          <div className="flex flex-wrap gap-1">
            {suggestedTags
              .filter(tag => !value.includes(tag.tag))
              .map(tag => (
                <Badge
                  key={tag.tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => addSuggestedTag(tag.tag)}
                >
                  {tag.tag}
                </Badge>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: number;
}

interface MultiSelectProps {
  options: Option[];
  selected: number[];
  onChange: (selected: number[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "اختر المراحل",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: number) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: number) => {
    onChange(selected.filter((v) => v !== value));
  };

  const selectedOptions = options.filter((opt) => selected.includes(opt.value));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          aria-expanded={open}
          className="w-full flex-wrap justify-start  border border-neutral-300 p-2"
        >
          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedOptions.map((opt) => (
                <span
                  key={opt.value}
                  className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-muted text-muted-foreground border"
                >
                  {opt.label}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(opt.value);
                    }}
                  />
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          {/* <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" /> */}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="ابحث عن مرحلة..." />
          <CommandEmpty>لا يوجد نتائج.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <div
                  className={cn(
                    "flex items-center gap-2",
                    selected.includes(option.value) && "font-semibold"
                  )}
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      selected.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<Props> = ({ value = "", onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const formatted = format(date, "yyyy-MM-dd");
    setInputValue(formatted);
    onChange(formatted);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const parsedDate = inputValue ? new Date(inputValue) : undefined;
  const isValidDate =
    parsedDate instanceof Date && !isNaN(parsedDate.getTime());

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="YYYY-MM-DD"
        className="flex-1"
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-10 p-0", !isValidDate && "text-muted-foreground")}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={isValidDate ? parsedDate : undefined}
            onSelect={handleDateSelect}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;

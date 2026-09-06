import type { ThemePreference } from '@/entities/preferences';
import { useTheme } from '@/entities/preferences';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

interface ThemeOption {
  value: ThemePreference;
  label: string;
}

const themeOptions: readonly ThemeOption[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <section aria-labelledby="appearance-heading" className="flex flex-col gap-3">
      <h2 id="appearance-heading" className="text-lg font-semibold">
        Appearance
      </h2>

      <div className="flex items-center justify-between gap-6 py-3">
        <label htmlFor="theme" className="text-sm font-medium">
          Theme
        </label>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger id="theme" className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {themeOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}

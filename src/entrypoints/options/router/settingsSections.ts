import type { OptionsSection } from '../ui/OptionsLayout';

export const settingsSections = [
  { id: 'general', title: 'General', to: '/' },
] as const satisfies readonly OptionsSection[];

import type { SVGProps } from 'react';

import type { ProviderId } from '../model/provider';
import type { Icon } from './provider-icons';
import { GeminiIcon } from './provider-icons';

interface ProviderIconProps extends SVGProps<SVGSVGElement> {
  providerId: ProviderId;
}

const PROVIDER_ICON_BY_ID: Record<ProviderId, Icon> = {
  gemini: GeminiIcon,
};

export function ProviderIcon({ providerId, ...props }: ProviderIconProps) {
  const Icon = PROVIDER_ICON_BY_ID[providerId];

  return <Icon {...props} aria-hidden="true" data-provider={providerId} />;
}

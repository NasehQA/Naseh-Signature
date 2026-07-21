import { Trans } from '@lingui/react/macro';

import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';

import { Img, Link, Section, Text } from '../components';
import { useBranding } from '../providers/branding';

export type TemplateFooterProps = {
  isDocument?: boolean;
};

export const TemplateFooter = ({ isDocument = true }: TemplateFooterProps) => {
  const branding = useBranding();

  const nasehLogoUrl = new URL('/static/naseh.png', NEXT_PUBLIC_WEBAPP_URL()).toString();

  return (
    <Section>
      {/* Naseh platform brand — always pinned at the bottom of every email. */}
      <Section className="mt-6 text-center">
        <Img src={nasehLogoUrl} alt="Naseh" className="mx-auto h-12 w-auto rounded-lg" />
        <Text className="mb-0 mt-3 text-center text-xs text-slate-400">
          <Trans>Sent securely through Naseh · Compliance, simplified.</Trans>
        </Text>
      </Section>

      {/* Documenso attribution — kept verbatim (AGPL). */}
      {isDocument && !branding.brandingHidePoweredBy && (
        <Text className="my-4 text-center text-base text-slate-400">
          <Trans>
            This document was sent using{' '}
            <Link className="text-[#7AC455]" href="https://documen.so/mail-footer">
              Documenso
            </Link>
            .
          </Trans>
        </Text>
      )}

      {branding.brandingEnabled && branding.brandingCompanyDetails && (
        <Text className="my-8 text-center text-sm text-slate-400">
          {branding.brandingCompanyDetails.split('\n').map((line, idx) => {
            return (
              <>
                {idx > 0 && <br />}
                {line}
              </>
            );
          })}
        </Text>
      )}
    </Section>
  );
};

export default TemplateFooter;

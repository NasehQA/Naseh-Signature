import { Trans } from '@lingui/react/macro';

import { Link, Section, Text } from '../components';
import { useBranding } from '../providers/branding';

export type TemplateFooterProps = {
  isDocument?: boolean;
};

export const TemplateFooter = ({ isDocument = true }: TemplateFooterProps) => {
  const branding = useBranding();

  return (
    <Section>
      {/* Naseh platform brand — always pinned at the bottom of every email. */}
      <Section className="mt-6 text-center">
        <Text className="mb-0 text-center text-sm font-medium text-slate-500">
          <Trans>
            Powered by{' '}
            <Link className="font-semibold text-[#001639]" href="https://naseh.qa">
              Naseh
            </Link>
          </Trans>
        </Text>
      </Section>

      {/* Documenso attribution — kept verbatim + legible (AGPL). */}
      {isDocument && !branding.brandingHidePoweredBy && (
        <Text className="my-3 text-center text-xs text-slate-400">
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

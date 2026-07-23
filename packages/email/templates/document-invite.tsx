import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import type { RecipientRole } from '@prisma/client';
import { OrganisationType } from '@prisma/client';

import { RECIPIENT_ROLES_DESCRIPTION } from '@documenso/lib/constants/recipient-roles';

import { Body, Container, Head, Hr, Html, Img, Preview, Section, Text } from '../components';
import { useBranding } from '../providers/branding';
import { TemplateCustomMessageBody } from '../template-components/template-custom-message-body';
import type { TemplateDocumentInviteProps } from '../template-components/template-document-invite';
import { TemplateDocumentInvite } from '../template-components/template-document-invite';
import { TemplateFooter } from '../template-components/template-footer';

export type DocumentInviteEmailTemplateProps = Partial<TemplateDocumentInviteProps> & {
  customBody?: string;
  role: RecipientRole;
  selfSigner?: boolean;
  teamName?: string;
  teamEmail?: string;
  includeSenderDetails?: boolean;
  organisationType?: OrganisationType;
};

export const DocumentInviteEmailTemplate = ({
  inviterName = 'Lucas Smith',
  inviterEmail = 'lucas@documenso.com',
  documentName = 'Open Source Pledge.pdf',
  signDocumentLink = 'https://documenso.com',
  assetBaseUrl = 'http://localhost:3002',
  customBody,
  role,
  selfSigner = false,
  teamName = '',
  includeSenderDetails,
  organisationType,
}: DocumentInviteEmailTemplateProps) => {
  const { _ } = useLingui();
  const branding = useBranding();

  const action = _(RECIPIENT_ROLES_DESCRIPTION[role].actionVerb).toLowerCase();

  let previewText = msg`${inviterName} has invited you to ${action} ${documentName}`;

  if (organisationType === OrganisationType.ORGANISATION) {
    previewText = includeSenderDetails
      ? msg`${inviterName} on behalf of "${teamName}" has invited you to ${action} ${documentName}`
      : msg`${teamName} has invited you to ${action} ${documentName}`;
  }

  if (selfSigner) {
    previewText = msg`Please ${action} your document ${documentName}`;
  }

  const getAssetUrl = (path: string) => {
    return new URL(path, assetBaseUrl).toString();
  };

  return (
    <Html>
      {/* Lock light mode so Yahoo/Gmail dark mode can't invert the white card. */}
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{_(previewText)}</Preview>

      <Body className="mx-auto my-auto bg-[#EDEEF1] font-sans">
        <Section>
          <Container className="mx-auto mb-2 mt-8 max-w-xl rounded-lg border border-solid border-slate-200 border-s-4 border-s-[#B5A569] bg-white p-6">
            {/* Top logo = the issuing company's logo; falls back to the brand/Documenso logo.
                Explicit height= attributes so Yahoo (which ignores CSS height) doesn't blow
                the image up to its natural size. */}
            <Section className="mb-4">
              {branding.companyLogo ? (
                <Img src={branding.companyLogo} alt="Company Logo" height={40} className="h-10 max-w-40" />
              ) : branding.brandingEnabled && branding.brandingLogo ? (
                <Img src={branding.brandingLogo} alt="Branding Logo" height={24} className="h-6" />
              ) : (
                <Img
                  src={getAssetUrl('/static/logo.png')}
                  alt="Documenso Logo"
                  height={24}
                  className="h-6"
                />
              )}
            </Section>

            <Section>
              <TemplateDocumentInvite
                inviterName={inviterName}
                inviterEmail={inviterEmail}
                documentName={documentName}
                signDocumentLink={signDocumentLink}
                assetBaseUrl={assetBaseUrl}
                role={role}
                selfSigner={selfSigner}
                organisationType={organisationType}
                teamName={teamName}
                includeSenderDetails={includeSenderDetails}
              />
            </Section>
          </Container>

          {/* Only show a message block when the sender wrote a real custom message.
              The default "X has invited you to sign …" text just duplicates the
              heading above, so it (and the inviter's email) are omitted. */}
          {customBody ? (
            <Container className="mx-auto mt-6 max-w-xl">
              <Section>
                <Text className="mt-1 text-base text-slate-400">
                  <TemplateCustomMessageBody text={customBody} />
                </Text>
              </Section>
            </Container>
          ) : null}

          <Hr className="mx-auto mt-12 max-w-xl" />

          <Container className="mx-auto max-w-xl">
            <TemplateFooter />
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default DocumentInviteEmailTemplate;

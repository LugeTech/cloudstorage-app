export interface UserData {
  id: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  banned: boolean;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  hasImage: boolean;
  gender: string;
  birthday: string;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: string | null;
  primaryWeb3WalletId: string | null;
  lastSignInAt: number;
  externalId: string | null;
  username: string | null;
  firstName: string;
  lastName: string;
  publicMetadata: Record<string, any>;
  privateMetadata: Record<string, any>;
  unsafeMetadata: Record<string, any>;
  emailAddresses: Array<{
    id: string;
    emailAddress: string;
    verification: {
      status: string;
      strategy: string;
      externalVerificationRedirectURL: string | null;
      attempts: null;
      expireAt: number | null;
      nonce: null;
    };
    linkedTo: Array<{
      id: string;
      type: string;
    }>;
  }>;
  phoneNumbers: [];
  web3Wallets: [];
  externalAccounts: Array<{
    id: string;
    approvedScopes: string;
    emailAddress: string;
    username: string | null;
    publicMetadata: Record<string, any>;
    label: string | null;
    verification: {
      status: string;
      strategy: string;
      externalVerificationRedirectURL: string | null;
      attempts: null;
      expireAt: number;
      nonce: null;
    };
  }>;
  createOrganizationEnabled: boolean;
}

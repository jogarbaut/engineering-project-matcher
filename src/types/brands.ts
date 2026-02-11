declare const __brand: unique symbol;

export type Brand<T, TBrand extends string> = T & {
  readonly [__brand]: TBrand;
};

export type UserId = Brand<string, 'UserId'>;
export type TeamId = Brand<string, 'TeamId'>;
export type TeamMemberId = Brand<string, 'TeamMemberId'>;
export type LicenseId = Brand<string, 'LicenseId'>;
export type UserLicenseId = Brand<string, 'UserLicenseId'>;
export type ProjectId = Brand<string, 'ProjectId'>;
export type UserProjectId = Brand<string, 'UserProjectId'>;
export type RfpId = Brand<string, 'RfpId'>;
export type RfpMatchId = Brand<string, 'RfpMatchId'>;

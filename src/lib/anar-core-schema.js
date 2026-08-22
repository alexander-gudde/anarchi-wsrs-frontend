import { z } from "zod";

const TYPED_ID = /^[a-z][a-z0-9]{1,15}_[0-9a-f]{32}$/;
const SYMBOL = /^[a-z0-9][a-z0-9._:-]{0,127}$/;

export function typedId(prefix) {
  return z.string().regex(TYPED_ID).refine((value) => value.startsWith(`${prefix}_`), {
    message: `Expected an ${prefix}_ typed identifier`,
  });
}

export const CanonicalSymbol = z.string().min(1).max(128).regex(SYMBOL);
export const PositiveVersion = z.number().int().positive();
export const UnixTimestamp = z.number().positive();

export const IdentitySchema = z.object({
  identityId: typedId("idn"),
  identityKind: CanonicalSymbol,
  displayName: z.string().min(1),
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const PersonalAccountSchema = z.object({
  accountId: typedId("act"),
  identityId: typedId("idn"),
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const OrganizationSchema = z.object({
  organizationId: typedId("org"),
  canonicalName: z.string().min(1),
  status: CanonicalSymbol,
  hydrationVersion: PositiveVersion,
  createdAt: UnixTimestamp,
});

export const TenantSchema = z.object({
  tenantId: typedId("tnt"),
  organizationId: typedId("org"),
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const MembershipSchema = z.object({
  membershipId: typedId("mbr"),
  identityId: typedId("idn"),
  organizationId: typedId("org"),
  status: CanonicalSymbol,
  authorizationVersion: PositiveVersion,
  entitlementVersion: PositiveVersion,
  createdAt: UnixTimestamp,
});

export const VersionedDefinitionRefSchema = z.object({
  definitionId: z.string().regex(TYPED_ID),
  version: PositiveVersion,
});

export const RoleDefinitionSchema = z.object({
  roleDefinitionId: typedId("rol"),
  version: PositiveVersion,
  symbolicName: CanonicalSymbol,
  status: CanonicalSymbol,
  grants: z.array(CanonicalSymbol),
  prohibitions: z.array(CanonicalSymbol),
  createdAt: UnixTimestamp,
});

export const RoleAssignmentSchema = z.object({
  roleAssignmentId: typedId("ras"),
  membershipId: typedId("mbr"),
  roleDefinitionId: typedId("rol"),
  roleVersion: PositiveVersion,
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const EntitlementDefinitionSchema = z.object({
  entitlementDefinitionId: typedId("ent"),
  version: PositiveVersion,
  symbolicName: CanonicalSymbol,
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const EntitlementGrantSchema = z.object({
  entitlementGrantId: typedId("egr"),
  membershipId: typedId("mbr"),
  entitlementDefinitionId: typedId("ent"),
  entitlementVersion: PositiveVersion,
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const AdapterDefinitionSchema = z.object({
  adapterDefinitionId: typedId("adp"),
  symbolicName: CanonicalSymbol,
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const OperationDefinitionSchema = z.object({
  operationDefinitionId: typedId("opn"),
  adapterDefinitionId: typedId("adp"),
  symbolicName: CanonicalSymbol,
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const AdapterGrantBindingSchema = z.object({
  bindingId: typedId("bnd"),
  membershipId: typedId("mbr"),
  adapterDefinitionId: typedId("adp"),
  operationDefinitionId: typedId("opn"),
  entitlementDefinitionId: typedId("ent"),
  entitlementDefinitionVersion: PositiveVersion,
  resourceScopeJson: z.string().min(2),
  policyVersion: CanonicalSymbol,
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const SessionSchema = z.object({
  sessionId: typedId("ses"),
  identityId: typedId("idn"),
  accountId: typedId("act"),
  membershipId: typedId("mbr"),
  organizationId: typedId("org"),
  tenantId: typedId("tnt"),
  authorizationVersion: PositiveVersion,
  entitlementVersion: PositiveVersion,
  expiresAt: UnixTimestamp,
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const InvitationSchema = z.object({
  invitationId: typedId("inv"),
  organizationId: typedId("org"),
  tenantId: typedId("tnt"),
  roleRefs: z.array(VersionedDefinitionRefSchema),
  entitlementRefs: z.array(VersionedDefinitionRefSchema),
  expiresAt: UnixTimestamp,
  maximumUses: z.number().int().positive(),
  consumedUses: z.number().int().nonnegative(),
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const HydrationReferenceSchema = z.object({
  hydrationReferenceId: typedId("hyd"),
  organizationId: typedId("org"),
  kind: CanonicalSymbol,
  targetRef: z.string().min(1),
  version: CanonicalSymbol,
  status: CanonicalSymbol,
  createdAt: UnixTimestamp,
});

export const AuthorizedSubjectSchema = z.object({
  identityId: typedId("idn"),
  accountId: typedId("act"),
  organizationId: typedId("org"),
  tenantId: typedId("tnt"),
  sessionId: typedId("ses"),
  roleDefinitions: z.array(VersionedDefinitionRefSchema),
  entitlementDefinitions: z.array(VersionedDefinitionRefSchema),
  adapterBindings: z.array(AdapterGrantBindingSchema),
  authorizationVersion: PositiveVersion,
  entitlementVersion: PositiveVersion,
  expiresAt: UnixTimestamp,
  active: z.boolean(),
});

export const AnarCoreProfileProjectionSchema = z.object({
  identity: IdentitySchema,
  account: PersonalAccountSchema,
  organizations: z.array(z.object({
    organization: OrganizationSchema,
    tenant: TenantSchema,
    membership: MembershipSchema,
    roles: z.array(VersionedDefinitionRefSchema),
    entitlements: z.array(VersionedDefinitionRefSchema),
  })),
  activeSession: SessionSchema.nullable(),
});

export const ANAR_CORE_SCHEMA_VERSION = "anar-core/0.1.0";

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WhoAmI
// ====================================================

export interface WhoAmI_whoami {
  __typename: "User";
  id: number;
  name: string | null;
}

export interface WhoAmI {
  whoami: WhoAmI_whoami | null;
}

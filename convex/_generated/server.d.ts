/* eslint-disable */
/**
 * Generated server utilities stub.
 */
export {
  query,
  mutation,
  action,
  internalQuery,
  internalMutation,
  internalAction,
  httpAction,
} from "convex/server";

import { GenericQueryCtx, GenericMutationCtx, GenericActionCtx, GenericDatabaseReader, GenericDatabaseWriter } from "convex/server";
import type { DataModel } from "./dataModel.js";

export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
export type ActionCtx = GenericActionCtx<DataModel>;
export type DatabaseReader = GenericDatabaseReader<DataModel>;
export type DatabaseWriter = GenericDatabaseWriter<DataModel>;

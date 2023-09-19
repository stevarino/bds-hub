import * as selectors from './selectors.js';


type UnionToIntersection<U> = 
  (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never

/** A variable, a constant, or a set of operations */
export type OperationReference = string|number|Operation;

export type Operation = (
  VariableReference | BinaryOperation | Random |
  { and: OperationReference[] } |
  { or: OperationReference[] } |
  { not: OperationReference } |
  { is_null: OperationReference } |
  { not_null: OperationReference } |
  { player_has_item: selectors.SuperSelector } |
  { player_has_tag: string } |
  { npc_has_tag: string } |
  { if: OperationReference, then: OperationReference, else: OperationReference}
);

export type SuperOperation = Partial<UnionToIntersection<Operation>>;

export type VariableReference = {
  variable: string, 
  value?: OperationReference
}

/** Evaluates a variable as true if not equal to 0 */
export type BinaryOperation = {
  value: OperationReference,
} & (
  {greater_than: OperationReference} |
  {less_than: OperationReference} |
  {equals: OperationReference} |
  {strict_equals: OperationReference} |
  {not_equals: OperationReference} |
  {strict_not_equals: OperationReference} |
  {add: OperationReference} |
  {subtract: OperationReference} |
  {multiply: OperationReference} |
  {divide: OperationReference} |
  {modulo: OperationReference}
)

export type Random = {
  random: {
    /** default 0 */
    min?: OperationReference,
    max: OperationReference,
    /** default 1 */
    step?: number,
  }
}

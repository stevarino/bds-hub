import * as selectors from './selectors.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/** A variable, a constant, or a set of operations */
export type OperationReference = string | number | Operation;

export type Operation =
  | VariableReference
  | BinaryOperation
  | Random
  | {and: OperationReference[]}
  | {or: OperationReference[]}
  | {not: OperationReference}
  | {isNull: OperationReference}
  | {isNotNull: OperationReference}
  | {playerHasItem: selectors.SuperSelector}
  | {playerHasTag: string}
  | {playerIsFlying: boolean}
  | {playerIsGliding: boolean}
  | {playerIsJumping: boolean}
  | {npcHasTag: string}
  | {
      if: OperationReference;
      then: OperationReference;
      else: OperationReference;
    };

export type SuperOperation = Partial<UnionToIntersection<Operation>>;

export type VariableReference = {
  variable: string;
  value?: OperationReference;
};

/** Evaluates a variable as true if not equal to 0 */
export type BinaryOperation = {
  value: OperationReference;
} & (
  | {greaterThan: OperationReference}
  | {lessThan: OperationReference}
  | {softEquals: OperationReference}
  | {equals: OperationReference}
  | {notSoftEquals: OperationReference}
  | {notEquals: OperationReference}
  | {add: OperationReference}
  | {subtract: OperationReference}
  | {multiply: OperationReference}
  | {divide: OperationReference}
  | {modulo: OperationReference}
);

export type Random = {
  random: {
    /** default 0 */
    min?: OperationReference;
    max: OperationReference;
    /** default 1 */
    step?: number;
  };
};

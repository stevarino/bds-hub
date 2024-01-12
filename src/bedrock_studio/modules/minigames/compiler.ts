/**
 * compiler.ts - compiles minigame statements into Javascript code
 */

import {ExpressionTuple, StatementList} from './types.js';
import {Expressions} from './expressions.js';

export class CompilerErrors extends Error {
  messages: [message: string, path: string[]][] = [];
  constructor() {
    super();
  }

  toString() {
    const parts: string[] = [];
    for (const [msg, path] of this.messages) {
      parts.push(`[${path.join(' / ')}] ${msg}`);
    }
    return `Errors during compilation:\n\n${parts.join('\n\n')}`;
  }

  nest(pathPart: string) {
    for (const [, path] of this.messages) {
      path.unshift(pathPart);
    }
  }

  push(message: string, path?: string[]) {
    this.messages.push([message, path ?? []]);
  }

  merge(other: CompilerErrors) {
    for (const msg of other.messages) {
      this.messages.push(msg);
    }
  }

  hasErrors() {
    return this.messages.length > 0;
  }
}

export function compileStatementList(statements: StatementList) {
  const expressions = [];
  const errors = new CompilerErrors();
  for (const [j, expr] of statements.entries()) {
    if (Array.isArray(expr) && typeof expr[0] === 'string') {
      expressions.push(compileExpression(expr));
    } else {
      const error = `Invalid expression in statement list: ${expr}`;
      errors.push(error, [String(j)]);
    }
  }
  if (errors.hasErrors()) {
    throw errors;
  }
  return expressions.join(';');
}

export function compileExpression(_expr: ExpressionTuple) {
  const exprId = _expr[0];
  const args = _expr.slice(1);
  const errors = new CompilerErrors();
  const compiledArgs: string[] = [];
  for (const [i, arg] of args.entries()) {
    try {
      switch (typeof arg) {
        case 'string':
        case 'number':
        case 'boolean':
          compiledArgs.push(JSON.stringify(arg));
          break;
        case 'undefined':
          compiledArgs.push('undefined');
          break;
        case 'object':
          if (Array.isArray(arg)) {
            // Nested expression or statement list
            if (typeof arg[0] === 'string') {
              compiledArgs.push(compileExpression(arg as ExpressionTuple));
            } else if (arg.length === 0) {
              // is an empty statement list - no-op
            } else if (typeof arg[0][0] === 'string') {
              compiledArgs.push(compileStatementList(arg as StatementList));
            }
          } else {
            // object such as Vec3
            compiledArgs.push(JSON.stringify(arg));
          }
          break;
        default:
          throw new Error(
            `Parse error - unrecognized type "${typeof arg}": (${arg})`,
          );
      }
    } catch (err) {
      if (err instanceof CompilerErrors) {
        err.nest(String(i));
        errors.merge(err);
      } else {
        errors.push(String(err), [String(i)]);
      }
    }
  }
  const expression = Expressions[exprId];
  if (expression === undefined) {
    errors.push(`Expression not found: ${exprId}`);
  }

  if (errors.hasErrors()) {
    errors.nest(exprId);
    throw errors;
  }
  return expression!.toJavascript(compiledArgs);
}

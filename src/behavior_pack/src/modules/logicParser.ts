/**
 * operations.ts - Math and logic operations with variable support
 */
import * as mc from "@minecraft/server";

import { DataNamespace } from "../lib/tag_map.js";
import { script  } from '../script.js';
import * as types from "../types/logic.js";
export * as types from '../types/logic.js';

export class Parser {
  constructor(
    public player: mc.Player,
    public globalNS: DataNamespace,
    public playerNS: DataNamespace,
    public npc?: mc.Entity,
    public npcNS?: DataNamespace,
  ) {}

  parseLogic(op: string|number|undefined|types.SuperOperation): number|boolean|undefined {
    if (typeof op === 'number') return op;
    if (typeof op === 'string') return this.getValue(op);
    if (op === undefined) return undefined;
    if (op.variable !== undefined) {
      let value = this.getValue(op.variable);
      if (op.value !== undefined) {
        value = this.parseLogic(op.value);
        this.setValue(op.variable, value);
      }
      return value;
    }
    if (op.and !== undefined) {
      for (const subOp of op.and) {
        const value = this.parseLogic(subOp);
        if (value === undefined || value === 0 || value === false) {
          return value;
        }
      }
      return true;
    }
    if (op.or !== undefined) {
      for (const subOp of op.or) {
        const value = this.parseLogic(subOp);
        if (value === undefined) return undefined;
        if (value === true || (typeof value === 'number' && value !== 0)) {
          return value;
        }
      }
      return false;
    }
    if (op.not !== undefined) {
      const value = this.parseLogic(op.not);
      if (value === undefined) return undefined;
      if (value === 0 || value === false) return true;
      return false;
    }
    if (op.is_null !== undefined) {
      const value = this.parseLogic(op.is_null);
      if (value === undefined) return true;
      return false;
    }
    if (op.not_null !== undefined) {
      const value = this.parseLogic(op.not_null);
      if (value === undefined) return false;
      return true;
    }
    /** value exists on variable (already handled) and binary ops */
    if (op.value !== undefined) {
      const value = this.parseLogic(op.value);
      if (value === undefined) return undefined;
      if (op.greater_than !== undefined) {
        const other = this.parseLogic(op.greater_than);
        if (other === undefined) return undefined;
        return value > other;
      }
      if (op.less_than !== undefined) {
        const other = this.parseLogic(op.less_than);
        if (other === undefined) return undefined;
        return value > other;
      }
      if (op.equals !== undefined) {
        const other = this.parseLogic(op.equals);
        if (other === undefined) return undefined;
        return value == other;
      }
      if (op.not_equals !== undefined) {
        const other = this.parseLogic(op.not_equals);
        if (other === undefined) return undefined;
        return value != other;
      }
      if (op.strict_equals !== undefined) {
        const other = this.parseLogic(op.strict_equals);
        if (other === undefined) return undefined;
        return value === other;
      }
      if (op.strict_not_equals !== undefined) {
        const other = this.parseLogic(op.strict_not_equals);
        if (other === undefined) return undefined;
        return value !== other;
      }
      if (op.add !== undefined) {
        const other = this.parseLogic(op.add);
        if (other === undefined) return undefined;
        return Number(value) + Number(other);
      }
      if (op.subtract !== undefined) {
        const other = this.parseLogic(op.subtract);
        if (other === undefined) return undefined;
        return Number(value) - Number(other);
      }
      if (op.multiply !== undefined) {
        const other = this.parseLogic(op.multiply);
        if (other === undefined) return undefined;
        return Number(value) * Number(other);
      }
      if (op.divide !== undefined) {
        const other = this.parseLogic(op.divide);
        if (other === undefined) return undefined;
        return Number(value) / Number(other);
      }
      if (op.modulo !== undefined) {
        const other = this.parseLogic(op.modulo);
        if (other === undefined) return undefined;
        return Number(value) % Number(other);
      }
    }
    if (op.random !== undefined) {
      const max = this.parseLogic(op.random.max);
      const min = op.random.min === undefined ? 0 : this.parseLogic(op.random.min);
      const step = op.random.step === undefined ? 1 : this.parseLogic(op.random.step);
      if (max === undefined || min === undefined || step === undefined) {
        return undefined;
      }
      return Math.floor(
        Math.random() * (Number(max) - Number(min)) / Number(step)
      ) * Number(step) + Number(min);
    }
    if (op.if !== undefined) {
      const value = this.parseLogic(op.if);
      if (value) {
        return this.parseLogic(op.then)
      } else {
        return this.parseLogic(op.else);
      }
    }
    if (op.player_has_tag !== undefined) {
      return this.player.hasTag(op.player_has_tag);
    }
    if (op.npc_has_tag !== undefined) {
      return this.npc?.hasTag(op.npc_has_tag);
    }
    if (op.player_has_item !== undefined) {

    }
  }

  getScope(scope: string) {
    switch (scope) {
      case 'player': return this.playerNS;
      case 'global': return this.globalNS;
      case 'npc': return this.npcNS;
    }
    console.error('Unrecognized variable scope: ', scope);
    return undefined;
  }

  /** Gets a variables value */
  getValue(variable: string): number|boolean|undefined {
    const varParts = script.variables[variable];
    if (varParts === undefined) {
      console.warn('Unrecognized variable name: ', variable);
      return undefined;
    }
    const [varScope, varType, varIndex] = varParts;
    return this.getScope(varScope)?.get(varType, varIndex);
  }

  /** Sets a variable value */
  setValue(variable: string, value: number|boolean|undefined) {
    if (value === undefined) return false;
    const varParts = script.variables[variable];
    if (varParts === undefined) {
      console.warn('Unrecognized variable name: ', variable);
      return false;
    }
    const [varScope, varType, varIndex] = varParts;
    const scope = this.getScope(varScope);
    if (scope === undefined) return false;
    scope.set(varType, varIndex, value);
    return true;
  }
}

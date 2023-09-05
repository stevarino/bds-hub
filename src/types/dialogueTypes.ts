import typia from "typia";

import * as types from '../behavior_pack/src/types/packTypes.js';
export * from '../behavior_pack/src/types/packTypes.js';

export interface ScriptFile {
  actors?: types.Actor[],
  scenes?: types.SavedScene[],
  items?: types.ItemUse[],
  chats?: types.Chat[],
  actions?: types.TransitionMap,
}

function addError(path: string, expected: string, value: any, result: typia.IValidation) {
  result.success = false;
  (result.errors as typia.IValidation.IError[]).push({ path, expected, value });
}

const TraderArgsValidator = typia.createValidateEquals<types.TraderArgs>();
export const ActionArgs: {[key: string]: (input: unknown) => typia.IValidation} = {
  Give: typia.createValidateEquals<types.GiveArgs>(),
  Trader: (input: unknown) => {
    const results = TraderArgsValidator(input);

    // https://github.com/samchon/typia/issues/804
    // Manual array length checking
    const trades = (input as types.TraderArgs).trades ?? [];
    if (trades.length === 0) {
      addError('$input.trades', 'A non-empty arrray', trades, results);
    }
    for (let i=0; i<trades.length; i++) {
      const trade = trades[i]!;
      if (Array.isArray(trade.gives) && trade.gives.length === 0) {
        addError(`$input.trades[${i}].gives`, 'A non-empty arrray', trade.gives, results);
      }
      if (Array.isArray(trade.accepts)) {
        if (trade.accepts.length === 0) {
          addError(`$input.trades[${i}].accepts`, 'A non-empty arrray', trade.accepts, results);
        }
        for (let j=0; j<trade.accepts.length; j++) {
          if (!Array.isArray(trade.accepts[j])) {
            addError(`$input.trades[${i}].accepts[${j}]`, 'A two-dimensional arrray', trade.accepts[j], results);
          } else if (trade.accepts[j]!.length === 0) {
            addError(`$input.trades[${i}].accepts[${j}]`, 'A non-empty arrray', trade.accepts[j], results);
          }
        }
      } 
    }
    return results;
  },
}

export const validateScript = typia.createValidateEquals<ScriptFile>();

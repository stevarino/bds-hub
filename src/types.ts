import typia from 'typia';

export * from './types_gen/configFile.js'
export * as Dialogue from './types_gen/dialogueTypes.js';
export { Obj } from './types_gen/dialogueTypes.js';
import { Obj } from './types_gen/dialogueTypes.js';
export * as Requests from './behavior_pack/src/types/requests.js';

export function failValidation(errors: Obj<string[]>) {
  console.error(`\nValidation failed: \n\n`);
  for (const [file, errs] of Object.entries(errors)) {
    console.error(`${file}\n - ${errs.join('\n - ')}\n\n`);
  }
  process.exit(1);
}

export function typiaErrorsFormat(result: typia.IValidation) {
  if (result.success === true) return [];
  return result.errors.map(e => {
    const expected = JSON.stringify(e.expected);
    const value = JSON.stringify(e.value);
    return `${e.path} : Expected (${expected}); Received (${value})`;
  });
}
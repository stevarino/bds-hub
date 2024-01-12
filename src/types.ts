import typia from 'typia';

export * from './types/common.js';
export * from './types/gen/config_file.js';
export * as Dialogue from './types/gen/dialogue_types.js';
export * as Requests from './types/requests.js';

export function failValidation(errors: {[key: string]: string[]}) {
  const errorStr: string[] = ['\nValidation failed: \n\n'];
  for (const [file, errs] of Object.entries(errors)) {
    const deduped = Array.from(new Set(errs)).sort();
    errorStr.push(`${file}\n - ${deduped.join('\n - ')}\n\n`);
  }
  throw new Error(errorStr.join(''));
}

export function typiaErrorsFormat(result: typia.IValidation) {
  if (result.success === true) return [];
  return result.errors.map(e => {
    const expected = JSON.stringify(e.expected);
    const value = JSON.stringify(e.value);
    return `${e.path} : Expected (${expected}); Received (${value})`;
  });
}

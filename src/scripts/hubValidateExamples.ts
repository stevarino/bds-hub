import * as lib from './lib.js';
import * as path from 'path';
import { parseScriptFiles } from './hubPack.js';
import { PackData } from './pack_lib/pack_data.js';


async function validate() {
  const configPath = path.join(lib.root, 'bds_hub.example.yaml');
  const scriptPath = path.join(lib.root, 'script.example.yaml');
  const config = lib.readConfig(configPath);
  config.script_files = [scriptPath];
  await parseScriptFiles(config, new PackData());
  console.info('\n\n+------------------------------+');
  console.info('|  Example Configs Validated!  |');
  console.info('+------------------------------+\n');
}

validate();

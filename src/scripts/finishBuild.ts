/**
 * Copies files during build.
 */

import *  as path from 'path';
// very unsure what is going on here - maybe https://github.com/microsoft/TypeScript/issues/2719 ?
import {default as ts} from 'typescript';
import * as fs from 'fs';

import * as lib from './lib.js';

const ActionsFunction = 'defineActions';

async function writeActionList() {
  lib.updateConstantsFile(path.join(lib.root, 'dist/scripts/buildArtifacts.js'), {
    actionList: await getActionList(),
  });
}

/**
 * Parses behavoir-pack ts files, extracting registered actions.
 *
 * https://ts-ast-viewer.com/
 */
async function getActionList() {
  const files = [
    ...await lib.getFiles(path.join(lib.root, 'src/bedrock_studio/modules')),
    ...await lib.getFiles(path.join(lib.root, 'src/lib')),
  ];
  const actions: string[] = [];
  for (const filename of files) {
    const sourceFile = ts.createSourceFile(
      filename,
      fs.readFileSync(filename).toString(),
      ts.ScriptTarget.ES2020,
    );
    const exprs = getChildNodesByType(
      sourceFile,
      ts.SyntaxKind.ExpressionStatement,
    );
    const calls = getChildNodesByType(exprs, ts.SyntaxKind.CallExpression);
    for (const call of calls) {
      const parts = getChildren(call);
      if ((parts[0] as ts.Identifier)?.escapedText !== ActionsFunction)
        continue;
      const objs = parts.filter(
        n => n.kind === ts.SyntaxKind.ObjectLiteralExpression,
      );
      for (const prop of getChildren(objs)) {
        if (
          prop.kind !== ts.SyntaxKind.ShorthandPropertyAssignment &&
          prop.kind !== ts.SyntaxKind.PropertyAssignment
        )
          continue;
        const id = getChildren(prop)[0];
        if (id?.kind !== ts.SyntaxKind.Identifier) continue;
        actions.push((id as ts.Identifier).escapedText.toString());
      }
    }
  }
  return actions;
}

function getChildNodesByType(node: ts.Node | ts.Node[], type: ts.SyntaxKind) {
  return getChildren(node).filter(child => child.kind === type);
}

function getChildren(node: ts.Node | ts.Node[]) {
  const nodes: ts.Node[] = [];
  
  if (!Array.isArray(node)) node = [node];
  for (const n of node) {
    ts.forEachChild(n, child => {
      nodes.push(child);
    });
  }
  return nodes;
}

function validateConfigs() {}

// copyStatic();
writeActionList().catch(lib.showErrorTraceback);
validateConfigs();

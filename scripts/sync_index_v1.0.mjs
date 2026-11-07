#!/usr/bin/env node
/**
 * sync_index_v1.0.mjs — 由版本化主檔產生 Vercel 根頁部署拷貝。
 * 唔好直接改 index.html；改 icon_maker_v1.0.html 後再執行本檔。
 */

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const VERSION = 'v1.0';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_NAME = 'icon_maker_v1.0.html';
const OUTPUT_NAME = 'index.html';
const MARKER = '<!-- GENERATED from icon_maker_v1.0.html (v1.0) — do not edit directly -->';

function render(source) {
  const doctype = '<!doctype html>';
  if (!source.startsWith(doctype)) {
    throw new Error(`${SOURCE_NAME} 缺 ${doctype} 檔頭，停止產生 ${OUTPUT_NAME}`);
  }
  return source.replace(doctype, `${doctype}\n${MARKER}`);
}

const expected = render(readFileSync(path.join(ROOT, SOURCE_NAME), 'utf8'));
const outputPath = path.join(ROOT, OUTPUT_NAME);

if (process.argv.includes('--check')) {
  let actual = '';
  try {
    actual = readFileSync(outputPath, 'utf8');
  } catch {
    console.error(`✗ 缺 ${OUTPUT_NAME}；請執行 node scripts/sync_index_v1.0.mjs`);
    process.exit(1);
  }
  if (actual !== expected) {
    console.error(`✗ ${OUTPUT_NAME} 與 ${SOURCE_NAME} 不同步；請重新執行 sync`);
    process.exit(1);
  }
  console.log(`✓ ${OUTPUT_NAME} 與 ${SOURCE_NAME} 同步（${VERSION}）`);
} else {
  writeFileSync(outputPath, expected);
  console.log(`✓ 已由 ${SOURCE_NAME} 產生 ${OUTPUT_NAME}（${VERSION}）`);
}

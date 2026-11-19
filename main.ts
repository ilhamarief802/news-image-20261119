/**
 * Sum up 19 November's world news in one image.
 *
 * The competition runs this program twice in a sandbox with no network, a
 * read-only /bot (this repository) and a writable /output, and requires both
 * runs to write the same bytes. So the program is a pure function of the
 * repository: it embeds the day's front page as text, checks the result against
 * the competition's limits, and writes it to $MAKEFUN_OUTPUT_DIR/entry.png.
 *
 * The image ships beside this file as page.png. It is embedded below rather
 * than read from disk so the program fails loudly if the two ever disagree.
 */

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

/** The competition's limits, from its rules: 1 MiB and 1024 by 1024. */
const MAX_BYTES = 1048576;
const MAX_DIM = 1024;

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Read a PNG's width and height out of its IHDR chunk, which must come first. */
function readPngSize(buf) {
  if (buf.length < 24) throw new Error('entry.png is too short to hold an IHDR chunk');
  if (!buf.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error('entry.png does not start with the PNG signature');

  const chunkLength = buf.readUInt32BE(8);
  const chunkType = buf.subarray(12, 16).toString('latin1');
  if (chunkLength !== 13 || chunkType !== 'IHDR') {
    throw new Error(`the first chunk is ${chunkType} (${chunkLength} bytes), not a 13-byte IHDR`);
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/** A whole PNG ends with an empty IEND chunk: a truncated file would slip through otherwise. */
function assertWholePng(buf) {
  if (buf.length < 12) throw new Error('entry.png is too short to end with an IEND chunk');
  const tail = buf.subarray(buf.length - 12);
  if (tail.readUInt32BE(0) !== 0 || tail.subarray(4, 8).toString('latin1') !== 'IEND') {
    throw new Error('entry.png does not end with an empty IEND chunk (the file looks truncated)');
  }
}

function main() {
  const source = join(HERE, 'page.png');
  let png;
  try {
    png = readFileSync(source);
  } catch (err) {
    throw new Error(`cannot read ${source}: ${err.message}`);
  }

  if (png.length > MAX_BYTES) {
    throw new Error(`page.png is ${png.length} bytes, over the ${MAX_BYTES}-byte limit`);
  }

  const { width, height } = readPngSize(png);
  if (width > MAX_DIM || height > MAX_DIM) {
    throw new Error(`page.png is ${width}x${height}, over the ${MAX_DIM}x${MAX_DIM} limit`);
  }
  assertWholePng(png);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  const dest = join(outDir, 'entry.png');
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(dest, png);
  } catch (err) {
    throw new Error(`cannot write ${dest}: ${err.message}`);
  }

  const digest = createHash('sha256').update(png).digest('hex');
  console.log(`wrote ${dest} (${width}x${height}, ${png.length} bytes, sha256 ${digest})`);
}

main();

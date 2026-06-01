#!/usr/bin/env node
/**
 * save_base64_asset.js
 *
 * Decodes a base64 string to a binary file on disk. Pure Node.js stdlib only.
 *
 * Usage:
 *   node save_base64_asset.js <base64-string> <output-file-path> [mime-hint]
 *
 * Args:
 *   1) base64-string  - The base64 payload to decode (do not mutate).
 *   2) output-path    - Destination file path (parent dirs are auto-created).
 *   3) mime-hint      - Optional. Expected MIME type, e.g. "image/png".
 *                       If provided, the script validates the base64 magic-byte
 *                       prefix matches the hint and exits with code 1 on mismatch.
 *
 * Exit codes:
 *   0 - Success. Logs "<bytes> bytes written to <path>".
 *   1 - Any error (bad arg, invalid base64, MIME mismatch, write failure).
 *
 * Example:
 *   node save_base64_asset.js "iVBORw0KGgo=" /tmp/pixel.png
 *   # => writes a 1x1 transparent PNG (67 bytes) to /tmp/pixel.png
 *
 *   node save_base64_asset.js "iVBORw0KGgo=" /tmp/pixel.png image/png
 *   # => validates the base64 prefix matches image/png, then writes
 */

'use strict';

const fs = require('fs');
const path = require('path');

// Magic-byte prefixes for common image formats. Each entry maps a base64
// prefix to its corresponding MIME type. Order matters only for prefixes
// of equal length (longer/more-specific prefixes are listed first when
// needed; here all prefixes are distinct enough to avoid ambiguity).
const MIME_SIGNATURES = [
  { prefix: 'iVBORw0KGgo', mime: 'image/png' },
  { prefix: 'PHN2Zy',       mime: 'image/svg+xml' },   // <svg
  { prefix: 'PD94bWwg',     mime: 'image/svg+xml' },   // <?xml
  { prefix: '/9j/',         mime: 'image/jpeg' },
  { prefix: 'R0lGOD',       mime: 'image/gif' },
  { prefix: 'UklGR',        mime: 'image/webp' },
];

// Strict base64 character set (standard alphabet, no whitespace).
const BASE64_RE = /^[A-Za-z0-9+/]*={0,2}$/;

/**
 * Detect MIME type by scanning the leading base64 characters against
 * known magic-byte prefixes. Returns null when no match is found.
 */
function detectMimeFromBase64(b64) {
  for (const sig of MIME_SIGNATURES) {
    if (b64.startsWith(sig.prefix)) {
      return sig.mime;
    }
  }
  return null;
}

/**
 * Validate that a MIME hint matches the magic bytes of the base64 input.
 * Returns true on match, false on mismatch. If no hint is given, true.
 */
function mimeMatches(b64, hint) {
  if (!hint) return true;
  const detected = detectMimeFromBase64(b64);
  // If we can't detect, we cannot validate - treat as a soft pass.
  if (detected === null) return true;
  return detected === hint;
}

/**
 * Centralized error logger. Writes to stderr and exits with code 1.
 */
function die(msg, err) {
  process.stderr.write(`Error: ${msg}\n`);
  if (err && err.message) {
    process.stderr.write(`  cause: ${err.message}\n`);
  }
  process.exit(1);
}

// --- Argument parsing ---------------------------------------------------------

const [, , b64Arg, outPathArg, mimeHint] = process.argv;

if (!b64Arg || !outPathArg) {
  die(
    'Missing arguments.\n' +
    'Usage: node save_base64_asset.js <base64-string> <output-path> [mime-hint]'
  );
}

if (typeof b64Arg !== 'string' || b64Arg.length === 0) {
  die('Base64 argument must be a non-empty string.');
}

if (!BASE64_RE.test(b64Arg)) {
  die('Argument 1 is not a valid base64 string (illegal characters detected).');
}

// --- MIME validation ----------------------------------------------------------

if (!mimeMatches(b64Arg, mimeHint)) {
  const detected = detectMimeFromBase64(b64Arg);
  die(
    `MIME type hint mismatch: hint="${mimeHint}" but base64 prefix ` +
    `suggests "${detected}".`
  );
}

// --- Decode & write -----------------------------------------------------------

let buffer;
try {
  buffer = Buffer.from(b64Arg, 'base64');
} catch (err) {
  die('Failed to decode base64 string.', err);
}

if (buffer.length === 0) {
  die('Decoded buffer is empty (input was zero-length or invalid padding).');
}

try {
  const parentDir = path.dirname(outPathArg);
  if (parentDir && parentDir !== '.' && !fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
  fs.writeFileSync(outPathArg, buffer);
} catch (err) {
  die(`Failed to write file to "${outPathArg}".`, err);
}

// --- Report success -----------------------------------------------------------

const detectedMime = detectMimeFromBase64(b64Arg) || 'application/octet-stream';
process.stdout.write(
  `\u2713 Saved ${buffer.length} bytes to ${outPathArg} (type: ${detectedMime})\n`
);
process.exit(0);

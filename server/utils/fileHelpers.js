const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const BASE_DIR = path.resolve(__dirname, '..');
const UPLOAD_DIR = path.join(BASE_DIR, 'uploads');
const OUTPUT_DIR = path.join(BASE_DIR, 'output');
const UPLOAD_TTL_SECONDS = 60 * 60; // 1 hour

// Ensure directories exist
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

/**
 * Generate a storage-safe filename: uuid_timestamp.ext
 */
function filenameForStorage(originalFilename) {
  const ext = path.extname(originalFilename) || '.pdf';
  const uid = uuidv4().replace(/-/g, '');
  const ts = Math.floor(Date.now() / 1000);
  return `${uid}_${ts}${ext}`;
}

/**
 * Extract timestamp from storage filename (uuid_timestamp.ext)
 */
function parseTimestampFromStorage(filename) {
  try {
    const base = path.basename(filename);
    const nameNoExt = base.substring(0, base.lastIndexOf('.'));
    const parts = nameNoExt.split('_');
    const ts = parseInt(parts[parts.length - 1], 10);
    return isNaN(ts) ? null : ts;
  } catch {
    return null;
  }
}

/**
 * Delete an array of file/directory paths
 */
function cleanupPaths(paths) {
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) {
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
          fs.rmSync(p, { recursive: true, force: true });
        } else {
          fs.unlinkSync(p);
        }
      }
    } catch {
      // ignore
    }
  }
}

/**
 * Remove uploads older than UPLOAD_TTL_SECONDS
 */
function cleanupOldUploads() {
  const now = Math.floor(Date.now() / 1000);
  const removed = [];

  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else {
        let ts = parseTimestampFromStorage(entry.name);
        if (ts === null) {
          try {
            ts = Math.floor(fs.statSync(fullPath).mtimeMs / 1000);
          } catch {
            continue;
          }
        }
        if (now - ts > UPLOAD_TTL_SECONDS) {
          try {
            fs.unlinkSync(fullPath);
            removed.push(fullPath);
          } catch {
            // ignore
          }
        }
      }
    }
  }

  walkDir(UPLOAD_DIR);
  return removed;
}

/**
 * Find a file by storage name anywhere under UPLOAD_DIR
 */
function findUploadedFile(storageName) {
  const safeName = path.basename(storageName);

  function searchDir(dir) {
    if (!fs.existsSync(dir)) return null;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const result = searchDir(fullPath);
        if (result) return result;
      } else if (entry.name === safeName) {
        return fullPath;
      }
    }
    return null;
  }

  return searchDir(UPLOAD_DIR);
}

/**
 * Get a timestamped output filename
 */
function outputFilename(prefix, ext = '.pdf') {
  const now = new Date();
  const ts = now.toISOString().replace(/[-:T]/g, '').substring(0, 15).replace('.', '_');
  return `${prefix}_${ts}${ext}`;
}

module.exports = {
  BASE_DIR,
  UPLOAD_DIR,
  OUTPUT_DIR,
  UPLOAD_TTL_SECONDS,
  filenameForStorage,
  parseTimestampFromStorage,
  cleanupPaths,
  cleanupOldUploads,
  findUploadedFile,
  outputFilename,
};

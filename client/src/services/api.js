import axios from 'axios';

const API_BASE = '/api/pdf';

/**
 * Generic helper: POST FormData to an API endpoint and return the blob + metadata.
 */
async function postFormData(endpoint, formData) {
  const response = await axios.post(`${API_BASE}${endpoint}`, formData, {
    responseType: 'blob',
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const storageNames = response.headers['x-storage-names'] || '';
  const contentDisposition = response.headers['content-disposition'] || '';

  // Extract filename from Content-Disposition
  let filename = 'download';
  const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^;"']+)/i);
  if (match && match[1]) {
    filename = decodeURIComponent(match[1]);
  } else {
    const contentType = response.headers['content-type'] || '';
    if (contentType.includes('zip')) filename = 'result.zip';
    else if (contentType.includes('pdf')) filename = 'result.pdf';
  }

  return {
    blob: response.data,
    filename,
    storageNames: storageNames.split(',').filter(Boolean),
  };
}

/**
 * Delete an uploaded file by its storage name.
 */
async function deleteUploadedFile(storageName) {
  return axios.delete(`${API_BASE}/delete/${encodeURIComponent(storageName)}`);
}

// --- API functions for each tool ---

export async function mergePdfs(files) {
  const fd = new FormData();
  files.forEach((f) => fd.append('files', f));
  return postFormData('/merge', fd);
}

export async function splitPdf(file, ranges) {
  const fd = new FormData();
  fd.append('file', file);
  if (ranges) fd.append('ranges', ranges);
  return postFormData('/split', fd);
}

export async function compressPdf(file, level = 'ebook') {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('level', level);
  return postFormData('/compress', fd);
}

export async function rotatePdf(file, degrees) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('degrees', degrees);
  return postFormData('/rotate', fd);
}

export async function watermarkPdf(file, text) {
  const fd = new FormData();
  fd.append('file', file);
  if (text) fd.append('text', text);
  return postFormData('/watermark', fd);
}

export async function paginatePdf(file) {
  const fd = new FormData();
  fd.append('file', file);
  return postFormData('/paginate', fd);
}

export async function protectPdf(file, password) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('password', password);
  return postFormData('/protect', fd);
}

export async function unlockPdf(file, password) {
  const fd = new FormData();
  fd.append('file', file);
  if (password) fd.append('password', password);
  return postFormData('/unlock', fd);
}

export async function imagesToPdf(images) {
  const fd = new FormData();
  images.forEach((img) => fd.append('images', img));
  return postFormData('/images-to-pdf', fd);
}

export async function pdfToImages(file) {
  const fd = new FormData();
  fd.append('file', file);
  return postFormData('/pdf-to-images', fd);
}

export async function reorderPdf(file, order) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('order', order);
  return postFormData('/reorder', fd);
}

export async function extractFromPdf(file) {
  const fd = new FormData();
  fd.append('file', file);
  return postFormData('/extract', fd);
}

export async function pdfToWord(file) {
  const fd = new FormData();
  fd.append('file', file);
  return postFormData('/pdf-to-word', fd);
}

export async function editMetadata(file, meta) {
  const fd = new FormData();
  fd.append('file', file);
  if (meta.title) fd.append('title', meta.title);
  if (meta.author) fd.append('author', meta.author);
  if (meta.subject) fd.append('subject', meta.subject);
  if (meta.keywords) fd.append('keywords', meta.keywords);
  return postFormData('/metadata', fd);
}

export { deleteUploadedFile };

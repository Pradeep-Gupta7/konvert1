# Konvert — PDF Toolkit (MERN Stack)

Konvert is a premium, self-hosted PDF toolkit inspired by iLovePDF, built with a modern MERN-style architecture (Node.js/Express backend + React frontend). It offers common PDF tasks locally in your browser with a sleek dark-mode interface.

> ⚠️ **Respect IP & Branding**: This project features original UI and code. Do not copy third-party branding, assets, or proprietary workflows. Use Konvert's own name and design.

## Features (MERN)
- **Merge PDF**: Combine multiple PDFs into one document.
- **Split PDF**: Extract specific pages by range (e.g., `1-3,5,8-10`).
- **Compress PDF**: Reduce file size by re-optimizing streams.
- **Rotate PDF**: Rotate all pages by 90°, 180°, or 270°.
- **Watermark**: Add text watermarks to all pages.
- **Page Numbers**: Add page numbering to the bottom right.
- **Protect & Unlock**: Encrypt PDFs with passwords or remove existing protection.
- **Images → PDF**: Convert JPG, PNG, and more into a single PDF.
- **Reorder Pages**: Rearrange or delete pages via comma-separated index.
- **Extract Content**: Export text and page-by-page PDFs.
- **Metadata Editor**: Edit PDF properties like Title, Author, and Keywords.

## Quickstart

### 1. Backend
```bash
cd server
npm install
npm start
```
Starts on: http://localhost:5000

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Starts on: http://localhost:5173

## Notes
- **Local Processing**: All PDF processing happens locally on your server.
- **Security**: Files are stored temporarily in `uploads/` and `output/` with a 1-hour TTL cleanup.
- **Tech Stack**:
  - **Backend**: Express.js, `pdf-lib`, `sharp`, `multer`.
  - **Frontend**: React (Vite), Axios, Glassmorphism CSS.

## License
MIT

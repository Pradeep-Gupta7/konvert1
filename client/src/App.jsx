import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header      from './components/layout/Header';
import Footer      from './components/layout/Footer';
import Home        from './pages/Home';
import Reorder     from './pages/Reorder';
import Extract     from './pages/Extract';
import Metadata    from './pages/Metadata';
import PdfToImages from './pages/PdfToImages';
import PdfEditor   from './pages/PdfEditor';

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/reorder"       element={<Reorder />} />
          <Route path="/extract"       element={<Extract />} />
          <Route path="/metadata"      element={<Metadata />} />
          <Route path="/pdf-to-images" element={<PdfToImages />} />
          <Route path="/edit-pdf"      element={<PdfEditor />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

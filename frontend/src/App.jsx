import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Locations from "./pages/Locations";
import Brands from "./pages/Brands";
import MobileModels from "./pages/MobileModels";
import Series from "./pages/Series";
import SeriesColours from "./pages/SeriesColours";
import Products from "./pages/Products";
import Moulds from "./pages/Moulds";
import Materials from "./pages/Materials";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/locations" replace />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/mobile-models" element={<MobileModels />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series-colours" element={<SeriesColours />} />
        <Route path="/products" element={<Products />} />
        <Route path="/moulds" element={<Moulds />} />
        <Route path="/materials" element={<Materials />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
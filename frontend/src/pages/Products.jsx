import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import api from "../api/api";
import MasterPage from "../components/master/MasterPage";
import DataTable from "../components/master/DataTable";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [series, setSeries] = useState([]);

  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [seriesId, setSeriesId] = useState("");
  const [status, setStatus] = useState("Development");

  const loadProducts = () => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProducts();
    api.get("/brands").then((res) => setBrands(res.data));
    api.get("/mobile-models").then((res) => setModels(res.data));
    api.get("/series").then((res) => setSeries(res.data));
  }, []);

  const filteredModels = models.filter(
    (model) => !brandId || String(model.brand_id) === String(brandId)
  );

  const saveProduct = async () => {
    if (!brandId || !modelId || !seriesId) {
      alert("Please select Brand, Mobile Model and Series");
      return;
    }

    await api.post("/products", {
      brand_id: brandId,
      mobile_model_id: modelId,
      series_id: seriesId,
      status,
    });

    setOpen(false);
    setBrandId("");
    setModelId("");
    setSeriesId("");
    setStatus("Development");
    loadProducts();
  };

  return (
    <>
      <MasterPage
        title="Product Catalogue"
        subtitle="Manage finished cover product families and generated colour variants."
        buttonText="Add Product"
        onAdd={() => setOpen(true)}
      >
        <DataTable
          rowKey="id"
          rows={products}
          columns={[
            { field: "product_code", header: "Product Code" },
            { field: "description", header: "Product" },
            { field: "colours", header: "Colours" },
            { field: "variant_codes", header: "Variant Codes" },
            { field: "status", header: "Status" },
          ]}
        />
      </MasterPage>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Product</DialogTitle>

        <DialogContent>
          <TextField
            select
            fullWidth
            margin="normal"
            label="Brand"
            value={brandId}
            onChange={(e) => {
              setBrandId(e.target.value);
              setModelId("");
            }}
          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            margin="normal"
            label="Mobile Model"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
          >
            {filteredModels.map((model) => (
              <MenuItem key={model.id} value={model.id}>
                {model.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            margin="normal"
            label="Series"
            value={seriesId}
            onChange={(e) => setSeriesId(e.target.value)}
          >
            {series.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            margin="normal"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="Development">Development</MenuItem>
            <MenuItem value="Trial">Trial</MenuItem>
            <MenuItem value="Production">Production</MenuItem>
            <MenuItem value="Obsolete">Obsolete</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveProduct}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
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

export default function MobileModels() {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const [modelName, setModelName] = useState("");

  const loadModels = () => {
    api.get("/mobile-models")
      .then((res) => setModels(res.data))
      .catch((err) => console.log(err));
  };

  const loadBrands = () => {
    api.get("/brands")
      .then((res) => setBrands(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadModels();
    loadBrands();
  }, []);

  const saveModel = async () => {
    if (!brandId || !modelName.trim()) {
      alert("Please select brand and enter model name");
      return;
    }

    await api.post("/mobile-models", {
      brand_id: brandId,
      name: modelName.trim(),
    });

    setOpen(false);
    setBrandId("");
    setModelName("");
    loadModels();
  };

  return (
    <>
      <MasterPage
        title="Mobile Models"
        subtitle="Manage mobile phone models brand-wise."
        buttonText="Add Mobile Model"
        onAdd={() => setOpen(true)}
      >
        <DataTable
          rowKey="id"
          rows={models}
          columns={[
            { field: "brand_name", header: "Brand" },
            { field: "name", header: "Model Name" },
          ]}
        />
      </MasterPage>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Mobile Model</DialogTitle>

        <DialogContent>
          <TextField
            select
            fullWidth
            margin="normal"
            label="Brand"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            label="Model Name"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveModel}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
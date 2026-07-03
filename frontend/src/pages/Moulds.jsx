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

export default function Moulds() {
  const [moulds, setMoulds] = useState([]);
  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const [mouldCode, setMouldCode] = useState("");
  const [productId, setProductId] = useState("");
  const [cavities, setCavities] = useState("");
  const [status, setStatus] = useState("Development");

  const loadMoulds = () => {
    api.get("/moulds")
      .then((res) => setMoulds(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadMoulds();
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const saveMould = async () => {
    if (!mouldCode.trim() || !productId) {
      alert("Please enter mould code and select product");
      return;
    }

    await api.post("/moulds", {
      mould_code: mouldCode.trim(),
      product_id: productId,
      cavities,
      status,
    });

    setOpen(false);
    setMouldCode("");
    setProductId("");
    setCavities("");
    setStatus("Development");
    loadMoulds();
  };

  return (
    <>
      <MasterPage
        title="Moulds"
        subtitle="Manage moulds linked to product catalogue items."
        buttonText="Add Mould"
        onAdd={() => setOpen(true)}
      >
        <DataTable
          rowKey="id"
          rows={moulds}
          columns={[
            { field: "mould_code", header: "Mould Code" },
            { field: "product_description", header: "Product" },
            { field: "cavities", header: "Cavities" },
            { field: "status", header: "Status" },
          ]}
        />
      </MasterPage>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Mould</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Mould Code"
            value={mouldCode}
            onChange={(e) => setMouldCode(e.target.value)}
          />

          <TextField
            select
            fullWidth
            margin="normal"
            label="Product"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.product_code} - {product.description}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            label="Cavities"
            type="number"
            value={cavities}
            onChange={(e) => setCavities(e.target.value)}
          />

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
            <MenuItem value="Maintenance">Maintenance</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveMould}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
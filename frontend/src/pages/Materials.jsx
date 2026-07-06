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

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  const [categoryId, setCategoryId] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [grade, setGrade] = useState("");
  const [colour, setColour] = useState("");
  const [hardness, setHardness] = useState("");
  const [specificGravity, setSpecificGravity] = useState("");
  const [dryingTemp, setDryingTemp] = useState("");
  const [dryingTime, setDryingTime] = useState("");
  const [meltTempMin, setMeltTempMin] = useState("");
  const [meltTempMax, setMeltTempMax] = useState("");
  const [mouldTempMin, setMouldTempMin] = useState("");
  const [mouldTempMax, setMouldTempMax] = useState("");
  const [remarks, setRemarks] = useState("");

  const loadMaterials = () => {
    api.get("/materials")
      .then((res) => setMaterials(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadMaterials();
    api.get("/material-categories").then((res) => setCategories(res.data));
  }, []);

  const saveMaterial = async () => {
    if (!categoryId || !grade.trim()) {
      alert("Please select category and enter grade");
      return;
    }

    await api.post("/materials", {
      category_id: categoryId,
      supplier: manufacturer,
      grade,
      colour,
      hardness,
      specific_gravity: specificGravity,
      drying_temp: dryingTemp,
      drying_time: dryingTime,
      melt_temp_min: meltTempMin,
      melt_temp_max: meltTempMax,
      mould_temp_min: mouldTempMin,
      mould_temp_max: mouldTempMax,
      remarks,
    });

    setOpen(false);
    setCategoryId("");
    setManufacturer("");
    setGrade("");
    setColour("");
    setHardness("");
    setSpecificGravity("");
    setDryingTemp("");
    setDryingTime("");
    setMeltTempMin("");
    setMeltTempMax("");
    setMouldTempMin("");
    setMouldTempMax("");
    setRemarks("");
    loadMaterials();
  };

  return (
    <>
      <MasterPage
        title="Material Library"
        subtitle="One-time registration of raw materials and consumables."
        buttonText="Add Material"
        onAdd={() => setOpen(true)}
      >
        <DataTable
          rowKey="id"
          rows={materials}
          columns={[
            { field: "grade", header: "Grade" },
            { field: "category_name", header: "Family" },
            { field: "supplier", header: "Manufacturer" },
            { field: "hardness", header: "Hardness" },
            { field: "specific_gravity", header: "SG" },
            { field: "material_code", header: "ERP Code" },
          ]}
        />
      </MasterPage>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Material</DialogTitle>

        <DialogContent>
          <TextField
            select
            fullWidth
            margin="normal"
            label="Material Family"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField fullWidth margin="normal" label="Manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
          <TextField fullWidth margin="normal" label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
          <TextField fullWidth margin="normal" label="Colour / Form" value={colour} onChange={(e) => setColour(e.target.value)} />
          <TextField fullWidth margin="normal" label="Hardness" value={hardness} onChange={(e) => setHardness(e.target.value)} />
          <TextField fullWidth margin="normal" label="Specific Gravity" type="number" value={specificGravity} onChange={(e) => setSpecificGravity(e.target.value)} />

          <TextField fullWidth margin="normal" label="Drying Temp (°C)" type="number" value={dryingTemp} onChange={(e) => setDryingTemp(e.target.value)} />
          <TextField fullWidth margin="normal" label="Drying Time (hrs)" type="number" value={dryingTime} onChange={(e) => setDryingTime(e.target.value)} />
          <TextField fullWidth margin="normal" label="Melt Temp Min (°C)" type="number" value={meltTempMin} onChange={(e) => setMeltTempMin(e.target.value)} />
          <TextField fullWidth margin="normal" label="Melt Temp Max (°C)" type="number" value={meltTempMax} onChange={(e) => setMeltTempMax(e.target.value)} />
          <TextField fullWidth margin="normal" label="Mould Temp Min (°C)" type="number" value={mouldTempMin} onChange={(e) => setMouldTempMin(e.target.value)} />
          <TextField fullWidth margin="normal" label="Mould Temp Max (°C)" type="number" value={mouldTempMax} onChange={(e) => setMouldTempMax(e.target.value)} />

          <TextField fullWidth margin="normal" label="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveMaterial}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
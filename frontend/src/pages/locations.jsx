import { useEffect, useState } from "react";
import api from "../api/api";
import MasterPage from "../components/master/MasterPage";
import DataTable from "../components/master/DataTable";
import MasterFormDialog from "../components/master/MasterFormDialog";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);

  const loadLocations = () => {
    api.get("/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const saveLocation = async (name) => {
    const code = name
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .substring(0, 4);

    await api.post("/locations", {
      code,
      name,
      type: "Warehouse",
    });

    setOpen(false);
    loadLocations();
  };

  return (
    <>
      <MasterPage
        title="Locations"
        subtitle="Manage factory, warehouse and future stock locations."
        buttonText="Add Location"
        onAdd={() => setOpen(true)}
      >
        <DataTable
          rowKey="id"
          rows={locations}
          columns={[
            { field: "code", header: "Code" },
            { field: "name", header: "Location Name" },
            { field: "type", header: "Type" },
          ]}
        />
      </MasterPage>

      <MasterFormDialog
        open={open}
        title="Add Location"
        label="Location Name"
        onClose={() => setOpen(false)}
        onSave={saveLocation}
      />
    </>
  );
}
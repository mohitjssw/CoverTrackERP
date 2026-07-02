import { useEffect, useState } from "react";
import api from "../api/api";
import MasterPage from "../components/master/MasterPage";
import DataTable from "../components/master/DataTable";

export default function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    api.get("/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <MasterPage
      title="Locations"
      subtitle="Manage factory, warehouse and future stock locations."
      buttonText="Add Location"
    >
      <DataTable
        rowKey="code"
        rows={locations}
        columns={[
          { field: "code", header: "Code" },
          { field: "name", header: "Location Name" },
          { field: "type", header: "Type" },
        ]}
      />
    </MasterPage>
  );
}
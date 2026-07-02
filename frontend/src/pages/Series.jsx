import { useEffect, useState } from "react";
import api from "../api/api";
import MasterPage from "../components/master/MasterPage";
import DataTable from "../components/master/DataTable";

export default function Series() {
  const [series, setSeries] = useState([]);

  const loadSeries = () => {
    api.get("/series")
      .then((res) => setSeries(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadSeries();
  }, []);

  return (
    <MasterPage
      title="Series"
      subtitle="Manage phone cover series."
      buttonText="Add Series"
    >
      <DataTable
        rowKey="id"
        rows={series}
        columns={[
          { field: "code", header: "Code" },
          { field: "name", header: "Series Name" },
          { field: "category", header: "Category" },
        ]}
      />
    </MasterPage>
  );
}
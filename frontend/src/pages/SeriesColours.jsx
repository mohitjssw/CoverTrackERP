import { useEffect, useState } from "react";
import api from "../api/api";
import MasterPage from "../components/master/MasterPage";
import DataTable from "../components/master/DataTable";

export default function SeriesColours() {
  const [seriesColours, setSeriesColours] = useState([]);

  useEffect(() => {
    api.get("/series-colours")
      .then((res) => setSeriesColours(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <MasterPage
      title="Series Colours"
      subtitle="Manage colours available for each cover series."
      buttonText="Add Series Colour"
    >
      <DataTable
        rowKey="id"
        rows={seriesColours}
        columns={[
          { field: "series_name", header: "Series" },
          { field: "colour_name", header: "Colour" },
          { field: "colour_code", header: "Code" },
        ]}
      />
    </MasterPage>
  );
}
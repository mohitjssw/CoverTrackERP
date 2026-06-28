import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import api from "../api/api";
import MasterPage from "../components/common/MasterPage";

export default function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    api.get("/locations")
      .then((res) => {
  console.log("Locations from API:", res.data);
  setLocations(res.data);
})
      .catch((err) => console.log(err));
  }, []);

  return (
    <MasterPage
      title="Locations"
      subtitle="Manage factory, warehouse and future stock locations."
      buttonText="Add Location"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Code</b></TableCell>
            <TableCell><b>Location Name</b></TableCell>
            <TableCell><b>Type</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.code}>
              <TableCell>{location.code}</TableCell>
              <TableCell>{location.name}</TableCell>
              <TableCell>{location.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MasterPage>
  );
}
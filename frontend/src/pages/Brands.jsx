import { useEffect, useState } from "react";
import api from "../api/api";
import MasterPage from "../components/master/MasterPage";
import DataTable from "../components/master/DataTable";
import MasterFormDialog from "../components/master/MasterFormDialog";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);

  const loadBrands = () => {
    api.get("/brands")
      .then((res) => setBrands(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const saveBrand = async (name) => {
    await api.post("/brands", { name });
    setOpen(false);
    loadBrands();
  };

  return (
    <>
      <MasterPage
        title="Brands"
        subtitle="Manage mobile phone brands."
        buttonText="Add Brand"
        onAdd={() => setOpen(true)}
      >
        <DataTable
          rowKey="id"
          rows={brands}
          columns={[
            { field: "code", header: "Code" },
            { field: "name", header: "Brand Name" },
          ]}
        />
      </MasterPage>

      <MasterFormDialog
        open={open}
        title="Add Brand"
        label="Brand Name"
        onClose={() => setOpen(false)}
        onSave={saveBrand}
      />
    </>
  );
}
import { useEffect, useState } from "react";
import api from "../api/api";
import MasterPage from "../components/master/MasterPage";
import DataTable from "../components/master/DataTable";
import MasterFormDialog from "../components/master/MasterFormDialog";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);

  const [editingBrand, setEditingBrand] = useState(null);
  const [search, setSearch] = useState("");

  const loadBrands = () => {
    api
      .get("/brands")
      .then((res) => setBrands(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const saveBrand = async (name) => {
    if (editingBrand) {
      await api.put(`/brands/${editingBrand.id}`, {
        name,
      });
    } else {
      await api.post("/brands", {
        name,
      });
    }

    setOpen(false);
    setEditingBrand(null);
    loadBrands();
  };

  const deactivateBrand = async (row) => {
    if (!window.confirm(`Deactivate ${row.name}?`)) return;

    await api.delete(`/brands/${row.id}`);
    loadBrands();
  };

  const filteredBrands = brands.filter(
    (brand) =>
      brand.code.toLowerCase().includes(search.toLowerCase()) ||
      brand.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <MasterPage
        title="Brands"
        subtitle="Manage mobile phone brands."
        buttonText="Add Brand"
        search={search}
        onSearch={setSearch}
        onAdd={() => {
          setEditingBrand(null);
          setOpen(true);
        }}
      >
        <DataTable
          rowKey="id"
          rows={filteredBrands}
          columns={[
            {
              field: "code",
              header: "Code",
            },
            {
              field: "name",
              header: "Brand",
            },
          ]}
          onEdit={(row) => {
            setEditingBrand(row);
            setOpen(true);
          }}
          onDeactivate={deactivateBrand}
        />
      </MasterPage>

      <MasterFormDialog
        open={open}
        title={editingBrand ? "Edit Brand" : "Add Brand"}
        label="Brand Name"
        initialValue={editingBrand?.name || ""}
        onClose={() => {
          setOpen(false);
          setEditingBrand(null);
        }}
        onSave={saveBrand}
      />
    </>
  );
}
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function MasterFormDialog({
  open,
  title,
  label,
  initialValue = "",
  onClose,
  onSave,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open) {
      setValue(initialValue);
    }
  }, [open, initialValue]);

  const handleSave = () => {
    if (!value.trim()) {
      alert(`${label} is required`);
      return;
    }

    onSave(value.trim());
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="normal"
          label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function MasterPage({
  title,
  subtitle,
  buttonText = "Add",
  onAdd,
  children,
}) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {title}
          </Typography>
          <Typography color="text.secondary">{subtitle}</Typography>
        </Box>

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
  {buttonText}
</Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            size="small"
            placeholder={`Search ${title.toLowerCase()}...`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
}
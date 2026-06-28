import { Box, Drawer, List, ListItemButton, ListItemText, AppBar, Toolbar, Typography } from "@mui/material";

const drawerWidth = 260;

export default function AppLayout({ children }) {
  const menu = [
    "Dashboard",
    "Locations",
    "Customers",
    "Products",
    "Stock",
    "Production",
    "Packing",
    "Dispatch",
    "Reports",
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6">CoverTrack ERP</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "64px",
          },
        }}
      >
        <List>
          {menu.map((item) => (
            <ListItemButton key={item}>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
        {children}
      </Box>
    </Box>
  );
}
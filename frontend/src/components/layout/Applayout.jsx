import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 260;

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { title: "Dashboard", items: [{ label: "Home", path: "/" }] },
    {
      title: "Masters",
      items: [
        { label: "Locations", path: "/locations" },
        { label: "Brands", path: "/brands" },
        { label: "Mobile Models", path: "/mobile-models" },
        { label: "Series", path: "/series" },
        { label: "Series Colours", path: "/series-colours" },
        { label: "Customers", path: "/customers" },
        { label: "Machines", path: "/machines" },
        { label: "Moulds", path: "/moulds" },
      ],
    },
    {
      title: "Catalogue",
      items: [
        { label: "Product Catalogue", path: "/products" },
        { label: "Product BOM", path: "/bom" },
      ],
    },
    {
      title: "Inventory",
      items: [{ label: "Stock", path: "/stock" }],
    },
    {
      title: "Production",
      items: [
        { label: "Production Entry", path: "/production" },
        { label: "Packing", path: "/packing" },
      ],
    },
    {
      title: "Warehouse",
      items: [
        { label: "Transfers", path: "/transfers" },
        { label: "Dispatch", path: "/dispatch" },
      ],
    },
    {
      title: "Reports",
      items: [{ label: "Reports", path: "/reports" }],
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" fontWeight="bold">
            CoverTrack ERP
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "64px",
            height: "calc(100% - 64px)",
          },
        }}
      >
        <List>
          {menu.map((section) => (
            <Box key={section.title} sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  px: 2,
                  color: "gray",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {section.title}
              </Typography>

              {section.items.map((item) => {
                const active = location.pathname === item.path;

                return (
                  <ListItemButton
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    sx={{
                      mx: 1,
                      my: 0.3,
                      borderRadius: 1,
                      backgroundColor: active ? "#e3f2fd" : "transparent",
                      color: active ? "#1976d2" : "inherit",
                      "&:hover": {
                        backgroundColor: active ? "#e3f2fd" : "#f5f5f5",
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: active ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </Box>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px",
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
require("./database");

const express = require("express");
const cors = require("cors");

const locationRoutes = require("./routes/locations");

const brandRoutes = require("./routes/brands");

const mobileModelRoutes = require("./routes/mobileModels");

const seriesRoutes = require("./routes/series");

const seriesColourRoutes = require("./routes/seriesColours");

const packagingTypeRoutes = require("./routes/packagingTypes");

const productRoutes = require("./routes/products");

const mouldRoutes = require("./routes/moulds");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use("/api/locations", locationRoutes);

app.use("/api/brands", brandRoutes);

app.use("/api/mobile-models", mobileModelRoutes);

app.use("/api/series", seriesRoutes);

app.use("/api/series-colours", seriesColourRoutes);

app.use("/api/packaging-types", packagingTypeRoutes);

app.use("/api/products", productRoutes);

app.use("/api/moulds", mouldRoutes);


app.get("/", (req, res) => {
  res.json({
    app: "CoverTrack ERP API",
    status: "Running"
  });
});

app.listen(PORT, () => {
  console.log(`✅ CoverTrack ERP API running on http://localhost:${PORT}`);
});
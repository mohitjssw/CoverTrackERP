const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "covertrackerp.db"),
  (err) => {
    if (err) console.error(err.message);
    else console.log("✅ Connected to CoverTrack ERP database");
  }
);

db.serialize(() => {

  // ======================
  // Locations
  // ======================

  db.run(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      active INTEGER DEFAULT 1
    )
  `);

  db.run(`
    INSERT OR IGNORE INTO locations (code, name, type)
    VALUES
      ('FAC', 'Shahjahanpur Factory', 'Manufacturing'),
      ('GGN', 'Gurgaon Warehouse', 'Warehouse')
  `);
  db.run(`
  CREATE TABLE IF NOT EXISTS series (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    category TEXT,
    description TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  INSERT OR IGNORE INTO series (code, name, category, description)
  VALUES
    ('HEX', 'Caseology / Hexa', 'Rugged TPU', 'Rugged TPU cover with Black, Blue and Grey colours'),
    ('CND', 'MagSafe Design / Candy Case', 'Slim TPU', 'Plain TPU design with MagSafe-style symbol'),
    ('LTH', 'Leather Insert Groove Series', 'TPU + Leather Insert', 'TPU cover with groove for leather insert')
`);

db.run(`
  CREATE TABLE IF NOT EXISTS series_colours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    series_id INTEGER NOT NULL,
    colour_name TEXT NOT NULL,
    colour_code TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (series_id) REFERENCES series(id),
    UNIQUE(series_id, colour_name)
  )
`);

db.run(`
  INSERT OR IGNORE INTO series_colours (series_id, colour_name, colour_code)
  SELECT id, 'Black', 'BLK' FROM series WHERE code = 'HEX'
`);

db.run(`
  INSERT OR IGNORE INTO series_colours (series_id, colour_name, colour_code)
  SELECT id, 'Blue', 'BLU' FROM series WHERE code = 'HEX'
`);

db.run(`
  INSERT OR IGNORE INTO series_colours (series_id, colour_name, colour_code)
  SELECT id, 'Grey', 'GRY' FROM series WHERE code = 'HEX'
`);

db.run(`
  INSERT OR IGNORE INTO series_colours (series_id, colour_name, colour_code)
  SELECT id, 'Black', 'BLK' FROM series WHERE code = 'CND'
`);

db.run(`
  INSERT OR IGNORE INTO series_colours (series_id, colour_name, colour_code)
  SELECT id, 'Purple', 'PUR' FROM series WHERE code = 'CND'
`);

db.run(`
  INSERT OR IGNORE INTO series_colours (series_id, colour_name, colour_code)
  SELECT id, 'Blue', 'BLU' FROM series WHERE code = 'CND'
`);

db.run(`
  CREATE TABLE IF NOT EXISTS packaging_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  INSERT OR IGNORE INTO packaging_types (code, name)
  VALUES
    ('POLY', 'Single Poly Per Cover'),
    ('USP', 'Urban Shell Poly'),
    ('FSP', 'Fashion Case Poly'),
    ('PRM', 'Premium Poly')
`);

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_code TEXT UNIQUE,
    brand_id INTEGER NOT NULL,
    mobile_model_id INTEGER NOT NULL,
    series_id INTEGER NOT NULL,
    status TEXT DEFAULT 'Development',
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (brand_id) REFERENCES brands(id),
    FOREIGN KEY (mobile_model_id) REFERENCES mobile_models(id),
    FOREIGN KEY (series_id) REFERENCES series(id),
    UNIQUE(brand_id, mobile_model_id, series_id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS product_variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    series_colour_id INTEGER NOT NULL,
    variant_code TEXT UNIQUE,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (series_colour_id) REFERENCES series_colours(id),
    UNIQUE(product_id, series_colour_id)
  )
`);

  // ======================
  // Brands
  // ======================

  db.run(`
    CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    name TEXT UNIQUE NOT NULL,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
  `);

  db.run(`
    INSERT OR IGNORE INTO brands (code, name)
    VALUES
      ('APL', 'Apple'),
      ('SAM', 'Samsung'),
      ('VIV', 'Vivo'),
      ('OPP', 'Oppo'),
      ('REA', 'Realme'),
      ('ONE', 'OnePlus'),
      ('MOT', 'Motorola'),
      ('NOT', 'Nothing'),
      ('RED', 'Redmi')
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS mobile_models (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(id),
    UNIQUE(brand_id, name)
  )
`);

});

module.exports = db;
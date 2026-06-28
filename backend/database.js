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
});

module.exports = db;
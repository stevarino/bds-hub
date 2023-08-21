CREATE TABLE Locations (
  id INTEGER PRIMARY KEY,
  -- strings reference
  owner INTEGER,
  -- strings reference
  dimension INTEGER NOT NULL,
  x1 INTEGER NOT NULL,
  x2 INTEGER NOT NULL,
  z1 INTEGER NOT NULL,
  z2 INTEGER NOT NULL,
  y1 INTEGER,
  y2 INTEGER,
  name STRING NOT NULL,
  -- enum
  type INTEGER NOT NULL,
  -- enum
  color INTEGER NOT NULL,
  sort INTEGER DEFAULT 100,
  isPublic BOOLEAN
);

CREATE INDEX LocationX ON Locations (x1, x2);
CREATE INDEX LocationZ ON Locations (z1, z2);
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { location } from "./location";

export const locationLog = sqliteTable("locationLog-table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  startedAt: int().notNull(),
  endedAt: int().notNull(),
  description: text(),
  lat: real().notNull(),
  ling: real().notNull(),
  locationId: int().notNull().references(() => location.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),

});

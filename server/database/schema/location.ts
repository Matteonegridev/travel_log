import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";

import { user } from "./auth-schema";

export const location = sqliteTable("location-table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),

});

export const formSchema = createSelectSchema(location, {
  name: field => field.min(4, "Too Short!").max(100, "That's a bit excessive long"),
  description: field => field.min(5, "That's a bit too short for a description!").max(1000),
  lat: field => field.min(-90, "Must be between -90 and 90!").max(90, "Must be between -90 and 90!"),
  long: field => field.min(-180, "Must be between -180 and 180!").max(180, "Must be between -180 and 180!"),

}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

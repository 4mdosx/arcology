import { int, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export type User = typeof usersTable.$inferSelect
export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  active: integer().default(0),
  roomId: int().references(() => roomsTable.id),
  data: text().$type<Record<string, any>>(),
})

export const roomsTable = sqliteTable('rooms_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  data: text().$type<Record<string, any>>(),
})
import { pgEnum, pgTable  } from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'

export const usersTable = pgTable(
  'users',
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar('name', { length: 256 }),
    email: t.varchar().notNull(),
    password: t.varchar().notNull(),
    active: t.integer().default(0),
  },
  (table) => [t.uniqueIndex('email_idx').on(table.email)]
)

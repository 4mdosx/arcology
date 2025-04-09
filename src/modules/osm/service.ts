import { drizzle } from "drizzle-orm/node-postgres"

const osmDB = drizzle(process.env.OSM_DATABASE_URL!)

export default osmDB
export default defineEventHandler(async (event) => {
    const db = useDatabase()
    const id = getRouterParam(event, 'id')
    const { rows } = await db.sql`SELECT * FROM users WHERE id = ${id}`

    return rows[0]
})
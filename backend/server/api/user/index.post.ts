export default defineEventHandler(async (event) => {
    const db = useDatabase()
    const { firstName, lastName, email } = await readBody(event)

    await db.sql`INSERT INTO users (firstName, lastName, email) VALUES (${firstName}, ${lastName}, ${email})`

    const { rows } = await db.sql`SELECT * FROM users WHERE email = ${email}`

    return rows[0]
})
export default eventHandler(async (event) => {
  const db = useDatabase()

  await db.sql`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT UNIQUE)`

  return {
    message: 'Temp route for testing',
  }
})

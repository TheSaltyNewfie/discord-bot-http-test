export default defineEventHandler(async (event) => {
    const {key, value} = await readBody(event)

    const dataStorage = await useStorage('test').setItem(key, value)

    const storedValue = await useStorage().getItem(key)

    return {
        key,
        value: storedValue,
    }
})
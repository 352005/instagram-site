import dexie from 'dexie'

export const db = new dexie("myInsta")
db.version(2).stores({
    bio: ', name, about',
    gallery: '++id, url'
})

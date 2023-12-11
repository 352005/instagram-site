import { db } from '../dexie';
import getPhotoUrl from 'get-photo-url';
import { useLiveQuery } from 'dexie-react-hooks';

const Gallery = ()=>{
    const allPhoto = useLiveQuery(()=> db.gallery.toArray(), [])

    const addPhoto = async ()=>{
        db.gallery.add({
            url: await getPhotoUrl('#addPhotoInput')
        })
    }

    const removePhoto = (id)=>{
        db.gallery.delete(id)
    }

    return (
     <>
        <input type="file" name="photo" id="addPhotoInput" />
        <label htmlFor="addPhotoInput" onClick={addPhoto}>
            <i className="add-photo-button fas fa-plus-square"></i>
        </label>

        <section className="gallery">
            {!allPhoto && <p>Loading images. Please wait</p>}
            {allPhoto?.map((photo) =>(
                <div className="item" key={photo.id}>
                    <img src={photo.url} alt="" className='item-image' />
                    <button className="delete-button" onClick={()=> removePhoto(photo.id)} >Delete</button>
                </div>
            ))}
        </section>
     </>
        
    )
}

export default Gallery
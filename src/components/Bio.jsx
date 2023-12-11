import { useState, useEffect } from 'react';
import { db } from '../dexie'
import { useLiveQuery } from 'dexie-react-hooks';
import getPhotoUrl from 'get-photo-url';
import profile from '../assets/profileIcon.svg';

const Bio = ()=>{
    const [userDetails, setUserDetails] = useState({
        name: 'TripleA Olayinka',
        about: 'Building 9ja-gist.io - Learn and relate with 9ja'
    })

    const [editFormIsOpen, setEditFormIsOpen] = useState(false)

    const profilePhoto = useLiveQuery(()=> db.bio.toArray(), [])

    //const [profilePhoto, setProfilePhoto] = useState(profile)

    useEffect(() => {
        const setDataFromDb = async ()=>{
            const userDetailsFromDb = await db.bio.get('info')
            userDetailsFromDb && setUserDetails(userDetailsFromDb)
        }

        /*const setDpFromDb = async ()=>{
            const userDpFromDb = await db.bio.get('bioDp')
            userDpFromDb && setProfilePhoto(userDpFromDb)
        }*/

        setDataFromDb()
        //setDpFromDb()
    });
    
    const updateUser = async (event)=>{
        event.preventDefault();

        const objectData = {
            name: event.target.userName.value,
            about: event.target.aboutUser.value
        }

        setUserDetails(objectData)
        await db.bio.put(objectData, 'info')
        setEditFormIsOpen(false)
    }

    const updateProfile = async ()=>{
        db.bio.add({
            url: await getPhotoUrl('#profilePhotoInput')
        })
    }

    /*const updateProfile = async ()=>{
        const newProfilePhoto = await getPhotoUrl('#profilePhotoInput')
        await db.bio.put(newProfilePhoto, 'bioDp')
        setProfilePhoto(newProfilePhoto)
    }*/

    const editForm = (
        <form className='edit-bio-form' onSubmit={(e)=> updateUser(e)}>
            <input type="text" id='name' name='userName' defaultValue={userDetails?.name} placeholder='Your name' />
            <input type="text" id='about' name='aboutUser' defaultValue={userDetails?.about} placeholder='About you' />
            <br />
            <button type='button' className='cancel-button' onClick={()=> setEditFormIsOpen(false)}>Cancel</button>
            <button type="submit">Save</button>
        </form>
    )

    const editButton = <button onClick={()=> setEditFormIsOpen(true)}>Edit</button>

    return (
        <section className="bio">
            <input type="file" accept='image/*' name="photo" id="profilePhotoInput" />
            <label htmlFor="profilePhotoInput">
                <div className="profile-photo" role="button" title="click to edit photo" onClick={updateProfile}>
                    <img src={profilePhoto?profilePhoto:profile} alt="Profile" />
                </div>
            </label>
            

            <div className="profile-info">
                <p className="name">{userDetails.name}</p>
                <p className="about">{userDetails.about}</p>
                {editFormIsOpen? editForm : editButton}
            </div>
        </section>
    )
}

export default Bio
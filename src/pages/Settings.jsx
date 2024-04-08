import React, { useEffect, useState } from 'react'
import { ref, onValue, update } from 'firebase/database'
import { database, storage } from '../firebaseInitialize'
import { useNavigate } from 'react-router-dom'
import { ref as fbStorageRef, uploadBytes } from 'firebase/storage'

const Settings = ({ user }) => {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [websiteName, setWebsiteName] = useState('')
  const [websiteLink, setWebsiteLink] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const userRef = ref(database, `users/${user.uid}`)
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val()
      if (userData){
        setDisplayName(userData.displayName || '')
        setBio(userData.bio || '');
        setWebsiteName(userData.websiteName || '');
        setWebsiteLink(userData.websiteLink || '');
      }
    })
  }, [user.uid, database])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    //don't allow images larger than 5MB
    if (file && file.size > 5 * 1024 * 1024){
      alert('File size exceeds the maximum limit of 5 MB.')
      e.target.value = null
    } else {
      setSelectedFile(e.target.files[0])
    }
    
  }

  const handleFileUpload = async () => {
    if (!selectedFile) return

    const storageRef = fbStorageRef(storage, `profile-pictures/${user.uid}`)
    uploadBytes(storageRef, selectedFile).then((snapshot) => {
      alert('Image uploaded successfully')
    }).catch((error) => {
      alert('Couldn\'t upload image')
    })
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()
    const updates = {}
    if (displayName !== '') updates['displayName'] = displayName;
    if (bio !== '') updates['bio'] = bio;
    if (websiteName !== '') updates['websiteName'] = websiteName;
    if (websiteLink !== '') updates['websiteLink'] = websiteLink;

    handleFileUpload()
    update(ref(database, `users/${user.uid}`), updates)
    
    navigate(`/Profile/${user.uid}`)
  }



  return (
    <section className='settings-container'>
        <form className='settings-form' onSubmit={handleSubmit}>
            <input type="file" accept='image/*' onChange={handleFileChange}/>
            <label htmlFor="display-name-input" required>Display Name:</label>
            <input id='display-name-input' type='text' maxLength={18} value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
            <p className='instruction'>Display name can be a maximum of 18 characters.</p>
            <label htmlFor="bio-input">Bio:</label>
            <input className='bio-input' id='bio-input' type='text' size='150' value={bio} onChange={(e) => setBio(e.target.value)}/>
            <label htmlFor="social-media-link-input">Website Name:</label>
            <input id='social-media-name-input' type='text' value={websiteName} onChange={(e) => setWebsiteName(e.target.value)}/>
            <label htmlFor="social-media-link-input">Website Link:</label>
            <input id='social-media-link-input' type='text' value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)}/>
            <button type='submit'>Submit</button>
        </form> 
    </section>
  )
}

export default Settings
 
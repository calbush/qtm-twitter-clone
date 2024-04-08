import React from 'react'
import MiniUserCard from './MiniUserCard'

const Recommended = () => {
  return (
    <div className='recommended-profiles-container'>
        <h2>Try following these user: </h2>
        <ul>
                <li>
                        <MiniUserCard userId={'PFS0g4WiPOMdnsWyaavnL7i1UZz2'}/>
                </li>
                <li>
                        <MiniUserCard userId={'5rjjDgmzbuYx4vANBHrQH0Mq39G3'}/>
                </li>
                <li>
                        <MiniUserCard userId={'3xww7UlRRJVPeYv13a0jBcTy9Cn1'}/>
                </li>
                <li>
                        <MiniUserCard userId={'MDQ739oiqCaBV7kINYTDqkUhGBG2'}/>
                </li>
                <li>
                        <MiniUserCard userId={'X9VoOTytVIVdASwzeEQSmjsB3QB3'}/>
                </li>
                <li>
                        <MiniUserCard userId={'datZwWBSwpQTmpXYIusRmjTLntQ2'}/>
                </li>
                <li>
                        <MiniUserCard userId={'hvvXpunakHZOpAFhWDxfybjJ1tR2'}/>
                </li>
                <li>
                        <MiniUserCard userId={'n3KOimejTDhd5BU38nhI2i54A513'}/>
                </li>
                <li>
                        <MiniUserCard userId={'E6BMezvtwWhDcBjcFlPyh6rVOVL2'}/>
                </li>
        </ul>
    </div>
  )
}

export default Recommended

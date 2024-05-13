import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

const ImageCropper = ({image,onCropDone,onCropCancel}) => {
    const [crop,setCrop]=useState({x:0,y:0})
    const [zoom,setZoom]=useState(4/3)

    const [croppedArea,setCroppedArea]=useState(null)
    const [aspectRatio,setAspectRatio]=useState(4/3)

    const onCropComplete=(croppedAreaPercentage,croppedAreaPixels)=>{
        setCroppedArea(croppedAreaPixels)
    }

    const onAspectRatioChange=(event)=>{
            setAspectRatio(event.target.value)
    }

  return (
    <div className=''>
        <div className=''>
            <Cropper
            image={image}
            aspect={aspectRatio}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
             containerStyle:{
                width:"73%",
                height:"80%",
                backgroundColor:"#fff"
             }
            }}
            />
            
        </div>
        {/*Buttons*/}
        <div className='flex flex-col justify-center items-center gap-2'>
            {/*Aspect Radios*/}
            <div onChange={onAspectRatioChange} className='flex gap-2'>
                <input type='radio' value={1 / 1} name='ratio'/> 1:1
                <input type='radio' value={5 / 4} name='ratio'/> 5:4
                <input type='radio' value={4 / 3} name='ratio'/> 4:3
                <input type='radio' value={3 / 2} name='ratio'/> 3:2
                <input type='radio' value={5 / 3} name='ratio'/> 5:3
                <input type='radio' value={16 / 9} name='ratio'/> 16:9
                <input type='radio' value={3 / 1} name='ratio'/> 3:1

            </div>
            {/*Buttons for canceling or applying the crop*/}
            <div className='flex gap-4'>
                <button onClick={onCropCancel}>Cancel</button>
                <button onClick={()=>{
                    onCropDone(croppedArea)
                }}>Crop & Apply</button>
            </div>
            
        </div>

    </div>
  )
}

export default ImageCropper
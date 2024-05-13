import React, { useRef } from 'react';

const FileInput = ({ onImageSelected }) => {
    const inputRef = useRef();

    //handle the change event when a file is selected
    const handleOnChange = (event) => {
        if (event?.target?.files && event?.target?.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event?.target?.files[0]);
            reader.onload = function (e) {
                onImageSelected(reader?.result);
            };
        }
    };

    const onChooseImg = () => {
        inputRef?.current?.click();
    };

    return (
        <div>
            {/* Hidden file input element */}
            <input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={handleOnChange}
            />
            {/* Button to trigger the file input dialog */}
            <button className='btn' onClick={onChooseImg}></button>
        </div>
    );
};

export default FileInput;

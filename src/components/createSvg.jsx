import React from 'react'

function CreateSvg(props) {
    const {master} = props;
    return (
        <svg className='draggable' dangerouslySetInnerHTML={{ __html: master }}></svg>
    )
}

export default CreateSvg
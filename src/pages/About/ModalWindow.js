import React, {Component} from 'react'

import style from './style'

const ModalWindow = ({open, handleClose, src}) => {
    return <div className={`${style.modal__wrap} ${open && style.active}`}>
        <div className={style.modal__pic}><img src={src && src.replace(/http/i, 'https')} /></div>
        <a href="" onClick={handleClose} >&times;</a>
    </div>
}

export default ModalWindow
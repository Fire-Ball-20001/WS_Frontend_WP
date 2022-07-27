import React from 'react';
import './buttonSection.scss';

export function ButtonSection({color, link}: {color:string, link:string}) {
    return <button className='section__button section-button' style={{background: color}} onClick={()=>openUrl(link)} >Перейти</button>
}

function openUrl(url: string) {
    window.open(url,'_blank')?.focus();
}
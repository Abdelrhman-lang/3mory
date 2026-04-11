import React from 'react'

export default function Overlay({ prop, setProp }) {
    return (
        <div className={`fixed inset-0 bg-black/50 z-40  transition-opacity duration-500 ${prop ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setProp(!prop)}></div>
    )
}

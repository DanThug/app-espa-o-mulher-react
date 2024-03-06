import { useState } from 'react'
import { Modal } from './Modal'
import { Container } from './Container'
import './app.css'

const App = () => {
    const [modal, setModal] = useState(false)
    const [inputValue, setInputValue] = useState("")

    return (
        <>
            <Modal openModal={modal} setModal={setModal} inputValue={inputValue} />
            <Container setModal={setModal} setInputValue={setInputValue} />
        </>
    )
}

export { App }
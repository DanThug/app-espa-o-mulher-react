import { useState } from 'react'
import './Container.css'

const Header = () => (
    <header className="app-header">
        <div className="logo">
            <img src="../assets/logo-espaco-mulher.png" alt="logo-espaco-mulher" />
            </div>
        <div className="title">
            <h2>Espaço Mulher</h2>
        </div>
    </header>
)

const Form = ({ setModal, setInputValue, storage, setStorage }) => {
    const validValue = value => /([a-zA-Z])/.test(value) && value.length > 1
    const existsValue = value => storage.find(obj => obj.name === value)
    const addItem = obj => setStorage(s => [...s, obj])
    const handleSubmit = e => {
        e.preventDefault()
        
        const { total, name } = e.target.elements
        const nameValue = name.value.trim().toUpperCase()
        const isExistsValue = existsValue(nameValue)
        const isValidValue = validValue(nameValue)

        if (isExistsValue) {
            setInputValue(nameValue)
            setModal(true)
            return
        }

        if (isValidValue) {
            const obj = {
                id: crypto.randomUUID(),
                name: nameValue,
                total: total.value,
                checked: false
            }
    
            addItem(obj)
            name.value = ""
            name.focus()
        }

    }

    return (
        <nav className="app-nav">
            <form className="app-form" onSubmit={handleSubmit}>
                <div>
                    <span>
                        O que você precisa guardar?
                    </span>
                </div>
                <div>
                    <select name="total" id="">
                        {
                            [...Array(11).keys()].slice(1)
                            .map(index => <option key={index} value={index}>{index}</option>)
                        }
                    </select>
                </div>
                <div>
                    <input name="name" placeholder="Manda aqui" autoFocus />
                </div>
                <div>
                    <button>Adicionar</button>
                </div>
            </form>
        </nav>
    )
}

const Items = ({ storage, setStorage }) => {
    const [filter, setFilter] = useState("orderByNewest")
    const orderBy = (filter, arr) => {
        const obj = {
            orderByNewest: [...arr].reverse(),
            orderByChecked: [...arr].filter(({ checked }) => checked),
            orderByAlphabetic: [...arr].sort((a, b) => a.name.localeCompare(b.name))
        }

        return obj[filter]
    }
    const order = orderBy(filter, storage)
    const handleFilteredBy = e => setFilter(e.target.value)
    const toggleCheckbox = id => setStorage(s => s.map(obj => obj.id === id ? {...obj, checked: !obj.checked} : obj))
    const deleteItem = id => setStorage(s => s.filter(obj => obj.id !== id))
    const clearStorage = () => setStorage([])

    return (
        <main className="app-main">
            <section className="app-section">
                <div className="items">
                    {
                        storage.length > 0
                        ? (
                            order.map(({id, name, total, checked}) => (
                                <div key={id} className={`item ${checked ? "done" : ""}`}>
                                    <input type="checkbox" onChange={() => toggleCheckbox(id)} checked={checked} />
                                    <span>{total} - {name}</span>
                                    <button onClick={() => deleteItem(id)}>X</button>
                                </div>
                                ))
                            )
                        : <img className="empty" src="../assets/empty.png" />
                    }
                </div>
            </section>
            <section className="app-section">
                <div>
                    <select value={filter} onChange={handleFilteredBy}>
                        <option value="orderByNewest">Ordenar por mais recentes</option>
                        <option value="orderByChecked">Mostrar guardados</option>
                        <option value="orderByAlphabetic">Ordem Alfabética</option>
                    </select>
                </div>
                <div>
                    <button onClick={clearStorage}>Limpar lista</button>
                </div>
            </section>
        </main>
    )
}

const Footer = ({ storage, totalStoraged, percentageStoraged }) => (
    <footer>
        <div>
            <span>
                Você tem {storage.length} itens na lista
                {storage.length > 0 && (
                    ` e já guardou ${totalStoraged} (${percentageStoraged})%`
                )} 
            </span>
        </div>
    </footer>
)

const Container = ({ setModal, setInputValue }) => {
    const [storage, setStorage] = useState([])
    const { percentageStoraged, totalStoraged } = {
            percentageStoraged: parseInt(100 / storage.length * [...storage].filter(({ checked }) => checked).length),
            totalStoraged: [...storage].filter(({ checked }) => checked).length
        }

    return (
        <div className="app-container">
                <Header />
                <Form
                    setModal={setModal}
                    setInputValue={setInputValue}
                    storage={storage}
                    setStorage={setStorage}
                />
                <Items
                    storage={storage}
                    setStorage={setStorage}
                />

                <Footer
                    storage={storage}
                    percentageStoraged={percentageStoraged}
                    totalStoraged={totalStoraged}
                />
            </div>
    )
}

export { Container }
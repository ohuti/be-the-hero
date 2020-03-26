import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import MaskedInput from 'react-text-mask'

import './styles.css'

import { FiArrowLeft } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import api from '../../services/api'

export default function Login () {
  const history = useHistory()

  const phoneMask = [ '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/ ]

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ whatsapp, setWhatsapp ] = useState('')
  const [ city, setCity ] = useState('')
  const [ uf, setUf ] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {
      const response = await api.post('/ong', data)
      alert(`Salve sua id, ela servirá para logar no portal.\nSua id: ${response.data.id}.`)
      history.push('/')
    } catch (error) {
      alert (error)
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section className="form">
          <img src={logo} alt="Be the Hero"/>
          
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link to="/" className="back-link" >
            <FiArrowLeft size={16} color="#E02041" />
            Já sou cadastrado
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <MaskedInput
            placeholder="Whatsapp"
            mask={ phoneMask }
            value={whatsapp}
            onChange={event => setWhatsapp(event.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={event => setCity(event.target.value)}
            />
          
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={event => setUf(event.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
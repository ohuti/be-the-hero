import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

import { FiLogIn } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import heroes from '../../assets/heroes.png'
import api from '../../services/api'

export default function Login () {
  const history = useHistory()

  const [ id, setId ] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await api.post('/session', { id })

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.ong.name)

      history.push('/profile')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logo} alt="Be the Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>

          <input placeholder="Insira seu ID" value={id} onChange={ event => setId(event.target.value) }/>
          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="back-link" >
            <FiLogIn size = {16} color="#E02041" />
            Não sou cadastrado
          </Link>
        </form>
      </section>
  
      <img src={heroes} alt="Heroes"/>
    </div>
  )
}
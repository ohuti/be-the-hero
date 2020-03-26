import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'

import logo from '../../assets/logo.svg'

import api from '../../services/api'

export default function Profile () {
  const history = useHistory()

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  const [ incidents, setIncidents ] = useState([])

  useEffect(() => {
    api.get('/ong/incident', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data.incidents)
    })
  }, [ongId])

  const handleLogout = () => {
    localStorage.clear()
    history.push('/')
  }

  const handleDeleteIncident = async (id) => {
    try {
      await api.delete(`/incident/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => id !== incident.id ))
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be the Hero"/>
        <span>Bem vindo, {ongName} </span>

        <Link className="button" to="/incident/new" >Cadastrar novo caso</ Link>
        <button onClick={handleLogout} >
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        { incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO: </strong>
            <p>{incident.description}</p>

            <strong>VALOR</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={ () => handleDeleteIncident(incident.id) }>
              <FiTrash2 size={24} color="#a8a8b3" />
            </button>
          </li>
        )) }
        
      </ul>
    </div>
  )
}
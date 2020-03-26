import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import './styles.css'

import logo from '../../assets/logo.svg'
import api from '../../services/api'

export default function NewIncident () {
  const valueMask = createNumberMask({
    prefix: 'R$',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2
  })
  const history = useHistory()

  const ongId = localStorage.getItem('ongId')

  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ value, setValue ] = useState('')

  const handleNewIncident = async (event) => {
    event.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('/incident', data,  {
        headers: { 
          Authorization: ongId
        }, 
      })

      history.push('/profile')
    } catch (error) {
      alert(error)
    }
  }
  
  return (
    <div className="new-incident-container" >
      <div className="content">
        <section className="form">
          <img src={logo} alt="Be the Hero"/>
            
            <h1>Cadastrar novo caso</h1>
            <p>Descreva seu caso detalhadamente e encontre um heroi para resolvê-lo!</p>

            <Link to="/profile" className="back-link" >
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para lista de casos
            </Link>
          </section>

          <form onSubmit={handleNewIncident}>
            <input
              required
              placeholder="Título"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
            <textarea
              required
              placeholder="Descrição"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
            <MaskedInput
              required
              placeholder="Valor"
              mask={ valueMask }
              value={value}
              onChange={event => setValue(event.target.value)}
            />

            <button className="button" type="submit">Cadastrar</button>
          </form>
      </div>
    </div>
  )
}
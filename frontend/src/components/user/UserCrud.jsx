import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '' , email: '' },
    list: []
}

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar,Alterar e Excluir'
}

export default class UserCrud extends Component {

    stat = {...initialState}

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url,user)
            .then(resp => { 
                const list = this.getUpdateList(resp.data)
                this.setState({ user: initialState.user, list})
            })
    }

    getUpdateList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }
    render () {
        return (
            <Main {...headerProps}>
                Cadastro de Usuário
            </Main>
        )
    }
}
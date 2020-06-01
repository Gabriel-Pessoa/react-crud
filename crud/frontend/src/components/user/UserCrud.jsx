import React, { Component } from 'react'
import Main from '../template/Main' 
import axios from 'axios'

const headerProps = {
    icon: 'user',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir.'
}

const baseUrl = 'http://localhost:3001/users' // url para persistir dados

// objeto estado inicial
const initialState = {
    user: { name: '', email: '' },
    list: []
}


export default class UserCrud extends Component {
    state = { ...initialState }

    // pega dados do backend
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    // função para limpar o formulário caso o usuário cancele. Não limpa a lista, mas sim o formuário
    clear() {
        this.setState({ user: initialState.user })
    }

    // função para incluir novo usuário (sem id) ou alterar (id)
    save() {
        const user = this.state.user // obter usuário de objeto state, definido internamente
        const method = user.id ? 'put' : 'post' // id setado significa método put, não setado método post
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl //com id setado, passo id na url para pegar usuário

        
        if(user.name) { //condição para barrar entrada de dados com nome vazio
            //como a variável method é uma string, preciso passar entre colchetes
            axios[method](url, user) //método definido. Parâmetros da função (url, user) 
            .then(resp => { // promise resolvida, tenho acesso ao resultado
                const list = this.getUpdatedList(resp.data)// atualizando lista local passando o resp.data que é a resposta do db.server
                this.setState({ user: initialState.user, list }) // chamada objeto setState alterando user e list . Salvou ou alterou precisa limpar o formulário
            })
        }
    }

    //atualiza lista
    getUpdatedList(user, add = true) {

        const list = this.state.list.filter(u => u.id !== user.id) // filter gera outra lista, filtrando usuário com id diferente do parâmetro recebido na função 
        // se usuário setado, add usuário na lista
        if (add) list.unshift(user) // add usuário na primeira posição
        return list
    }

    // função que atualiza campos do usuário name e email
    updateField(event) {
        const user = { ...this.state.user } // é uma excelente prática clonar o componente e progedir em sua alteração
        user[event.target.name] = event.target.value // pega o propriedadade do input para entrada do formulário
        this.setState({ user }) //seta estado diretamente
    }

    // carrega usuários
    load(user) {
        this.setState({ user })
    }

    // função que deleta usuário
    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`)
            .then(resp => {
                const list = this.getUpdatedList(user, false) // atualiza lista para excluir usuário encontrado 
                this.setState({ list }) // atualiza com usuário removido
            })
    }


    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Função responsável por renderizar linhas */}
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    // função responsável por rederizar linhas
    renderRows() {
        return this.state.list.map(user => { // mapear lista de usuários
            return (
              
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="col-12 d-flex justify-content-end">
                            <button className="btn btn-warning"
                                onClick={() => this.load(user)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2"
                                onClick={() => this.remove(user)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
               
            )
        })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o email..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        //console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}

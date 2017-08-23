import React,{Component} from "react";
import AlertContainer from 'react-alert'
import { push } from 'react-router-redux'
import {store} from '../index'
import { connect } from 'react-redux'

class Authorization extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:'',
            userName:'sasha',
            userPassword:'sasha'
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeName(event){
        this.setState({name: event.target.value});
    }
    handleChangePassword(event){
        this.setState({password: event.target.value});
    }
    handleSubmit(){
        if(this.state.userName==this.state.name&&this.state.userPassword==this.state.password){
            store.dispatch(push('/list'))
        }
        else{
            this.showAlert();
        }
    }
    alertOptions = {
        offset: 14,
        position: 'bottom right',
        theme: 'light',
        time: 5000,
        transition: 'scale'
    };

    showAlert = () => {
        this.msg.show('incorect username or password', {
            time: 3000,
            type: 'error',
            icon: <img src="http://www.conservator.ru/abicons/error.gif" />
        })
    };
    render(){
        return(
            <div className="container-fluid">
                <div className="row justify-content-md-center" style={{marginTop:'15%'}} >
                    <div className="form-group" style={{width:300, textAlign:'center'}}>
                        <h1>Login</h1>
                        <input className="form-control mt-1" placeholder="Enter name" type="text"
                               value={this.state.name} onChange={this.handleChangeName} />
                        <input className="form-control mt-1" placeholder="Password" type="password"
                               value={this.state.password}  onChange={this.handleChangePassword} />
                        <button className="btn btn-primary btn-block mt-1" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>

        );
    }
}
function mapStateToProps () {
}
export default connect(mapStateToProps)(Authorization)
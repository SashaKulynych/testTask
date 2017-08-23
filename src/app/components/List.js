import React,{Component} from "react";
import {render} from "react-dom";

import { connect } from 'react-redux'

import TaskSettingsView from './listView/TaskSettingsView';
import PaginationView from './listView/PaginationView';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            body:'',
            dataSource:[],
            searchData:[],
            stateData:[],
            countTasks:0,
            page:'1'
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.listSortDate = this.listSortDate.bind(this);
        this.listSortTitle = this.listSortTitle.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
        this.jsonData = this.jsonData.bind(this);
        this.showData = this.showData.bind(this);
        this.paginate = this.paginate.bind(this);
        this.generateTask = this.generateTask.bind(this);
        this.pageData = this.pageData.bind(this);
    }
    componentDidMount(){
        this.pageData();
        this.jsonData();
    }
    filterSearch(event){
        fetch('http://localhost:3000/tasks?q='+event.target.value).then((res) => res.json()).then((data) => {
            this.setState({
                searchData: data,
                dataSource: data
            });
        });
    }
    listSortTitle(){
        let data = this.state.searchData;
        console.log(data);
        const newData = data.sort((a, b)=>{
            if (a.title > b.title)
                return 1;
            if (a.title < b.title)
                return -1;
            return 0;
        });
        this.setState({
            dataSource:newData
        });
    }
    listSortDate(){
        let data = this.state.searchData;
        const newData = data.sort((a, b)=>{
            if (a.id > b.id)
                return 1;
            if (a.id < b.id)
                return -1;
            return 0;
        });
        this.setState({
            dataSource:newData
        });
    }
    generateTask(){
        let http = new XMLHttpRequest();
        let date = Date.now();
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let textTitle = "";
        let bodyTitle = "";
        for (let j = 0; j < 5; j++)
            textTitle += possible.charAt(Math.floor(Math.random() * possible.length));
        for (let j = 0; j < 15; j++)
            bodyTitle += possible.charAt(Math.floor(Math.random() * possible.length));
        http.open("POST", 'http://localhost:3000/tasks');
        http.setRequestHeader("Content-Type", "application/json");
        http.send(
            JSON.stringify({
            "title": textTitle,
            "body": bodyTitle,
            "date" :date
        })
        );
        this.pageData();
        this.jsonData();
    }
    addTask() {
        let title = this.state.title;
        let body = this.state.body;
        let date = Date.now();
        let http = new XMLHttpRequest();
        http.open("POST", 'http://localhost:3000/tasks');
        http.setRequestHeader("Content-Type", "application/json");
        http.send(
            JSON.stringify({
            "title": title,
            "body": body,
            "date" :date
        })
        );
        this.pageData();
        this.jsonData();
    }

    deleteTask(e) {
        let http = new XMLHttpRequest();
        let url =  'http://localhost:3000/tasks/'+ e.target.attributes.getNamedItem('name').value;
        http.open("DELETE", url);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(null);
        this.pageData();
        this.jsonData();
    }

    handleChangeTitle(event){
        this.setState({title: event.target.value});
    }
    handleChangeBody(event){
        this.setState({body: event.target.value});
    }
    paginate(e){
        console.log(e);
        const http = new XMLHttpRequest();
        this.setState({
            page:e.target.name
        });
        http.open('GET','http://localhost:3000/tasks?_page='+e.target.name);
        http.setRequestHeader("Content-Type", "application/json");
        http.responseType = 'json';
        http.onload = ()=> {
            console.log(http.response);
            if (http.readyState==4 && http.status == 200) {
                this.setState({
                    searchData: http.response,
                    dataSource: http.response,
                });
            }
        };
        http.send();
        this.jsonData();
    }
    pageData(){
        const xml = new XMLHttpRequest();
        xml.open('GET', 'http://localhost:3000/tasks?_page='+this.state.page);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.responseType = 'json';
        xml.onload = ()=> {
            if (xml.readyState==4 && xml.status == 200) {
                this.setState({
                    searchData: xml.response,
                    dataSource: xml.response
                });
            }
        };
        xml.send();
    }
    jsonData(){
        const req = new XMLHttpRequest();
        req.open('GET', 'http://localhost:3000/tasks');
        req.setRequestHeader("Content-Type", "application/json");
        req.responseType = 'json';
        req.onload = ()=> {
            if (req.readyState==4 && req.status == 200) {
                this.setState({
                    stateData: req.response
                });
                let count = this.state.stateData.length;
                this.setState({
                    countTasks: count
                });
            }
            };
        req.send();
    }
    showData(){
        const listData = this.state.dataSource.map((data) => {
            return (
                <div key={data.id}>
                    <ul className="list-group mt-2" style={{cursor:'pointer'}}>
                        <li className="list-group-item"><h5>Name:</h5> {data.title}</li>
                        <li className="list-group-item"><h5>Body:</h5> {data.body}</li>
                        <li className="list-group-item"><h6>Date:</h6> {data.date}</li>
                    </ul>
                    <button className="btn btn-primary btn-block mt-1" name={data.id} onClick={this.deleteTask}>Delete</button>
                </div>
            )
        });
        return (listData)
    }
    render(){
        return (
            <div>
                <TaskSettingsView
                    title={this.state.title} body={this.state.body}
                    handleChangeTitle = {this.handleChangeTitle}
                    handleChangeBody = {this.handleChangeBody}
                    addTask = {this.addTask}
                    listSortTitle = {this.listSortTitle}
                    listSortDate = {this.listSortDate}
                    filterSearch = {this.filterSearch}
                    generateTask = {this.generateTask}
                />
                <PaginationView
                    countTasks = {this.state.countTasks}
                    paginate = {this.paginate}
                />
                <div className="container justify-content-md-center" style={{width:'75%'}}>
                    {this.showData()}
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
    }
}
export default connect(mapStateToProps)(App)
import React,{Component} from "react";

export default class TaskSettingsView extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container justify-content-md-center mt-4" style={{width:'75%'}} >
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Title</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title"
                                       value={this.props.title} onChange={this.props.handleChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Body</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                          value={this.props.body} onChange={this.props.handleChangeBody}/>
                            </div>
                        <button className="btn btn-primary btn-block" onClick={this.props.addTask}>Add task</button>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="searchTitle">Search by title</label>
                            <input type="text" className="form-control" id="search" placeholder="Search by title"
                                   onChange={this.props.filterSearch}
                            />
                        </div>
                        <div className="form-group mt-5">
                            <button className="btn btn-primary btn-block" onClick={this.props.listSortTitle}>Sort by title</button>
                            <button className="btn btn-primary btn-block" onClick={this.props.listSortDate}>Sort by date</button>
                            <button className="btn btn-primary btn-block" onClick={this.props.generateTask}>Generate task</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
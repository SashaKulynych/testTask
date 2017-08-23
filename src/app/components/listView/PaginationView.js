import React,{Component} from "react";

export default class PaginationView extends Component {
    constructor(props){
        super(props);
        this.state={
            selected:1
        }
    }
    setFilter(filter) {
        this.setState({selected  : filter})
    }
    isActive(value){
        return 'page-item '+((value===this.state.selected) ?'active':'');
    }
    countPages(){
        let countPages = this.props.countTasks/10;
        let numberPage=0;
        if(this.props.countTasks%10==0)countPages--;
        let pages=[];
        let url='';
        do {
            numberPage++;
            countPages--;
            url = "http://localhost:3000/tasks?_page="+numberPage;
            pages.push(<li key={numberPage} className={this.isActive(numberPage)} onClick={this.setFilter.bind(this, numberPage)} style={{cursor:'pointer'}}><a className="page-link"  name={numberPage} onClick={this.props.paginate}>{numberPage}</a></li>);
        }while (countPages>=0);
        return pages;
    }
    componentDidMount(){
        this.countPages();
    }
    render(){
        return(
            <div className="container mt-3">
                <div className="row justify-content-md-center">
                    <nav aria-label="Pagination">
                        <ul className="pagination">
                            {this.countPages()}
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
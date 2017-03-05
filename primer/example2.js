class AppComponent extends React.Component {
    constructor(props){
        super(props);

        this._nextTodoId = 1;
        //top-level model
        this.state = {
            filter: {showCompleted: true},
            todos: [
                {id: this._nextTodoId++, text: "TD1", isCompleted: false},
                {id: this._nextTodoId++, text: "TD2", isCompleted: true},
                {id: this._nextTodoId++, text: "TD3", isCompleted: true},
                {id: this._nextTodoId++, text: "TD4", isCompleted: false}
            ]
        };

        this._onShowCompletedChanged = this._onShowCompletedChanged.bind(this);
    }

    render(){
        const {filter} = this.state;

        return (
            <div>
                <h2>Todo List</h2>
                <label>
                    Show Completed
                    <input type="checkbox" checked={filter.showCompleted} onChange={this._onShowCompletedChanged} />
                </label>
            </div>
        );
    }

    _onShowCompletedChanged(e){
        this.setState({
            filter: {showCompleted: e.target.checked}
        });        
    }
}

ReactDOM.render(
    <AppComponent />,
    document.getElementById("application"));
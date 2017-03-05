//stateless component
const TodoList = ({todos, onSetTodoStatus}) => {
    return (
        <ul>
            {todos.map(todo => 
                <li key={todo.id}>
                    <label>
                        <input type="checkbox" checked={todo.isCompleted} onChange={e=>onSetTodoStatus(todo, e.target.checked)}/>
                        {todo.isCompleted 
                            ? <del>{todo.text}</del>
                            : todo.text}
                    </label>
                </li>)}
        </ul>
    );
};

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
        this._setTodoStatus = this._setTodoStatus.bind(this);
    }

    render(){
        const {filter, todos} = this.state;
        const filteredTodos = filter.showCompleted 
            ? todos
            : todos.filter(todo => !todo.isCompleted)


        return (
            <div>
                <h2>Todo List</h2>
                <label>
                    Show Completed
                    <input type="checkbox" checked={filter.showCompleted} onChange={this._onShowCompletedChanged} />
                </label>
                <TodoList todos={filteredTodos} onSetTodoStatus={this._setTodoStatus} />
            </div>
        );
    }

    _onShowCompletedChanged(e){
        this.setState({
            filter: {showCompleted: e.target.checked}
        });        
    }

    _setTodoStatus(todo, isCompleted){
        const {todos} = this.state;
        const newTodos = todos.map(oldTodo => {
            if(oldTodo.id !== todo.id)
                return oldTodo;

            return Object.assign({}, oldTodo, {isCompleted});
        });        
        this.setState({
            todos: newTodos
        });
    }
}

ReactDOM.render(
    <AppComponent />,
    document.getElementById("application"));
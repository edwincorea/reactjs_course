class AppComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {count: 5, title: "Hellow World!"};
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    render(){
        const {count, title} = this.state;
        return (
            <section className="site-wrap">
                <h1>Header: {title}</h1>
                <p>The counter is: {count}</p>
                <div>
                    <button onClick={this.decrement}>-</button>
                    <button onClick={this.increment}>+</button>
                </div>
            </section>
        );
    }

    increment(){
        console.log("INC");
    }

    decrement(){
        console.log("DEC");
    }
}

ReactDOM.render(
    <AppComponent />,
    document.getElementById("application"));
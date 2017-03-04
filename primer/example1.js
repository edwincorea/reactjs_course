class AppComponent extends React.Component {
    render(){
        return (
            <section className="site-wrap">
                <h1>Header</h1>
                <p>Lorem Ipsum</p>
            </section>
        );
    }
}

ReactDOM.render(
    <AppComponent />,
    document.getElementById("application"));
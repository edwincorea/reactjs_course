import {Component, PropTypes, Children} from "react";

export class StoreProvider extends Component {
    // Provides services and stores to any container component,
    // with no need to pass them through props to middle children (context)
    // https://facebook.github.io/react/docs/context.html

    static propTypes = {
        stores: PropTypes.object.isRequired,
        services: PropTypes.object.isRequired
    };

    //context types object
    static childContextTypes = {
        stores: PropTypes.object.isRequired,
        services: PropTypes.object.isRequired        
    };

    render() {
        //Children is a React Helper, enforce to pass only one child
        return Children.only(this.props.children);
    }

    //expose context types to children
    //https://medium.com/react-ecosystem/how-to-handle-react-context-a7592dfdcbc
    getChildContext() {
        const {stores, services} = this.props;
        return {stores, services};
    }
}

export class ContainerBase extends Component {
    static contextTypes = {
        stores: PropTypes.object.isRequired,
        services: PropTypes.object.isRequired                
    };

    constructor(props) {
        super(props);

        this._disposeFunctions = [];        
    }

    //helper to allow containers to subscribe to observables from stores
    subscribe(observable$, callback){
        const sub = observable$.subscribe(callback);
        this._disposeFunctions.push(() => sub.unsubscribe());
    }

    //component is done, unsubscribe from observables from all stores
    //https://facebook.github.io/react/docs/react-component.html
    componentWillUnmount(){
        this._disposeFunctions.forEach(d => d());
        this._disposeFunctions = [];
    }

    //helpers to wrap dispatcher helpers: emit and request

    dispatch(action){
        this.context.services.dispatcher.emit(action);
    }

    request(action){
        this.context.services.dispatcher.request(action);
    }
}
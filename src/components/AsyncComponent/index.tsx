import React from 'react';

interface IState {
    component: React.Component | null
}

const AsyncComponent : (importComponent: any) => React.ComponentClass = importComponent => {
    return class extends React.Component<any, IState> {
        state = {
            component: null
        };

        async componentDidMount() {
            const { default: component } = await importComponent();
            this.setState({
                component
            });
        }

        render() {
            const Wrap : any = this.state.component;
            return Wrap ? <Wrap {...this.props} /> : null;
        }
    }
}

export default AsyncComponent;
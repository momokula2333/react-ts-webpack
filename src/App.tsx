import * as React from 'react';
import HelloJSX from './Hello.jsx';

interface HelloState {
  i: number;
}

export default class extends React.Component<any, HelloState> {
  private tickToken: number;
  state = {i: 1};

  componentWillMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearTimeout(this.tickToken);
  }

  tick = () => {
    let {i} = this.state;
    i++;
    this.setState({i});
    this.tickToken = setTimeout(this.tick, 800);
  };

  render() {
    return (
      <div>
        <div className="a">Hello from tsx.</div>
        <HelloJSX />
        Hot module replacement with component-state-persistent included! Modify a component or stylesheet then see what changes:
        <br />{this.state.i}
      </div>
    );
  }
}

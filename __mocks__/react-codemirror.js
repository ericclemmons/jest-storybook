import React from "react";

export default class MockReactCodemirror extends React.Component {
  render() {
    return (
      <div>
        <code>mock-react-codemirror</code>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

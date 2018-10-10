SuperDivs = React.createClass({
  render() {
    return <div className="tacos-list">
      {this.props.tacos.map( ( taco, index ) => {
        return <p key={ `taco-${ index }` }>{ taco }</p>;
      })}
    </div>;
  }
});
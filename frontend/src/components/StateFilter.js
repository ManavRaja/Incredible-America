import Dropdown from 'react-bootstrap/Dropdown';

function StateFilter(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-warning">
        {props.state}
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {props.allAmericanStates.map(state => <Dropdown.Item  onClick={props.changeState}><a className="dropdown-item text-center" href="#">{state}</a></Dropdown.Item>)}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default StateFilter;
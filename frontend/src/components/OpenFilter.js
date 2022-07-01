import Dropdown from 'react-bootstrap/Dropdown';

function OpenFilter(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-warning">
        {props.openThreshold}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item><a value="Open" onClick={props.changeOpenState} className="dropdown-item" href="#">Open</a></Dropdown.Item>
        <Dropdown.Item><a value="All" onClick={props.changeOpenState} className="dropdown-item" href="#">All</a></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default OpenFilter;
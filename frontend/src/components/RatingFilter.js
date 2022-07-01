import Dropdown from 'react-bootstrap/Dropdown';

function RatingFilter(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-warning">
        {props.ratingThreshold}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item><a className="dropdown-item" onClick={props.ratingChange} href="#">5</a></Dropdown.Item>
        <Dropdown.Item><a className="dropdown-item" onClick={props.ratingChange} href="#">4</a></Dropdown.Item>
        <Dropdown.Item><a className="dropdown-item" onClick={props.ratingChange} href="#">3</a></Dropdown.Item>
        <Dropdown.Item><a className="dropdown-item" onClick={props.ratingChange} href="#">2</a></Dropdown.Item>
        <Dropdown.Item><a className="dropdown-item" onClick={props.ratingChange} href="#">All</a></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default RatingFilter;
import Dropdown from 'react-bootstrap/Dropdown';
import "./PriceFilter.css"


function PriceFilter(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-warning">
        {props.priceThreshold}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item><a className="dropdown-item" onClick={props.priceChange} href="#">$</a></Dropdown.Item> 
        <Dropdown.Item className="dropdown-item"><a onClick={props.priceChange} href="#">$$$</a> & Below</Dropdown.Item>
        <Dropdown.Item><a className="dropdown-item" onClick={props.priceChange} href="#">All</a></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default PriceFilter;
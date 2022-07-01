import Accordion from 'react-bootstrap/Accordion';
import "./Accordion.css"

function AlwaysOpenExample(props) {    

  return (
    <Accordion alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Address</Accordion.Header>
        <Accordion.Body className="text-center">
        <a href={"https://maps.google.com/?q=" + props.address} target="_blank">{props.address}</a>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Contact Info</Accordion.Header>
        <Accordion.Body className="text-center">
          <a href={props.websiteLink}>{props.websiteLink}</a>
          <br></br>
          <br></br>
          <a href={"tel:" + props.phoneNumber}>{props.phoneNumber}</a>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Hours</Accordion.Header>
        <Accordion.Body className="text-center hours">
          Monday Hours: {props.hours.Monday ? props.hours.Monday : "Closed"}
          <br></br>
          Tuesday Hours: {props.hours.Tuesday ? props.hours.Tuesday : "Closed"}
          <br></br>
          Wednesday Hours: {props.hours.Wednesday ? props.hours.Wednesday : "Closed"}
          <br></br>
          Thursday Hours: {props.hours.Thursday ? props.hours.Thursday : "Closed"}
          <br></br>
          Friday Hours: {props.hours.Friday ? props.hours.Friday : "Closed"}
          <br></br>
          Saturday Hours: {props.hours.Saturday ? props.hours.Saturday : "Closed"}
          <br></br>
          Sunday Hours: {props.hours.Sunday ? props.hours.Sunday : "Closed"}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AlwaysOpenExample;
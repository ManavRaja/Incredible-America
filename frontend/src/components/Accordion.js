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
          Monday Hours: {(props.hours.length==0) ? "N/A" : (props.hours.find((hour) => hour.Monday)?.Monday ?? 'Closed')}
          <br></br>
          Tuesday Hours: {(props.hours.length==0) ? "N/A" : (props.hours.find((hour) => hour.Tuesday)?.Tuesday ?? 'Closed')}
          <br></br>
          Wednesday Hours: {(props.hours.length==0) ? "N/A" : (props.hours.find((hour) => hour.Wednesday)?.Wednesday ?? 'Closed')}
          <br></br>
          Thursday Hours: {(props.hours.length==0) ? "N/A" : (props.hours.find((hour) => hour.Thursday)?.Thursday ?? 'Closed')}
          <br></br>
          Friday Hours: {(props.hours.length==0) ? "N/A" : (props.hours.find((hour) => hour.Friday)?.Friday ?? 'Closed')}
          <br></br>
          Saturday Hours: {(props.hours.length==0) ? "N/A" : (props.hours.find((hour) => hour.Saturday)?.Saturday ?? 'Closed')}
          <br></br>
          Sunday Hours: {(props.hours.length==0) ? "N/A" : (props.hours.find((hour) => hour.Sunday)?.Sunday ?? 'Closed')}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AlwaysOpenExample;
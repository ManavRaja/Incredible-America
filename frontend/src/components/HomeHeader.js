import goldenGateBridge from "../goldenGateBridge.mp4"

const HomeHeader = () => {
  return (
    <header>
        <video className="img-fluid" muted autoPlay loop src={goldenGateBridge} type="video/mp4"/>
    </header>
  )
}

export default HomeHeader
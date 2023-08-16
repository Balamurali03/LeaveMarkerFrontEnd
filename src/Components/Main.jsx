
import { Link } from "react-router-dom";
function Main() {

    return(
        <div style={{marginTop:"50px"}}>
          <div style={{marginTop:"50px"}}>
          <Link to ="/addemp"><button className="btn btn-primary" >Add Data </button></Link> 
          </div>
          <div style={{marginTop:"50px"}}>
          <Link to ="/leave"><button className="btn btn-primary">Apply Leave </button></Link>
          </div>
          <div style={{marginTop:"50px"}}>
          <Link to ="/list"><button className="btn btn-primary">Leave List </button></Link> 
          </div>
        </div>
    )
}
export default Main;
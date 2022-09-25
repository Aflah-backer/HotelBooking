import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
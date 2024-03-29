import React from 'react'

class Footer extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="footer">
        <div className="signature">
          <a href="http://www.isaacseessel.com">
            Created by Isaac Seessel
          </a>
        </div>
        <div className="links">
          <a href="https://www.linkedin.com/in/isaac-seessel-469042138">
            Linkedin
          </a>
          <a href="https://github.com/iseessel/">
            Github
          </a>
        </div>
      </div>
    )
  }
}

export default Footer

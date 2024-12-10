

import HeaderImage from '../../assets/Homebg.png'
import './Header.css'

function Header() {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favorite Products here</h2>
        <p>Choose form a diverse Product List featuring products crafted with the moto to last long and server you.</p>
        <button>View Menu</button>
      </div>
      
        <img id="headerImg"  src={HeaderImage} />

    


    </div>
  )
}

export default Header
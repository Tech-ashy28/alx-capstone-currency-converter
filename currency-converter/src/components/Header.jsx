
import "../css/home-screen.css"; 

function Header() {
  return (
    <header>
      <div className="page-header">
        {/* Logo Section */}
        <div className="page-logo">
          <img
            width="48"
            height="48"
            src="/icons/icons8-currency-exchange-100.png" 
            alt="Currency Converter logo"
          />
        </div>

        {/* Brand name */}
        <a href="#landing" aria-label="Go to home" className="header-title">
          <h1>Currency Converter</h1>
        </a>
      </div>
    </header>
  );
}

export default Header;

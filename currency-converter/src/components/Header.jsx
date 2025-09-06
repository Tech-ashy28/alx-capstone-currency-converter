
import "../css/home-screen.css"; // import your CSS so styles apply

function Header() {
  return (
    <header>
      <div className="page-header">
        {/* Logo Section */}
        <div className="page-logo">
          <img
            width="48"
            height="48"
            src="public/icons/icons8-currency-exchange-100.png"
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

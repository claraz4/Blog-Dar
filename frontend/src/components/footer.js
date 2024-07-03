import '../styles/footer.css'

const Footer = () => {
    return (
      <footer className="footerComp">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col-span-2 footer-md-col-span-3 footer-lg-col-span-2">
              <p className="footer-text">
              <span class="material-symbols-outlined">globe_uk</span>
                The Blog Mix. Your daily dose of diverse delights.
              </p>
            </div>
            <div>
              <p className="footer-section-title">Usefull links</p>
              <ul className="footer-link-list">
                <li><a href="#Account.js" className="footer-link"><span class="material-symbols-outlined">person</span>Your account</a></li>
                <li><a href="#" className="footer-link"><span class="material-symbols-outlined">apps</span>All blogs</a></li>
                <li><a href="#SignInUp.js" className="footer-link"><span class="material-symbols-outlined">login</span>Sign In</a></li>
              </ul>
            </div>
            <div>
              <p className="footer-section-title">Contact</p>
              <ul className="footer-link-list">
              <li><span class="material-symbols-outlined">location_on</span>Beirut, Lebanon
                </li>
                <li><span class="material-symbols-outlined">mail</span>infox@TheBlogMix.com
                </li>
                <li><span class="material-symbols-outlined">call</span>01/666-777
                </li>
                
              </ul>
            </div>
          </div>
          <hr className="footer-divider" />
          <p className="footer-bottom-text">© 2024 The Blog Mix. All rights reserved.</p>
        </div>
      </footer>

    );
  };
  
  export default Footer;
  
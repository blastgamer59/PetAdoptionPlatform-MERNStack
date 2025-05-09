import { Link } from 'react-router-dom'
import { FaPaw, FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaPaw className="text-primary-400 text-2xl" />
              <span className="text-xl font-heading font-bold text-white">PawMates</span>
            </div>
            <p className="text-sm">
              Connecting loving homes with pets in need. Our mission is to help every pet find their forever family.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/pavan.talluri.148" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://x.com/pavantalluri01" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/_pavanchowdary_/" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pets" className="text-gray-400 hover:text-white transition-colors">
                  Find a Pet
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pets?category=dogs" className="text-gray-400 hover:text-white transition-colors">
                  Dogs
                </Link>
              </li>
              <li>
                <Link to="/pets?category=cats" className="text-gray-400 hover:text-white transition-colors">
                  Cats
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Pet Care Tips
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Adoption Process
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-gray-400 mt-1" />
                <span className="text-gray-400">123 Adoption Street, Hyderabad, Telangana 522202</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-gray-400" />
                <span className="text-gray-400">+91 7793931656</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-400" />
                <span className="text-gray-400">hellopawmates@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {currentYear} PawMates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
import { motion } from "framer-motion";
import { FaPaw, FaHeart, FaHandHoldingHeart } from "react-icons/fa";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About PawMates
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connecting loving homes with pets in need. Our mission is to
                make pet adoption simple, accessible, and joyful for everyone.
              </p>
            </motion.div>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At PawMates, we believe every pet deserves a loving home. Our
                  platform connects shelters and rescue organizations with
                  potential adopters, making the adoption process seamless and
                  rewarding.
                </p>
                <p className="text-gray-600">
                  We work tirelessly to reduce pet homelessness and promote
                  responsible pet ownership through education, support, and
                  community engagement.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Happy adopted dog with owner"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPaw className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Compassion First</h3>
              <p className="text-gray-600">
                We prioritize the well-being of every animal and ensure they
                find the perfect match for their forever home.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Focused</h3>
              <p className="text-gray-600">
                We build strong relationships with shelters, rescues, and
                adopters to create a supportive pet adoption community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandHoldingHeart className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Responsible Adoption</h3>
              <p className="text-gray-600">
                We promote educated decision-making and provide resources to
                ensure successful pet adoptions.
              </p>
            </motion.div>
          </div>

          {/* Impact Section */}
          <div className="bg-primary-600 text-white rounded-xl p-8 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl opacity-90">
                Together with our community, we're making a difference in pets'
                lives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <div className="text-lg opacity-90">Pets Adopted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-lg opacity-90">Partner Shelters</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50,000+</div>
                <div className="text-lg opacity-90">Happy Families</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Our dedicated team of animal lovers works tirelessly to make pet
              adoption accessible and joyful for everyone.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sarah Johnson"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">Sarah Johnson</h3>
                <p className="text-primary-600 mb-3">Founder & CEO</p>
                <p className="text-gray-600">
                  Passionate about connecting pets with their perfect forever
                  homes.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Mike Anderson"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">Mike Anderson</h3>
                <p className="text-primary-600 mb-3">Head of Partnerships</p>
                <p className="text-gray-600">
                  Building relationships with shelters and rescue organizations.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Emily Chen"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">Emily Chen</h3>
                <p className="text-primary-600 mb-3">Adoption Specialist</p>
                <p className="text-gray-600">
                  Ensuring smooth and successful adoption experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-600">
                Have questions about pet adoption or want to partner with us?
                We'd love to hear from you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>Address:</strong>
                    <br />
                    123 Adoption Street
                    <br />
                    Hyderabad, Telangana 522202
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <br />
                    hellopawmates@gmail.com
                  </p>
                  <p>
                    <strong>Phone:</strong>
                    <br />
                    +91 7793931658
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;

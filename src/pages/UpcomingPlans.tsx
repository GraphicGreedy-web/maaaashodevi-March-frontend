import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight, Search } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AnimatedCard from '../components/AnimatedCard';

const UpcomingPlans: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('all');

  const upcomingTrips = [
    // {
    //   id: 1,
    //   title: 'kainchi dham',
    //   image: 'https://kainchidhamtours.com/assets/images/kainchi-dham_1687158479.webp',
    //   startDate: '20 - 24 March 2025',
    //   endDate: 'July 14, 2025',
    //   duration: '3 Days - 2 Nights',
    //   price: '₹12,999',
    //   locations: ['Varanasi', 'Prayagraj'],
    //   region: 'North India',
    //   state: 'Uttar Pradesh',
    //   //groupSize: '15-20 People',
    //   availableSeats: 20,
    //   featured: false,
    //   description: 'Experience the spiritual essence of Varanasi with Kashi Vishwanath Temple visit and evening Ganga Aarti.'
    // },
    {
      id: 2,
      title: 'CharDham Yatra',
      image: 'https://sanjeevnitoday.com/wp-content/uploads/2024/05/Char-Dham-Yatra-Tour-Package.jpg',
      startDate: '15 - 27 May, 2025',
      endDate: 'May 27, 2025',
      duration: '11 Days - 10 Night',
      price: '₹29,999',
      locations: ['Yamunotri', 'Gangotri', 'Kedarnath', 'Badrinath'],
      region: 'North India',
      state: 'Uttarakhand',
      //groupSize: '30-50 People',
      availableSeats: 15,
      featured: true,
      description: 'Sacred CharDham: Yamunotri, Gangotri, Kedarnath, Badrinath.'
    },
    {
      id: 3,
      title: 'Dakshin Yatra',
      image: 'https://media-hosting.imagekit.io//ea1a764230064c4b/Untitled%20design.png?Expires=1835983228&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=RAidSFv2qRF8br-SuPrVhRpYei8pJ3EKrwx7pCwWRgFByAdu0M8AJDJqIZGHvdFw4zvOxtmYZH9UhLRiYUjQfdKavLLP8tTJKhcehvZI2VC4S3wlaXUF2zMj-ADlMH2c1QVGOGuznONqzcr6q4rWe8z2Ay7JF2Y-LYK-iVza3j8hw-cezY~lvk03N7PUL4w5ogy8oxQobc2QQ-zpi25hiIDuwH5qIHCT7~31czIk58RVjusbs65~2TGv59Os42BC~btf02fwDn6HEV5Vx1aXvuz6l7jnYfyftGaKt2ZdZXSljbU~eIZLagicrJeSyjU-fPocPhIlqiPFE8AZxW1h6Q__',
      startDate: '15 - 24 July 2025',
      duration: '9 Days - 8 Night',
      price: '₹34,999',
      locations: ['Katra', 'Pahalgam', 'Amarnath Cave'],
      region: 'South India',
      state: 'Jammu & Kashmir',
      //groupSize: '15-20 People',
      availableSeats: 12,
      featured: true,
      description: 'Seek blessings at the holy shrines of Mata Vaishno Devi and the sacred Amarnath Cave in one journey.'
    },
    {
      id: 4,
      title: 'Jaggannath Puri',
      image: 'https://cdn.shopify.com/s/files/1/1657/2397/files/Puri-Yatra-PTI.jpg?v=1531550373',
      startDate: '15 - 20 Aug 2025',
      endDate: 'September 9, 2025',
      duration: '5 Days - 4 Nights',
      price: '₹19,999',
      locations: ['Puri', 'Konark', 'Bhubaneswar'],
      region: 'East India',
      state: 'Odisha',
      //groupSize: '15-20 People',
      availableSeats: 18,
      featured: true,
      description: 'Explore the sacred Jagannath Temple in Puri and the architectural marvel of Konark Sun Temple.'
    // },
    // {
    //   id: 5,
    //   title: 'Haridwar & Rishikesh Retreat',
    //   image: 'https://images.unsplash.com/photo-1591777334841-b135c7348cd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    //   startDate: 'September 15, 2025',
    //   endDate: 'September 20, 2025',
    //   duration: '6 Days',
    //   price: '₹18,999',
    //   locations: ['Haridwar', 'Rishikesh'],
    //   region: 'North India',
    //   state: 'Uttarakhand',
    //   groupSize: '15-20 People',
    //   availableSeats: 25,
    //   featured: false,
    //   description: 'Rejuvenate your soul with a spiritual retreat in Haridwar and Rishikesh. Participate in yoga sessions and attend Ganga Aarti.'
    // },
    // {
    //   id: 6,
    //   title: 'Tirupati Balaji Darshan',
    //   image: 'https://images.unsplash.com/photo-1524492514790-8310bf594ea8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    //   startDate: 'August 20, 2025',
    //   endDate: 'August 23, 2025',
    //   duration: '4 Days',
    //   price: '₹14,999',
    //   locations: ['Tirupati', 'Chennai'],
    //   region: 'South India',
    //   state: 'Andhra Pradesh',
    //   groupSize: '15-20 People',
    //   availableSeats: 22,
    //   featured: false,
    //   description: 'Visit the richest temple in the world and seek blessings of Lord Venkateshwara at Tirupati Balaji.'
    // },
    // {
    //   id: 7,
    //   title: 'Rameshwaram & Madurai',
    //   image: 'https://images.unsplash.com/photo-1621622633934-bf3ec79c1f93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    //   startDate: 'October 10, 2025',
    //   endDate: 'October 15, 2025',
    //   duration: '6 Days',
    //   price: '₹19,999',
    //   locations: ['Rameshwaram', 'Madurai', 'Kanyakumari'],
    //   region: 'South India',
    //   state: 'Tamil Nadu',
    //   groupSize: '15-20 People',
    //   availableSeats: 18,
    //   featured: false,
    //   description: 'Experience the spiritual significance of Rameshwaram and the architectural splendor of Madurai Meenakshi Temple.'
    // },
    // {
    //   id: 8,
    //   title: 'Somnath & Dwarka',
    //   image: 'https://images.unsplash.com/photo-1600697230088-4992c83b2804?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    //   startDate: 'November 5, 2025',
    //   endDate: 'November 10, 2025',
    //   duration: '6 Days',
    //   price: '₹21,999',
    //   locations: ['Somnath', 'Dwarka', 'Porbandar'],
    //   region: 'West India',
    //   state: 'Gujarat',
    //   groupSize: '15-20 People',
    //   availableSeats: 20,
    //   featured: false,
    //   description: 'Visit the revered Jyotirlinga at Somnath and the sacred city of Dwarka, associated with Lord Krishna.'
    // },
    // {
    //   id: 9,
    //   title: 'Ujjain Mahakaleshwar',
    //   image: 'https://images.unsplash.com/photo-1625892863601-4873c69d2dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    //   startDate: 'December 5, 2025',
    //   endDate: 'December 9, 2025',
    //   duration: '5 Days',
    //   price: '₹16,999',
    //   locations: ['Ujjain', 'Omkareshwar', 'Indore'],
    //   region: 'West India',
    //   state: 'Madhya Pradesh',
    //   groupSize: '15-20 People',
    //   availableSeats: 22,
    //   featured: false,
    //   description: 'Experience the divine presence at the Mahakaleshwar Jyotirlinga in Ujjain and participate in the famous Bhasma Aarti.'
    // },
    // {
    //   id: 10,
    //   title: 'Vrindavan & Mathura',
    //   image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    //   startDate: 'January 15, 2026',
    //   endDate: 'January 19, 2026',
    //   duration: '5 Days',
    //   price: '₹14,999',
    //   locations: ['Vrindavan', 'Mathura', 'Gokul'],
    //   region: 'North India',
    //   state: 'Uttar Pradesh',
    //   groupSize: '15-20 People',
    //   availableSeats: 25,
    //   featured: false,
    //   description: 'Visit the divine land of Lord Krishna. Experience the spiritual bliss in Vrindavan and explore the ancient temples.'
    // },
    // {
    //   id: 11,
    //   title: 'Dakshin Yatra',
    //   image: 'https://images.unsplash.com/photo-1621622633934-bf3ec79c1f93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    //   startDate: 'February 10, 2026',
    //   endDate: 'February 22, 2026',
    //   duration: '13 Days',
    //   price: '₹36,999',
    //   locations: ['Chennai', 'Tirupati', 'Rameshwaram', 'Madurai', 'Kanyakumari'],
    //   region: 'South India',
    //   state: 'Multiple States',
    //   groupSize: '15-20 People',
    //   availableSeats: 18,
    //   featured: false,
    //   description: 'Experience the spiritual richness of South India with our comprehensive Dakshin <i>Yatra</i>.'
    // },
    // {
    //   id: 12,
    //   title: 'Nepal Pashupatinath',
    //   image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    //   startDate: 'March 15, 2026',
    //   endDate: 'March 22, 2026',
    //   duration: '8 Days',
    //   price: '₹24,999',
    //   locations: ['Kathmandu', 'Pashupatinath', 'Pokhara', 'Muktinath'],
    //   region: 'North India',
    //   state: 'Nepal',
    //   groupSize: '15-20 People',
    //   availableSeats: 16,
    //   featured: false,
    //   description: 'Visit the sacred Pashupatinath Temple and other spiritual sites in Nepal.'
    },
  ];

  const featuredTrips = upcomingTrips.filter(trip => trip.featured);
  
  const filteredTrips = upcomingTrips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.locations.some(loc => loc.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         trip.state.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = activeRegion === 'all' || trip.region === activeRegion;
    
    return matchesSearch && matchesRegion;
  });

  const regions = [
    { id: 'all', name: 'All Packages' },
    { id: 'North India', name: 'North India' },
    { id: 'South India', name: 'South India' },
    { id: 'East India', name: 'East India' },
    { id: 'West India', name: 'West India' },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              Upcoming <span className="text-primary">Yatras</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Plan your spiritual journey with our upcoming pilgrimage tours
            </motion.p>
          </div>

          {/* Featured Packages Section */}
          <section className="mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-2xl font-bold mb-8"
            >
              Featured Packages
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTrips.map((trip, index) => (
                <AnimatedCard key={trip.id} delay={index * 0.1}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.image} 
                      alt={trip.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {trip.title.includes('Yatra') ? (
                        <>
                          {trip.title.replace(' Yatra', '')} <i>Yatra</i>
                        </>
                      ) : trip.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin size={14} className="text-primary mr-1" />
                      <span>{trip.state}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: trip.description }}></p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center">
                        <Clock size={14} className="text-primary mr-1" />
                        <span className="text-sm">{trip.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="text-primary mr-1" />
                        <span className="text-sm">{trip.groupSize}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="text-primary mr-1" />
                        <span className="text-sm">{trip.startDate}</span>
                      </div>
                      <div className="flex items-center font-bold text-primary">
                        {trip.price}
                      </div>
                    </div>
                    
                    <Link to="/contact" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-full transition-all duration-300 block text-center">
                      Book Now
                    </Link>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </section>

          {/* Search and Filter Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div className="relative w-full md:w-80">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div className="flex overflow-x-auto space-x-2 w-full md:w-auto pb-2">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeRegion === region.id
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Package Listings Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrips.map((trip, index) => (
                <AnimatedCard key={trip.id} delay={index * 0.05}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.image} 
                      alt={trip.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {trip.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {trip.title.includes('Yatra') ? (
                        <>
                          {trip.title.replace(' Yatra', '')} <i>Yatra</i>
                        </>
                      ) : trip.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin size={14} className="text-primary mr-1" />
                      <span>{trip.state}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: trip.description }}></p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center">
                        <Clock size={14} className="text-primary mr-1" />
                        <span className="text-sm">{trip.duration}</span>
                      </div>
                      {/* <div className="flex items-center">
                        <Users size={14} className="text-primary mr-1" />
                        <span className="text-sm">{trip.groupSize}</span>
                      </div> */}
                      <div className="flex items-center">
                        <Calendar size={14} className="text-primary mr-1" />
                        <span className="text-sm">{trip.startDate}</span>
                      </div>
                      <div className="flex items-center font-bold text-primary">
                        {trip.price}
                      </div>
                    </div>
                    
                    <Link to="/contact" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-full transition-all duration-300 block text-center">
                      Book Now
                    </Link>
                  </div>
                </AnimatedCard>
              ))}
            </div>
            
            {filteredTrips.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No packages found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </section>

          {/* Call to Action */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We offer customized pilgrimage packages tailored to your specific requirements. Contact us to create your perfect spiritual journey.
            </p>
            <Link to="/contact" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center">
              Request Custom Package <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UpcomingPlans;
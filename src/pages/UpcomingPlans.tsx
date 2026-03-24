import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchAllTours } from "../frontRoutes/fetchRoutes.js";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Search,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import AnimatedCard from "../components/AnimatedCard";

const UpcomingPlans: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("all");
  const [allTours, setAllTours] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const tours = await fetchAllTours();
        setAllTours(tours ?? []);
      } catch (error) {
        // console.error("Failed to load tours", error);
        setAllTours([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTours();
  }, []);

  const featuredTrips = allTours.filter((trip) => trip.featured);

  const filteredTrips = allTours.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.locations.some((loc) =>
        loc.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      trip.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      activeRegion === "all" || trip.region === activeRegion;
    return matchesSearch && matchesRegion;
  });

  const regions = [
    { id: "all", name: "All Packages" },
    { id: "North India", name: "North India" },
    { id: "South India", name: "South India" },
    { id: "East India", name: "East India" },
    { id: "West India", name: "West India" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const imageDimension = { height: "15rem", width: "30rem" };
  const cardDimension = { height: "15rem" };
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

            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-[2rem]">
                {featuredTrips.map((trip, order: number) => (
                  <AnimatedCard key={trip._id} delay={order * 0.1}>
                    <div
                      className="relative overflow-hidden"
                      style={cardDimension}
                    >
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        style={imageDimension}
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {trip.title.includes("Yatra") ? (
                          <>
                            {trip.title.replace(" Yatra", "")} <i>Yatra</i>
                          </>
                        ) : (
                          trip.title
                        )}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin size={14} className="text-primary mr-1" />
                        <span>{trip.state}</span>
                      </div>
                      <p
                        className="text-gray-600 mb-4 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: trip.description }}
                      ></p>

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

                      <Link
                        to="/contact"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-full transition-all duration-300 block text-center"
                      >
                        Book Now
                      </Link>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            )}
          </section>

          {/* Search and Filter Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="relative w-full md:w-80">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
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
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
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
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-[2rem]">
                {filteredTrips.map((trip, index) => (
                  <AnimatedCard key={trip.id} delay={index * 0.05}>
                    <div
                      className="relative overflow-hidden"
                      style={cardDimension}
                    >
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        style={imageDimension}
                      />
                      <div className="absolute top-4 right-4 bg-white text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {trip.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {trip.title.includes("Yatra") ? (
                          <>
                            {trip.title.replace(" Yatra", "")} <i>Yatra</i>
                          </>
                        ) : (
                          trip.title
                        )}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin size={14} className="text-primary mr-1" />
                        <span>{trip.state}</span>
                      </div>
                      <p
                        className="text-gray-600 mb-4 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: trip.description }}
                      ></p>

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

                      <Link
                        to="/contact"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-full transition-all duration-300 block text-center"
                      >
                        Book Now
                      </Link>
                    </div>
                  </AnimatedCard>
                ))}
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
            <h3 className="text-2xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We offer customized pilgrimage packages tailored to your specific
              requirements. Contact us to create your perfect spiritual journey.
            </p>
            <Link
              to="/contact"
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center"
            >
              Request Custom Package <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UpcomingPlans;

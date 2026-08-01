import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react";
import ThreeJSBackground from "../components/ThreeJSBackground";
import AnimatedCard from "../components/AnimatedCard";
import PageTransition from "../components/PageTransition";
import { getReviewsHook, getToursHook, useReviewHook } from "../hooks/fetchHooks.js";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
const Home: React.FC = () => {
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const ratingFormRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [reviewForm, setReviewForm] = useState({
    name: "",
    location: "",
    rating: 5,
    quote: "",
  });
  const [isRatingFormOpen, setIsRatingFormOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewToast, setReviewToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollToWhyChooseUs = () => {
    whyChooseUsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const allTour = getToursHook()
  const { reviews, setReviews } = getReviewsHook()
  const navigate = useNavigate()
  const submitReview = useReviewHook();
  const popularTour = allTour.filter((t) => t.popular)
  // const destinations = [
  //   {
  //     id: 1,
  //     name: "Chardham Yatra",
  //     image:
  //       "https://sanjeevnitoday.com/wp-content/uploads/2024/05/Char-Dham-Yatra-Tour-Package.jpg",
  //     description:
  //       "Embark on a soul-enriching pilgrimage to Yamunotri, Gangotri, Kedarnath and Badrinath – the Char Dham of India..",
  //     rating: 4.9,
  //     duration: "13 Days",
  //     link: "/destinations/varanasi",
  //   },
  //   {
  //     id: 2,
  //     name: "Dakshin Yatra",
  //     image:
  //       "https://media-hosting.imagekit.io//ea1a764230064c4b/Untitled%20design.png?Expires=1835983228&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=RAidSFv2qRF8br-SuPrVhRpYei8pJ3EKrwx7pCwWRgFByAdu0M8AJDJqIZGHvdFw4zvOxtmYZH9UhLRiYUjQfdKavLLP8tTJKhcehvZI2VC4S3wlaXUF2zMj-ADlMH2c1QVGOGuznONqzcr6q4rWe8z2Ay7JF2Y-LYK-iVza3j8hw-cezY~lvk03N7PUL4w5ogy8oxQobc2QQ-zpi25hiIDuwH5qIHCT7~31czIk58RVjusbs65~2TGv59Os42BC~btf02fwDn6HEV5Vx1aXvuz6l7jnYfyftGaKt2ZdZXSljbU~eIZLagicrJeSyjU-fPocPhIlqiPFE8AZxW1h6Q__",
  //     description:
  //       "Visit the gateway to the Gods and witness the mesmerizing Ganga Aarti.",
  //     rating: 4.8,
  //     duration: "10 Days",
  //     link: "/destinations/South",
  //   },
  //   {
  //     id: 3,
  //     name: "Ujjain",
  //     image:
  //       "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/10/13102255/Ujjain.jpg",
  //     description:
  //       "Embark on a sacred journey to the holy cave shrine in the Himalayas.",
  //     rating: 4.9,
  //     duration: "7 Days",
  //     link: "/destinations/amarnath",
  //   },
  // ];

  const upcomingYatras = [
    {
      id: 1,
      name: "kainchi dham",
      image:
        "https://kainchidhamtours.com/assets/images/kainchi-dham_1687158479.webp",
      description: "Seek blessings at the holy shrine of Mata Vaishno Devi.",
      startDate: "20 March 2025",
      duration: "5 Days",
      link: "/upcoming-plans#kainchi dham",
    },
    {
      id: 2,
      name: "Char Dham Yatra",
      image:
        "https://sanjeevnitoday.com/wp-content/uploads/2024/05/Char-Dham-Yatra-Tour-Package.jpg",
      description:
        "Complete pilgrimage to the four sacred sites in the Himalayas.",
      startDate: "15 May, 1 June, 17 June 2025",
      duration: "13 Days",
      link: "/upcoming-plans#North",
    },
    {
      id: 3,
      name: "Jagannath Puri",
      image:
        "https://cdn.shopify.com/s/files/1/1657/2397/files/Puri-Yatra-PTI.jpg?v=1531550373",
      description: "Experience the divine aura of Lord Shiva in Varanasi.",
      startDate: "15 Aug 2025",
      duration: "6 Days",
      link: "/upcoming-plans#kashi",
    },
  ];

  const defaultTestimonials = [
    {
      id: 1,
      name: "Mitish",
      location: "Jaipure",
      quote:
        "n amazing journey! The entire tour felt like a family experience. Our tour operator, Neha Gupta, was incredibly benevolent and ensured everything possible was done for our comfort.",
      rating: 5,
    },
    {
      id: 2,
      name: "Mitra",
      location: "Bengal",
      quote:
        "From transportation to accommodation, everything was perfect. The warmth and hospitality made the trip unforgettable!",
      rating: 4,
    },
    {
      id: 3,
      name: "Amit Singh",
      location: "Jaipur",
      quote:
        "Highly professional and caring service! Felt safe and blessed throughout the tour. Will definitely book again!.",
      rating: 5,
    },
  ];

  const testimonials = reviews.length > 0 ? reviews : defaultTestimonials;

  useEffect(() => {
    const openRatingForm = () => {
      setIsRatingFormOpen(true);
      window.setTimeout(() => {
        ratingFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    };

    window.addEventListener("open-rating-form", openRatingForm);

    return () => {
      window.removeEventListener("open-rating-form", openRatingForm);
    };
  }, []);

  useEffect(() => {
    if (location.hash !== "#rating-form") {
      return;
    }

    setIsRatingFormOpen(true);

    window.setTimeout(() => {
      ratingFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }, [location.hash]);

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);

    try {
      const response = await submitReview(reviewForm);

      if (response?.success === true && response?.review) {
        setReviews((prev) => [response.review, ...prev].slice(0, 12));
        setReviewForm({
          name: "",
          location: "",
          rating: 5,
          quote: "",
        });
        setReviewToast({
          type: "success",
          message: response.message || "Thank you for your rating.",
        });
      } else {
        setReviewToast({
          type: "error",
          message: response?.message || "We could not save your rating right now.",
        });
      }
    } catch (err) {
      const message =
        (
          err as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message || "We could not save your rating right now.";

      setReviewToast({
        type: "error",
        message,
      });
    } finally {
      setIsSubmittingReview(false);
    }

    window.setTimeout(() => {
      setReviewToast(null);
    }, 3500);
  };

  return (
    <PageTransition>
      <SEO
        title="Tour Operator in Bhopal for Char Dham, Kedarnath & Religious Tours | Maa Asho Devi Dharam Yatra"
        description="Maa Asho Devi Dharam Yatra is a Bhopal tour operator for Char Dham Yatra packages from Bhopal, Kedarnath tours, religious tour packages, pilgrimage travel and family spiritual journeys across India."
        path="/"
        keywords={[
          "tour operator bhopal",
          "tour operator in bhopal",
          "bhopal tour operator",
          "travel agency bhopal",
          "best tour operator in bhopal",
          "best travel agency in bhopal",
          "religious tour packages from bhopal",
          "pilgrimage tour operator bhopal",
          "spiritual tour operator bhopal",
          "tour operator madhya pradesh",
          "tour operator in mp",
          "char dham yatra package from bhopal",
          "char dham yatra from bhopal",
          "kedarnath tour package from bhopal",
          "ujjain tour package from bhopal",
          "vrindavan tour package from bhopal",
          "family pilgrimage tours",
          "maa asho devi dharam yatra",
        ]}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": ["TravelAgency", "LocalBusiness"],
            name: "Maa Asho Devi Dharam Yatra",
            alternateName: "Maa Aasho Devi Dharam Yatra",
            url: "https://maaaashodevidharmayatra.in",
            description:
              "Bhopal-based tour operator offering Char Dham Yatra packages from Bhopal, Kedarnath tours, religious tour packages and spiritual journeys across India.",
            telephone: "+91 9131714171",
            email: "maaaashodevidharmayatra@gmail.com",
            image:
              "https://staticimg.amarujala.com/assets/images/2016/03/13/snowfall-in-kedarnath_1457875309.jpeg",
            areaServed: ["Bhopal", "Madhya Pradesh", "India"],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Om Shiva Nagar, Lal Ghati",
              addressLocality: "Bhopal",
              addressRegion: "Madhya Pradesh",
              addressCountry: "IN",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00:00",
                closes: "21:00:00",
              },
            ],
            sameAs: [
              "https://www.facebook.com/share/p/1HG3z2Q8AX/",
              "https://wa.me/message/AGFJTGPLJOE7N1",
            ],
            serviceType: [
              "Tour Operator",
              "Travel Agency",
              "Pilgrimage Tour Packages",
              "Char Dham Yatra Packages",
              "Religious Tour Packages",
            ],
            knowsAbout: [
              "Tour Operator in Bhopal",
              "Travel Agency in Bhopal",
              "Religious Tour Packages from Bhopal",
              "Pilgrimage Tour Operator Bhopal",
              "Maa Asho Devi Dharam Yatra",
              "Tour Operator in Madhya Pradesh",
              "Char Dham Yatra",
              "Char Dham Yatra from Bhopal",
              "Char Dham Yatra Package from Bhopal",
              "Kedarnath Yatra",
              "Kedarnath Tour Package from Bhopal",
              "Ujjain Tour Package from Bhopal",
              "Vrindavan Tour Package from Bhopal",
              "Pilgrimage Tours",
              "Religious Tour Packages",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Maa Asho Devi Dharam Yatra",
            url: "https://maaaashodevidharmayatra.in",
            inLanguage: "en-IN",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://maaaashodevidharmayatra.in/blog",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Which pilgrimage packages can travellers book from Bhopal?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Maa Asho Devi Dharam Yatra offers spiritual journeys from Bhopal including Char Dham, Kedarnath, Ujjain, Vrindavan, Nepal and other family-oriented religious tours.",
                },
              },
              {
                "@type": "Question",
                name: "Are the tours suitable for families and senior citizens?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The company focuses on family-friendly pilgrimage planning with support for elders, route guidance, and organized travel assistance.",
                },
              },
              {
                "@type": "Question",
                name: "How can travellers ask for a custom yatra plan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Travellers can use the contact page to discuss dates, destinations, and customized religious tour packages from Bhopal.",
                },
              },
            ],
          },
        ]}
      />
      <div className="relative">
        <ThreeJSBackground />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>

          <div className="container mx-auto px-4 z-10 text-center -translate-y-[5rem]">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Maa Aashodevi <span className="gradient-text">Dharma Yatra</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-md md:text-md mb-8 max-w-3xl mx-auto"
            >
              <b style={{ color: "#1f1f1f" }}>Book</b> Char Dham Yatra packages
              from Bhopal, Kedarnath tours, Ujjain, Vrindavan and other{" "}
              <b style={{ color: "#1f1f1f" }}>religious tour packages across India</b>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/upcoming-plans"
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Packages
              </Link>
              <button
                onClick={()=>navigate("/contact")}
                className="bg-transparent hover:bg-white/10 text-gray-800 font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-300"
              >
                Contact Us
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-0 right-0 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight
                size={30}
                className="transform rotate-90 text-primary"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Destinations */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Popular <span className="text-primary">स्थान</span>
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                <b style={{ color: "#1f1f1f" }}>Book</b> Affordable Pilgrimage
                Packages <b style={{ color: "#1f1f1f" }}>Across India with</b>{" "}
                Best Deals, Comfort and Quality Services
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mr-2 ml-2">
              {popularTour.map((destination, order: Number) => (
                <AnimatedCard key={destination._id} delay={order * 0.1}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-md">
                      <Star
                        size={16}
                        className="text-yellow-500 mr-1"
                        fill="#FBBF24"
                      />
                      <span className="font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <div className="flex items-center text-gray-600">
                        <Calendar size={16} className="mr-1" />
                        <span>{destination.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {destination.description}
                    </p>
                    <Link
                      to="/upcoming-plans"
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      Explore More <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Yatras */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 w-[95%]">
            <div className="text-center mb-16">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Upcoming <span className="text-primary">Yatras</span>
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Join our upcoming spiritual journeys to experience divine
                blessings
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingYatras.map((yatra, index) => (
                <AnimatedCard key={yatra.id} delay={index * 0.1}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={yatra.image}
                      alt={yatra.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-md">
                      <Calendar size={16} className="text-primary mr-1" />
                      <span className="font-medium">{yatra.duration}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{yatra.name}</h3>
                    <p className="text-gray-600 mb-4">{yatra.description}</p>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar size={16} className="mr-1" />
                      <span>Starting: {yatra.startDate}</span>
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

            <div className="text-center mt-8">
              <Link
                to="/upcoming-plans"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                View All Upcoming Yatras{" "}
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section ref={whyChooseUsRef} className="py-20" id="why-choose-us">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose{" "}
                  <span className="text-primary">Maa Aaasho Devi</span> for Your
                  Dharmic Yatra
                </h2>
                <p className="text-gray-600 mb-8">
                  <b>With 10+ Years of Trusted Pilgrimage Experience,</b> we
                  have been Serving devotees with well-organized religious tours
                  for over a decade.
                </p>

                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Users size={24} className="text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Purely Spiritual and Family-Friendly Journeys
                      </h3>
                      <p>
                        {" "}
                        <b className="text-xl font-light mb-2">
                          safe, peaceful, and devotional
                        </b>{" "}
                        experience for families.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin size={24} className="text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Pan-India Religious Destinations
                      </h3>
                      <p>
                        From
                        <b className="text-xl font-light mb-2">
                          {" "}
                          Kashmir to Kanyakumari
                        </b>{" "}
                        we cover all major
                        <b className="text-xl font-light mb-2">
                          {" "}
                          temples, shrines, and sacred places.
                        </b>
                        providing a{" "}
                        <b className="text-xl font-light mb-2">
                          diverse spiritual experience.
                        </b>
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Calendar size={24} className="text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Affordable and Family-Friendly Packages
                      </h3>
                      <p>
                        Our tours are
                        <b className="text-xl font-light mb-2">
                          {" "}
                          budget-friendly
                        </b>{" "}
                        offering
                        <b className="text-xl font-light mb-2">
                          {" "}
                          comfortable travel, pure vegetarian meals, and special
                          care for elders and children.
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src="https://www.dynamitenews.com/images/2016/01/26/dn-dn-darshan-kedarnath-temple-uttarakhand/1453812278_Gozer_Kedarnath-Temple_Ice.jpg"
                  alt="Spiritual Journey"
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                  <div className="flex items-center mb-3">
                    <Star
                      size={20}
                      className="text-yellow-500 mr-1"
                      fill="#FBBF24"
                    />
                    <Star
                      size={20}
                      className="text-yellow-500 mr-1"
                      fill="#FBBF24"
                    />
                    <Star
                      size={20}
                      className="text-yellow-500 mr-1"
                      fill="#FBBF24"
                    />
                    <Star
                      size={20}
                      className="text-yellow-500 mr-1"
                      fill="#FBBF24"
                    />
                    <Star
                      size={20}
                      className="text-yellow-500 mr-1"
                      fill="#FBBF24"
                    />
                  </div>
                  <p className="text-gray-700 italic">
                    "The best spiritual tour operator I've ever experienced.
                    Truly life-changing journeys."
                  </p>
                  <div className="mt-3 font-medium">- Arti, Bhopal</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-testimonial-pattern bg-cover bg-fixed relative">
          <div className="absolute inset-0 bg-gray-900/70"></div>
          <div className="container mx-auto px-4 relative z-10">
            {reviewToast ? (
              <div className="mb-6 flex justify-center">
                <div
                  className={`rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${reviewToast.type === "success"
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                    }`}
                >
                  {reviewToast.message}
                </div>
              </div>
            ) : null}
            <div className="text-center mb-16">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                What Our <span className="text-primary">Pilgrims Say</span>
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-300 max-w-2xl mx-auto"
              >
                Hear from those who have experienced spiritual transformation
                through our guided tours
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimatedCard
                  key={testimonial._id || testimonial.id}
                  delay={index * 0.1}
                  className="bg-white/95"
                >
                  <div className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="text-yellow-500 mr-1"
                          fill="#FBBF24"
                        />
                      ))}
                    </div>
                    <p
                      className="text-gray-700 italic mb-4"
                      dangerouslySetInnerHTML={{ __html: testimonial.quote }}
                    ></p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              id="rating-form"
              ref={ratingFormRef}
              className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white/95 p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Share Your Rating
                </h3>
                <button
                  type="button"
                  onClick={() => setIsRatingFormOpen((prev) => !prev)}
                  className="rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  {isRatingFormOpen ? "Hide Form" : "Give Rating"}
                </button>
              </div>
              {isRatingFormOpen ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      value={reviewForm.name}
                      onChange={handleReviewChange}
                      placeholder="Your name"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      name="location"
                      value={reviewForm.location}
                      onChange={handleReviewChange}
                      placeholder="Your city"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <select
                    name="rating"
                    value={reviewForm.rating}
                    onChange={handleReviewChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                  <textarea
                    name="quote"
                    value={reviewForm.quote}
                    onChange={handleReviewChange}
                    placeholder="Write your remark"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="w-full rounded-full bg-primary py-3 font-medium text-white transition-all duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmittingReview ? "Saving..." : "Submit Rating"}
                  </button>
                </form>
              ) : (
                <p className="text-gray-600">
                  Click the button above or use the navbar Rating button to open
                  the review form and share your stars and remark.
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-10 md:p-16 text-center text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Begin Your Spiritual Journey?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join us for a transformative experience that will{" "}
                <b className="text-xl font-Regular mb-1">nourish your soul </b>
                and create memories to last a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-primary hover:bg-white/90 font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Contact Us
                </Link>
                <Link
                  to="/upcoming-plans"
                  className="bg-transparent hover:bg-white/10 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-white"
                >
                  View Upcoming Tours
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;

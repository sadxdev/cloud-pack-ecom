import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    title: 'Eco-Friendly Food Packaging',
    description: 'Sustainable, reusable, and food-grade packaging designed for modern restaurants.',
    cta: 'Explore Products',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1600',
  },
  {
    title: 'Premium Containers for Daily Use',
    description: 'Minimal, durable, and safe packaging that elevates your brand experience.',
    cta: 'View Collections',
    image: 'https://images.unsplash.com/photo-1616627454510-6cbb8dd0e65b?q=80&w=1600',
  },
  {
    title: 'Built for Restaurants & Cloud Kitchens',
    description: 'Trusted by food businesses for hygiene, durability, and sustainability.',
    cta: 'Get Started',
    image: 'https://images.unsplash.com/photo-1604908177522-0407a08a9cda?q=80&w=1600',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Eco Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(216,199,166,0.55)_0%,rgba(231,214,180,0.35)_45%,rgba(0,0,0,0.4)_100%)]" />

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-6 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg text-[#F5EFE6]">{slide.description}</p>

              <div className="mt-8 flex gap-4">
                <button
                  className="
                    bg-[#1F2937] text-[#D8C7A6]
                    px-6 py-3
                    rounded-lg
                    font-medium
                    shadow-[0_4px_0_rgba(0,0,0,0.3)]
                    hover:bg-black
                    hover:-translate-y-[1px]
                    active:translate-y-0 active:shadow-none
                    transition-all duration-200
                    flex items-center gap-2
                  "
                >
                  {slide.cta}
                  <ArrowRight size={18} />
                </button>

                <button
                  className="
                    bg-[#F5EFE6]/90 text-[#1F2937]
                    px-6 py-3
                    rounded-lg
                    hover:bg-[#E7D6B4]
                    transition
                  "
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              index === current ? 'bg-[#D8C7A6]' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

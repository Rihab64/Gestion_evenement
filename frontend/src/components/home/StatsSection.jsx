
import React, { useRef, useEffect, useState } from 'react';

const stats = [
  { id: 1, label: "Événements organisés", value: 2500 },
  { id: 2, label: "Prestataires vérifiés", value: 850 },
  { id: 3, label: "Clients satisfaits", value: 1950 },
  { id: 4, label: "Économie moyenne", value: 20 },
];

const StatsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const intervals = stats.map((stat, idx) => {
      return setInterval(() => {
        setCounts(prev => {
          const newCounts = [...prev];
          if (newCounts[idx] < stat.value) {
            const increment = Math.max(1, Math.floor(stat.value / 50));
            newCounts[idx] = Math.min(newCounts[idx] + increment, stat.value);
          } else {
            clearInterval(intervals[idx]);
          }
          return newCounts;
        });
      }, 30);
    });
    
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-purple-900 to-purple-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">EventHub en chiffres</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Des milliers de personnes nous font confiance pour leurs événements importants
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {counts[idx].toLocaleString()}
                {stat.id === 4 && '%'}
              </div>
              <p className="text-lg opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

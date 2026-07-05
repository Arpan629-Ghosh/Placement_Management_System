import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Navbar,
  HeroSection,
  RecruitersSection,
  Footer,
} from "@/components/landing";
import ProductFeatures from "../../../components/landing/ProductFeatures";
import ProductDemo from "../../../components/landing/ProductDemo";

const Landing = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.role) return;
    navigate(`/${user.role}/dashboard`, { replace: true });
  }, [user, navigate]);

  if (user?.role) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      <Navbar />

      <main className="pt-0">
        <section id="home">
          <HeroSection />
        </section>

        <RecruitersSection />

        <section id="features">
          <ProductFeatures />
        </section>

        <section id="demo">
          <ProductDemo />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;

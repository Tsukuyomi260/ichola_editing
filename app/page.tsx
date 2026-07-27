'use client';

import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Works from '@/components/Works';
import Clients from '@/components/Clients';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import CTABand from '@/components/CTABand';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="accueil">
        <Hero />
        <Stats />
        <Works />
        <Clients />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <CTABand />
      <Footer />
      <Modal />
    </>
  );
}

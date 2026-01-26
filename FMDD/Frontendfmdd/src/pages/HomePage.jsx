import React from 'react';
import Layout from './Layout';
import Hero from '../components/home/Hero';
import AboutFMDD from '../components/home/AboutFMDD';
import ActionDomains from '../components/home/ActionDomains';
import TargetAudience from '../components/home/TargetAudience';
import Stats from '../components/home/Stats';
import FeaturedProjects from '../components/home/FeaturedProjects';
import FeaturedCourses from '../components/home/FeaturedCourses';
import Testimonials from '../components/home/Testimonials';
import GalleryPreview from '../components/home/GalleryPreview';

const HomePage = () => {
    return (
        <main className="bg-gray-50 text-blue-950">
            <Hero />
            <AboutFMDD />
            <Stats />
            <ActionDomains />
            <TargetAudience />
            <FeaturedProjects />
            <FeaturedCourses />
            <Testimonials />
            <GalleryPreview />
        </main>
    );
};

export default HomePage;
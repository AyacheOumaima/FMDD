import React from 'react';
import CountUp from 'react-countup';
import { Users, BookOpen, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Stats() {
  const { language } = useLanguage();

  const data = [
    { icon: <Users size={40} />, value: 5000, suffix: '+', label: { FR: 'Apprenants', EN: 'Learners', AR: 'المتعلمين' } },
    { icon: <BookOpen size={40} />, value: 45, label: { FR: 'Formations', EN: 'Courses', AR: 'الدورات' } },
    { icon: <Award size={40} />, value: 18, label: { FR: 'Projets', EN: 'Projects', AR: 'المشاريع' } },
  ];

  const StatsH2 = {
    FR: 'Notre impact en chiffres',
    EN: 'Our Impact in Numbers',
    AR: 'تأثيرنا بالأرقام',
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-950 mb-12">
          {StatsH2[language] || StatsH2.FR}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map(({ icon, value, suffix = '', label }, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-cyan-500 mb-4">{icon}</div>

              <div className="text-4xl font-bold text-blue-950 mb-2">
                <CountUp end={value} duration={2.5} suffix={suffix} />
              </div>

              <div className="text-gray-600 font-medium">
                {label[language] || label.FR}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

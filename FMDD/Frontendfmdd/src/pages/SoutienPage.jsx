import React from 'react';
import Layout from './Layout';
import { useLanguage } from '../contexts/LanguageContext';


export default function SoutienPage() {
  const { language } = useLanguage();
  const lang = ["FR","EN","AR"].includes(language) ? language : "FR";

  const traduction = {
    FR:{
      support: {
      title: {
        main: "Soutien"
      },
      subtitle: "Comment nous soutenir ?",
      items: {
        financial: {
          title: "1. Soutien financier",
          text: "Vous pouvez nous soutenir financièrement en faisant un don ou en devenant mécène."
        },
        skills: {
          title: "2. Soutien en compétences",
          text: "Partagez vos compétences en nous aidant dans nos projets ou en formant nos bénéficiaires."
        },
        material: {
          title: "3. Soutien matériel",
          text: "Vous pouvez nous aider en nous fournissant du matériel ou des ressources pour nos formations."
        },
        partnership: {
          title: "4. Partenariat",
          text: "Devenez partenaire de FMDD et participez à notre mission d'insertion professionnelle."
        }
      }
      }
    },
    EN:{
      support: {
      title: {
        main: "Support"
      },
      subtitle: "How to support us ?",
      items: {
        financial: {
          title: "1. Financial support",
          text: "You can support us financially by making a donation or becoming a patron."
        },
        skills: {
          title: "2. Skills support",
          text: "Share your skills by helping us with our projects or by training our beneficiaries."
        },
        material: {
          title: "3. Material support",
          text: "You can help us by providing materials or resources for our training courses."
        },
        partnership: {
          title: "4. Partnership",
          text: "Become a partner of FMDD and participate in our mission of professional integration."
        }
      }
      }
    },
    AR:{
      support: {
      title: {
        main: "يدعم"
      },
      subtitle: "كيف يمكنك دعمنا؟",
      items: {
        financial: {
          title: "1. الدعم المالي",
          text: "يمكنكم دعمنا مالياً عن طريق التبرع أو أن تصبحوا راعياً."
        },
        skills: {
          title: "2. دعم المهارات",
          text: "شاركنا مهاراتك من خلال مساعدتنا في مشاريعنا أو من خلال تدريب المستفيدين من خدماتنا."
        },
        material: {
          title: "3. الدعم المادي",
          text: "يمكنكم مساعدتنا من خلال توفير المواد أو الموارد اللازمة لدوراتنا التدريبية."
        },
        partnership: {
          title: "4. الشراكة",
          text: "انضم إلى شركاء FMDD وشارك في مهمتنا المتمثلة في التكامل المهني."
        }
      }
      }
    }
  };
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{traduction[lang].support.title.main}</h1>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{traduction[lang].support.subtitle}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{traduction[lang].support.items.financial.title}</h3>
                <p className="text-gray-600">
                  {traduction[lang].support.items.financial.text}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{traduction[lang].support.items.skills.title}</h3>
                <p className="text-gray-600">
                  {traduction[lang].support.items.skills.text}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{traduction[lang].support.items.material.title}</h3>
                <p className="text-gray-600">
                  {traduction[lang].support.items.material.text}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{traduction[lang].support.items.partnership.title}</h3>
                <p className="text-gray-600">
                  {traduction[lang].support.items.partnership.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
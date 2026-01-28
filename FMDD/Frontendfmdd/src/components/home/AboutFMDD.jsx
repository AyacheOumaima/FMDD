import { Target, Heart, Lightbulb, Shield, Quote } from 'lucide-react';
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AboutFMDD() {
  const { language } = useLanguage();
  const lang = ["FR","EN","AR"].includes(language) ? language : "FR";

  const texts = {
    FR: {
      headerTitle: "Le FMDD en bref",
      headerDesc: "Découvrez qui nous sommes, notre mission et les valeurs qui nous guident dans notre engagement pour un développement durable au Maroc.",
      missions: [
        { title: "Former", desc: "Développer les compétences utiles pour aujourd'hui et demain à travers des programmes de formation innovants et adaptés aux besoins du marché." },
        { title: "Accompagner", desc: "Encadrer les projets innovants jusqu'à leur réussite grâce à notre expertise en coaching, incubation et développement de solutions durables." },
        { title: "Insérer", desc: "Connecter les talents aux opportunités professionnelles et créer des ponts entre les compétences et les besoins du marché de l'emploi." },
      ],
      coreValuesTitle: "Nos valeurs fondamentales",
      coreValuesDesc: "Les principes qui guident chacune de nos actions",
      values: [
        { title: "Responsabilité", desc: "Agir avec impact réel" },
        { title: "Solidarité", desc: "Avancer collectivement" },
        { title: "Innovation", desc: "Penser et faire autrement" },
        { title: "Inclusion", desc: "Ne laisser personne à l'écart" },
      ],
      presidentQuote: `"Le FMDD a été fondé pour valoriser les talents locaux, encourager l'innovation durable et bâtir une société plus juste. Grâce à nos programmes de formation et de mobilisation citoyenne, nous construisons ensemble les solutions de demain."`,
      presidentName: "ES-SAFI Naim",
      presidentTitle: "Président du FMDD"
    },
    EN: {
      headerTitle: "FMDD in brief",
      headerDesc: "Discover who we are, our mission, and the values guiding our commitment to sustainable development in Morocco.",
      missions: [
        { title: "Train", desc: "Develop useful skills for today and tomorrow through innovative training programs adapted to market needs." },
        { title: "Support", desc: "Guide innovative projects to success through our expertise in coaching, incubation, and sustainable solution development." },
        { title: "Integrate", desc: "Connect talents to professional opportunities and build bridges between skills and labor market needs." },
      ],
      coreValuesTitle: "Our core values",
      coreValuesDesc: "The principles guiding each of our actions",
      values: [
        { title: "Responsibility", desc: "Act with real impact" },
        { title: "Solidarity", desc: "Move forward collectively" },
        { title: "Innovation", desc: "Think and act differently" },
        { title: "Inclusion", desc: "Leave no one behind" },
      ],
      presidentQuote: `"FMDD was founded to highlight local talents, encourage sustainable innovation, and build a fairer society. Through our training and civic engagement programs, we are building tomorrow's solutions together."`,
      presidentName: "ES-SAFI Naim",
      presidentTitle: "FMDD President"
    },
    AR: {
      headerTitle: "منظمة FMDD باختصار",
      headerDesc: "اكتشف من نحن، مهمتنا والقيم التي توجه التزامنا بالتنمية المستدامة في المغرب.",
      missions: [
        { title: "التكوين", desc: "تطوير المهارات المفيدة اليوم وغدًا من خلال برامج تدريب مبتكرة ومتوافقة مع احتياجات السوق." },
        { title: "الدعم", desc: "إرشاد المشاريع المبتكرة نحو النجاح من خلال خبرتنا في التدريب، الحاضنات، وتطوير الحلول المستدامة." },
        { title: "الدمج", desc: "ربط المواهب بالفرص المهنية وخلق جسور بين المهارات واحتياجات سوق العمل." },
      ],
      coreValuesTitle: "قيمنا الأساسية",
      coreValuesDesc: "المبادئ التي توجه كل أعمالنا",
      values: [
        { title: "المسؤولية", desc: "العمل بتأثير حقيقي" },
        { title: "التضامن", desc: "التقدم جماعياً" },
        { title: "الابتكار", desc: "التفكير والفعل بشكل مختلف" },
        { title: "الشمول", desc: "عدم ترك أي شخص خلف الركب" },
      ],
      presidentQuote: `"تأسست FMDD لتسليط الضوء على المواهب المحلية، وتشجيع الابتكار المستدام، وبناء مجتمع أكثر عدلاً. من خلال برامجنا التدريبية والمشاركة المدنية، نبني معاً حلول الغد."`,
      presidentName: "أس-صافي نعيم",
      presidentTitle: "رئيس FMDD"
    }
  };

  return (
    <section className="py-16 bg-white" dir={lang === "AR" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* En-tête de section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">{texts[lang].headerTitle}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{texts[lang].headerDesc}</p>
          </div>

          {/* Mission tripartite */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {texts[lang].missions.map((mission, i) => (
              <div key={i} className={`text-center p-8 rounded-2xl hover:shadow-lg transition-shadow ${
                i===0 ? "bg-amber-50" : i===1 ? "bg-teal-50" : "bg-emerald-50"
              }`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                  i===0 ? "bg-amber-500" : i===1 ? "bg-teal-600" : "bg-emerald-600"
                }`}>
                  {i===0 && <Target className="w-8 h-8 text-white" />}
                  {i===1 && <Lightbulb className="w-8 h-8 text-white" />}
                  {i===2 && <Heart className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-4">{mission.title}</h3>
                <p className="text-gray-600 leading-relaxed">{mission.desc}</p>
              </div>
            ))}
          </div>

          {/* Valeurs fondamentales */}
          <div className="bg-blue-50 rounded-3xl p-8 md:p-12 mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">{texts[lang].coreValuesTitle}</h3>
              <p className="text-gray-600">{texts[lang].coreValuesDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {texts[lang].values.map((val, i) => (
                <div key={i} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                    i===0 ? "bg-amber-100" : i===1 ? "bg-teal-100" : i===2 ? "bg-blue-100" : "bg-emerald-100"
                  }`}>
                    {i===0 && <Shield className="w-6 h-6 text-amber-600" />}
                    {i===1 && <Heart className="w-6 h-6 text-teal-600" />}
                    {i===2 && <Lightbulb className="w-6 h-6 text-blue-600" />}
                    {i===3 && <Target className="w-6 h-6 text-emerald-600" />}
                  </div>
                  <h4 className="text-lg font-semibold text-blue-950 mb-2">{val.title}</h4>
                  <p className="text-sm text-gray-600">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mot du Président */}
          <div className="bg-amber-50 rounded-3xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="w-12 h-12 text-amber-500 mx-auto mb-6" />
              <blockquote className="text-xl md:text-2xl text-blue-950 font-medium leading-relaxed mb-6">
                {texts[lang].presidentQuote}
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="font-bold text-blue-950 text-lg">{texts[lang].presidentName}</p>
                  <p className="text-gray-600">{texts[lang].presidentTitle}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

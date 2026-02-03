import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import axios from 'axios';
import TemoignageCard from '../components/TestimonialCard';
import { useLanguage } from '../contexts/LanguageContext';




export default function TemoignagesPage () {
  axios.defaults.withCredentials = true; // Pour envoyer les cookies
  axios.defaults.baseURL = 'http://localhost:8000'; // Base URL backend Laravel
  // Données constantes
  const grande_Description = "Découvrez les témoignages de personnes qui ont bénéficié des programmes du FMDD. Ces histoires illustrent l'impact concret de nos actions sur les individus, les organisations et les communautés à travers le Maroc.";
  
  const { language } = useLanguage();
  const lang = ["FR","EN","AR"].includes(language) ? language : "FR";
  const testimonial = {
    FR:[{
      id: 1,
      quote: "Les formations du FMDD m'ont aidé à développer des compétences essentielles pour l'économie verte. Aujourd'hui, je travaille dans une entreprise qui valorise le développement durable.",
      author: "Karim Benali",
      role: "Ingénieur en énergies renouvelables",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Professionnels"
    },
    {
      id: 2,
      quote: "Grâce aux ateliers du FMDD, j'ai pu lancer mon entreprise sociale qui recycle les déchets plastiques...",
      author: "Fatima Zahra",
      role: "Fondatrice de EcoPlast",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Entrepreneurs"
    },
    {
      id: 3,
      quote: "Le programme d'insertion professionnelle du FMDD a été une révélation pour moi...",
      author: "Omar Tazi",
      role: "Responsable RSE",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Professionnels"
    },
    {
      id: 4,
      quote: "En tant qu'enseignante, j'ai pu intégrer les concepts du développement durable dans mes cours...",
      author: "Amina Boudiab",
      role: "Enseignante en sciences",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Éducateurs"
    },
    {
      id: 5,
      quote: "Le soutien du FMDD a été crucial pour notre communauté...",
      author: "Hassan Oumari",
      role: "Président d'association villageoise",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Communautés"
    },
    {
      id: 6,
      quote: "Les formations en ligne du FMDD sont exceptionnelles...",
      author: "Leila Mansouri",
      role: "Étudiante en master",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
      video: "https://player.vimeo.com/video/76979871?background=1",
      category: "Étudiants"
    }],
    AN:[{
      id: 1,
      quote: "The FMDD training courses helped me develop essential skills for the green economy. Today, I work in a company that values ​​sustainable development.",
      author: "Karim Benali",
      role: "Renewable Energy Engineer",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Professionals"
    },
    {
      id: 2,
      quote: "Thanks to the FMDD workshops, I was able to launch my social enterprise that recycles plastic waste...",
      author: "Fatima Zahra",
      role: "Founder of EcoPlast",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Entrepreneurs"
    },
    {
      id: 3,
      quote: "The FMDD's professional integration program was a revelation for me...",
      author: "Omar Tazi",
      role: "CSR Manager",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Professionals"
    },
    {
      id: 4,
      quote: "As a teacher, I was able to integrate the concepts of sustainable development into my courses...",
      author: "Amina Boudiab",
      role: "Science teacher",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Educators"
    },
    {
      id: 5,
      quote: "The support of the FMDD has been crucial for our community...",
      author: "Hassan Oumari",
      role: "President of village association",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Communities"
    },
    {
      id: 6,
      quote: "The FMDD's online courses are exceptional...",
      author: "Leila Mansouri",
      role: "Master's student",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
      video: "https://player.vimeo.com/video/76979871?background=1",
      category: "Students"
    }],
    AR:[{
      id: 1,
      quote: "ساعدتني دورات التدريب التي تقدمها مؤسسة FMDD على تطوير مهارات أساسية للاقتصاد الأخضر. واليوم، أعمل في شركة تُولي أهمية كبيرة للتنمية المستدامة.",
      author: "كريم بنعلي",
      role: "مهندس طاقة متجددة",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "المهنيين"
    },
    {
      id: 2,
      quote: "بفضل ورش عمل FMDD، تمكنت من إطلاق مشروعي الاجتماعي الذي يعيد تدوير النفايات البلاستيكية...",
      author: "فاطمة الزهراء",
      role: "مؤسس شركة إيكوبلاست",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "رواد الأعمال"
    },
    {
      id: 3,
      quote: "كان برنامج التكامل المهني التابع لـ FMDD بمثابة اكتشاف بالنسبة لي...",
      author: "عمر التازي",
      role: "مدير المسؤولية الاجتماعية للشركات",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "المهنيين"
    },
    {
      id: 4,
      quote: "بصفتي معلمة، تمكنت من دمج مفاهيم التنمية المستدامة في دروسي...",
      author: "أمينة بودياب",
      role: "مدرس العلوم",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "التعليم"
    },
    {
      id: 5,
      quote: "كان دعم مؤسسة FMDD بالغ الأهمية لمجتمعنا...",
      author: "حسن العمري",
      role: "رئيس جمعية villageoise",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "المجتمعات"
    },
    {
      id: 6,
      quote: "دورات FMDD عبر الإنترنت استثنائية...",
      author: "ليلى المنصوري",
      role: "طالب ماجستير",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
      video: "https://player.vimeo.com/video/76979871?background=1",
      category: "طلاب"
    }]
  };
  // États pour le formulaire
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const [titre, setTitre] = useState('');
  const [temoignage, setTemoignage] = useState('');
  const [messageRetour, setMessageRetour] = useState(''); // <-- Pour afficher message de succès/erreur

  // États pour les témoignages
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Préparer les données à envoyer au backend
    const data = {
      Titre: titre,
      Description: temoignage,
      Image_url: '' // tu peux ajouter un champ image dans le formulaire si besoin
    };

    const ErrorTR = {
      FR:{
        FirstsetMessageRetour:"Témoignage envoyé avec succès !",
        FirstConsole:"Réponse API :",
        SecondConsole:"Erreur lors de l'envoi:",
        SecondsetMessageRetour:"Erreur lors de l'envoi du témoignage."
      },
      AN:{
        FirstsetMessageRetour:"Témoignage envoyé avec succès !",
        FirstConsole:"Réponse API :",
        SecondConsole:"Erreur lors de l'envoi:",
        SecondsetMessageRetour:"Erreur lors de l'envoi du témoignage."
      },
      AR:{
        FirstsetMessageRetour:"تم إرسال الشهادة بنجاح!",
        FirstConsole:"استجابة واجهة برمجة التطبيقات:",
        SecondConsole:"خطأ في الإرسال:",
        SecondsetMessageRetour:"حدث خطأ أثناء إرسال الشهادة."
      }
    }
    try {
      // Requête POST vers API Laravel
      const response = await axios.post('http://localhost:8000/api/temoignages', data);

      setMessageRetour(ErrorTR[lang].FirstsetMessageRetour);
      setTitre('');
      setTemoignage('');
      setAfficherFormulaire(false);

      console.log(ErrorTR[lang].FirstConsole, response.data);

      // Tu peux ici recharger la liste ou mettre à jour localement
    } catch (error) {
      console.error(ErrorTR[lang].SecondConsole, error);
      setMessageRetour(ErrorTR[lang].SecondsetMessageRetour);
    }
  };
  // Filtrage des témoignages selon la catégorie choisie (avant traduction)
  const MES = {FR:"Tous", AN:"All", AR:"الجميع"}
  const data = testimonial[lang] || testimonial.FR;
  const filteredTestimonials = selectedCategory === MES[lang]
    ? data
    : data.filter(t => t.category === selectedCategory);

  // last Filtrage des témoignages selon la catégorie choisie (apres traduction)
  
    {/*const filteredTestimonials = selectedCategory === "Tous"
      ? testimonial
      : testimonial.filter(t => t.category === selectedCategory);*/}

  // Fonction pour gérer la lecture/pause de la vidéo vedette
  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const texts = {
    FR:{
      testImage:"Témoignages",
      ContenuPrincipal:{
        FirstTitle:"Témoignage Vedette",
        SecondTitle:"L'impact du FMDD sur mon parcours",
        FirstParg:"Je suis venue au FMDD avec une idée simple pour réduire les déchets plastiques...",
        ThirdTitle:"Fatima Zahra",
        SecondParg:"Fondatrice de EcoPlast"
      },
      Formulaire:{
        Bottom:"Partager mon expérience",
        Form:{
          FirstLabel:"Titre du témoignage",
          FirstPlac:"Ex. Mon expérience au forum",
          SecondLabel:"Votre témoignage",
          SecondPlac:"Décrivez votre expérience ici...",
          Buttom:"Envoyer le témoignage"
        }
      },
      MessAuTeTr:"Aucun témoignage dans cette catégorie."
    },
    AN:{
      testImage:"Testimonials",
      ContenuPrincipal:{
        FirstTitle:"Star Testimonial",
        SecondTitle:"The impact of FMDD on my career",
        FirstParg:"I came to the FMDD with a simple idea to reduce plastic waste...",
        ThirdTitle:"Fatima Zahra",
        SecondParg:"Founder of EcoPlast"
      },
      Formulaire:{
        Bottom:"Share my experience",
        Form:{
          FirstLabel:"Title of testimony",
          FirstPlac:"For example, my experience at the forum.",
          SecondLabel:"Your testimony",
          SecondPlac:"Describe your experience here...",
          Buttom:"Send the testimonial"
        }
      },
      MessAuTeTr:"No testimonials in this category."
    },
    AR:{
      testImage:"الشهادات",
      ContenuPrincipal:{
        FirstTitle:"شهادة نجمة",
        SecondTitle:"تأثير FMDD على مسيرتي المهنية",
        FirstParg:"أتيت إلى منظمة FMDD بفكرة بسيطة للحد من النفايات البلاستيكية...",
        ThirdTitle:"فاطمة الزهراء",
        SecondParg:"مؤسس شركة إيكوبلاست"
      },
      Formulaire:{
        Bottom:"شارك تجربتي",
        Form:{
          FirstLabel:"عنوان الشهادة",
          FirstPlac:"على سبيل المثال، تجربتي في المنتدى",
          SecondLabel:"شهادتك",
          SecondPlac:"صف تجربتك هنا...",
          Buttom:"أرسل الشهادة"
        }
      },
      MessAuTeTr:"لا توجد شهادات في هذه الفئة."
    }
  }
  const GrilleTemoignages = {
    FR:{
      FirstTemoignageCard:{
        quote:"C'était une expérience incroyable grâce au FMDD !",
        author:"Leila 🌸 Benali",
        role:"Chercheuse en développement durable"
      },
      SecondTemoignageCard:{
        quote:"j'ai beaucoup appris grace a cette formation",
        author:"Luca Benali",
        role:"Manager IT"
      }
    },
    AN:{
      FirstTemoignageCard:{
        quote:"It was an incredible experience thanks to the FMDD!",
        author:"Leila 🌸 Benali",
        role:"Sustainable Development Researcher"
      },
      SecondTemoignageCard:{
        quote:"I learned a lot from this training.",
        author:"Luca Benali",
        role:"IT Manager"
      }
    },
    AR:{
      FirstTemoignageCard:{
        quote:"لقد كانت تجربة رائعة بفضل FMDD!",
        author:"ليلى 🌸 بينالي",
        role:"باحث في التنمية المستدامة"
      },
      SecondTemoignageCard:{
        quote:"لقد تعلمت الكثير من هذا التدريب.",
        author:"لوكا بنعلي",
        role:"مدير تكنولوجيا المعلومات"
      }
    }
  }

  return (
    <div className="bg-blue-light min-h-screen">
      <div className="relative">
        {/* Image de fond */}
        <img
          src="https://images.pexels.com/photos/3861467/pexels-photo-3861467.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Image professionnelle"
          className="w-full h-[400px] object-cover rounded-lg"
        />

        {/* Texte sur l'image */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center bg-black bg-opacity-50 text-white p-6">
          <h1 className="ml-[60px] mt-30 text-white text-3xl md:text-4xl font-poppins font-bold mb-6">
            {texts[lang].testImage}
          </h1>
          <p className="ml-[60px] mt-0 text-white text-center max-w-3xl">
            {grande_Description}
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Témoignage vedette */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-poppins font-semibold text-blue-dark mb-4">{texts[lang].ContenuPrincipal.FirstTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-blue-dark">
                <img
                  src="https://images.pexels.com/photos/3861448/pexels-photo-3861448.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Témoignage vidéo"
                  className="w-full h-full object-cover opacity-70"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={toggleVideoPlay}
                  aria-label={isPlaying ? "Pause la vidéo" : "Jouer la vidéo"}
                >
                  <div className="bg-white bg-opacity-90 rounded-full p-4">
                    {isPlaying ? <Pause size={32} className="text-blue-dark" /> : <Play size={32} className="text-blue-dark" />}
                  </div>
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-poppins font-semibold text-lg mb-2">{texts[lang].ContenuPrincipal.SecondTitle}</h3>
              <p className="italic text-gray-700 mb-4">
                {texts[lang].ContenuPrincipal.FirstParg}
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fatima Zahra"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-poppins font-semibold">{texts[lang].ContenuPrincipal.ThirdTitle}</h4>
                  <p className="text-sm text-gray-600">{texts[lang].ContenuPrincipal.SecondParg}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de témoignages */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TemoignageCard
            quote={GrilleTemoignages[lang].FirstTemoignageCard.quote}
            author={GrilleTemoignages[lang].FirstTemoignageCard.author}
            role={GrilleTemoignages[lang].FirstTemoignageCard.role}
            image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
          />
          
          <TemoignageCard
            quote={GrilleTemoignages[lang].SecondTemoignageCard.quote}
            author={GrilleTemoignages[lang].SecondTemoignageCard.author}
            role={GrilleTemoignages[lang].SecondTemoignageCard.role}
            image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
          />
        </div>

        {/* Formulaire */}
        <div className="flex flex-col items-center mt-12">
          <button
            onClick={() => setAfficherFormulaire(!afficherFormulaire)}
            className="bg-[#FFB347] text-[#13335F] py-3 px-6 rounded-lg text-lg font-poppins font-semibold shadow-lg hover:bg-[#FEC20E] transition duration-300"
          >
            {texts[lang].Formulaire.Bottom}
          </button>

          {afficherFormulaire && (
            <form
              onSubmit={handleSubmit}
              className="mt-8 w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
            >
              <label className="block text-[#13335F] font-semibold mb-2">{texts[lang].Formulaire.Form.FirstLabel}</label>
              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="w-full p-3 border border-[#00A99D] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
                placeholder={texts[lang].Formulaire.Form.FirstPlac}
                required
              />

              <label className="block text-[#13335F] font-semibold mb-2">V{texts[lang].Formulaire.Form.SecondLabel}</label>
              <textarea
                value={temoignage}
                onChange={(e) => setTemoignage(e.target.value)}
                className="w-full p-3 border border-[#00A99D] rounded mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
                placeholder={texts[lang].Formulaire.Form.SecondParg}
                required
              />

              <button
                type="submit"
                className="bg-[#00A99D] text-white py-2 px-4 rounded hover:bg-[#007C73] transition duration-300"
              >
                {texts[lang].Formulaire.Form.Buttom}
              </button>
            </form>
          )}
        </div>

        {/* Message si aucun témoignage trouvé */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">{texts[lang].MessAuTeTr}</p>
          </div>
        )}
      </div>
    </div>
  );
}
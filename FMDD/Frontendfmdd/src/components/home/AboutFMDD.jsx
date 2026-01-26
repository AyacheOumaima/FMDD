import { Target, Heart, Lightbulb, Shield, Quote } from 'lucide-react';

export default function AboutFMDD() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Le FMDD en bref
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez qui nous sommes, notre mission et les valeurs qui nous guident 
              dans notre engagement pour un développement durable au Maroc.
            </p>
          </div>

          {/* Mission tripartite */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Former */}
            <div className="text-center p-8 bg-amber-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4">Former</h3>
              <p className="text-gray-600 leading-relaxed">
                Développer les compétences utiles pour aujourd'hui et demain à travers
                des programmes de formation innovants et adaptés aux besoins du marché.
              </p>
            </div>

            {/* Accompagner */}
            <div className="text-center p-8 bg-teal-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4">Accompagner</h3>
              <p className="text-gray-600 leading-relaxed">
                Encadrer les projets innovants jusqu'à leur réussite grâce à notre expertise
                en coaching, incubation et développement de solutions durables.
              </p>
            </div>

            {/* Insérer */}
            <div className="text-center p-8 bg-emerald-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4">Insérer</h3>
              <p className="text-gray-600 leading-relaxed">
                Connecter les talents aux opportunités professionnelles et créer des ponts
                entre les compétences et les besoins du marché de l'emploi.
              </p>
            </div>
          </div>

          {/* Valeurs fondamentales */}
          <div className="bg-blue-50 rounded-3xl p-8 md:p-12 mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
                Nos valeurs fondamentales
              </h3>
              <p className="text-gray-600">
                Les principes qui guident chacune de nos actions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Responsabilité */}
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="text-lg font-semibold text-blue-950 mb-2">Responsabilité</h4>
                <p className="text-sm text-gray-600">Agir avec impact réel</p>
              </div>

              {/* Solidarité */}
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4">
                  <Heart className="w-6 h-6 text-teal-600" />
                </div>
                <h4 className="text-lg font-semibold text-blue-950 mb-2">Solidarité</h4>
                <p className="text-sm text-gray-600">Avancer collectivement</p>
              </div>

              {/* Innovation */}
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-blue-950 mb-2">Innovation</h4>
                <p className="text-sm text-gray-600">Penser et faire autrement</p>
              </div>

              {/* Inclusion */}
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-lg font-semibold text-blue-950 mb-2">Inclusion</h4>
                <p className="text-sm text-gray-600">Ne laisser personne à l'écart</p>
              </div>
            </div>
          </div>

          {/* Mot du Président */}
          <div className="bg-amber-50 rounded-3xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="w-12 h-12 text-amber-500 mx-auto mb-6" />
              
              <blockquote className="text-xl md:text-2xl text-blue-950 font-medium leading-relaxed mb-6">
                "Le FMDD a été fondé pour valoriser les talents locaux, encourager l'innovation durable 
                et bâtir une société plus juste. Grâce à nos programmes de formation et de mobilisation 
                citoyenne, nous construisons ensemble les solutions de demain."
              </blockquote>
              
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="font-bold text-blue-950 text-lg">ES-SAFI Naim</p>
                  <p className="text-gray-600">Président du FMDD</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

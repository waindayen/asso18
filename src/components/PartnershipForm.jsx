function PartnershipForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Merci pour votre intérêt ! Notre équipe vous contactera dans les plus brefs délais pour discuter de votre projet.');
  };

  return (
    <section id="contact" className="py-24 bg-emerald-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 text-center">
            Contactez-nous
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-900 block">
                Informations sur l'entreprise
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nom de l'entreprise"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Secteur d'activité"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="number"
                  placeholder="Nombre d'employés"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Site web"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-900 block">
                Contact principal
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nom"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Fonction"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="email"
                  placeholder="Email professionnel"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-900 block">
                Votre projet
              </label>
              <div className="space-y-4">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Sélectionnez un programme</option>
                  <option value="starter">Programme Starter</option>
                  <option value="business">Programme Business</option>
                  <option value="enterprise">Programme Enterprise</option>
                </select>
                <textarea
                  placeholder="Décrivez vos objectifs et attentes..."
                  rows="4"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                ></textarea>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1" />
                <span className="text-gray-600 text-sm">
                  J'accepte que mes informations soient utilisées pour être recontacté dans le cadre de ma demande de partenariat
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-emerald-700 transition-colors duration-300"
            >
              Envoyer ma demande
            </button>

            <div className="text-center text-sm text-gray-600">
              <p>🔒 Vos données sont protégées et ne seront pas partagées</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PartnershipForm;
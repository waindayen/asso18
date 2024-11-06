function VolunteerForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Merci pour votre candidature ! Nous vous contacterons très prochainement pour échanger sur votre engagement.');
  };

  return (
    <section id="postuler" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 text-center">
            Rejoignez l'aventure
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-900 block">
                Vos coordonnées
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Prénom"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Nom"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="email"
                  placeholder="Email"
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
                Vos centres d'intérêt
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Domaine d'intervention</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="">Choisir un domaine</option>
                    <option value="education">Éducation</option>
                    <option value="environment">Environnement</option>
                    <option value="communication">Communication</option>
                    <option value="admin">Administration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Disponibilité</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="">Choisir une disponibilité</option>
                    <option value="ponctual">Ponctuelle</option>
                    <option value="regular">Régulière</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-900 block">
                Votre motivation
              </label>
              <textarea
                placeholder="Parlez-nous de vous et de vos motivations..."
                rows="4"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              ></textarea>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1" />
                <span className="text-gray-600 text-sm">
                  J'accepte que mes données soient utilisées pour le traitement de ma candidature
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-emerald-700 transition-colors duration-300"
            >
              Envoyer ma candidature
            </button>

            <div className="text-center text-sm text-gray-600">
              <p>🔒 Vos données personnelles sont protégées</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default VolunteerForm;
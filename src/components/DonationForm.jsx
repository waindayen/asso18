import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

const DonationForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    frequency: 'once'
  });

  const predefinedAmounts = [
    {
      amount: 30,
      impact: "1 mois de scolarité pour un enfant",
      details: "Fournitures scolaires, uniformes et repas"
    },
    {
      amount: 50,
      impact: "2 kits scolaires complets",
      details: "Livres, cahiers et matériel pédagogique"
    },
    {
      amount: 100,
      impact: "Formation d'un enseignant",
      details: "Formation pédagogique et matériel didactique"
    },
    {
      amount: 200,
      impact: "5 arbres plantés + suivi",
      details: "Plantation et entretien pendant 2 ans"
    }
  ];

  const handleAmountSelect = (amount) => {
    setFormData(prev => ({
      ...prev,
      amount: amount.toString()
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('donations')
        .insert([
          {
            amount: parseInt(formData.amount),
            donor_name: `${formData.firstName} ${formData.lastName}`,
            donor_email: formData.email,
            frequency: formData.frequency,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast.success('Merci pour votre don !');
      setFormData({
        amount: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        frequency: 'once'
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-900 to-emerald-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">
            Votre don change des vies
          </h1>
          <p className="text-xl text-emerald-100">
            Chaque contribution nous aide à construire un avenir meilleur
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-lg font-semibold text-gray-900 mb-4 block">
                Choisissez le montant de votre don
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {predefinedAmounts.map((option) => (
                  <button
                    key={option.amount}
                    type="button"
                    onClick={() => handleAmountSelect(option.amount)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.amount === option.amount.toString()
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {option.amount}€
                    </div>
                    <div className="text-sm font-medium text-emerald-600 mb-1">
                      {option.impact}
                    </div>
                    <div className="text-xs text-gray-500">
                      {option.details}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 mb-2">
                  Ou entrez un autre montant
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="1"
                    placeholder="Montant personnalisé"
                    className="pl-8 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    €
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-900 block">
                Fréquence du don
              </label>
              <div className="flex gap-4">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="frequency"
                    value="once"
                    checked={formData.frequency === 'once'}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="p-4 text-center border-2 border-gray-200 rounded-lg cursor-pointer transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50">
                    Don unique
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="frequency"
                    value="monthly"
                    checked={formData.frequency === 'monthly'}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="p-4 text-center border-2 border-gray-200 rounded-lg cursor-pointer transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50">
                    Don mensuel
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-900 block">
                Vos informations
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Prénom"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nom"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1" />
                <span className="text-gray-600 text-sm">
                  Je souhaite recevoir un reçu fiscal pour déduire 66% de mon don de mes impôts
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-emerald-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement en cours...
                </span>
              ) : (
                'Faire un don sécurisé'
              )}
            </button>

            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">🔒 Paiement 100% sécurisé</p>
              <p>Un reçu fiscal vous sera automatiquement envoyé</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DonationForm;
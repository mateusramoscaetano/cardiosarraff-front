"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function GoogleReviews() {
  // Dados simulados das avaliações (substitua pelos dados reais da API do Google)
  const reviews = [
    {
      id: 1,
      author: "Maria Silva",
      rating: 5,
      comment:
        "Excelente atendimento! Meu cachorro foi muito bem cuidado durante o exame.",
      date: "2 semanas atrás",
    },
    {
      id: 2,
      author: "João Santos",
      rating: 5,
      comment:
        "Profissionais muito competentes e atenciosos. Recomendo a todos!",
      date: "1 mês atrás",
    },
    {
      id: 3,
      author: "Ana Costa",
      rating: 5,
      comment:
        "Equipamentos modernos e equipe preparada. Meu pet recebeu o melhor cuidado.",
      date: "3 semanas atrás",
    },
  ];

  const averageRating = 5.0; // Substitua pela média real das avaliações
  const totalReviews = 127; // Substitua pelo número real de avaliações

  const handleGoogleReviewsClick = () => {
    // Substitua pela URL real das avaliações do Google da Exavet
    window.open("https://www.google.com/search?q=exavet+avaliações", "_blank");
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl lg:text-5xl font-volkhov font-bold text-primary mb-4">
          O que nossos clientes dizem
        </h2>
        <p className="text-lg text-primary/80 max-w-2xl mx-auto">
          Veja as avaliações de quem já confiou na Exavet para cuidar do seu pet
        </p>
      </motion.div>

      {/* Resumo das avaliações */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="bg-gradient-to-r from-primary/5 to-exa-pink/5 rounded-2xl p-8 border border-primary/10 inline-block">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
            ))}
          </div>
          <div className="text-4xl font-bold text-primary mb-2">
            {averageRating}
          </div>
          <div className="text-lg text-primary/80 mb-4">
            Baseado em {totalReviews} avaliações
          </div>
          <button
            onClick={handleGoogleReviewsClick}
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Ver todas as avaliações no Google
          </button>
        </div>
      </motion.div>

      {/* Grid de avaliações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10"
          >
            <div className="flex items-center gap-2 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>

            <p className="text-primary/80 mb-4 italic">
              &ldquo;{review.comment}&rdquo;
            </p>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-primary">
                {review.author}
              </span>
              <span className="text-sm text-primary/60">{review.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA para deixar avaliação */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <div className=" rounded-2xl p-8">
          <h3 className="text-2xl font-volkhov font-bold text-primary mb-4">
            Deixe sua avaliação!
          </h3>
          <p className="text-lg text-primary/80 mb-6 max-w-2xl mx-auto">
            Sua opinião é muito importante para nós. Ajude outros tutores a
            conhecerem a qualidade dos nossos serviços.
          </p>
          <button
            onClick={handleGoogleReviewsClick}
            className="bg-exa-pink hover:bg-exa-pink/90 text-primary font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Avaliar no Google
          </button>
        </div>
      </motion.div>
    </div>
  );
}

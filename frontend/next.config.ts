/** @type {import('next').NextConfig} */
// Cette ligne aide VSCode et Next.js à comprendre
// que l'objet ci-dessous est une configuration Next.js

const nextConfig = {

  // Autorise certaines origines réseau à accéder
  // aux ressources Next.js en mode développement
  allowedDevOrigins: [

    // Autorise ton IP locale réseau
    // Cela permet d'ouvrir le frontend depuis :
    // http://10.198.209.197:3000
    "10.198.209.197",
  ],
};

// Exporte la configuration pour que Next.js puisse l'utiliser
module.exports = nextConfig;  

// pour lancer next.js en mmode réseau : npm run dev -- -H 0.0.0.0
// Sinon npm run dev lance en mode dev
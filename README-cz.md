# Another to-do list app 📝
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Miraneek/another_to-do_list_app/blob/master/README.md)
[![cz](https://img.shields.io/badge/lang-cz-blue.svg)](https://github.com/Miraneek/another_to-do_list_app/blob/master/README-cz.md)

Tohle je moje řešení klasického úkolu vytvoření 📝to do list apliakce, moje stránka má navíc funkci sledování 🔄návyků. Aplikace je napsaná ve frameworku ⚛️React a jako backendové řešení používá 🔥Firebase.

## Funkce 🚀

- 👨‍💼 Ověřování -> Přihlášení, registrace, zapomenuté heslo, nastavení uživatele
- 📝 To do's -> Funkce pro vytváření, úpravu, doplňování a prohlížení úkolů
- 🔄 Návyky -> Můžete si vytvořit návyk a pak ho každý den plnit, abyste zvýšili svou sérii.
- 💾 Data -> Všechna data jsou uložena v databázi Firestore a přístup k nim má pouze uživatel.

## Zkuste mé webové stránky [zde](https://anothertodolistapp.vercel.app)

Můžete si vytvořit vlastní účet nebo použít ukázkový účet, který jsem vytvořil. Ukázkový účet má zakázáno cokoliv měnit, ale pokud si vytvočíte účet vlastní, můžete si vyzkoušet i tvořit a editovat.

- Email: showcase@showcase.cz
- heslo: showcase

## Tech Stack 💻🛠️

### Front End </>

- [Reagovat](https://react.dev)
- [Nextjs](https://nextjs.org)
- [Vercel](https://vercel.com) (Deploy)
- [Tailwind](https://tailwindcss.com) (Stylování)
- [Tailwind Merge](https://www.npmjs.com/package/tailwind-merge) (Základní řešení pro změnu stylů tailwindu na základě stavu aplikace)
- [Radix UI](https://www.radix-ui.com) (Knihovna komponent, kde lze komponenty stylovat pomocí Tailwindu)
- [TS Particles](https://particles.js.org) (Použil jsem pro vytvoření pozadí)
- [Framer Motion](https://www.framer.com/motion/) (Knihovna pro animace)

### Back End ⚙️

- [Další bezpečné akce](https://next-safe-action.dev) (funkce na straně serveru)
- [Firebase Authentication](https://firebase.google.com/docs/auth) (ověřování)
- [Firebase Firestore](https://firebase.google.com/docs/firestore) (databáze)

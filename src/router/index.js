import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

import Login from "@/views/Login.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Security from "@/views/Security.vue";
import Sessions from "@/views/Sessions.vue";
// import Account from "@/views/Account.vue";
import Users from "@/views/Admin/Users/Users.vue";
import Roles from "@/views/Admin/Roles/Roles.vue";
import EditRole from "@/views/Admin/Roles/EditRole.vue";
import Brands from "@/views/Brands/Brands.vue";
import EditBrand from "@/views/Brands/EditBrand.vue";
import Dashboard from "@/views/Dashboard.vue";
import Games from "@/views/Admin/Games/AllGames.vue";
import GamesLists from "@/views/Admin/Games/ListGames.vue";
import CreateGameList from "@/views/Admin/Games/CreateGamesList.vue";
import Players from "@/views/Players/AllPlayers.vue";
import PlayerDetails from "@/views/Players/PlayerDetails.vue";
import ImportPlayers from "@/views/Players/ImportPlayers.vue";
import WelcomeOffers from "@/views/BonusManagement/WelcomeOffers.vue";
import CreateWelcomeOffer from "@/views/BonusManagement/CreateWelcomeOffer.vue";
import WelcomeOfferDetail from "@/views/BonusManagement/WelcomeOfferDetail.vue"
import EditWelcomeOffer from "@/views/BonusManagement/EditWelcomeOffer.vue"
import CreditFromCSV from "@/views/BonusManagement/CreditFromCSV.vue";
import Settings from "@/views/Admin/Settings/Settings.vue";
import Payments from "@/views/Payments/Payments.vue";
import Bets from "@/views/Bets/Bets.vue";
import NotFound from "@/views/NotFound.vue"
import BonusBalance from "@/views/BonusManagement/BonusBalance.vue";
import AllLegalPages from "@/views/CMS/legal/AllLegalPages.vue";
import CreateLegalPage from "@/views/CMS/legal/CreateLegalPage.vue";
import EditLegalPage from "@/views/CMS/legal/EditLegalPage.vue";
import AllPages from "@/views/CMS/pages/AllPages.vue";
import CreatePage from "@/views/CMS/pages/CreatePage.vue";
import EditPage from "@/views/CMS/pages/EditPage.vue";
import AllTemplates from "@/views/CMS/templates/AllTemplates.vue";
import CreateTemplate from "@/views/CMS/templates/CreateTemplate.vue";
import EditTemplate from "@/views/CMS/templates/EditTemplate.vue";
import ThemePage from "@/views/CMS/themes/theme.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard,
      
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
    },
    {
      path: "/security",
      name: "security",
      component: Security,
    },
    {
      path: "/sessions",
      name: "sessions",
      component: Sessions,
      
    },
    // {
    //   path: "/account",
    //   name: "account",
    //   component: Account,
    //   
    // },
    {
      path: "/users",
      name: "users",
      component: Users,
      
    },
    {
      path: "/roles",
      name: "roles",
      component: Roles,
      
    },
    {
      path: "/roles/:id",
      name: "edit-role",
      component: EditRole,
      
    },
    {
      path: "/brands",
      name: "brands",
      component: Brands,
      
    },
    {
      path: "/brands/:id",
      name: "edit-brand",
      component: EditBrand,
      
    },
    {
      path: "/games",
      name: "games",
      component: Games,
      
    },
    {
      path: "/games/games-lists",
      name: "games-lists",
      component: GamesLists,
      
    },
    {
      path: "/games/create-game-list/:id",
      name: "create-game-list",
      component: CreateGameList,
      
    },
    {
      path: "/players",
      name: "players",
      component: Players,
      
    },
    {
      path: "/players/:id",
      name: "player-details",
      component: PlayerDetails,
      
    },
    {
      path: "/import-players",
      name: "import-players",
      component: ImportPlayers,
      
    },
    {
      path: "/welcome-offers",
      name: "welcome-offers",
      component: WelcomeOffers,
      
    },
    {
      path: "/welcome-offers/detail/:id",
      name: "welcome-offer-detail",
      component: WelcomeOfferDetail,
      
    },
    {
      path: "/welcome-offers/create",
      name: "create-welcome-offer",
      component: CreateWelcomeOffer,
      
    },
    {
      path: "/welcome-offers/edit/:id",
      name: "edit-welcome-offer",
      component: EditWelcomeOffer,
      
    },
    {
      path: "/credit-from-csv",
      name: "credit-from-csv",
      component: CreditFromCSV,
      
    },
    // !! TEMPORARY HIDING
    // {
    //   path: "/bonus-balance",
    //   name: "bonus-balance",
    //   component: BonusBalance,
    //   
    // },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
      
    },
    {
      path: "/payments",
      name: "payments",
      component: Payments,
      
    },
    {
      path: "/bets",
      name: "bets",
      component: Bets,
      
    },
    {
      path: "/pages",
      name: "pages",
      component: AllPages,
    },
    {
      path: "/pages/create",
      name: "create-page",
      component: CreatePage,
    },
    {
      path: "/pages/edit/:id",
      name: "edit-page",
      component: EditPage,
    },

    {
      path: "/email-templates",
      name: "email-templates",
      component: AllTemplates,
    },
    {
      path: "/email-templates/create",
      name: "create-email-template",
      component: CreateTemplate,
    },
    {
      path: "/email-templates/edit/:id",
      name: "edit-email-template",
      component: EditTemplate,
    },

    {
      path: "/legal-pages",
      name: "legal-pages",
      component: AllLegalPages,
    },
    {
      path: "/legal-pages/create",
      name: "create-legal-page",
      component: CreateLegalPage,
    },
    {
      path: "/legal-pages/edit/:id",
      name: "edit-legal-page",
      component: EditLegalPage,
    },
    {
      path: "/theme",
      name: "theme",
      component: ThemePage,
    },
    {
      path: '/:catchAll(.*)',
      name: "not-found",
      component: NotFound
    }
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth) {
    if (authStore.loggedIn) {
      next();
    } else {
      await authStore.loginFromStorage();
      if (authStore.loggedIn) {
        next();
      }
      else {
        next('/login');
      }
    }
  } else if ((to.name === 'login' || to.name === 'forgot-password' || to.name === 'reset-password') && authStore.loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;

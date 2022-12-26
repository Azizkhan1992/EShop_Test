import Vue from 'vue';
import VueRouter from 'vue-router';
import TokenService from '@/services/token-service';

Vue.use(VueRouter)

const routes = [{
        path: "/",
        component: () =>
            import ("../layouts/default"),
        children: [{
                path: "",
                name: 'home',
                component: () =>
                    import ("../views/Home.vue")
            },
            {
                path: "/details/:slug",
                name: 'details',
                component: () =>
                    import ("../views/ProductDetails.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("../views/auth/AppLogin.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("../views/auth/AppRegister.vue")
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    console.log(to.path)
    if (TokenService.getToken() && (to.path == '/login' || to.path == '/register')) {
        next('/');
    } else {
        next();
    }
})

export default router
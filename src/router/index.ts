import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () => import(/* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dxs-shouye',
          affix: true
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/enterprise',
    component: Layout,
    redirect: '/enterprise/info',
    meta: {
      title: 'enterprise',
      icon: 'dxs-qiye',
      alwaysShow: 'true'
    },
    children: [
      {
        path: 'info',
        name: 'enterpriseInfo',
        meta: {
          title: 'enterpriseInfo',
          icon: null,
          noCache: true
        },
        component: () => import(/* webpackChunkName: "enterpriseInfo" */ '@/views/enterprise/info/index.vue')
      },
      {
        path: 'civilization',
        name: 'enterpriseCivilization',
        meta: {
          title: 'enterpriseCivilization',
          icon: null,
          noCache: true
        },
        component: () => import(/* webpackChunkName: "enterpriseCivilization" */ '@/views/enterprise/civilization/index.vue')
      },
      {
        path: 'structure',
        name: 'enterpriseStructure',
        meta: {
          title: 'enterpriseStructure',
          icon: null,
          noCache: true
        },
        component: () => import(/* webpackChunkName: "enterpriseStructure" */ '@/views/enterprise/structure/index.vue')
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/index',
    children: [
      {
        path: 'index',
        name: 'banner',
        meta: {
          title: 'banner',
          icon: 'dxs-banner',
          noCache: true
        },
        component: () => import(/* webpackChunkName: "banner" */ '@/views/banner/index.vue')
      }
    ]
  },
  {
    path: '/exhibition-type',
    component: Layout,
    redirect: '/exhibition-type/index',
    children: [
      {
        path: 'index',
        name: 'exhibitionType',
        meta: {
          title: 'exhibitionType',
          icon: 'dxs-fenlei',
          noCache: true
        },
        component: () => import(/* webpackChunkName: "exhibitionType" */ '@/views/exhibition-type/index.vue')
      }
    ]
  },
  {
    path: '/exhibition-plan',
    component: Layout,
    redirect: '/exhibition-plan/index',
    children: [
      {
        path: 'index',
        name: 'exhibitionPlan',
        meta: {
          title: 'exhibitionPlan',
          icon: 'dxs-jihua',
          noCache: true
        },
        component: () => import(/* webpackChunkName: "exhibitionPlan" */ '@/views/exhibition-plan/index.vue')
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/index',
    children: [
      {
        path: 'index',
        name: 'news',
        meta: {
          title: 'news',
          icon: 'dxs-zixun',
          noCache: true
        },
        component: () => import(/* webpackChunkName: "news" */ '@/views/news/index.vue')
      }
    ]
  },
  {
    path: '/exhibition-scene',
    component: Layout,
    redirect: '/exhibition-scene/index',
    children: [
      {
        path: 'index',
        name: 'exhibitionScene',
        meta: {
          title: 'exhibitionScene',
          icon: 'dxs-xianchangfuwu',
          noCache: true
        },
        component: () => import(/* webpackChunkName: "exhibition-scene" */ '@/views/exhibition-scene/index.vue')
      }
    ]
  },
  {
    path: '/exhibition-guide',
    component: Layout,
    redirect: '/exhibition-guide/pass',
    meta: {
      title: 'exhibitionGuide',
      icon: 'dxs-zhinanzhidao-xianxing',
      alwaysShow: true
    },
    children: [
      {
        path: 'pass',
        name: 'exhibitionPass',
        meta: {
          title: 'exhibitionPass',
          icon: null,
          noCache: true
        },
        component: () => import(/* webpackChunkName: "pass" */ '@/views/exhibition-guide/pass/index.vue')
      },
      {
        path: 'booth',
        name: 'exhibitionBooth',
        meta: {
          title: 'exhibitionBooth',
          icon: null,
          noCache: true
        },
        component: () => import(/* webpackChunkName: "booth" */ '@/views/exhibition-guide/booth/index.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: 'index',
        name: 'user',
        meta: {
          title: 'user',
          icon: 'dxs-yonghu',
          noCache: true
        },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue')
      }
    ]
  },
  {
    path: '/jobs',
    component: Layout,
    redirect: '/jobs/index',
    children: [
      {
        path: 'index',
        name: 'jobs',
        meta: {
          title: 'jobs',
          icon: 'dxs-zhaopin',
          noCache: true
        },
        component: () => import(/* webpackChunkName: "jobs" */ '@/views/jobs/index.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router

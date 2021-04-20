import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },
    // {
    //     path: '/tag',
    //     component: Layout,
    //     redirect: '/tag/add-tag',
    //     name: 'addTag',
    //     meta: {
    //         title: '添加标签',
    //         icon: 'el-icon-price-tag'
    //     },
    //     children: [{
    //         path: 'add-tag',
    //         component: () =>
    //             import ('@/views/tag/index.vue'),
    //         name: 'addTag',
    //         meta: { title: '添加标签' }
    //     }, ]
    // },
    {
        path: '/classification',
        name: '',
        meta: {
            title: '歌曲管理',
            icon: 'nested'
        },
        component: Layout,
        redirect: '/classification/index',
        children: [{
            path: 'song',
            name: 'Forme',
            component: () =>
                import ('@/views/classification/song'),
            meta: { title: '歌曲中心', icon: 'form' }
        }, {
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/classification/index'),
            meta: { title: '歌曲类别', icon: 'form' }
        }]
    },

    // {
    //     path: '/file',
    //     component: Layout,
    //     redirect: '/file/addFile',
    //     name: 'file',
    //     meta: {
    //         title: '文章管理',
    //         icon: 'nested'
    //     },
    //     children: [{
    //             path: 'addFile',
    //             component: () =>
    //                 import ('@/views/file/addFile/index'), // Parent router-view
    //             name: 'addFile',
    //             meta: { title: '新建文章', icon: 'el-icon-document-add' },
    //         },
    //         {
    //             path: 'manageFile',
    //             component: () =>
    //                 import ('@/views/file/manageFile/index'),
    //             name: 'manageFile',
    //             meta: { title: '文章列表', icon: 'el-icon-document-copy' }
    //         },
    //         {
    //             path: 'sortFile',
    //             component: () =>
    //                 import ('@/views/file/sortFile/index'),
    //             name: 'sortFile',
    //             meta: { title: '文章爬取', icon: 'el-icon-attract' }
    //         }
    //     ]
    // },
    // {
    //     path: '/setting',
    //     component: Layout,
    //     redirect: '/setting/home-setting',
    //     name: 'setting',
    //     meta: {
    //         title: '博客配置',
    //         icon: 'el-icon-setting'
    //     },
    //     children: [{
    //             path: 'home-setting',
    //             component: () =>
    //                 import ('@/views/setting/homeSetting/index'),
    //             name: 'homeSetting',
    //             meta: { title: '首页配置', icon: 'el-icon-s-home' }
    //         },
    //         {
    //             path: 'page-setting',
    //             component: () =>
    //                 import ('@/views/setting/pageSetting/index'),
    //             name: 'pageSetting',
    //             meta: { title: '文章配置', icon: 'el-icon-document' }
    //         },
    //     ]
    // },
    {
        path: '/opus',
        component: Layout,
        redirect: '/opus/singer',
        name: 'setting',
        meta: {
            title: '歌星管理',
            icon: 'el-icon-postcard'
        },
        children: [{
                path: 'singer',
                component: () =>
                    import ('@/views/myOpus/vueWorks/index'),
                name: 'vue',
                meta: { title: '歌星', icon: 'el-icon-notebook-1' }
            },
            {
                path: 'react',
                component: () =>
                    import ('@/views/myOpus/reactWorks/index'),
                name: 'react',
                meta: { title: 'react项目', icon: 'el-icon-notebook-2' }
            },
        ]
    },
    {
        path: '/upload',
        component: Layout,
        redirect: '/upload/addImg',
        name: 'upload',
        meta: {
            title: '歌曲集管理',
            icon: 'el-icon-picture-outline'
        },
        children: [{
            path: 'addImg',
            component: () =>
                import ('@/views/upload/addImg'),
            name: 'addImg',
            meta: { title: '歌曲集', icon: 'el-icon-upload2' }
        }]
    },
    {
        path: '/admin',
        component: Layout,
        name: 'admin',
        meta: {
            title: '用户管理',
            icon: 'el-icon-postcard'
        },
        redirect: '/admin/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/admin/index'),
            name: 'Admin',
            meta: { title: '管理员', icon: 'el-icon-loading' }
        }, {
            path: 'user',
            component: () =>
                import ('@/views/admin/user'),
            name: 'Admin',
            meta: { title: '用户管理', icon: 'el-icon-loading' }
        }]
    },
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Index',
      component:()=>import('../pages/index'),
    },
    {
      path:'/stus',
      name:'Stus',
      component:()=>import('../pages/stud/stus'),
    },
    {
      path:'/home',
      name:'Sides',
      component:()=>import('../pages/sides'),
      children:[
        {
          path:'/students',
          name:'Students',
          component:()=>import('../pages/students')
        },
        {
          path:'/addStu',
          name:'AddStu',
          component:()=>import('../pages/addStu')
        },
        {
          path:'/permessage',
          name:'Permessage',
          component:()=>import('../pages/stud/permessage')
        },
        {
          path:'/search',
          name:'Search',
          component:()=>import('../pages/search')
        },
        {
          path:'/editpwd',
          name:'Editpwd',
          component:()=>import('../pages/editpwd')
        },
        {
          path:'/editstupwd',
          name:'Editstupwd',
          component:()=>import('../pages/stud/editstupwd')
        },
        {
          path:'/score',
          name:'Score',
          component:()=>import('../pages/score')
        },
        {
          path:'/editscore',
          name:'Editscore',
          component:()=>import('../pages/editscore')
        },
        {
          path:'/scoresearch',
          name:'Scoresearch',
          component:()=>import('../pages/stud/scoresearch')
        },
      ]
    },

  ]
})


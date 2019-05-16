import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import project from '@/components/project'
import file from '@/components/file'
import editor from '@/components/editor'
import user from '@/components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/project/:type',
      component:project
    },
    {
      path:'/',
      redirect:'/project/My'
    },
    {
      //path: '/:projectID/file',
      path:'/projectID/file',
      name: 'file',
      component: file
    },
    {
      path: '/project/corporate',
      name: 'coProject',
      component: project
    },
    {
      path:'/projectID/fileID/editor',
      name:'editor',
      component:editor
    },
    {
      path:'/user',
      name:'name',
      component:user
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import AwardList from '@/views/AwardList'
import Home from '@/views/Home'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '',
			redirect: '/Login'
		},
		{
			path: '/login',
			name:'login',
			component: Login
		},
		{
			path: '/home',
			name: 'home',
			component: Home
		},
    {
      path: '/awardlist',
      name: 'awardList',
      component: AwardList
    }
  ],
	mode:'hash'
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const axios = require('axios');

export default new Vuex.Store({
	state: {
    winList:[],
		userMsg:{}
	},
	mutations: {
		addUserMsg:function(state,userMsg){
			state.userMsg = userMsg
		},
    addWin:function(state,win){
      if(win.win!=="谢谢参与！"){
        axios({
          method: 'post',
          url: 'http://118.190.134.211:3000/webapp/msg/addMsg',
          data: {
            //id:win.id,
            name:win.name,
            telephone:win.telephone,
            theWin:win.win
          }
        });
      }else{
        return;
      }
    },
    setMark:function(state,plo){
      state.winList=plo;
			for(let i in state.winList){
				//隐藏用户部分信息
				let teltotal = state.winList[i].telephone.toString();
				let telPre = teltotal.substring(0,3);
				let telNext = teltotal.substring(8,4);
				let tel = telPre + '****' + telNext;
				
				let nameTotal = state.winList[i].name;
				let namePre = nameTotal.substring(0,1);
				let name = namePre + '**';
				state.winList[i].name = name;
				state.winList[i].telephone = tel;
			}
    }
	},

	actions: {
    setMark({commit},payload){
      axios({
        method: 'get',
        url: 'http://118.190.134.211:3000/webapp/msg',
      }).then((res)=>{
        let arr = Object.values(res.data.webapp_msg);
        commit('setMark',arr);
      })
    }
  },
	modules: {}
})

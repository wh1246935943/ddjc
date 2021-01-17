import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userList: []
	},
	mutations: {
		/**
		 * 更新任务列表
		 */
		SET_USERLIST: ({ userList }, { flag, data, index }) => {
      if (flag === 1) {
        plus.sqlite.selectSql({
          name: 'yaohao',
          sql: 'select * from database',
          success: (list) => {
            userList.push(...list)
          },
          fail: (e) => console.log(e)
        });
      };
      if (flag === 2) {
        plus.sqlite.executeSql({
					name: 'yaohao',
					sql: `delete from database where name = '${userList[index].name}'`,
				});
        Vue.delete(userList, index);
      };
      if (flag === 3) {
				const itemIndex = userList.findIndex(({name}) => name === index)
        Vue.set(userList[itemIndex], 'isAlready', data);
        plus.sqlite.executeSql({
					name: 'yaohao',
					sql: `update database set isAlready='${data}' where name='${userList[itemIndex].name}'`,
				});
      };
      if (flag === 4) {
        userList.push(...data);
        const sqlValue = data.map(({name, isAlready}) => `('${name}', ${isAlready})`).join(',')
        plus.sqlite.executeSql({
					name: 'yaohao',
					sql: `insert into dataBase values${sqlValue}`,
					success: function(e){
						console.log('executeSql success!');
					},
					fail: (e) => console.log(e)
				})
      };
		}
	},
	actions: {
	
	}
})

export default store

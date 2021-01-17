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
          sql: 'select * from dataBase',
          success: (list) => {
            userList.push(...list)
          }
        });
      };
      if (flag === 2) {
        plus.sqlite.executeSql({
					name: 'yaohao',
					sql: `delete from dataBase where name = '${userList[index].name}'`,
				});
        Vue.delete(userList, index);
      };
      if (flag === 3) {
				const itemIndex = userList.findIndex(({name}) => name === index)
				Vue.set(userList[itemIndex], 'isAlready', data);
        plus.sqlite.executeSql({
					name: 'yaohao',
					sql: `update dataBase set isAlready=${data} where name='${userList[itemIndex].name}'`,
				});
      };
      if (flag === 4) {
				const filterData =  data.filter((item) => userList.findIndex(({name}) => name === item.name) === -1);
				if (filterData.length === 0) return
        userList.push(...filterData);
        const sqlValue = filterData.map(({name, isAlready}) => `('${name}', ${isAlready})`).join(',')
        plus.sqlite.executeSql({
					name: 'yaohao',
					sql: `insert into dataBase values${sqlValue}`,
				})
      };
		}
	},
	actions: {
	
	}
})

export default store

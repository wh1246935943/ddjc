<template>
	<view class="uni-table">
		<view class="uni-table-header">
      <view
        v-for="(column, index) in columns"
        :key="index"
        :style="{
          ...Object.assign(
            {width: `${100/columns.length}%`},
            column.width && {width: `${column.width}`}
          )
        }"
      >{{column.title}}</view>
    </view>
    <view class="uni-table-body">
      <view
        v-for="(item, index) in data"
        :key="index"
        class="table-body-row"
      >
        <view
          v-for="(column, i) in columns"
          :key="i"
          class="table-body-rowitem select-Pos"
          :style="{
            ...Object.assign(
							column.dataIndex !== 'deviceName' && selectIndex === `${index}${column.dataIndex}` && {borderColor: '#1f9689'},
              {width: `${100/columns.length}%`},
              column.width && {width: column.width}
            )
          }"
          @click="onClicklocation(index, column.dataIndex, item)"
        >
          <text v-if="item[column.dataIndex]">{{item[column.dataIndex]}}</text>
          <text v-else class="tobe-tested">待测试</text>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		props: {
			columns: {
				type: Array,
				default: () => {
					return []
				}
			},
			data: {
				type: Array,
				default: () => {
					return []
				}
      }
    },
		data() {
			return {
				selectIndex: ''
			}
		},
		methods: {
      onClicklocation(index, dataIndex, item) {
        if (dataIndex === 'deviceName') return;
				this.selectIndex = `${index}${dataIndex}`;
        this.$emit('onClicklocation', index, dataIndex, item)
      }
		}
	}
</script>

<style lang="scss">
.uni-table{
  width: 100%;
  height: auto;
  box-sizing: border-box;
  .uni-table-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80upx;
    background: rgba(61,184,171,0.05);
    color: $base-color;
    padding: 0 10upx;
    box-sizing: border-box;
  }
  .uni-table-body{
    padding: 0 10upx;
    box-sizing: border-box;
    width: 100%;
    .table-body-row{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1upx solid #eee;
      padding: 10upx 0;
      .table-body-rowitem{
				height: 60upx;
        line-height: 60upx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .tobe-tested{
          color: #ccc;
          font-size: $font-size-sm + 3upx
        }
      }
			.select-Pos{
				border: 1upx solid rgba(0,0,0,0);
			}
    }
  }
}
</style>

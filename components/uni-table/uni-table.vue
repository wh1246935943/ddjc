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
          v-for="(column, index) in columns"
          :key="index"
          class="table-body-rowitem"
          :style="{
            ...Object.assign(
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
		methods: {
      onClicklocation(a, b, c) {
        if (b === 'deviceName') return;
        this.$emit('onClicklocation', a, b, c)
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
    height: 60upx;
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
      height: 50upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1upx solid #eee;
      padding: 30upx 0;
      .table-body-rowitem{
        line-height: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .tobe-tested{
          color: #ccc;
          font-size: $font-size-sm + 3upx
        }
      }
    }
  }
}
</style>

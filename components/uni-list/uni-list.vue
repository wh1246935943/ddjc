<template>
  <view class="uni-list">
    <view
      class="uni-list-item"
      v-for="(item, index) in list"
      :key="index"
      :style="{backgroundColor: item.isAlready ? '' : ''}"
    >
      <view class="content">
				<view class="name">{{item.name}}</view>
        <uni-number
          v-if="isUniNumber"
          :min="0"
          :max="9"
          :value="item.quota || 1"
          @change="(value) => onChange(index, value)"
        >配额：</uni-number>
        <image
          v-if="isDelBtn"
          :src="btnIcon"
          @click="delImg(index, item)"
        ></image>
			</view>
      <view
        v-if="Array.isArray(item.subordinate)"
        class="other"
      >{{item.subordinate.join('、')}}</view>
    </view>
  </view>
</template>

<script>
	import { UniNumber } from 'wh-ui';
	export default {
    props: {
			list: {
				type: Array,
				default () {
					return []
				}
      },
      isUniNumber: {
        type: Boolean,
				default: false
      },
			isDelBtn: {
				type: Boolean,
				default: true
      },
      btnIcon: {
        type: String,
        default: require('@static/shanchu.png')
      }
		},
		methods: {
			delImg(index, item) {
        this.$emit('delBtn', index, item)
      },
      onChange(index, value) {
        this.$emit('onNumber', index, value)
      }
		}
	}
</script>

<style lang="scss">
.uni-list{
  width: 100%;
  .uni-list-item{
    width: 100%;
    min-height: 100upx;
    padding: 20upx 50upx;
    border-bottom: 1px solid $border-color-dark;
    position: relative;
    display: flex;
    flex-direction: column;
    .content{
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name{
        margin-right: 20upx;
        width: 150upx;
      }
      image{
        width: 40upx;
        height: 40upx;
      }
    }
    .other{
      padding: 10upx 0;
    }
  }
}
</style>

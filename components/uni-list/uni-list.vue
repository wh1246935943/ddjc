<template>
  <view class="uni-list">
    <view
      class="uni-list-item"
      v-for="(item, index) in list"
      :key="index"
      :style="{backgroundColor: item.isAlready ? '' : ''}"
    >
      <view>{{item.name}}</view>
      <image
        :src="btnIcon"
         @click="delImg(index, item)"
      ></image>
    </view>
  </view>
</template>

<script>
	export default {
    props: {
			list: {
				type: Array,
				default () {
					return []
				}
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
			}
		}
	}
</script>

<style lang="scss">
.uni-list{
  width: 100%;
  .uni-list-item{
    width: 100%;
    height: 100upx;
    padding: 0 25px;
    border-bottom: 1px solid $border-color-dark;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    image{
      width: 40upx;
      height: 40upx;
    }
  }
}
</style>

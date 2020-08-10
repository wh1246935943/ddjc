<template>
	<view class="item-card" :style="{height, marginTop}" @click="clickCard">
		<view class="item-card-left">
			<text class="tit">{{title}}</text>
			<text class="tit2" v-if="subTitle">{{subTitle}}</text>
			<text class="tit2" v-if="desc">{{desc}}</text>
		</view>
		<view class="item-card-right">
			<text class="date" v-if="date">{{date}}</text>
			<text class="tit3" v-if="device">{{device}}</text>
			<text class="yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '标题'
			},
			subTitle: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: ''
			},
			device: {
				type: String,
				default: ''
			},
			date: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: '140upx'
			},
			marginTop: {
				type: String,
				default: '16upx'
			}
		},
		methods: {
			clickCard() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.item-card{
		display:flex;
		align-items:center;
		padding: 6upx 30upx 8upx;
		background: #fff;
		&:active{
			background-color: #f3f3f3
		}
		.item-card-left{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.item-card-right{
			height: 100%;
			position: relative;
			display: flex;
			align-items: center;
			min-width: 160upx;
			justify-content: flex-end;
			.date{
				position: absolute;
				top: 10upx;
				right: 10upx;
				font-size: $font-size-sm;
				color: $font-color-light;
			}
		}
		.tit{
			font-size: $font-size-base +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-size-sm;
			color: $font-color-light;
		}
		.tit3{
			font-size: $font-size-base -2upx;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-size-base +2upx;
			color: $font-color-light;
		}
	}
</style>

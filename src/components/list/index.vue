<template>
  <div ref="listDom" class="List-view" :style="{ height: height + 'px' }"  @scroll="scrollEvent($event)">
      <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
      <div class="infinite-list" :style="{ transform:getTransform}">
        <div class="List-item van-hairline--bottom"
        v-for="(item,index) of visibleData" 
        :key="item.trackId"
        :style="{ height:'px' }">
            <span class="list-num">{{item.num}}</span>
            <img :src="item.artworkUrl512" alt="" class="List-img" :class="index%2 ===0?'border':'round'">
            <div class="List-content">
            <p class="content-tit">{{item.trackName}}</p>
            <p class="content-label">{{item.genres}}</p>
            <div class="rate-view">
                <Rate v-model="item.averageUserRating"
                style="display:flex;line-height:0;"
                allow-half
                size="10"
                readonly
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"/>
                <span>({{item.userRatingCount}})</span>
            </div>
            
            </div>
        </div>
      </div>
  </div>
</template>

<script setup>
 import { Rate } from 'vant';
 import {ref,computed,defineProps,onMounted} from 'vue'
 const props=defineProps({
    listData:{
        type:Array,
        default:()=>[]
    },
    //每项高度
    itemSize: {
      type: Number,
      default:70
    },
    height:{
      type: Number,
      default:70
    }
})

let screenHeight = ref(0);
let startOffset = ref(0);
let start = ref(0);
let end = ref(null);
//列表总高度
const listHeight = computed(() => {
   return props.listData.length * props.itemSize;   
})
//可显示的列表项数
const visibleCount = computed(() => {
   return Math.ceil(screenHeight.value / props.itemSize);  
})
//偏移量对应的style
const getTransform = computed(() => {
   return `translate3d(0,${startOffset.value}px,0)`; 
})
//获取真实显示列表数据
const visibleData = computed(() => {
   return props.listData.slice(start.value, Math.min(end.value,props.listData.length)); 
})
onMounted(()=>{
    screenHeight.value = document.documentElement.clientHeight;
    start.value = 0;
    end.value = start.value + visibleCount.value;
})
let listDom=ref(null);

const scrollEvent=()=>{
    //当前滚动位置
    let scrollTop =  listDom.value.scrollTop;
    //此时的开始索引
    start.value = Math.floor(scrollTop / props.itemSize);
    //此时的结束索引
    end.value = start.value + visibleCount.value;
    //此时的偏移量
    startOffset.value = scrollTop - (scrollTop % props.itemSize);
}
</script>

<style lang="scss" scoped>
.List-view{
    height: 100%;
    overflow: auto;
    position: relative;
    .infinite-list-phantom{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: -1;
    }
    .infinite-list{
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
    }
 .List-item{
     display: flex;
     justify-content: flex-start;
     align-items: center;
     overflow: hidden;
     padding: 30px 0 30px 20px;
      .list-num{
          font-size: 12px;
          width: 10px;
          color: #e5e5e5;
      }
     .List-img{
         width: 100px;
         height: 100px;
         margin-left:30px;
     }
     .border{
         border-radius:10%;
     }
     .round{
         border-radius:100%; 
     }
     .List-content{
         height: 100px;
         margin-left: 20px;
         flex: 1;
         .content-tit{
             font-size: 32px;
             line-height: 32px;
             white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
         }
         .content-label{
             font-size: 26px;
             line-height: 26px;
             margin-top: 15px;

         }
         .rate-view{
          display: flex;
          line-height: 0;
          align-items: center;
          span{
              font-size: 20px;
              margin-left: 10px;
          }
         }
     }
 }
}
</style>
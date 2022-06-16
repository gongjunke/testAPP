<template>
  <div class="rowList-ground van-hairline--bottom">
      <label class="recommend-title">Recommend</label>
      <div class="rowList-scroll">
        <div class="rowList-item" v-for="item of props.rowList" :key="item.id.attributes['im:id']">
        <img :src="item['im:image'][2].label" class="rowList-img"/>
        <p class="rowList-tit">{{item.title.label}}</p>
        <p class="rowList-label">{{item.category.attributes.label}}</p>
        </div>
      </div>
  </div>
</template>

<script setup>
 import { defineProps} from 'vue'
 const props = defineProps({
     rowList:{
        type:Array,
        default:()=>[]
    },
 })
</script>

<style lang="scss" scoped>
.rowList-ground{
    .recommend-title{
        font-size: 40px;
        margin:0 0 20px 20px;
    }
    .rowList-scroll{
     overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    width: 100%;
    margin-top: 20px;
    
    .rowList-item{
        margin-left: 20px;
        display: inline-block;
        width:200px;
        text-align: center;

        .rowList-img{
          border-radius: 30%;
          width:150px;
          height:150px;
        }
        .rowList-tit{
            white-space:nowrap;
            font-size: 16px;
            text-overflow:ellipsis;
            overflow:hidden;
            padding: 0 35px;
        }
        .rowList-label{
            text-align: center;
            font-size: 16px;
        }
    }
    }
}
</style>
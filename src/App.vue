<template>
<div>
  <Search  id="searchDom" :listData="showData.listData" @searchResult="searchResult"/>
  <row-list id="rowListDom" :rowList="showData.rowList"/>
  <List :listData="showData.listData" :height="rowListHeight"/>
</div>
</template>

<script setup>
 import {getFreeList,getLookupData,getGrossingList} from '@/api/index.js'
import Search from './components/search/index.vue'
import rowList from './components/rowList/index.vue'
import List from './components/list/index.vue'
import {ref, reactive,onMounted ,nextTick,computed} from 'vue'
 const showData =  reactive({
     listData:[],
     rowList:[]
 })
 const padTop = ref(0)
 const rowListHeight = ref(0)
 let totalData = []
 let idArr = []
 // 获取接口数据
  onMounted(async ()=>{
     getGrossingList({limit:10}).then((data)=>{
        showData.rowList = data.data.feed.entry
        // 获取数据之后开始计算推荐列表高度
        nextTick(()=>{
          const searchDom =document.getElementById('searchDom')
          const rowListDom =document.getElementById('rowListDom')
          padTop.value = searchDom.offsetHeight
          rowListHeight.value = document.documentElement.clientHeight-rowListDom.offsetHeight-searchDom.offsetHeight
       })
      }).catch((err)=>{console.log(err)})
    

    try {
      const resFree =await getFreeList({limit:100})
      const {status,data} = resFree
      if(status === 200){
        //筛选出需要的id
        idArr= data.feed.entry.length&&data.feed.entry.map((item)=>item.id.attributes['im:id'])
      } else {
        console.error('error')
      }
      if(idArr.length){
        const idStr=idArr.join(',')
        const resLookup =await getLookupData({ids:idStr})
        let {status,data} = resLookup
        if(status === 200){
          showData.listData = data.results.map((item,ide)=>{
            const { artworkUrl512,trackId, trackName, genres, averageUserRating,userRatingCount} = item;
            let index = ide+1
            return {artworkUrl512,trackId,trackName,genres:genres[0],averageUserRating:Number(averageUserRating.toFixed(1)),userRatingCount,num:index}
          })
          totalData = data.results
        }
      }
    } catch (error) {
      console.error(error)
    }
  })

// 搜索结果展示
 const searchResult=(str)=>{
   showData.listData = totalData.filter((item,idx)=>{
     if(item.trackName.indexOf(str) > -1 || item.description.indexOf(str) > -1 ){
       let index = idx+1
      return Object.assign(item,{num:index})
     }
    })
 }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

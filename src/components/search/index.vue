<template>
  <div class="search-view">
     <Search 
      v-model="searchValue"
      class="van-hairline--bottom"
      background="white"
      shape="round" 
      placeholder="Search..."
      @search="onSearch"/>
  </div>
</template>
<script setup>
    import { reactive, ref,defineExpose,defineProps,defineEmits } from "vue";
    import { Search  } from 'vant';

    defineProps({
        listData:{
            type:Array,
            default:()=>[]
        },
    })
    const emit=defineEmits(['searchResult'])
    let searchValue = ref('');
    const onSearch=(val)=>{
        emit('searchResult',val)
    };
</script>

<style lang="scss" scoped>
.search-view{
    width: 100%;
    padding-top:60px;
    padding-top: constant(safe-area-inset-top);
 	padding-top: env(safe-area-inset-top);
}
</style>
<template>
    <page :title="$t('examples.test')">
        <div class="wrap" slot="content">
            <div class="item item1">
                红
            </div>
            <div class="item item2">
                粉红
            </div>
            <div class="item item3">
                灰色灰色
            </div>
        </div>
    </page>
    
</template>

<script type="text/ecmascript-6">
  import Page from 'example/components/page/page.vue'
  export default {
      components: {
          Page
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .wrap
    display: flex
    // width: 100%
    background: #fff
    flex-direction: row
    margin: 10px
    padding: 10px
    flex-wrap: wrap
    .item
      flex: 1
      background: pink
      border: 1px solid #ccc
      border-radius: 4px
      margin:10px
      padding: 30px
    .item1 
      flex: 1 0 100px
    .item2
      flex: 1 1 200px
    .item3
      flex: 1 0 300px
      
</style>

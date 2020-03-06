<template>
  <tab-ber>
    <tab-ber-item path="/home" >
      <img src="~assets/img/tabbar/home.svg" alt=""slot="item-icon">
      <img src="~assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tab-ber-item>
    <tab-ber-item path="/category" >
      <img src="~assets/img/tabbar/category.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/category_active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-ber-item>
    <tab-ber-item path="/cart">
      <img src="~assets/img/tabbar/cart.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/cart_active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tab-ber-item>
    <tab-ber-item path="/profile">
      <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tab-ber-item>

  </tab-ber>
</template>

<script>
  import TabBer from 'components/common/tabber/Tabber'
  import TabBerItem from 'components/common/tabber/TabBarItem'

  export default {
    name: "MainTabBar",
    components:{
      TabBer,
      TabBerItem
    }
  }
</script>

<style scoped>

</style>

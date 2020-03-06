<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>

      <tab-control :titles="['流行', '新品', '精选']"
                   class="tab-control" @tabClick="tabClick"/>

      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>


  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'
 // import BScroll from 'better-scroll'
  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  export default {
    name: "Home",
    data(){
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0 , list: []},
          'new': {page:0 , list: []},
          'sell': {page:0 , list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    components: {
      FeatureView,
      RecommendView,
      HomeSwiper,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods: {
      /*
      * 事件监听相关的方法
      * */
      tabClick(index){
        console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            console.log('sell');
            break;
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0) //scrollTo(x, y, time) 在time时间内回到（x， y）的位置
      },
      contentScroll(position){
        // console.log(position);
        this.isShowBackTop = -(position.y) > 1000
      },
      loadMore(){
        // console.log("上拉加载更多");
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.scroll.refresh()
      },
      /*
      * 网络请求相关的方法
      * */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          //res为请求回来的数据
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          console.log("banners",res);
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  /*scoped有作用域，该style只对当前组件有效*/
  #home{
    padding-top:44px ;
    height: 100vh;
    position: relative;
  }
  .home-bar{
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    background-color: #ffffff;

    z-index: 9;
  }

  /*.content{*/
    /*height: calc(100% - 93px);*/
    /*margin-top: 44px;*/
  /*}*/

  .content {
    overflow: hidden;
    position: absolute;

    top: 44px;
    bottom: 49px;
  }
</style>

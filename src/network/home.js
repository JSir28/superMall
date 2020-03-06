import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}


// let totalNums = []
// const nums1 = [20, 11, 222]
// const nums2 = [111, 22, 33]

// totalNums.push(...nums1)  //该语法，...是将nums1中的数据一次取出，进行push操作

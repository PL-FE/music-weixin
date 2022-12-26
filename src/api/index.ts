const BASE_URL = 'https://pl-fe.cn/cloud-music-api'
// 通过export向外暴露一个方法，方法名叫myRequest,调用myRequest方法时会向方法中传递一个对象options

type optionsType = {
    url:String,
    method?: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined,
    data?:Object| Array<any>,
}

 const http = (options:optionsType)=>{  
    return new Promise((resolve,reject)=>{  // 异步处理的封装通过promise比较好，并且要return出去，
        uni.request({  // 在回调函数中处理异步请求
            url: BASE_URL + options.url,  // 将接口地址分为两部分，这样如果域名改变了好维护，接口地址从options中获取
            method: options.method || 'GET', // 方法从options中获取，如果没有传入method，则默认为GET，
            data: options.data || {},  // data从options中获取，如果没有传入data， 则默认一个空对象
            success: (res) => {  // 用箭头函数，res是返回来的数据
                console.log(222);
                
                if(res?.data?.code !== 200){  // 如果请求失败，则给一个提示
                    return uni.showToast({
                        icon:'error',
                        title: '获取数据失败！'
                    })
                }
                const r = res.data?.result || res.data?.data || res.data
                resolve(r)  //如果请求成功，调用resolve返回数据
            },
            fail: (err)=>{ // err 是返回来的错误信息
                uni.showToast({  // 给一个消息提示
                    icon:'error',
                    title: JSON.stringify(err)

                })
                reject(err) // 调用reject方法把错误消息返回出去
            }
            
        })
    })
}

export const api = {
    get(url:String,data?:any){
       return http({method:'GET', url, data:data?.params})
    },
    post(url:String,data?:any){
        return http({method:'POST', url, data:data?.params})
     }
}
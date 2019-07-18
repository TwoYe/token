import { message } from 'antd';

export async function baseApi(api, canshu, callback) {

    let realApi = `https://openapi.twoyecloud.com` + api;

    fetch(realApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'TOKEN': localStorage.getItem("token"),
            'ID':parseInt(localStorage.getItem("id"))
        },
        body: JSON.stringify(canshu)
    }).then(res => res.json()).then(
        data => {

            //登录失效
            if(data.code=="UNAUTHORIZED") window.location.href='/login';

            //请求外层成功
            if (data.code == "SUCCESS") {
                //请求业务不成功
                if (data.data.code != "SUCCESS") message.error(data.data.msg);
                //请求业务成功并返回数据
                else callback({ code: "0_0", data: data.data.data });
            }
         
        }
    )
}
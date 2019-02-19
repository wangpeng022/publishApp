<template>
    <div class="content">
        <div class="header">
            <div class="logo"></div>
            <h2>设备设施-新城控股</h2>
            <div class="message">
                <span>版本：1.1.1</span>
                <span>更新时间：2018-1-1</span>
            </div>
            <div class="btns">
                <i-button>IOS客户端下载</i-button>
                <i-button>Android客户端下载</i-button>
                <i-button>二维码下载</i-button>
            </div>
        </div>
        <div class="cont_body">
            <h2>版本说明</h2>
            <div class="cont_body_box">

                <div class="item_header">
                    <div class="left">
                        <span>版本：2.2.2</span>
                        <span>大小：13MB</span>
                    </div>
                    <div class="right">
                        <span>
                            跟新日期：2019.01.01
                        </span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
   data () {
    return {

    }
   },
   components: {

   },
   methods: {
       //下载apk    
        downFile(param) {
        this.$axios({
            responseType: 'arraybuffer',
            method: "post",
            url: publicu + "unifier/FNCenterRecordPrePayGridService",
            data: qs.stringify({ jsonString: JSON.stringify(param) }),
            responseType: "blob"
        })
        // this.getList(param)
            .then(res => {
            const filename = decodeURI(
                res.headers["content-disposition"]
                .split(";")
                .filter(item => item.indexOf("filename") >= 0)[0]
                .split("=")[1]
                .replace(/\"/g, "")
            );
            const blob = new Blob([res.data], {
                type: "application/vnd.android",
                data: 'text/csv',
                charset: 'utf-8',
            });
            if ("download" in document.createElement("a")) {
                // 非IE下载
                const elink = document.createElement("a");
                elink.download = filename;
                elink.style.display = "none";
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, filename);
            }
            })
            .catch(ex => {
            console.log(ex);
            });
        },
    }
}
</script>

<style>
    .content{
        padding: .1px;
        width: 100%;
    }
    .header{
        width: 100%;
        min-height: 3.6rem;
        padding: .5rem .1rem 0;
        background: #e4e4e4;
        text-align: center;        
    }
    .logo{
        width: 1.25rem;
        height: 1.25rem;
        border: 1px solid black;
        margin: 0 auto;
    }
    .cont_body{
        max-width: 80%;
        margin: 0 auto;
    }
 
</style>

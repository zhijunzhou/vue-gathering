	

	function baocun(){
		var touxiang = $("#jietu").attr("src");
		var qianming = canvasEdit.toDataURL("i/png");
		$.ajax({
            type:"post",
            url:"http://h5designer.com/apps/web/index.php?s=BaiduLetter/doSaveWork",
            data:{"headBin":touxiang,"signerBin":qianming,},
            dataType:"json",
            success:function(data){
            		var id = data.data.id;
            		var url = "http://www.stg-smartlearning.com/download/linshi/wudi/double/fenxiang.html?id="+id;
                    // $(".cstp").attr("id",data.data.id)
                    // $(".cstp").attr("src",data.data.picUrl)
                    location.href = url;
            },
            error:function(msg){
            
            }

        });
	}



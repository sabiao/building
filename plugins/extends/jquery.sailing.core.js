$.extend({
    sailing: {
        version: "1.0",
        messager: {}
    }
});

$.extend($.sailing, {
    ajax: function(options, callback){
        var opts = $.extend({
            type: "POST",
            timeout: 60000,
            dataType: "json",
            cache: false,
            error: function(data){
                $.messager.show({
                    title: '超时信息',
                    msg: '请求超时！'
                });
            },
            success: function(sinfo){
                if (callback) {
                    callback(sinfo);
                }
            },
            complete: function(){
                $.messager.progress('close');
            }
        }, options || {});
        
        $.messager.progress();
        $.ajax(opts);
    }
});

$.extend($.sailing.messager, {
    show: function(params){
        var content = '<div><h3>' + params.msg + '<h3></div>';
        if (params.msgCode[0] == 'E') {
            content += '<div style="margin-top: 5px;">参考代码：' + params.msgCode + '</div>';
            content += '<div style="float:right;margin-bottom: 5px;"><a href="#" style="color:red;" onclick="$(\'#exception\').window(\'open\');">查看异常信息</a></div>';
            
            var dlg = document.getElementById('exception');
            if (dlg) {
                dlg.innerHTML = params.exception;
            }
            else {
                dlg = document.createElement('div');
                dlg.id = "exception";
                dlg.setAttribute("title", "异常信息");
                dlg.setAttribute("class", "easyui-window");
                dlg.setAttribute("style", "width:480px;height:320px;padding:10px;");
                dlg.innerHTML = params.exception;
                
                document.body.appendChild(dlg);
                
                $('#exception').window({
                    collapsible: false,
                    minimizable: false,
                    closed: true,
                    modal: true
                });
            }
        }
        
        $.messager.show({
            title: "消息",
            msg: content,
            width: 260,
            height: 120
        });
    }
});

$.fn.extend({
    fillData: function(type, url, params){
        $.messager.progress();
        $.ajax({
            type: "GET",
            timeout: 60000,
            dataType: "json",
            cache: false,
            url: url,
            data: params ? params : {},
            error: function(){
                $.messager.show({
                    title: '超时信息',
                    msg: '请求超时！'
                });
            },
            success: function(sinfo){
                //var j = JSON.parse(data);
                if (sinfo.scheme == "msg" || sinfo.scheme == "all") {
                    $.sailing.msg.show(sinfo.data.msgData);
                }
                
                if (sinfo.scheme == "data" || sinfo.scheme == "all") {
                    switch (type) {
                        case "datagrid":
                            $(this).datagrid("loadData", sinfo.data.datagrid);
                            break;
                        case "combogrid":
                            $(this).combogrid("loadData", sinfo.data.combogrid);
                            break;
                        case "treegrid":
                            $(this).treegrid("loadData", sinfo.data.treegrid);
                            break;
                        case "treepagegrid":
                            $(this).treegrid("loadData", sinfo.data.treepagegrid);
                            break;
                        case "tree":
                            $(this).tree("loadData", sinfo.data.tree);
                            break;
                        case "combotree":
                            $(this).combotree("loadData", sinfo.data.combotree);
                            break;
                        case "combobox":
                            $(this).combobox("loadData", sinfo.data.combobox);
                            break;
                        case "combogroupbox":
                            $(this).combobox("loadData", sinfo.data.combobox);
                            break;
                        case "form":
                            $(this).form("loadData", sinfo.data.form);
                            break;
                        default:
                            break;
                    }
                }
            },
            complete: function(){
                $.messager.progress('close');
            }
        })
    }
});

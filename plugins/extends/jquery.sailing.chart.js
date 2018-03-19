$.extend($.sailing, {
    chart: {		
        drawChart: function(ajaxOpts, chartOpts){
            var opts = $.extend({
                type: "GET",
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
                    if (sinfo.schema == "msg" || sinfo.schema == "all") {
                        $.sailing.messager.show(sinfo.data.msgData);
                    }
                    
                    if (sinfo.schema == "data" || sinfo.schema == "all") {
                        var chartPath = "../chart/" + chartOpts.type + ".swf";
						
                        var chartData = $.sailing.chart.templates[chartOpts.type];
						//添加数据simplechart,multichart
						if(chartOpts.type[0] == "M")
							$.extend(chartData, sinfo.data.multichart);
						else
                        	$.extend(chartData, sinfo.data.simplechart);
						//添加设置
						$.extend(chartData.chart, chartOpts.chart);
						
                        FusionCharts.setCurrentRenderer("flash");
                        var chart = new FusionCharts(chartPath, chartOpts.id, chartOpts.width, chartOpts.height, "0", "0");
                        chart.setJSONData(chartData);
                        chart.render(chartOpts.target);
                    }                    
                },
                complete: function(){
                    $.messager.progress('close');
                }
            }, ajaxOpts || {});
            
            $.messager.progress();
            $.ajax(opts);
        },
        drawLocalChart: function(data, chartOpts){
            var chartPath = "../chart/" + chartOpts.type + ".swf";
            
            var chartData = $.sailing.chart.templates[chartOpts.type];
            $.extend(chartData, data);
            //添加设置
            $.extend(chartData.chart, chartOpts.chart);
            
            FusionCharts.setCurrentRenderer("flash");
            var chart = new FusionCharts(chartPath, chartOpts.id, chartOpts.width, chartOpts.height, "0", "0");
            chart.setJSONData(chartData);
            chart.render(chartOpts.target);
        },
        types: {
            Area2D: "Area2D",
            MSArea: "MSArea",
            Column2D: "Column2D",
            Column3D: "Column3D",
            MSColumn2D: "MSColumn2D",
            MSColumn3D: "MSColumn3D",
            Line: "Line",
            MSLine: "MSLine",
            Pie2D: "Pie2D",
            Pie3D: "Pie3D",
            Doughnut3D: "Doughnut3D",
            Doughnut2D: "Doughnut2D",
            Radar: "Radar"
        },
        templates: {
            Area2D: {
                "chart": {
                    "bgcolor": "f1f1f1",
                    "canvasbgcolor": "1D8BD1,FFFFFF",
                    "canvasbgalpha": "60",
                    "canvasbgangle": "270",
                    "outcnvbasefontcolor": "1D8BD1",
                    "caption": "",
                    "subcaption": "",
                    "yaxisname": "",
                    "xaxisname": "",
                    "alternatehgridalpha": "30",
                    "alternatehgridcolor": "FFFFFF",
                    "canvasborderthickness": "1",
                    "canvasbordercolor": "114B78",
                    "basefontcolor": "1D8BD1",
                    "hovercapbordercolor": "114B78",
                    "hovercapbgcolor": "E7EFF6",
                    "plotgradientcolor": "DCE6F9",
                    "plotfillangle": "90",
                    "plotfillcolor": "1D8BD1",
                    "plotfillalpha": "80",
                    "showanchors": "0",
                    "canvaspadding": "20",
                    "plotfillratio": "10,90",
                    "showplotborder": "1",
                    "plotbordercolor": "FFFFFF",
                    "plotborderalpha": "20",
                    "divlinecolor": "FFFFFF",
                    "divlinealpha": "60",
                    "numbersuffix": ""
                },
                "styles": {
                    "definition": [{
                        "name": "Bevel",
                        "type": "bevel",
                        "distance": "4",
                        "blurx": "2",
                        "blury": "2"
                    }, {
                        "name": "DataValuesFont",
                        "type": "font",
                        "bordercolor": "1D8BD1",
                        "bgcolor": "1D8BD1",
                        "color": "FFFFFF"
                    }, {
                        "name": "myAnim",
                        "type": "animation",
                        "param": "_alpha",
                        "start": "0",
                        "duration": "1"
                    }, {
                        "name": "dummyShadow",
                        "type": "Shadow",
                        "alpha": "0"
                    }],
                    "application": [{
                        "toobject": "DATAPLOT",
                        "styles": "Bevel"
                    }, {
                        "toobject": "DATAVALUES",
                        "styles": "DataValuesFont,dummyShadow,myAnim"
                    }]
                }
            },
            MSArea: {
                "chart": {
                    "bgcolor": "E9E9E9",
                    "outcnvbasefontcolor": "666666",
                    "caption": "",
                    "xaxisname": "",
                    "yaxisname": "",
                    "numberprefix": "",
                    "showlabels": "1",
                    "showvalues": "0",
                    "plotfillalpha": "70",
                    "numvdivlines": "10",
                    "showalternatevgridcolor": "1",
                    "alternatevgridcolor": "e1f5ff",
                    "divlinecolor": "e1f5ff",
                    "vdivlinecolor": "e1f5ff",
                    "basefontcolor": "666666",
                    "canvasborderthickness": "1",
                    "showplotborder": "1",
                    "plotborderthickness": "0"
                }
            },
            Column2D: {
                "chart": {
                    "yaxisname": "",
                    "caption": "",
                    "numberprefix": "",
                    "useroundedges": "1",
                    "bgcolor": "FFFFFF,FFFFFF",
                    "showborder": "0"
                }
            },
            Column3D: {
                "chart": {
                    "yaxisname": "",
                    "caption": "",
                    "numberprefix": "",
                    "showborder": "1",
                    "imagesave": "1"
                }
            },
            MSColumn2D: {
                "chart": {
                    "palette": "2",
                    "rotatenames": "0",
                    "animation": "1",
                    "numdivlines": "4",
                    "caption": "",
                    "basefont": "Arial",
                    "basefontsize": "12",
                    "useroundedges": "1",
                    "legendborderalpha": "0"
                }
            },
            MSColumn3D: {
                "chart": {
                    "caption": "",
                    "showlabels": "1",
                    "showvalues": "0",
                    "decimals": "0",
                    "numberprefix": ""
                }
            },
            Line: {
                "chart": {
                    "caption": "",
                    "subcaption": "",
                    "xaxisname": "",
                    "yaxisname": "",
                    "numberprefix": "",
                    "showlabels": "1",
                    "showcolumnshadow": "1",
                    "animation": "1",
                    "showalternatehgridcolor": "1",
                    "alternatehgridcolor": "ff5904",
                    "divlinecolor": "ff5904",
                    "divlinealpha": "20",
                    "alternatehgridalpha": "5",
                    "canvasbordercolor": "666666",
                    "basefontcolor": "666666",
                    "linecolor": "FF5904",
                    "linealpha": "85",
                    "showvalues": "1",
                    "rotatevalues": "1",
                    "valueposition": "auto"
                }
            },
            MSLine: {
                "chart": {
                    "caption": "",
                    "yaxisname": "",
                    "bgcolor": "F7F7F7, E9E9E9",
                    "numvdivlines": "10",
                    "divlinealpha": "30",
                    "labelpadding": "10",
                    "yaxisvaluespadding": "10",
                    "showvalues": "1",
                    "rotatevalues": "1",
                    "valueposition": "auto"
                }
            },
            Pie2D: {
                "chart": {
                    "caption": "",
                    "showpercentageinlabel": "1",
                    "showvalues": "1",
                    "showlabels": "1",
                    "showlegend": "1"
                }
            },
            Pie3D: {
                "chart": {
                    "caption": "",
                    "palette": "2",
                    "animation": "1",
                    "subcaption": "",
                    "yaxisname": "",
                    "showvalues": "0",
                    "numberprefix": "",
                    "formatnumberscale": "0",
                    "showpercentintooltip": "0",
                    "showlabels": "0",
                    "showlegend": "1"
                }
            },
            Doughnut3D: {
                "chart": {
                    "caption": "",
                    "bgcolor": "E1E1E1,FFFFFF",
                    "pieyscale": "30",
                    "plotfillalpha": "80",
                    "pieinnerfacealpha": "60",
                    "slicingdistance": "35",
                    "startingangle": "190",
                    "enablesmartlabels": "0",
                    "numbersuffix": "",
                    "showborder": "1",
                    "showvalues": "0",
                    "showlabels": "0",
                    "showlegend": "1"
                }
            },
            Doughnut2D: {
                "chart": {
                    "showpercentagevalues": "1",
                    "caption": "Company Revenue",
                    "chartrightmargin": "45",
                    "bgcolor": "FFFFFF",
                    "chartleftmargin": "50",
                    "charttopmargin": "35",
                    "chartbottommargin": "20",
                    "showplotborder": "0",
                    "showshadow": "1",
                    "showborder": "1",
                    "bordercolor": "0080FF",
                    "borderalpha": "50",
                    "bgalpha": "50"
                },
                "styles": {
                    "definition": [{
                        "name": "Font_0",
                        "type": "font",
                        "font": "Calibri",
                        "size": "14",
                        "bold": "1",
                        "bgcolor": "FFFFFF",
                        "bordercolor": "FFFFFF",
                        "ishtml": "0"
                    }, {
                        "name": "Font_1",
                        "type": "font",
                        "size": "15",
                        "color": "000080",
                        "bgcolor": "FFFFFF",
                        "bordercolor": "FFFFFF",
                        "ishtml": "0"
                    }, {
                        "name": "Glow_0",
                        "type": "Glow",
                        "color": "0080FF",
                        "alpha": "43",
                        "quality": "3"
                    }],
                    "application": [{
                        "toobject": "DATALABELS",
                        "styles": "Font_0"
                    }, {
                        "toobject": "CAPTION",
                        "styles": "Font_1"
                    }, {
                        "toobject": "DATAPLOT",
                        "styles": "Glow_0"
                    }]
                }
            },
            Radar: {
                "chart": {
                    "palette": "2",
                    "rotatenames": "0",
                    "animation": "1",
                    "numdivlines": "4",
                    "caption": "",
                    "basefont": "Arial",
                    "basefontsize": "12",
                    "useroundedges": "1",
                    "legendborderalpha": "0"
                }
            }
        }
    }
});

// JavaScript Document
//Tab标签
function setTab1(name, cursel, n){
    for (var i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i==cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}
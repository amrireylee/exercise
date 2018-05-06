/**
 * Created by amrirey on 2018/04/14.
 */
var basePath = window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")+"/";
var suffix = ".amrirey";
function swapUrl(relativeUrl){
    if (!relativeUrl.startsWith(basePath)) {
        relativeUrl = basePath + relativeUrl;
    }
    if(!relativeUrl.endsWith(suffix)){
        relativeUrl = relativeUrl+suffix;
    }
    return relativeUrl;
}
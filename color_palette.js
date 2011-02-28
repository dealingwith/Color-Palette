//adapted from: http://davidwalsh.name/color-palette-generator-jquery
//my colors array
var colors = new Array();

//get all elements
$('*').each(function() {
    var elem;
    if ($(this).css('background-color') && $(this).css('background-color') != 'transparent') {
        elem = ($(this).attr("class") != undefined) ? "." + $(this).attr("class") : "#" + $(this).attr("id");
        colors.push({"elem":elem, "rgb":$(this).css('background-color'), "hex":""});
    }
    if ($(this).css('color')) {
        elem = ($(this).attr("class") != undefined) ? "." + $(this).attr("class") : "#" + $(this).attr("id");
        colors.push({"elem":elem, "rgb":$(this).css('color'), "hex":""});
    }
    if ($(this).css('border-color')) {
        elem = ($(this).attr("class") != undefined) ? "." + $(this).attr("class") : "#" + $(this).attr("id");
        colors.push({"elem":elem, "rgb":$(this).css('border-color'), "hex":""});
    }
    
});

jQuery.each(colors, function(it, elem) {
    if (elem.rgb != undefined) {
        var values = elem.rgb.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/);
        if (values) {
            elem.hex = "#" + RGBtoHex(values[1], values[2], values[3]);
        }
    }
});

//remove dupes and sort
colors.sort();

$('body').append('<div id="your_colors_sir" style="padding: 10px; z-index: 10000; background: white; position: absolute; bottom: 0; left: 0; right: 0; height: 35%; overflow: auto; border-top: 2px solid black;"></div>');

//prevent dupes in elem list
var printed_elems = new Array();

//create a color block for all of them
jQuery.each(colors, function(it, value) {
    if (!$('div[rel=\'' + value.rgb + '\']').length) {
        //inject the wrapper
        var wrapper_id = 'w' + it;
        $('<div class="dwrapper" style="width:200px; float:left; padding:5px; margin:0 10px 10px 0; border:1px solid #ccc; font-size: 11px; font-family: sans; color: black" id="' + wrapper_id + '" rel="' + value.rgb + '"> </div>').prependTo('#your_colors_sir');

        //inject the color div
        $('<div class="dcolor" style="height:40px; background-color:' + value.rgb + '"> </div>').appendTo('#' + wrapper_id);

        //inject text div
        $('<div class="text">' + value.rgb + '<br>' + value.hex + '<br>' + value.elem + '</div>').appendTo('#' + wrapper_id);
    } else {
        if (value.elem != "" && printed_elems.indexOf(value.elem) < 0) {
            $('div[rel=\'' + value.rgb + '\'] .text').append(", " + value.elem);
            printed_elems.push(value.elem);
        }
    }
});

function RGBtoHex(R, G, B) {
    return toHex(R) + toHex(G) + toHex(B)
}
function toHex(N) {
    if (N == null) return "00";
    N = parseInt(N);
    if (N == 0 || isNaN(N)) return "00";
    N = Math.max(0, N);
    N = Math.min(N, 255);
    N = Math.round(N);
    return "0123456789ABCDEF".charAt((N - N % 16) / 16)
    + "0123456789ABCDEF".charAt(N % 16);
}
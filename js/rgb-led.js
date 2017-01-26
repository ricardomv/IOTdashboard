var wsUri = "ws://echo.websocket.org/";
$(document).ready( function() {
    $("#button_add").click(function(){
        $("#array").append(document.createElement('br'))
        $("#array").append(new_light_pcb())
    });
    $("#array").append(new_light_pcb())
    websocket = new WebSocket(wsUri)
    websocket.onmessage = function(evt) {
        console.log(evt.data);
        document.body.innerHTML += evt.data
    };
});
var colors = ["#ff0000", "#ff6600", "#ffda21", "#33dd00", "#00ffff", "#1133cc", "#ff00ff", "#fffff0"];
function new_light_pcb() {
    var div = document.createElement('div');
    div.setAttribute("class", "form-group");
    for (var i = 0; i < 8; i++) {
        var led = document.createElement('input');
        led.setAttribute("type", "hidden");
        led.setAttribute("id", "hidden-input");
        led.setAttribute("class", "demo");
        led.setAttribute("data-control", "brightness");
        led.setAttribute("value", colors[i]);
        div.appendChild(led)
    }
    $(div).children('input').each(function () {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            format: $(this).attr('data-format') || 'hex',
            keywords: $(this).attr('data-keywords') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
            change: function(hex, opacity) {
                var log;
                try {
                    log = hex ? hex : 'transparent';
                    if( opacity ) log += ', ' + opacity;
                    //console.log(log + " id: " + this.id);
                    websocket.send(log);
                } catch(e) {}
            },
            theme: 'default'
        });
    });
    return div;
}

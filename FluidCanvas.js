if (typeof jQuery == 'undefined') {
    alert('jQuery has not been loaded!');
}

/*
 * This constructor will actually return an HTML5 canvas. The returned HTML5
 * canvas will maintain its original aspect ratio and drawable dimensions, even
 * if the document body is resized. Which dimensions the canvas maintains can be
 * specified with constructor properties.
 * 
 * Configurable properties:
 * 
 * container: Container div, automatically created if not set.
 * 
 * drawableWidth: Drawable width of canvas, regardless of real pixel dimensions;
 * defaults to window dimension if not set.
 * 
 * drawableHeight: Drawable height of canvas, regardless of real pixel
 * dimensions; defaults to window dimension if not set.
 */
function FluidCanvas(properties) {
    
    properties = typeof properties !== 'undefined' ? properties : {};
    
    var drawableWidth = properties.drawableWidth;
    if (typeof drawableWidth == 'undefined') {
        drawableWidth = $(window).width();
    }
    
    var drawableHeight = properties.drawableHeight;
    if (typeof drawableHeight == 'undefined') {
        drawableHeight = $(window).height();
    }
    
    var containerDiv = properties.container;
    if (typeof containerDiv == 'undefined') {
        containerDiv = $('<div>', {
            id : 'fluidCanvasContainerDiv'
        }).css('width', drawableWidth + 'px').css('height', drawableHeight + 'px');
        $('body').append(containerDiv);
    }
    
    var aspectRatio = drawableWidth / drawableHeight;
    
    function resizeContainerDiv() {
        var newWidth = $(window).width();
        var newHeight = $(window).height();
        if (newWidth == 0 || newHeight == 0) {
            return;
        }
        if (aspectRatio != null) {
            if (newWidth / newHeight < aspectRatio) {
                newHeight = newWidth / aspectRatio;
            } else if (newWidth / newHeight > aspectRatio) {
                newWidth = newHeight * aspectRatio;
            }
        }
        containerDiv.css('width', newWidth + 'px');
        containerDiv.css('height', newHeight + 'px');
    }
    
    $(window).resize(function() {
        resizeContainerDiv();
    });
    
    containerDiv.css('width', drawableWidth + 'px').css('height', drawableHeight + 'px');
    var canvas = $('<canvas>', {
        id : 'canvas'
    }).attr('width', drawableWidth).attr('height', drawableHeight);
    containerDiv.append(canvas);
    canvas.css('width', '100%');
    canvas.css('height', '100%');
    resizeContainerDiv();
    
    return canvas[0];
}
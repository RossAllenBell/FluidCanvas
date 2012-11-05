if (typeof jQuery === 'undefined') {
    alert('jQuery has not been loaded!');
}

/*
 * This constructor will actually return an HTML5 canvas. The returned HTML5
 * canvas will maintain its original aspect ratio and drawable dimensions, even
 * if the document body is resized. The dimensions that the canvas maintains
 * can be specified with constructor properties.
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
 * 
 * availableWidth: Function used to determine maximum width (in pixels) the view
 * port can use up; defaults to 100% of the window height in pixels
 * 
 * availableHeight: Function used to determine maximum height (in pixels) the
 * view port can use up; defaults to 100% of the window height in pixels
 * 
 */
function FluidCanvas(properties) {
    var uniqueSuffix = '_' + new Date().getTime().toString() + '_' + Math.floor(Math.random() * 100000).toString();
    
    properties = typeof properties !== 'undefined' ? properties : {};
    
    var drawableWidth = properties.drawableWidth;
    if (typeof drawableWidth === 'undefined') {
        drawableWidth = $(window).width();
    }
    
    var drawableHeight = properties.drawableHeight;
    if (typeof drawableHeight === 'undefined') {
        drawableHeight = $(window).height();
    }
    
    var containerDiv = properties.container;
    if (typeof containerDiv === 'undefined') {
        containerDiv = $('<div>', {
            id : 'fluidCanvasContainerDiv' + uniqueSuffix
        }).css('width', drawableWidth + 'px').css('height', drawableHeight + 'px');
        $('body').append(containerDiv);
    }
    
    var viewportAvailableWidth = properties.availableWidth;
    if (typeof viewportAvailableWidth === 'undefined') {
        viewportAvailableWidth = function() {
            return $(window).width();
        };
    }
    
    var viewportAvailableHeight = properties.availableHeight;
    if (typeof viewportAvailableHeight === 'undefined') {
        viewportAvailableHeight = function() {
            return $(window).height();
        };
    }
    
    var aspectRatio = drawableWidth / drawableHeight;
    
    function resizeContainerDiv() {
        var newWidth = viewportAvailableWidth();
        var newHeight = viewportAvailableHeight();
        if (newWidth === 0 || newHeight === 0) {
            return;
        }
        if (aspectRatio !== null) {
            if (newWidth / newHeight < aspectRatio) {
                newHeight = newWidth / aspectRatio;
            } else if (newWidth / newHeight > aspectRatio) {
                newWidth = newHeight * aspectRatio;
            }
        }
        containerDiv.css('width', newWidth + 'px').css('height', newHeight + 'px');
    }
    
    $(window).resize(function() {
        resizeContainerDiv();
    });
    
    containerDiv.css('width', drawableWidth + 'px').css('height', drawableHeight + 'px');
    var canvas = $('<canvas>', {
        id : 'canvas' + uniqueSuffix
    }).attr('width', drawableWidth + 'px').attr('height', drawableHeight + 'px');
    containerDiv.append(canvas);
    canvas.css('width', '100%').css('height', '100%');
    resizeContainerDiv();
    
    return canvas[0];
}
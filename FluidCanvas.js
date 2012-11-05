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
 * unavailableWidth: Function used to determine unavailable pixels when
 * calculating available space to resize to. Use this property to place a
 * FluidCanvas on a page with other elements without causing the canvas to
 * resize to a size that flows off the window (causing the page to be
 * scrollable); defaults to returning 0
 * 
 * unavailableHeight: see unavailableWidth
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
    
    var unavailableWidth = properties.unavailableWidth;
    if (typeof unavailableWidth === 'undefined') {
        unavailableWidth = function() {
            return 0;
        };
    }
    
    var unavailableHeight = properties.unavailableHeight;
    if (typeof unavailableHeight === 'undefined') {
        unavailableHeight = function() {
            return 0;
        };
    }
    
    var aspectRatio = drawableWidth / drawableHeight;
    
    function resizeContainerDiv() {
        var newWidth = $(window).width() - (parseInt($('body').css('margin-left')) + parseInt($('body').css('margin-right'))) - unavailableWidth();
        var newHeight = $(window).height() - (parseInt($('body').css('margin-top')) + parseInt($('body').css('margin-bottom'))) - unavailableHeight();
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
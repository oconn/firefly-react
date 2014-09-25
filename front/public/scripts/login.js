var imagePath = 'public/assets/images/';

function hoverBtn(el, platform) {
    var src = '';
    switch(platform){
    case 'google':
        src = 'google_hover.png';
        break;
    case 'facebook':
        src = 'facebook_hover.png';
        break;
    case 'twitter':
        src = 'twitter_hover.png';
        break;
    case 'pinterest':
        src = 'pinterest_hover.png';
        break;
    case 'local':
        break;
    }    
    el.setAttribute('src', imagePath + src);
}

function unhoverBtn(el, platform) {
    var src = '';
    switch(platform){
    case 'google':
        src = 'google_base.png';
        break;
    case 'facebook':
        src = 'facebook_base.png';
        break;
    case 'twitter':
        src = 'twitter_base.png';
        break;
    case 'pinterest':
        src = 'pinterest_base.png';
        break;
    case 'local':
        break;
    }
    el.setAttribute('src', imagePath + src);
}

function clickBtn(el, platform) {
    var src = '';
    switch(platform){
    case 'google':
        src = 'google_press.png';
        break;
    case 'facebook':
        src = 'facebook_press.png';
        break;
    case 'twitter':
        src = 'twitter_press.png';
        break;
    case 'pinterest':
        src = 'pinterest_press.png';
        break;
    case 'local':
        break;
    }    
    el.setAttribute('src', imagePath + src);
}

function preload(images) {
    
    for(var i = 0, n = images.length; i < n; i++) {
        (new Image()).src = imagePath + images[i];
    }
}

var images = [
    'google_base.png',
    'google_hover.png',
    'google_press.png',
    'facebook_base.png',
    'facebook_hover.png',
    'facebook_press.png',
    'pinterest_base.png',
    'pinterest_hover.png',
    'pinterest_press.png',
    'twitter_base.png',
    'twitter_hover.png',
    'twitter_press.png'
];

preload(images);




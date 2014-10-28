var options = {};

options.banner = '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
    '<%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n';

options.assetFiles = [
    {   
        expand: true,
        cwd: 'app/src/assets',
        src: ['**/*'],
        dest: 'app/public/assets/'
    },
    {
        expand: true,
        cwd: 'app/src/scss/sprites',
        src: ['**/*'],
        dest: 'app/public/css/'
    }
];

options.jshintOptions = {
    bitwise: false,
    curly: true,
    eqeqeq: true,
    immed: true,
    latedef: true,
    newcap: true,
    noarg: true,
    sub: true,
    undef: true,
    boss: true,
    eqnull: true,
    browser: true,
    expr: true,
    es3: true,
    globals: {
        "global": false,
        "module": false,
        "Buffer": false,
        "process": false,
        "Promise": true,
        "__dirname": false,
        "__env": false,
        "__base": false,
        "require": false
    }
};

module.exports = options;

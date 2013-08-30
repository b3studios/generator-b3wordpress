module.exports = function( grunt ) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        <%= _.slugify(projectName) %>: {
            dev:  '../template',
            dist: '../www/wp-content/themes/<%= _.slugify(projectName) %>/assets'
        }
};
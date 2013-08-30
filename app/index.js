'use strict';

var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    _ = require('lodash');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var B3wordpressGenerator = module.exports = function B3wordpressGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(B3wordpressGenerator, yeoman.generators.Base);

B3wordpressGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'projectName',
        message: 'Project name:'
    },
    {
        name: 'projectVersion',
        message: 'Project version:',
        default: '0.0.0'
    },
    {
        name: 'projectDescription',
        message: 'Project Description:'
    }];

    this.prompt(prompts, function (props) {
        this.projectName        = props.projectName;
        this.projectVersion     = props.projectVersion;
        this.projectDescription = props.projectDescription;

        cb();
    }.bind(this));
};

B3wordpressGenerator.prototype.fetchWordpress = function fetchWordpress() {
    this.log.writeln('Downloading the latest version of WordPress from http://wordpress.org/latest.tar.gz');

    this.tarball('http://wordpress.org/latest.tar.gz', 'www', this.async());
};


B3wordpressGenerator.prototype.createThemeDir = function createThemeDir() {
    this.log.writeln('Creating a directory for our theme to live in.');

    this.mkdir('www/wp-content/themes/' + _.slugify(this.projectName));
};

B3wordpressGenerator.prototype.app = function app() {
    // Make source directories
    this.mkdir('src');
    this.mkdir('src/fonts');
    this.mkdir('src/img');
    this.mkdir('src/js');
    this.mkdir('src/scss}');

    this.mkdir('template');

    this.mkdir('www');
    // Fetch the latest version of WordPress


    this.template('_package.json', 'package.json');
    this.template('_Gruntfile.js', 'src/Gruntfile.js');
    this.copy('_bower.json', 'bower.json');
};

B3wordpressGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('hgignore', '.hgignore');
};

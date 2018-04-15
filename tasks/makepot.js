/*
 * grunt-wp-vue-i18n
 * https://github.com/sabbir1991/grunt-wp-vue-i18n
 *
 * Copyright (c) 2014 sabbir1991, LLC
 * Licensed under the MIT license.
 */

'use strict';

var path = require( 'path' ),
	pkg = require( '../package.json' ),
	wpvuei18n = require( 'wp-vue-i18n' );

module.exports = function( grunt ) {

	/**
	 * Generate a POT file for translating strings.
	 *
	 * php-cli should be in the system path to run this task.
	 *
	 * @link http://develop.svn.wordpress.org/trunk/tools/i18n/
	 */
	grunt.registerMultiTask( 'makepot', 'Generate a POT file for translating strings.', function() {
		var options,
			done = this.async();

		options = this.options({
			cwd: process.cwd(),
			domainPath: '',
			exclude: [],
			include: [],
			mainFile: '',
			potComments: '',
			potFilename: '',
			potHeaders: {},
			processPot: null,
			type: '',
			updateTimestamp: true,
			updatePoFiles: false
		});

		options.cwd = path.resolve( process.cwd(), options.cwd );
		options.potHeaders['x-generator'] = 'grunt-wp-i18n' + pkg.version;
		options.potFile = options.potFilename;

		wpvuei18n.makepot( options )
		.then(function( wpPackage ) {
			grunt.log.ok( 'POT file saved to ' + path.relative( wpPackage.getPath(), wpPackage.getPotFilename() ) );
		})
		.catch(function( error ) {
			console.log( error );
		})
		.finally( done );
	});
};

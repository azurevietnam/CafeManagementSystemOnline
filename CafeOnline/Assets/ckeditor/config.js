/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.syntaxhighlight_lang = 'csharp';
    config.syntaxhighlight_hideControls = true;
    config.language = 'vi';
    config.filebrowserBrowseUrl = '/Assets/ckfinder/ckfinder.html';
    config.filebrowserImageBrowseUrl = '/Assets/ckfinder/ckfinder.html?Type=Images';
    config.filebrowserImageUploadUrl = '/Images';

    //config.filebrowserFlashBrowseUrl = '/Assets/ckfinder/ckfinder.html?Type=Flash';
    //config.filebrowserUploadUrl = '/Assets/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files';
    //config.filebrowserFlashUploadUrl = '/Assets/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';

    //CKFinder.setupCKEditor(null, '/assets/admin/js/plugins/ckfinder/');
};

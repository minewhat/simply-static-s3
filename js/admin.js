'use strict';
jQuery( document ).ready( function($) {

    // show / hide tabs:
    jQuery( '#sistTabs' ).find( 'a' ).click( function() {
        jQuery( '#sistTabs' ).find( 'a' ).removeClass( 'nav-tab-active' );
        jQuery( '.tab-pane' ).removeClass( 'active' );

        var id = jQuery( this ).attr( 'id' ).replace( '-tab', '' );
        jQuery( '#' + id ).addClass( 'active' );
        jQuery( this ).addClass( 'nav-tab-active' );
    });

    // set active tab on page load:
    var activeTab = window.location.hash.replace( '#tab-', '' );

    // if no tab hash, default to the first tab
    if ( activeTab === '' ) {
        activeTab = jQuery( '.tab-pane' ).attr( 'id' );
    }

    jQuery( '#' + activeTab ).addClass( 'active' );
    jQuery( '#' + activeTab + '-tab' ).addClass( 'nav-tab-active' );

    // pretend the user clicked on the active tab
    jQuery( '.nav-tab-active' ).click();

    // -----------------------------------------------------------------------//

    // delivery method selection:
    jQuery( '#deliveryMethod' ).change(function() {
        var selected = jQuery( this ).val();
        jQuery( '.delivery-method' ).removeClass( 'active' );
        jQuery( '.' + selected + '.delivery-method' ).addClass( 'active ');
    });

    // pretend the user selected a value
    jQuery(' #deliveryMethod' ).change();

    // -----------------------------------------------------------------------//

    var ajax_url = '/wp-admin/admin-ajax.php';

    $('#publish-to-s3').click(function(e){
        e.preventDefault();

        var t = $(this),
            url = t.data('url'),
            action = 'ss_generate_single_page',
            params = {};
        
        t.val( 'Publishing...' );
        t.attr( 'disabled', 'disabled' );

        params.action = action;
        params.url = url;

        $.post(ajax_url,params,function(data){
            if (data) {
                t.val( 'Published' );
            }
        });
    });


    $('#post-type-select button').click(function(e){
        e.preventDefault();
        var t = $(this),
            v = t.attr('id').replace('add_', ''),
            action = 'ss_get_post_type_entries',
            currUrls = $('#additionalUrls').val().replace(/\n/g, ','),
            params = {};
        
        if ( ! t.hasClass( 'clicked' ) ) {
            params.action = action;
            params.post_type = v;
            params.curr_urls = currUrls;

            $.post(ajax_url,params,function(data){
                if (data) {
                    $('#additionalUrls').val( data );
                    t.toggleClass( 'clicked', true );
                }
            });
        }
    });

    $( '#basicAuthCredentialsSaved > a' ).click( function(e) {
        e.preventDefault();
        $( '#basicAuthSet' ).addClass( 'hide' );
        $( '#basicAuthUserPass').removeClass( 'hide' ).find( 'input' ).prop( 'disabled', false );
    });

});

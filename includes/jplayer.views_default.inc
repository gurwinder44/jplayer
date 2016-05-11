<?php
/**
 * @file
 * Define a view to display a jplayer instance on transcript webform edit pages
 */

/**
 * Implements hook_views_default_views().
 */
function jplayer_views_default_views() {
    
    // Create a view to display the transcriber player on the webform edit page
    $view = new view();
    $view->name = 'transcript_edit';
    $view->description = '';
    $view->tag = 'default';
    $view->base_table = 'node';
    $view->human_name = 'Transcript Edit';
    $view->core = 7;
    $view->api_version = '3.0';
    $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

    /* Display: Master */
    $handler = $view->new_display('default', 'Master', 'default');
    $handler->display->display_options['title'] = 'Transcript Edit';
    $handler->display->display_options['use_more_always'] = FALSE;
    $handler->display->display_options['access']['type'] = 'perm';
    $handler->display->display_options['cache']['type'] = 'none';
    $handler->display->display_options['query']['type'] = 'views_query';
    $handler->display->display_options['exposed_form']['type'] = 'basic';
    $handler->display->display_options['pager']['type'] = 'some';
    $handler->display->display_options['pager']['options']['items_per_page'] = '1';
    $handler->display->display_options['style_plugin'] = 'default';
    $handler->display->display_options['row_plugin'] = 'node';
    $handler->display->display_options['row_options']['view_mode'] = 'full';
    /* Relationship: Entity Reference: Referenced Entity */
    $handler->display->display_options['relationships']['field_transcript_form_target_id']['id'] = 'field_transcript_form_target_id';
    $handler->display->display_options['relationships']['field_transcript_form_target_id']['table'] = 'field_data_field_transcript_form';
    $handler->display->display_options['relationships']['field_transcript_form_target_id']['field'] = 'field_transcript_form_target_id';
    /* Field: Content: Title */
    $handler->display->display_options['fields']['title']['id'] = 'title';
    $handler->display->display_options['fields']['title']['table'] = 'node';
    $handler->display->display_options['fields']['title']['field'] = 'title';
    $handler->display->display_options['fields']['title']['label'] = '';
    $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
    $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
    /* Sort criterion: Content: Post date */
    $handler->display->display_options['sorts']['created']['id'] = 'created';
    $handler->display->display_options['sorts']['created']['table'] = 'node';
    $handler->display->display_options['sorts']['created']['field'] = 'created';
    $handler->display->display_options['sorts']['created']['order'] = 'DESC';
    /* Contextual filter: Content: Nid */
    $handler->display->display_options['arguments']['nid']['id'] = 'nid';
    $handler->display->display_options['arguments']['nid']['table'] = 'node';
    $handler->display->display_options['arguments']['nid']['field'] = 'nid';
    $handler->display->display_options['arguments']['nid']['relationship'] = 'field_transcript_form_target_id';
    $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
    $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
    $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
    $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
    $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
    /* Filter criterion: Content: Published */
    $handler->display->display_options['filters']['status']['id'] = 'status';
    $handler->display->display_options['filters']['status']['table'] = 'node';
    $handler->display->display_options['filters']['status']['field'] = 'status';
    $handler->display->display_options['filters']['status']['value'] = 1;
    $handler->display->display_options['filters']['status']['group'] = 1;
    $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
    /* Filter criterion: Content: Type */
    $handler->display->display_options['filters']['type']['id'] = 'type';
    $handler->display->display_options['filters']['type']['table'] = 'node';
    $handler->display->display_options['filters']['type']['field'] = 'type';
    $handler->display->display_options['filters']['type']['value'] = array(
        'audio_player' => 'audio_player',
    );

    /* Display: Block */
    $handler = $view->new_display('block', 'Block', 'block');
    $translatables['transcript_edit'] = array(
        t('Master'),
        t('Transcript Edit'),
        t('more'),
        t('Apply'),
        t('Reset'),
        t('Sort by'),
        t('Asc'),
        t('Desc'),
        t('Content entity referenced from field_transcript_form'),
        t('All'),
        t('Block'),
    );
    
    $views[$view->name] = $view;
    
    // Create a view to display all annotations
    $view = new view();
    $view->name = 'annotations';
    $view->description = '';
    $view->tag = 'default';
    $view->base_table = 'node';
    $view->human_name = 'Annotations';
    $view->core = 7;
    $view->api_version = '3.0';
    $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

    /* Display: Master */
    $handler = $view->new_display('default', 'Master', 'default');
    $handler->display->display_options['title'] = 'Annotations';
    $handler->display->display_options['use_more_always'] = FALSE;
    $handler->display->display_options['access']['type'] = 'perm';
    $handler->display->display_options['cache']['type'] = 'none';
    $handler->display->display_options['query']['type'] = 'views_query';
    $handler->display->display_options['exposed_form']['type'] = 'basic';
    $handler->display->display_options['pager']['type'] = 'full';
    $handler->display->display_options['pager']['options']['items_per_page'] = '10';
    $handler->display->display_options['style_plugin'] = 'table';
    $handler->display->display_options['style_options']['grouping'] = array(
        0 => array(
            'field' => 'field_collection',
            'rendered' => 1,
            'rendered_strip' => 0,
        ),
        1 => array(
            'field' => 'field_remote_file_url',
            'rendered' => 0,
            'rendered_strip' => 0,
        ),
    );
    $handler->display->display_options['style_options']['columns'] = array(
        'field_timestamp' => 'field_timestamp',
        'field_controlled_annotations' => 'nothing',
        'field_uncontrolled_annotations' => 'nothing',
        'nothing' => 'nothing',
        'field_remote_file_url' => 'field_remote_file_url',
        'title' => 'title',
        'field_collection' => 'field_collection',
    );
    $handler->display->display_options['style_options']['default'] = '-1';
    $handler->display->display_options['style_options']['info'] = array(
        'field_timestamp' => array(
            'sortable' => 0,
            'default_sort_order' => 'asc',
            'align' => '',
            'separator' => '',
            'empty_column' => 0,
        ),
        'field_controlled_annotations' => array(
            'align' => '',
            'separator' => '',
            'empty_column' => 0,
        ),
        'field_uncontrolled_annotations' => array(
            'align' => '',
            'separator' => '',
            'empty_column' => 0,
        ),
            'nothing' => array(
            'align' => '',
            'separator' => ', ',
            'empty_column' => 0,
        ),
        'field_remote_file_url' => array(
            'sortable' => 0,
            'default_sort_order' => 'asc',
            'align' => '',
            'separator' => '',
            'empty_column' => 0,
        ),
        'title' => array(
            'sortable' => 0,
            'default_sort_order' => 'asc',
            'align' => '',
            'separator' => '',
            'empty_column' => 0,
        ),
        'field_collection' => array(
            'align' => '',
            'separator' => '',
            'empty_column' => 0,
        ),
    );
    /* Relationship: Entity Reference: Referenced Entity */
    $handler->display->display_options['relationships']['field_annotation_audio_file_target_id']['id'] = 'field_annotation_audio_file_target_id';
    $handler->display->display_options['relationships']['field_annotation_audio_file_target_id']['table'] = 'field_data_field_annotation_audio_file';
    $handler->display->display_options['relationships']['field_annotation_audio_file_target_id']['field'] = 'field_annotation_audio_file_target_id';
    /* Field: Content: Timestamp */
    $handler->display->display_options['fields']['field_timestamp']['id'] = 'field_timestamp';
    $handler->display->display_options['fields']['field_timestamp']['table'] = 'field_data_field_timestamp';
    $handler->display->display_options['fields']['field_timestamp']['field'] = 'field_timestamp';
    /* Field: Content: Controlled Annotations */
    $handler->display->display_options['fields']['field_controlled_annotations']['id'] = 'field_controlled_annotations';
    $handler->display->display_options['fields']['field_controlled_annotations']['table'] = 'field_data_field_controlled_annotations';
    $handler->display->display_options['fields']['field_controlled_annotations']['field'] = 'field_controlled_annotations';
    $handler->display->display_options['fields']['field_controlled_annotations']['delta_offset'] = '0';
    /* Field: Content: Uncontrolled Annotations */
    $handler->display->display_options['fields']['field_uncontrolled_annotations']['id'] = 'field_uncontrolled_annotations';
    $handler->display->display_options['fields']['field_uncontrolled_annotations']['table'] = 'field_data_field_uncontrolled_annotations';
    $handler->display->display_options['fields']['field_uncontrolled_annotations']['field'] = 'field_uncontrolled_annotations';
    $handler->display->display_options['fields']['field_uncontrolled_annotations']['delta_offset'] = '0';
    /* Field: Global: Custom text */
    $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
    $handler->display->display_options['fields']['nothing']['table'] = 'views';
    $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
    $handler->display->display_options['fields']['nothing']['label'] = 'Annotations';
    /* Field: Content: Remote File URL */
    $handler->display->display_options['fields']['field_remote_file_url']['id'] = 'field_remote_file_url';
    $handler->display->display_options['fields']['field_remote_file_url']['table'] = 'field_data_field_remote_file_url';
    $handler->display->display_options['fields']['field_remote_file_url']['field'] = 'field_remote_file_url';
    $handler->display->display_options['fields']['field_remote_file_url']['relationship'] = 'field_annotation_audio_file_target_id';
    $handler->display->display_options['fields']['field_remote_file_url']['exclude'] = TRUE;
    $handler->display->display_options['fields']['field_remote_file_url']['click_sort_column'] = 'fid';
    $handler->display->display_options['fields']['field_remote_file_url']['type'] = 'jplayer_player';
    $handler->display->display_options['fields']['field_remote_file_url']['settings'] = array(
        'mode' => 'single',
        'autoplay' => '0',
        'solution' => 'html, flash',
        'preload' => 'metadata',
        'volume' => '80',
        'muted' => '0',
        'repeat' => 'none',
        'backgroundColor' => '000000',
    );
    /* Field: Content: Title */
    $handler->display->display_options['fields']['title']['id'] = 'title';
    $handler->display->display_options['fields']['title']['table'] = 'node';
    $handler->display->display_options['fields']['title']['field'] = 'title';
    $handler->display->display_options['fields']['title']['relationship'] = 'field_annotation_audio_file_target_id';
    $handler->display->display_options['fields']['title']['label'] = 'Audio File';
    /* Field: Content: Collection */
    $handler->display->display_options['fields']['field_collection']['id'] = 'field_collection';
    $handler->display->display_options['fields']['field_collection']['table'] = 'field_data_field_collection';
    $handler->display->display_options['fields']['field_collection']['field'] = 'field_collection';
    $handler->display->display_options['fields']['field_collection']['relationship'] = 'field_annotation_audio_file_target_id';
    $handler->display->display_options['fields']['field_collection']['exclude'] = TRUE;
    $handler->display->display_options['fields']['field_collection']['settings'] = array(
        'link' => 0,
    );
    $handler->display->display_options['fields']['field_collection']['delta_offset'] = '0';
    /* Sort criterion: Content: Post date */
    $handler->display->display_options['sorts']['created']['id'] = 'created';
    $handler->display->display_options['sorts']['created']['table'] = 'node';
    $handler->display->display_options['sorts']['created']['field'] = 'created';
    $handler->display->display_options['sorts']['created']['order'] = 'DESC';
    /* Filter criterion: Content: Published */
    $handler->display->display_options['filters']['status']['id'] = 'status';
    $handler->display->display_options['filters']['status']['table'] = 'node';
    $handler->display->display_options['filters']['status']['field'] = 'status';
    $handler->display->display_options['filters']['status']['value'] = 1;
    $handler->display->display_options['filters']['status']['group'] = 1;
    $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
    /* Filter criterion: Content: Type */
    $handler->display->display_options['filters']['type']['id'] = 'type';
    $handler->display->display_options['filters']['type']['table'] = 'node';
    $handler->display->display_options['filters']['type']['field'] = 'type';
    $handler->display->display_options['filters']['type']['value'] = array(
        'annotation' => 'annotation',
    );

    /* Display: Page */
    $handler = $view->new_display('page', 'Page', 'page');
    $handler->display->display_options['path'] = 'annotations';
    $handler->display->display_options['menu']['type'] = 'normal';
    $handler->display->display_options['menu']['title'] = 'Annotations';
    $handler->display->display_options['menu']['name'] = 'main-menu';

    $views[$view->name] = $view;
    return $views;
}


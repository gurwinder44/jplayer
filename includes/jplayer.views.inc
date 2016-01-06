<?php
/**
 * @file
 * Views module hooks for the jPlayer module.
 */

/**
 * Implements hook_views_data().
 *
function jplayer_views_data() {
    $data['transcript']['table']['group'] = t('Transcript');
    
    $data['transcript']['table']['base'] = array(
        'field' => 'tid',
        'title' => t('Transcript'),
        'help' => t('Table containing transcript of audio files'),
        'weight' => -10,
    );
    
    $data['transcript']['tid'] = array(
        'title' => t('Transcript ID'),
        'help' => t('Sequence number of the transcript'),
        'field' => array(
            'handler' => 'views_handler_field_numeric',
            'click sortable' => FALSE,
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_numeric',
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
        ),
    );
    
    $data['transcript']['text'] = array(
        'title' => t('Transcript text'),
        'help' => t('Transcript of 5-second audio slice'),
        'field' => array(
            'handler' => 'views_handler_field',
            'click sortable' => FALSE,
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_string',
        ),
    );
    
    $data['transcript']['audio_id'] = array(
        'title' => t('Audio ID'),
        'help' => t('ID of the audio to which the transcript segment belongs'),
        'field' => array(
            'handler' => 'views_handler_field_numeric',
            'click sortable' => FALSE,
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_numeric',
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
        ),
    );
    
    return $data;
}*/

/**
 * Implements hook_views_plugins().
 */
function jplayer_views_plugins() {
  $path = drupal_get_path('module', 'jplayer');

  return array(
    'style' => array(
      'jplayer' => array(
        'title' => t('jPlayer'),
        'help' => t('Display audio files from different nodes as a jPlayer playlist.'),
        'handler' => 'jplayer_style_plugin',
        'path' => "$path/includes",
        'uses row plugin' => TRUE,
        'uses options' => TRUE,
        'uses grouping' => FALSE,
        'type' => 'normal',
      ),
    ),
  );
}
/**
 * @file
 * Drupal behaviors for jPlayer.
 */

var flag = 0;
var songDuration;
var segments;
var stopTime = 5;
var startTime = 0;
var head;
var segment = 1;
var action = 1;
var atime;

(function ($) {
  
  Drupal.jPlayer = Drupal.jPlayer || {};
  
  Drupal.behaviors.jPlayer = {
    attach: function(context, settings) {
      // Set time format settings
      $.jPlayer.timeFormat.showHour = Drupal.settings.jPlayer.showHour;
      $.jPlayer.timeFormat.showMin = Drupal.settings.jPlayer.showMin;
      $.jPlayer.timeFormat.showSec = Drupal.settings.jPlayer.showSec;
      
      $.jPlayer.timeFormat.padHour = Drupal.settings.jPlayer.padHour;
      $.jPlayer.timeFormat.padMin = Drupal.settings.jPlayer.padMin;
      $.jPlayer.timeFormat.padSec = Drupal.settings.jPlayer.padSec;
      
      $.jPlayer.timeFormat.sepHour = Drupal.settings.jPlayer.sepHour;
      $.jPlayer.timeFormat.sepMin = Drupal.settings.jPlayer.sepMin;
      $.jPlayer.timeFormat.sepSec = Drupal.settings.jPlayer.sepSec;
      
      // INITIALISE
      
      $('.jp-jplayer:not(.jp-jplayer-processed)', context).each(function() {
        $(this).addClass('jp-jplayer-processed');
        var wrapper = this.parentNode;
        var player = this;
        var playerId = $(this).attr('id');
        var playerSettings = Drupal.settings.jplayerInstances[playerId];
        var type = $(this).parent().attr('class');
        player.playerType = $(this).parent().attr('class');
        
        if (type == 'jp-type-single') {
          // Initialise single player
          $(player).jPlayer({
            ready: function() {
              $(this).jPlayer("setMedia", playerSettings.files);
              
              // Make sure we pause other players on play
              $(player).bind($.jPlayer.event.play, function() {
                $(this).jPlayer("pauseOthers");
              });

              Drupal.attachBehaviors(wrapper);

              // Repeat?
              if (playerSettings.repeat != 'none') {
                $(player).bind($.jPlayer.event.ended, function() {
                  $(this).jPlayer("play");
                });
              }
              
              // Autoplay?
              if (playerSettings.autoplay == true) {
                $(this).jPlayer("play");
              }
            },
            loadeddata: function(event) {
                    // Get duration and calculate number of segments
                    songDuration = event.jPlayer.status.duration;
                    segments = Math.ceil(songDuration/5);
                                            
                    // Set a cookie containing the number of segments
                    document.cookie = 'seginfo='+songDuration+'; path=/';
                
                    // Get page number from Drupal.settings and set player position
                    head = parseInt(Drupal.settings.jplayer.pageinfo, 10);
                    segment = ((head-1)*6) + 1;
                    head = (head-1) * 30;
                    stopTime = head + 5;
                    $(this).jPlayer("pause", head);
                
            },
            ended: function() {
                /*stopTime = 5;
                segment = 1;*/
            },
            swfPath: Drupal.settings.jPlayer.swfPath,
            cssSelectorAncestor: '#'+playerId+'_interface',
            solution: playerSettings.solution,
            supplied: playerSettings.supplied,
            preload: playerSettings.preload,
            volume: playerSettings.volume,
            muted: playerSettings.muted
          });
          
          /* Pause after every 5 seconds
          $(player).bind($.jPlayer.event.timeupdate, function(event) {
              if(event.jPlayer.status.currentTime > stopTime) {
                  if(flag == 0) {
                      stopTime = stopTime - 5;
                }
                  $(this).jPlayer("pause", stopTime);                  
                  stopTime = stopTime + 5;
              }
          });*/
          
         
        }
        else {
            action = parseInt(Drupal.settings.jplayer.action, 10);
            // Transcriber
            if(action == 0) {
          // Initialise playlist player
          $(player).jPlayer({
            ready: function() {
              Drupal.jPlayer.setFiles(wrapper, player, 0, playerSettings.autoplay);
              
              // Pause other players on play
              $(player).bind($.jPlayer.event.play, function() {
                $(this).jPlayer("pauseOthers");
              });

              // Add playlist selection
              $('#'+playerId+'_playlist').find('a').click(function(){
                var index = $(this).attr('id').split('_')[2];
                Drupal.jPlayer.setFiles(wrapper, player, index, true);
                $(this).blur();
                return false;
              });

              Drupal.attachBehaviors(wrapper);

              // Repeat?
              if (playerSettings.repeat != 'none') {
                $(player).bind($.jPlayer.event.ended, function() {
                  if (playerSettings.repeat == 'single') {
                    $(this).jPlayer("play");
                  }
                  else {
                    //Drupal.jPlayer.next(wrapper, player);
                  }
                });
              }
              
            },
            loadeddata: function(event) {
                
                    // Get duration and calculate number of segments
                    songDuration = event.jPlayer.status.duration;
                    segments = Math.ceil(songDuration/5);
                                
                    // Set a cookie containing the number of segments
                    document.cookie = 'seginfo='+songDuration+'; path=/';
                
                    // Get page number from Drupal.settings and set player position
                    head = parseInt(Drupal.settings.jplayer.pageinfo, 10);
                    if(isNaN(head)) {head = 1;}
                    segment = ((head-1)*6) + 1;
                    head = (head-1) * 30;
                    stopTime = head + 5;
                    
                    $(this).jPlayer("pause", head);
                    
                
            },
            ended: function() {
                $(this).jPlayer("playHead", 100);
            },
            swfPath: Drupal.settings.jPlayer.swfPath,
            cssSelectorAncestor: '#'+playerId+'_interface',
            solution: playerSettings.solution,
            supplied: playerSettings.supplied,
            preload: playerSettings.preload,
            volume: playerSettings.volume,
            muted: playerSettings.muted
          });
          
          
            $(player).bind($.jPlayer.event.play, function() {
                $(this).jPlayer("play", startTime);
                if(startTime == 0) {
                    document.getElementById("jp-segment").innerHTML = "Now playing: SEGMENT "+segment;
                }
            });
          
          
          $(player).bind($.jPlayer.event.pause, function() {
                stopTime = stopTime - 5;
          });
          
          // Pause after every 5 seconds
          $(player).bind($.jPlayer.event.timeupdate, function(event) {
              if(event.jPlayer.status.currentTime > stopTime) {             
                  stopTime = stopTime + 5;
                  $(this).jPlayer("pause");
              }
          });
            }
            
            else {
                // Normal player or annotator
                // Initialise playlist player
          $(player).jPlayer({
            ready: function() {
              Drupal.jPlayer.setFiles(wrapper, player, 0, playerSettings.autoplay);
              
              // Pause other players on play
              $(player).bind($.jPlayer.event.play, function() {
                $(this).jPlayer("pauseOthers");
              });

              // Add playlist selection
              $('#'+playerId+'_playlist').find('a').click(function(){
                var index = $(this).attr('id').split('_')[2];
                Drupal.jPlayer.setFiles(wrapper, player, index, true);
                $(this).blur();
                return false;
              });

              Drupal.attachBehaviors(wrapper);

              // Repeat?
              if (playerSettings.repeat != 'none') {
                $(player).bind($.jPlayer.event.ended, function() {
                  if (playerSettings.repeat == 'single') {
                    $(this).jPlayer("play");
                  }
                  else {
                    Drupal.jPlayer.next(wrapper, player);
                  }
                });
              }
              
            },
             loadeddata: function(event) {
                 
                 // Get duration and calculate number of segments
                 songDuration = event.jPlayer.status.duration;
                 segments = Math.ceil(songDuration/5);
                                
                 // Set a cookie containing the number of segments
                 document.cookie = 'seginfo='+songDuration+'; path=/';
                 
                 // Save the time when it was paused so we can come back to it
                 var timeval = sessionStorage.getItem("timepoint");
                 atime = Math.floor(timeval);                 
                 $(this).jPlayer("pause", atime);
            },
            swfPath: Drupal.settings.jPlayer.swfPath,
            cssSelectorAncestor: '#'+playerId+'_interface',
            solution: playerSettings.solution,
            supplied: playerSettings.supplied,
            preload: playerSettings.preload,
            volume: playerSettings.volume,
            muted: playerSettings.muted
          });
          
          // Save the time when player was paused
          $(player).bind($.jPlayer.event.pause, function(event) {
              document.cookie = 'timeinfo='+event.jPlayer.status.currentTime+'; path=/';
              sessionStorage.setItem("timepoint", event.jPlayer.status.currentTime);
          });
          
            }
            
          }
          
          // Update segment info when the NEXT or PREVIOUS buttons are clicked
          $(".jp-next").click(function() {              
                if(stopTime > songDuration) {
                    stopTime = 5;
                    segment = 1;
                }
                else {
                    stopTime = stopTime + 5;
                    segment++;
                }
                startTime = stopTime - 5;
                document.getElementById("jp-segment").innerHTML = "Now playing: SEGMENT "+segment;
                return false;
          });
          
          $(".jp-previous").click(function() {
                if(stopTime <= 5) {
                    stopTime = 5;
                    segment = 1;
                }
                else {
                    stopTime = stopTime - 5;
                    segment--;
                }
                startTime = stopTime - 5;
                document.getElementById("jp-segment").innerHTML = "Now playing: SEGMENT "+segment;
                return false;
          });        
      });
    }
  };
  
  Drupal.jPlayer.setFiles = function(wrapper, player, index, play) {
    var playerId = $(player).attr('id');
    var playerSettings = Drupal.settings.jplayerInstances[playerId];
    var type = $(wrapper).parent().attr('class');
    
    $(wrapper).find('.jp-playlist-current').removeClass('jp-playlist-current');
    $('#'+playerId+'_item_'+index).parent().addClass('jp-playlist-current');
    $('#'+playerId+'_item_'+index).addClass('jp-playlist-current');
                
    $(player).jPlayer("setMedia", playerSettings.files[index])
    
    for (key in playerSettings.files[index]) {
      if (key != 'poster') {
        type = key;
      }
    }
    
    if (type in {'m4v':'', 'mp4':'','ogv':'','webmv':''}) {
      var kind = 'video jp-video-360p';
    }
    else if (type in {'mp3':'', 'm4a':'','oga':'','webmv':'','wav':''}) {
      var kind = 'audio';
    }
    
    if (kind == 'audio') {
      $(wrapper).find('img').remove();
    }
    
    //$(wrapper).parent().attr('class', 'jp-'+kind);
    
    if (play == true) {
      $(player).jPlayer('play');
    }
  };
  /*
  Drupal.jPlayer.next = function(wrapper, player) {
    var playerId = $(player).attr('id');
    var playerSettings = Drupal.settings.jplayerInstances[playerId];
    
    var current = Number($(wrapper).find('a.jp-playlist-current').attr('id').split('_')[2]);
    var index = (current + 1 < playerSettings.files.length) ? current + 1 : 0;
    
    Drupal.jPlayer.setFiles(wrapper, player, index, true);
  }
  
  Drupal.jPlayer.previous = function(wrapper, player) {
    var playerId = $(player).attr('id');
    var playerSettings = Drupal.settings.jplayerInstances[playerId];
    
    var current = Number($(wrapper).find('a.jp-playlist-current').attr('id').split('_')[2]);
    var index = (current - 1 >= 0) ? current - 1 : playerSettings.files.length - 1;
    
    Drupal.jPlayer.setFiles(wrapper, player, index, true);
  }*/
  
})(jQuery);


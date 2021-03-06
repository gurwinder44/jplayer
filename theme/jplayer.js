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


// Key codes for keyboard shortcuts
var codes = {
    previous: 219,  // [ key
    replay: 221,    // ] key
    next: 220,      // \ key
    pause: 187      // = key
};

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
        
        // SINGLE PLAYER; USED FOR ANNOTATION VIEW
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
            swfPath: Drupal.settings.jPlayer.swfPath,
            cssSelectorAncestor: '#'+playerId+'_interface',
            solution: playerSettings.solution,
            supplied: playerSettings.supplied,
            preload: playerSettings.preload,
            volume: playerSettings.volume,
            muted: playerSettings.muted
          });
        }
        
        // PLAYLIST PLAYER: USED BY CUSTOM MODULE
        else {
            action = parseInt(Drupal.settings.jplayer.action, 10);
            
            // TRANSCRIBER
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
                    startTime = stopTime - 5;
                    
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
          
          // Binding for jPlayer "play" event
            $(player).bind($.jPlayer.event.play, function() {
                flag = 0;   // Used for play/pause keyboard shortcut
                if(startTime%30 == 0) {
                    document.getElementById("jp-segment").innerHTML = "Now playing: SEGMENT "+segment;
                }
                $(this).jPlayer("play", startTime);
            });
          
          
          $(player).bind($.jPlayer.event.pause, function() {
                flag = 1;   // Used for play/pause keyboard shortcut
          });
          
          // Pause after every 5 seconds
          $(player).bind($.jPlayer.event.timeupdate, function(event) {
              if(event.jPlayer.status.currentTime > stopTime) {
                  $(this).jPlayer("pause");
              }
          });
            }
            
            
            // NORMAL OR ANNOTATOR PLAYER
            else {
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
                 
                 // Go to the time where it was paused
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
                $("*").jPlayer("play", startTime);
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
                $("*").jPlayer("play", startTime);
                return false;
          });
          
          // Binding for PLAY buttons in Transcript
          $(".trbutton").click(function() {
              var seekTime = $(this).attr("id");
              startTime = parseInt(seekTime, 10);
              stopTime = startTime + 5;
              segment = (startTime/5) + 1;
              document.getElementById("jp-segment").innerHTML = "Now playing: SEGMENT "+segment;
              $("*").jPlayer("play", startTime);
          });
          
          // Binding for PLAY buttons for Annotation 
          $(".anbutton").click(function() {
              var id_string = $(this).attr("id");
              var id = id_string.split('-');
              var node_id = id[0];
              var time = id[1];
              var head = parseInt(time, 10);
              $("[id|='jplayer-node-"+node_id+"']").jPlayer("play", head);
          });
          
          // Keyboard shortcuts to replay, next or previous
          $(window).keydown(function(e) {
              switch(e.keyCode) {
                  case codes.previous:
                      e.preventDefault();
                      //Previous segment                      
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
                      $("*").jPlayer("play", startTime);
                      break;
                  case codes.next:
                      e.preventDefault();
                      //Next segment
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
                      $("*").jPlayer("play", startTime);
                      break;
                  case codes.replay:
                      e.preventDefault();
                      //Replay
                      $("*").jPlayer("play", startTime);
                      break;
                  case codes.pause:
                      e.preventDefault();
                      // Play/pause
                      if(flag == 1) {
                          $("*").jPlayer("play");
                      }
                      else {
                          $("*").jPlayer("pause");
                      }
                      break;
              }
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


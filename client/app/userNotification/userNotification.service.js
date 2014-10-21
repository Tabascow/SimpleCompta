'use strict';

angular.module('simpleComptaApp')
  .service('userNotification', function ($rootScope,$timeout) {
        var userNotificationService;
        $rootScope.alerts = [];

        return userNotificationService = {
            add: function(type, msg, timeout) {
                timeout = (typeof timeout === "undefined")? 3000:timeout;
                $rootScope.alerts.push({
                    type: type,
                    msg: msg,
                    close: function() {
                        return userNotificationService.closeAlert(this);
                    }
                });

                if (timeout) {
                    $timeout(function(){
                        userNotificationService.closeAlert(this);
                    }, timeout);
                }
            },
            closeAlert: function(alert) {
                return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
            },
            closeAlertIdx: function(index) {
                return $rootScope.alerts.splice(index, 1);
            }

        };
  });

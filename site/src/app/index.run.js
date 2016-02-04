(function() {
  'use strict';

  angular
    .module('gcloud')
    .run(runBlock);

  /** @ngInject */
  function runBlock($state, $rootScope, manifest) {
    angular.extend($rootScope, manifest);

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams) {
      if (toState.redirectTo) {
        e.preventDefault();
        $state.go(toState.redirectTo, toParams);
      }
    });

    $rootScope.$on('$stateChangeError', function() {
      // uncomment for debugging
      // console.log(arguments);

      $state.go('docs.service', {
        version: $state.params.version,
        serviceId: 'gcloud'
      });
    });
  }

}());

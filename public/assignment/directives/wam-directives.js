/**
 * Created by Shikha Singh on 6/12/2016.
 */
(function(){
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        var start = -1;
        var end = -1;
        function linker(scope, element, attributes) {
            $(".container")
                .sortable({
                    axis : 'y',
                    sort: function(event, ui) {
                        start = ui.item.index();
                        console.log("Start - " +start);
                    },
                    stop: function(event, ui) {
                        end = ui.item.index();
                        console.log("End - " +end);
                        scope.wamCallback({
                            start: start,
                            end: end
                        });
                    }
                });
        }
        return {
            scope: {
                wamCallback: '&'
            },
            link: linker
        }
    }
})();

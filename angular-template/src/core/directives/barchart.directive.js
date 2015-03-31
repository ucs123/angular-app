// Usage
// <div data-at-barchart assets="vm.account.assets"></div>
/* global d3 */
/* jshint -W126 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('atBarchart', barchartDirective);

    barchartDirective.$inject = ['$window'];

    /* @ngInject */
    function barchartDirective($window) {

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                assets: '='
            }
        };
        return directive;

        function link(scope, element) {
            var tableRowHeight = 25; // TODO: take out hard coding

            // initialize the chart
            var color1="#FFF4CE";
            var color2="#FEE1B4";
            var color3="#FD8300";
            var base = d3.select(element[0]).append('svg');
            var base1 = base.append('svg');
            var barChart1 = new BarChart(base,color1);

            barChart1.barHeight(tableRowHeight);

            //var base = d3.select(element[0]).append('svg');
            var barChart2 = new BarChart(base,color2);
            barChart2.barHeight(tableRowHeight);

             //var base = d3.select(element[0]).append('svg');
            var barChart3 = new BarChart(base,color3);
            barChart3.barHeight(tableRowHeight);

            var textChart1 = new textChart(base1);

            var textChart2 = new textChart(base1);
            // Redraw whenever assets change
            scope.$watch('assets', draw);
            scope.$watch('assets', drawText);
            // Redraw whenever window resizes
            // TODO: Add a throttle function
            angular.element($window).on('resize', draw);
            angular.element($window).on('resize', drawText);

            // Remove the redraw handler when the scope is destroyed
            // This prevents redrawing when the view containing the barchart is destroyed
            scope.$on('$destroy', function() {
                angular.element($window).off('resize', draw);
                angular.element($window).off('resize', drawText);
            });

            function draw() {
                var assets = scope.assets;

                // This can happen when the server has not yet returned the assets
                if (!assets) { return; }

                var data1 = assets.map(function(asset) {
                    return {
                        key: asset.id,
                        value: asset.quantity * 100
                    };
                });

                 barChart1
                    .width(element.width())
                    .draw(data1,color1);

                var data2 = assets.map(function(asset) {
                    return {
                        key: asset.id,
                        value: asset.quantityPlaced * 100
                    };
                });

                 barChart2
                    .width(element.width())
                    .draw(data2,color2);

                // TODO: Remove this mapping from directive to make it reusable
                var data3 = assets.map(function(asset) {
                    return {
                        key: asset.id,
                        value: asset.quantityExecuted * 100
                    };
                });

                barChart3
                    .width(element.width())
                    .draw(data3, color3);
            }

            function drawText(){
                 var ypos = 25;
                 var assets = scope.assets;
                 if (!assets) { return; }

                var data = assets.map(function(asset) {
                    return {
                        key: asset.id,
                        value: asset.id * 10
                    };
                });

                 textChart1
                    .drawText(data, -20);

                    var data1 = assets.map(function(asset) {
                    return {
                        key: asset.quantityPlaced,
                        value: asset.id * 10
                    };
                });

                 textChart2
                    .drawText(data1, 500);
            }
        }
    }

    /* ----- BarChart -----*/
    function BarChart(base) {
        this.base = base;

        this.margin = {top: 0, right: 7, bottom: 30, left: 5};
        this.axisMargin = 5;

        this.x = d3.scale.linear();

        this.y = d3.scale.ordinal();

        this.xAxis = d3.svg.axis()
            .scale(this.x)
            .orient('bottom');

        // chart base
        this.base
            .attr('class', 'chart');

        // x-axis base
        this.xAxisBase = this.base.append('g')
            .attr('class', 'x axis');

        // plot base
        this.plotBase = this.base.append('g')
            .attr('class', 'plot')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    BarChart.prototype.width = function(newWidth) {
        this.w = newWidth;
        this.plotWidth = this.w - this.margin.left - this.margin.right;
        this.base.attr('width', this.w);
        this.x.range([0, this.plotWidth]);
        return this;
    };

    BarChart.prototype.barHeight = function(newBarHeight) {
        this.bh = newBarHeight;
        return this;
    };

    BarChart.prototype.draw = function(data,color) {
        // Compute y-dimensions based on bar height
        this.plotHeight = this.bh * data.length;
        this.h = this.plotHeight + this.margin.top + this.margin.bottom;
        this.base.attr('height', this.h);
        this.y.rangeBands([0, this.plotHeight], 0.05, 0);
        this.xAxisBase.attr(
            'transform',
            'translate(' + this.margin.left + ',' + (this.margin.top + this.plotHeight + this.axisMargin) + ')'
        );

        // Set the domains for the scales from the supplied data
        this.x.domain([0, d3.max(data.map(function(d) { return d.value; }))]);
        this.y.domain(data.map(function(d) { return d.key; }));

        // Draw the axes
        this.xAxis.tickValues(this.x.domain());
        this.xAxisBase.call(this.xAxis);

        // Create the 'update selection' by selecting the bars and joining with data.
        // Update selection contains the DOM elements that were successfully bound to data
        // plus references to enter and exit selections.
        var updateSelection = this.plotBase.selectAll('.bar')
            .data(data, function(d) { return d.key; });

        // Remove the exiting bars (this is the 'exit selection')
        updateSelection.exit()
            .remove();

        // Get the 'enter selection'
        // Contains placeholder DOM nodes for each data element that was not bound
        var enterSelection = updateSelection.enter();

        // Add a group for each entering element - these are the entering bars
        var barsEnter = enterSelection
            .append('g')
            .attr('class', 'bar');

        // Add the rectangle for the bar
        barsEnter
            .append('rect')
            .attr('x', 0)
            .attr('width', 0)
            .attr('height', this.y.rangeBand());

        // Draw the bars
        var self = this;
        updateSelection.select('rect')
            .attr('x', 0)
            .attr('y', function(d) { return self.y(d.key); })
            .attr('height', this.y.rangeBand())
            .transition()
            .duration(1000)
            .attr('width', function(d) { return self.x(d.value); })
            .attr('fill', color);
    };

    function textChart(base1) {
        this.base1 = base1;
        this.base1
            .attr("width", "100")
            .attr("height", "500")
            .attr('class', 'text');
    }
    textChart.prototype.drawText = function(data, x){
        var ypos = 25;
        this.base1.selectAll("text")
       .data(data)
       .enter()
       .append("text")
       .text(function(data) {
        return data.key;
       })
        .attr("x", function(data) {
           return x ;
       })
       .attr("y", function(data, ypos) {
             return ypos = 15 + ypos * 25 + "px";
       })
       .attr("font-family", "sans-serif")
       .attr("font-size", "12px")
       .attr("fill", "red");
    }

})();
